function enableFields(form) {
	var CURRENT_STATE = getValue("WKNumState");
	var fieldsEnabled = [];
	var fieldsDisabled = [];

	fieldsDisabled.push("rd_aprov_documentos", "ds_obs_documentos",
						"rd_aprov_credito_cobranca", "ds_obs_credito_cobranca",
						"rd_aprov_gerente_locacao", "ds_obs_gerente_locacao",
						"rd_aprov_gerente_negocios", "ds_obs_gerente_negocios",
						"rd_aprov_diretor_comercial", "ds_obs_diretor_comercial",
						"rd_aprov_juridico","ds_obs_juridico");
						
	
	console.log("CURRENT_STATE!: " + CURRENT_STATE);
	console.log("Activity.ZERO!: " + Activity.ABERTURA);
	console.log("Activity.INICIO!: " + Activity.INICIO);
						
	if (CURRENT_STATE != Activity.ABERTURA && CURRENT_STATE != Activity.INICIO) {
			
		if (CURRENT_STATE == Activity.AVALIAR_DOCUMENTOS) {
			fieldsEnabled.push("ds_obs_documentos");
		}
		if (CURRENT_STATE == Activity.AVALIAR_CREDITO_COBRANCA) {
			fieldsEnabled.push("ds_obs_credito_cobranca");
		}
		if (CURRENT_STATE == Activity.AVALIAR_GERENTE_LOCACAO) {
			fieldsEnabled.push("ds_obs_gerente_locacao");
		}
		if (CURRENT_STATE == Activity.AVALIAR_GERENTE_NEGOCIOS) {
			fieldsEnabled.push("ds_obs_gerente_negocios");
		}
		if (CURRENT_STATE == Activity.AVALIAR_DIRETOR_COMERCIAL) {
			fieldsEnabled.push("ds_obs_diretor_comercial");	
		}
		if (CURRENT_STATE == Activity.AVALIAR_JURIDICO) {
			fieldsEnabled.push("ds_obs_juridico");
		}
		
		//Bloqueia todos os campos quando nao for inicio
		fieldsDisabled.push("nm_filial");	
		fieldsDisabled.push("cd_centro_custo");	
		fieldsDisabled.push("A1_COD");
		fieldsDisabled.push("A1_NOME");
		fieldsDisabled.push("A1_CGC");
		fieldsDisabled.push("A1_PESSOA");
		fieldsDisabled.push("A1_NREDUZ");
		fieldsDisabled.push("nome_representante");	
		fieldsDisabled.push("nacionalidade_representante");	
		fieldsDisabled.push("profissao_representante");	
		fieldsDisabled.push("estado_civil_representante");	
		fieldsDisabled.push("rg_representante");	
		fieldsDisabled.push("cpf_representante");	
		fieldsDisabled.push("endereco_representante");	
		fieldsDisabled.push("cep_representante");
		fieldsDisabled.push("email_representante");
		fieldsDisabled.push("caucao");	
		fieldsDisabled.push("un_vigencia");	
		fieldsDisabled.push("vigencia");	
		fieldsDisabled.push("vencimento_primeira_parcela");	
		fieldsDisabled.push("nm_forma_pagamento");	
		fieldsDisabled.push("tipo_contrato");	
		fieldsDisabled.push("observacoes");		
		
		var indexes = form.getChildrenIndexes("tb_itens_locacao");
    	for (var i = 0; i < indexes.length; i++) {
    		fieldsDisabled.push("cd_produto_estoque___" + indexes[i]);
    		fieldsDisabled.push("nm_modelo_produto___" + indexes[i]);
    		fieldsDisabled.push("quantidade___" + indexes[i]);
    		fieldsDisabled.push("chassi___" + indexes[i]);
    		fieldsDisabled.push("ano_modelo_fabricacao___" + indexes[i]);
    		fieldsDisabled.push("peso___" + indexes[i]);
    		fieldsDisabled.push("prazo_garantia___" + indexes[i]);
    		fieldsDisabled.push("valor_nf___" + indexes[i]);
    		fieldsDisabled.push("valor_produto___" + indexes[i]);
    		fieldsDisabled.push("frete___" + indexes[i]);
    		fieldsDisabled.push("prazo_entrega___" + indexes[i]);
    		fieldsDisabled.push("local_entrega_tecnica___" + indexes[i]);
    		fieldsDisabled.push("local_retirada___" + indexes[i]);
    		fieldsDisabled.push("vl_locacao_mensal___" + indexes[i]);
    		fieldsDisabled.push("comissao___" + indexes[i]);
    		fieldsDisabled.push("percentual_locacao___" + indexes[i]);
    		fieldsDisabled.push("observacao___" + indexes[i]);
    	}
	}
	
	//Todos auxiliares devem estar habilitados
	disableFieldList(form, fieldsDisabled);
	enableFieldList(form, fieldsEnabled);
}

function disableAllFields(form) {
	var fields = form.getCardData();
	var keys = fields.keySet().toArray();
	for (var k in keys) {
		var field = keys[k];
		form.setEnabled(field, false);
	}
}

function disableFieldList(form, fields) {
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i], false);
	}
}

function enableFieldList(form, fields) {
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i], true);
	}
}