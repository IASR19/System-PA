function enableFields(form) {
	var activity = getValue("WKNumState");
	var fieldsEnabled = [];
	var fieldsDisabled = [];
	
	fieldsDisabled.push("rd_aprov_gerente_area", "ds_obs_gerente_area",
						"rd_aprov_financeiro", "ds_obs_aprov_financeiro","ds_obs_aprovador_financeiro",
						"rd_aprov_controladoria", "ds_obs_controladoria",
						"rd_aprov_diretor_geral","ds_obs_diretor_geral",
						"rd_aprov_aprovador_financeiro","rd_aprov_diretor_financeiro", "ds_obs_diretor_financeiro",
						"rd_aprov_presidencia", "ds_obs_presidencia",
						"rd_lancado","ds_obs_lancar_nota");
	

	//Títulos são manipulados apenas na atividade de abertura.
	if(activity == Activity.ABERTURA || activity == Activity.INICIO) {
		
		fieldsDisabled.push("rd_lancado", "ds_obs_lancar_nota",
							"rd_aprov_gerente_area", "ds_obs_gerente_area",
							"rd_aprov_direto_area", "ds_obs_diretor_area",
							"rd_aprov_controladoria", "ds_obs_controladoria",
							"rd_aprov_gerente_financeiro", "ds_obs_gerente_financeiro",
							"rd_aprov_diretor_financeiro", "ds_obs_diretor_financeiro",
							"rd_aprov_presidencia", "ds_obs_presidencia",
							"rd_aprov_financeiro", "ds_obs_aprov_financeiro","ds_obs_aprovador_financeiro",
							"rd_aprov_diretor_geral","ds_obs_diretor_geral");
		
		var indexes = form.getChildrenIndexes("tbTitulos");
		for (var i = 0; i < indexes.length; i++) {
			fieldsDisabled.push("titulo___" + indexes[i]);
			fieldsDisabled.push("tit_dt_emissao___" + indexes[i]);
			fieldsDisabled.push("tit_dt_vencimento___" + indexes[i]);
			fieldsDisabled.push("tit_centro_custo___" + indexes[i]);
			fieldsDisabled.push("tit_natureza___" + indexes[i]);
			fieldsDisabled.push("tit_vl_original___" + indexes[i]);
			fieldsDisabled.push("tit_vl_juros___" + indexes[i]);
			fieldsDisabled.push("tit_vl_multa___" + indexes[i]);
		}

	}else if(activity == Activity.CONFERENCIA_FINANCEIRO){
		fieldsEnabled.push("ds_obs_aprovador_financeiro", "aux_aprov_aprovador_financeiro");
		disableAllFields(form);
	}else if(activity == Activity.AVALIAR_DIRETOR_GERAL){
		fieldsEnabled.push("ds_obs_diretor_geral", "aux_aprov_diretor_geral");
		disableAllFields(form);
	}else if(activity == Activity.AVALIAR_CONTROLADORIA){
		fieldsEnabled.push("ds_obs_controladoria",  "aux_aprov_controladoria" );
		disableAllFields(form);
	}else if(activity == Activity.AVALIAR_GERENTE_FINANCEIRO){
		fieldsEnabled.push("ds_obs_diretor_geral", "aux_aprov_diretor_geral");
		disableAllFields(form);
	}else if(activity == Activity.AVALIAR_DIRETOR_FINANCEIRO){
		fieldsEnabled.push("ds_obs_diretor_financeiro", "aux_aprov_diretor_financeiro");
		disableAllFields(form);
	}else if(activity == Activity.AVALIAR_PRESIDENTE){
		fieldsEnabled.push("ds_obs_presidencia", "aux_aprov_presidencia");
		disableAllFields(form);
	}else if (activity == Activity.DEFINIR_CONTA_PA) {
		fieldsEnabled.push("rd_aprov_financeiro", "ds_obs_aprov_financeiro");
	}
	
	if (activity != Activity.ZERO && activity != Activity.INICIO){
		fieldsDisabled.push("filial");
		fieldsDisabled.push("cd_centro_custo");
		fieldsDisabled.push("cd_conta_contabil");
		fieldsDisabled.push("ds_descricao");
		fieldsDisabled.push("fornecedor");
		fieldsDisabled.push("nm_forma_pagamento");
		fieldsDisabled.push("ds_outras_informacoes");
		fieldsDisabled.push("ds_justificativa_politica");
	}
	
	//Todos auxiliares devem estar habilitados
	fieldsEnabled.push("aux_aprov_gerente_area");
	fieldsEnabled.push("aux_aprov_aprovador_financeiro");
	fieldsEnabled.push("aux_aprov_controladoria" );
	fieldsEnabled.push("aux_aprov_diretor_geral");
	fieldsEnabled.push("aux_aprov_diretor_financeiro");
	fieldsEnabled.push("aux_aprov_presidencia");
	fieldsEnabled.push("aux_lancado");

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

