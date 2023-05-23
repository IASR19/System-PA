function defineStructure() { }
function onSync(lastSyncDate) { }

function createDataset(fields, constraints, sortFields) {
	log.info("fluig_adiantamentos_pendentes - inicio");
	var dataset = DatasetBuilder.newDataset();
	
	var FIELDS = [ "nr_solicitacao", "rd_tipo", "vl_total", "dt_pagamento" ];
	if (fields != null && fields.length > 0) {
		FIELDS = [];
		for(var f = 0; f < fields.length; f++){
			FIELDS.push(fields[f]);
		}
	}
	//Campos para verificar se a solicitação já foi usada como adiantamento
	FIELDS.push("cd_solicitacao_adiantamento");
	FIELDS.push("nr_solicitacao");
	
	for(var f = 0; f < FIELDS.length; f++){
		dataset.addColumn(FIELDS[f]);
	}
	
	var filter = {};
	if (constraints != null) {
		getConstraintsValue(constraints
			, [ 'cd_filial', 'cd_centro_custo', 'rd_processo' ]);
		filter.cd_filial = constraintMap.get('cd_filial');
		filter.cd_centro_custo = constraintMap.get('cd_centro_custo');
		filter.rd_processo = constraintMap.get('rd_processo');
		filter.rd_tipo = 'adiantamento';
	}
	if(isEmpty(filter.cd_filial) 
		|| isEmpty(filter.cd_centro_custo) 
		|| isEmpty(filter.rd_processo)){
		log.warn("fluig_adiantamentos_pendentes - É obrigatório preenchimento das constraints"
			+ " de busca: 'cd_filial', 'cd_centro_custo' e 'rd_processo'");
		return dataset;
	}
	log.info("fluig_adiantamentos_pendentes - filter: ");
	log.dir(filter);

	var constraints = [
		DatasetFactory.createConstraint("cd_filial", filter.cd_filial, filter.cd_filial, ConstraintType.MUST)
		, DatasetFactory.createConstraint("cd_centro_custo", filter.cd_centro_custo, filter.cd_centro_custo, ConstraintType.MUST)
		, DatasetFactory.createConstraint("rd_processo", filter.rd_processo, filter.rd_processo, ConstraintType.MUST)
		, DatasetFactory.createConstraint("rd_tipo", filter.rd_tipo, filter.rd_tipo, ConstraintType.MUST)
	];
	var ds = DatasetFactory.getDataset("xcmg_adiantamento_prestacao", FIELDS, constraints, null);
	if(ds != null && ds.rowsCount > 0){
		var mapaSolicitacoes = {};
		var jaUsadas = [];
		for(var i = 0; i < ds.rowsCount; i++){
			var solic = 0;
			var row = [];
			for(var f = 0; f < FIELDS.length; f++){
				var fieldValue = ds.getValue(i, FIELDS[f]);
				row.push(fieldValue);
				
				//Se é o campo de identificação da solicitação
				if(f == FIELDS.length-1) solic = fieldValue;
			}
			
			mapaSolicitacoes[solic] = row;
		}
		log.info("fluig_adiantamentos_pendentes - mapa de solicitacoes - raw");
		log.dir(mapaSolicitacoes);
		
		/* Verifica quais solics de adiantamento já foram usadas
			para então ignorá-las */
		var constraintSolicsJaUsadas = [
			DatasetFactory.createConstraint("cd_filial", filter.cd_filial, filter.cd_filial, ConstraintType.MUST)
			, DatasetFactory.createConstraint("cd_centro_custo", filter.cd_centro_custo, filter.cd_centro_custo, ConstraintType.MUST)
			, DatasetFactory.createConstraint("rd_processo", filter.rd_processo, filter.rd_processo, ConstraintType.MUST)
			, DatasetFactory.createConstraint("rd_tipo", TIPO.PRESTACAO, TIPO.PRESTACAO, ConstraintType.MUST)
			
			, DatasetFactory.createConstraint("status_adiantamento", "cancelado", "cancelado", ConstraintType.MUST_NOT)
			, DatasetFactory.createConstraint("status_adiantamento", "reprovado", "reprovado", ConstraintType.MUST_NOT)
			
			
		];
		for(var s in mapaSolicitacoes){
			log.info("fluig_adiantamentos_pendentes - mapaSolicitacoes - s: " + s);
			constraintSolicsJaUsadas.push(
				DatasetFactory.createConstraint("cd_solicitacao_adiantamento", s, s, ConstraintType.SHOULD));
		}
		var jaUsadasDs = DatasetFactory.getDataset("xcmg_adiantamento_prestacao", FIELDS, constraintSolicsJaUsadas, null);
		if(jaUsadasDs != null && jaUsadasDs.rowsCount > 0){
			for(var j = 0; j < jaUsadasDs.rowsCount; j++){
				log.info("fluig_adiantamentos_pendentes - jaUsadasDs - s: " + jaUsadasDs.getValue(j, "cd_solicitacao_adiantamento"));
				delete mapaSolicitacoes[jaUsadasDs.getValue(j, "cd_solicitacao_adiantamento")];
			}
		}
		else{
			log.error("fluig_adiantamentos_pendentes - Não foi possível verificar quais adiantamentos já foram usados");
		}
		
		//Adiciona solicitações restantes no mapa (adiantamentos não utilizados)
		log.info("fluig_adiantamentos_pendentes - mapa de solicitacoes - filtered");
		log.dir(mapaSolicitacoes);
		for(var s in mapaSolicitacoes){
			dataset.addRow(mapaSolicitacoes[s]);
		}
	}
	else{
		log.warn("fluig_adiantamentos_pendentes - Nenhum adiantamentos foi obtido na consulta");
	}
	return dataset;
}

function onMobileSync(user) { }

var TIPO = { "ADIANTAMENTO": "adiantamento", "PRESTACAO": "prestacao" };

/**
 * Verificar se o valor é nulo ou vazio
 * @param valor
 * @returns
 */
function isEmpty(valor){
	if(valor == null) return true;
	
	var teste = "" + valor;
	return teste.trim() == "";
}

/**
 * Captura o valor das constraints enviadas ao dataset.
 * @param constraints: Array de constraints.
 * @param constraintNames: Array com o nome das constraints obrigatorias para o dataset.
 * @returns HashMap<String,String>  
 */
var constraintMap = null;
function getConstraintsValue(constraints, constraintNames) {
	if (constraintMap == null) constraintMap = constraintToMap(constraints);

	for (var i = 0; i < constraintNames.length; i++) {
		var constraintValue = constraintMap.get(constraintNames[i]);
		if (constraintValue == null)
			log.warn("fluig_adiantamentos_pendentes - Constraint " + constraintNames[i] + " esta com valor nulo.");
	}
	return constraintValue;
}
/**
 * Converte as Contraints em HashMap;
 * @param constraints: Array de Constraint;
 * @returns HashMap<String,String>  
 */
function constraintToMap(constraints) {
	var map = new java.util.HashMap();
	
	if (constraints != null)
		for (var i = 0; i < constraints.length; i++) {
			log.info("fluig_adiantamentos_pendentes - constraint: " + constraints[i].fieldName);
			map.put(constraints[i].fieldName, constraints[i].initialValue);
		}
	
	return map;
}