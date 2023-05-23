let ZOOMS = {
	interval: {},
	callbacks: {}

	, isReady(zoomId){
		return window[zoomId] != undefined && window[zoomId] != null && window[zoomId].open != null;
	}
	, executeQuandoPronto: function(zoomId, callback){
		if(ZOOMS.callbacks[zoomId] == null) ZOOMS.callbacks[zoomId] = [];
		
		ZOOMS.callbacks[zoomId].push(callback);
		ZOOMS.interval[zoomId] = setInterval(function(){
			if(ZOOMS.interval[zoomId] > 0 && ZOOMS.isReady(zoomId)){
				while (_callback = ZOOMS.callbacks[zoomId].pop()){
					//console.log("ZOOMS.callbacks",zoomId,_callback);
					_callback();
				}
				ZOOMS.clearInterval(zoomId);
			}
		});
	}
	
	, clearInterval: function(zoomId){
		window.clearInterval(ZOOMS.interval[zoomId]);
		ZOOMS.interval[zoomId] = 0;
	}
	
	, getValue:function(zoomId, qual){
		if (CONTEXT.MODE == "VIEW" || window[zoomId].getSelectedItems == undefined){
			return $("#"+zoomId).val();
		}
		else if (qual == undefined || qual == "todos"){
			return window[zoomId].getSelectedItems();
		}
		else if (qual != undefined){
			let values = window[zoomId].getSelectedItems();
			return values != null && values.length > qual ? values[qual] : "";
		}
		return "";
	}
	, clear:function(zoomId){
		if (window[zoomId].clear == undefined){
			return $("#"+zoomId).val("");
		} else window[zoomId].clear();
		
		removedZoomItem( { "inputId": zoomId } );
	}
}

//CUSTOM
function setSelectedZoomItem(item) {
	
	if(item.inputId == "nm_filial") {
		$("#cd_empresa").val(item.CompanyCode);
		$("#cd_filial").val(item.Code);
		
		window.cd_centro_custo.clear();
		reloadZoomFilterValues("cd_centro_custo"
			, `cd_matricula,${CONTEXT.USER},cd_filial,${item.Code}`);
	} 
	
	else if(item.inputId == "cd_centro_custo") {
		var cod_centro_custo = item.CodCC;
		
		let cd_filial = $('#cd_filial').val();
		$("#nm_centro_custo").val(item.NomeCC); 
		$("#centro_custo_situacao_proposta").val(item.NomeCC);
				
		window.funcionarios.clear();
		reloadZoomFilterValues("funcionarios", "cd_centro_custo," + cod_centro_custo + ",branch," + cd_filial);
		
		APPROVERS.reloadApprovers();
		APPROVERS.loadGenericApprovers();
		
	}
	
	else if (item.inputId == "funcionarios"){
		
		$('#tb_historico_salarial tbody tr').remove();
		
		var data_admissao, dia, mes, ano, data_admissao_formatada;
		var nome_centro_custo;
		
		data_admissao = item.RA_ADMISSA;
		nome_centro_custo = $("#nm_centro_custo");
				
		ano = data_admissao.substring(0, 4);
		mes = data_admissao.substring(4, 6);
		dia = data_admissao.substring(6, 8);
		
		data_admissao_formatada = dia + "/" + mes + "/" + ano;
		
		
		const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 3 }
		const formatNumber = new Intl.NumberFormat('pt-BR', options)
		let salario = item.RA_SALARIO;
		let salario_formatado = formatNumber.format(salario);
		
		
		$("#nr_registro").val(item.RA_MAT);
		$("#dt_admissao").val(data_admissao_formatada);
		$("#filial").val(item.RA_FILIAL);
		$("#empresa_situacao_atual").val((item.RA_FILIAL));
		$("#empresa_situacao_proposta").val((item.RA_FILIAL));
		$("#salario_situacao_atual").val(salario_formatado);
		
		
		//Consulta dataset protheus_cargos com base do codigo de cargo do funcionario acima
		var filial = (item.RA_FILIAL.substring(0,2));
		let constraints = [];
		constraints.push(DatasetFactory.createConstraint("branch", filial, null, ConstraintType.MUST));
		constraints.push(DatasetFactory.createConstraint("Q3_CARGO", item.RA_CARGO, null, ConstraintType.MUST));
		DatasetFactory.getDataset("protheus_cargos", null, constraints, null, {
			success : function(data) {
				if(data != null && data.values.length > 0) {
					
					$("#cargo_atual_situacao_atual").val(data.values[0]["Q3_CARGO"] + " - " + 
														 data.values[0]["Q3_DESCSUM"]);
				}
			}
		});
		
		//Consulta dataset protheus_departamentos com base do codigo de cargo do funcionario acima
		var filial = (item.RA_FILIAL.substring(0,2));
		
		let constraints_protheus_departamentos = [];	
		
		constraints_protheus_departamentos.push(DatasetFactory.createConstraint("branch", filial, null, ConstraintType.MUST));
		constraints_protheus_departamentos.push(DatasetFactory.createConstraint("QB_CC", item.RA_CC, null, ConstraintType.MUST));
		DatasetFactory.getDataset("protheus_departamentos", null, constraints_protheus_departamentos, null, {
			success : function(data) {
				if(data != null && data.values.length > 0) {
					
					$("#departamento_situacao_atual").val(data.values[0]["QB_CC"] + " - " + 
														  data.values[0]["QB_DESCRIC"]); 
					
					
				}
			}
		});
		
		//Consulta dataset protheus_centro_custo_funcionarios com base do codigo de cargo do funcionario acima para o centro de custo
		var filial = (item.RA_FILIAL);
		let constraints_protheus_centro_custo_funcionarios = [];
		
		
		constraints_protheus_centro_custo_funcionarios.push(DatasetFactory.createConstraint("branch", filial, null, ConstraintType.MUST));
		constraints_protheus_centro_custo_funcionarios.push(DatasetFactory.createConstraint("CTT_CUSTO", item.RA_CC, null, ConstraintType.MUST));
		DatasetFactory.getDataset("protheus_centro_custo_funcionarios", null, constraints_protheus_centro_custo_funcionarios, null, {
			success : function(data) {
				if(data != null && data.values.length > 0) {
					
					$("#centro_custo_situacao_atual").val(data.values[0]["CTT_CUSTO"] + " - " + 
														  data.values[0]["CTT_DESC01"]);
				}
			}
		});
		
		
		
		//Consulta dataset protheus_gestor_funcionario e colleague para obter o nome do gestor
		
		var filial = (item.RA_FILIAL);
		let constraints_protheus_gestor_funcionarios = [];
		let constraints_colleague = [];
		var login, nome;	
		
		constraints_protheus_gestor_funcionarios.push(DatasetFactory.createConstraint("branch", filial, null, ConstraintType.MUST));
		constraints_protheus_gestor_funcionarios.push(DatasetFactory.createConstraint("Z09_CC", item.RA_CC, null, ConstraintType.MUST));
		
		var dataset_protheus_gestor_funcionarios = DatasetFactory.getDataset
												 ("protheus_gestor_funcionarios", null, 
												 constraints_protheus_gestor_funcionarios, null) ;
		
		
				if(dataset_protheus_gestor_funcionarios != null && dataset_protheus_gestor_funcionarios.values.length > 0) {
					
					for(var i = 0; i < dataset_protheus_gestor_funcionarios.values.length; i++){
						login = dataset_protheus_gestor_funcionarios.values[0]["Z09_GERENT"];
						login = login.toLowerCase();
					}

					//CONSULTA O NOME DO GESTOR NA TABELA COLLEAGUE
					constraints_colleague.push(DatasetFactory.createConstraint("login", login, null, ConstraintType.MUST));

					var dataset_colleague = DatasetFactory.getDataset ("colleague", null, constraints_colleague, null);
					
						if(dataset_colleague != null && dataset_colleague.values.length > 0){

							for(var j = 0; j < dataset_colleague.values.length; j++){

								if(login == dataset_colleague.values[j].login){
									
									nome = dataset_colleague.values[j].colleagueName;
									nome = nome.toUpperCase();

								}

							}

						}

				}

				$("#gestor_situacao_atual").val(nome); 
		

		//preencher tabela tb_historico_salarial		 
		var filial = (item.RA_FILIAL);
		var filial_ = '';
		var tabela_X5 = "41";
		var data_alteracao, dia, mes, ano, data_alteracao_formatada;
		var tipo_alteracao_salarial, desc_tipo_alteracao_salarial, funcao, desc_funcao;
		var valor_salario, valor_salario_formatado;
		let constraints_protheus_historico_salarial = [];
		let constraints_protheus_historico_salarial_valores = [];
		let constraints_protheus_descricao_historico_salarial = [];
			
		constraints_protheus_historico_salarial.push(DatasetFactory.createConstraint("branch", filial, null, ConstraintType.MUST));
		constraints_protheus_historico_salarial.push(DatasetFactory.createConstraint("R7_MAT", item.RA_MAT, null, ConstraintType.MUST));
		
		var dataset_protheus_historico_salarial = DatasetFactory.getDataset
												("protheus_historico_salarial", null, 
												 constraints_protheus_historico_salarial, null);
		
				if(dataset_protheus_historico_salarial != null && dataset_protheus_historico_salarial.values.length > 0) {
					
					for(var i = 0; i < dataset_protheus_historico_salarial.values.length; i++){
						
						data_alteracao = dataset_protheus_historico_salarial.values[i].R7_DATA;
						funcao = dataset_protheus_historico_salarial.values[i].R7_FUNCAO;
						desc_funcao = dataset_protheus_historico_salarial.values[i].R7_DESCFUN;
						tipo_alteracao_salarial = dataset_protheus_historico_salarial.values[i].R7_TIPO;

						//CONSULTA NOME DO TIPO DA DESCRIÇÃO DO HISTÓRICO SALARIAL
						constraints_protheus_descricao_historico_salarial.push(DatasetFactory.createConstraint("branch", filial_, null, ConstraintType.MUST));
						constraints_protheus_descricao_historico_salarial.push(DatasetFactory.createConstraint("R7_TIPO", tipo_alteracao_salarial, null, ConstraintType.MUST));
						constraints_protheus_descricao_historico_salarial.push(DatasetFactory.createConstraint("NUM_TABELA_X5", tabela_X5, null, ConstraintType.MUST));
		
						var dataset_protheus_descricao_historico_salarial = DatasetFactory.getDataset
												("protheus_descricao_historico_salarial", null, 
												 constraints_protheus_descricao_historico_salarial, null);

							if(dataset_protheus_descricao_historico_salarial != null && dataset_protheus_descricao_historico_salarial.values.length > 0) {
								
								for(var c = 0; c < dataset_protheus_descricao_historico_salarial.values.length; c++){

									if (tipo_alteracao_salarial == dataset_protheus_descricao_historico_salarial.values[c].X5_CHAVE){

										desc_tipo_alteracao_salarial = dataset_protheus_descricao_historico_salarial.values[c].X5_DESCRI;

									}
									
								}

							}

						//CONSULTA VALOR DO SALARIO
						constraints_protheus_historico_salarial_valores.push(DatasetFactory.createConstraint("branch", filial, null, ConstraintType.MUST));
						constraints_protheus_historico_salarial_valores.push(DatasetFactory.createConstraint("R3_MAT", item.RA_MAT, null, ConstraintType.MUST));
						constraints_protheus_historico_salarial_valores.push(DatasetFactory.createConstraint("R3_DATA", data_alteracao, null, ConstraintType.MUST));

						var dataset_protheus_historico_salarial_valores = DatasetFactory.getDataset
																			("protheus_historico_salarial_valores", null, 
						 													constraints_protheus_historico_salarial_valores, null);


								if(dataset_protheus_historico_salarial_valores != null && dataset_protheus_historico_salarial_valores.values.length > 0) {

									for(var j = 0; j < dataset_protheus_historico_salarial_valores.values.length; j++){

										if(data_alteracao == dataset_protheus_historico_salarial_valores.values[j].R3_DATA &&
											item.RA_MAT == dataset_protheus_historico_salarial_valores.values[j].R3_MAT){
											
												valor_salario = dataset_protheus_historico_salarial_valores.values[j].R3_VALOR;
												valor_salario_formatado = formatNumber.format(valor_salario);

										}
									}
								}

						ano = data_alteracao.substring(0, 4);
						mes = data_alteracao.substring(4, 6);
						dia = data_alteracao.substring(6, 8);

						data_alteracao_formatada = dia + "/" + mes + "/" + ano;
							
						var linha = wdkAddChild('tb_historico_salarial');

			        	$("#dt_hist_sal_data___" + linha).val(data_alteracao_formatada);
						$("#nm_hist_sal_funcao___" + linha).val(funcao + ' - ' + desc_funcao);
						$("#vl_hist_sal_salario___" + linha).val(valor_salario_formatado);
						$("#nm_hist_sal_descricao___" + linha).val(tipo_alteracao_salarial + ' - ' + desc_tipo_alteracao_salarial);

					}
				}
			//}
		//});
	}
}

//Limpa opções do datatable caso ocorra uma nova pesquisa
/*function limpa_datatable(tb_historico_salarial)
{
   $(tb_historico_salarial + ' tbody tr').not(':first').each(function(count,tr){ 
      fnWdkRemoveChild($(this).find('i')[0]);
     });
}*/	

function removedZoomItem(item) {
	if(item.inputId == "filial") {
		$("#cd_empresa").val("");
		$("#cd_filial").val("");
		
		ZOOMS.clear("cd_centro_custo");
		
		//prepareSecurityPayableZoomList();
		//prepareCostCenterZoomList();
		//prepareNatureZoomList();
		
		//ZOOMS.reloadSupplierZoom();
	}
	else if(item.inputId == "cd_centro_custo") {
		$("#nm_centro_custo").val("");
		$("#funcionarios").val("");
		
	//	ZOOMS.clear("cd_conta_contabil");
		
		APPROVERS.clearCostCenterApprovers();
		APPROVERS.clearGenericApprovers();
	}
	else if(item.inputId == "funcionarios") {
		$("#salario_situacao_atual").val("");
	}
	/*else if(item.inputId == "cd_conta_contabil") {
		$("#ds_conta_contabil").val("");
	}
	else if(item.inputId == "fornecedor") {
		$("#cd_fornecedor").val("");
		$("#lj_fornecedor").val("");
		$("#cgc_fornecedor").val("");
		$("#nm_razao_social").val("");
		$("#nm_banco").val("");
		$("#cd_agencia").val("");
		$("#cd_conta").val("");
		
		prepareSecurityPayableZoomList();
	}*/ 
}




/*
function prepareSecurityPayableZoomList(idx){
	let fornecedor = $('#cd_fornecedor').val();
	let filial = $('#cd_filial').val();
	
	let arr = (idx != undefined && idx != null) ? [idx]
		: UTILS.getChildrenIndexes("tbTitulos"); 
	
	for(var i in arr){
		//Apenas títulos não baixados com saldo > 0
		reloadZoomFilterValues("titulo___"+arr[i] //AND E2_TIPO='TX'
				, `queryAddWhere,E2_BAIXA='' AND E2_SALDO>0  AND (E2_PREFIXO = 'EIC' OR E2_PREFIXO = 'EEC') AND E2_FORNECE='${fornecedor}',branch,${filial}`);
	}
}*/


/*function prepareCostCenterZoomList(idx){
	let filial = $('#cd_filial').val();
	
	let arr = (idx != undefined && idx != null) ? [idx]
		: UTILS.getChildrenIndexes("tbTitulos"); 
	
	for(var i in arr){
		ZOOMS.executeQuandoPronto("tit_centro_custo___"+arr[i], function(){
			reloadZoomFilterValues("tit_centro_custo___"+arr[i]
					, `cd_matricula,${CONTEXT.USER},cd_filial,${filial}`);
		});
	}
	console.warn("TODO");
};
*/

/*function prepareNatureZoomList(idx){
	let filial = $('#cd_filial').val();
	
	let arr = (idx != undefined && idx != null) ? [idx]
		: UTILS.getChildrenIndexes("tbTitulos"); 
	
	for(var i in arr){
		ZOOMS.executeQuandoPronto("tit_natureza___"+arr[i], function(){
			reloadZoomFilterValues("tit_natureza___"+arr[i]
					, `branch,${filial}`);
		});
	}
};*/


/*function getCostCenter(idx, id){
	if(id == null || id.trim() == "") {
		console.info("getCostCenter - ID centro custo vazio");
		return false;
	}
	
	let filial = $('#cd_filial').val();
	let constraints = [];
	constraints.push(DatasetFactory.createConstraint("branch", filial, null, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("queryAddWhere", `CTT_CUSTO='${id}'`, null, ConstraintType.MUST));
	DatasetFactory.getDataset("protheus_centro_custo", null, constraints, null, {
		success : function(data) {
			if(data != null && data.values.length > 0) {
				let row = data.values[0];
				window["tit_centro_custo___"+idx].setValue({"CodCC": id,"NomeCC": row.CTT_DESC01});
			}
		}, error : function(err) {
			console.error("Erro ao consultar centro de custo: " + id, err);
		}
	});
}*/

/*function getPaymentNature(idx, id){
	let filial = $('#cd_filial').val();
	let constraints = [];
	constraints.push(DatasetFactory.createConstraint("branch", filial, null, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("queryAddWhere", `ED_CODIGO='${id}'`, null, ConstraintType.MUST));
	DatasetFactory.getDataset("protheus_natureza", null, constraints, null, {
		success : function(data) {
			if(data != null && data.values.length > 0) {
				let row = data.values[0];
				window["tit_natureza___"+idx].setValue({"ED_CODIGO": id,"ED_DESCRIC": row.ED_DESCRIC});
			}
		}, error : function(err) {
			console.error("Erro ao consultar natureza: " + id, err);
		}
	});
}*/

//ZOOMS.prepareCostCenterZoom = function(){
//	let branch = $("#cd_filial").val();
//	reloadZoomFilterValues("cd_centro_custo", 'cd_matricula,'+CONTEXT.USER+',cd_filial,'+branch);
//}

//ZOOMS.reloadSupplierZoom = function(){
//	let cd_empresa = $('#cd_empresa').val();
//	reloadZoomFilterValues("funcionarios", "branch," + cd_empresa);
//}

/*ZOOMS.reloadFuncionarios = function(){
	let cd_empresa = $('#cd_empresa').val();
	let branch = $("#cd_filial").val();
	let cod_centro_custo = item.CodCC
	reloadZoomFilterValues("funcionarios", "branch," + cd_empresa, "centro_custo" + cod_centro_custo);
}*/

