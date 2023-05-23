function enableFields(form) {
	var activity = getValue("WKNumState");
	var fieldsEnabled = [];
	var fieldsDisabled = [];
	
	fieldsDisabled.push("rd_aprov_gerente_area",
						"rd_aprov_aprovador_financeiro",
						"rd_aprov_controladoria",
						"rd_aprov_diretor_geral",
						"rd_aprov_diretor_financeiro",
						"rd_aprov_presidencia",
						"rd_lancado");

	if(activity == Activity.ABERTURA || activity == Activity.INICIO) {
		fieldsDisabled.push("rd_aprov_gerente_area","ds_obs_gerente_area",
							"rd_aprov_aprovador_financeiro","ds_obs_aprovador_financeiro",
							"rd_aprov_controladoria","ds_obs_controladoria",
							"rd_aprov_diretor_geral","ds_obs_diretor_geral",
							"rd_aprov_diretor_financeiro","ds_obs_diretor_financeiro",
							"rd_aprov_presidencia","ds_obs_presidencia",
							"rd_aprov_financeiro","ds_obs_aprov_financeiro","ds_obs_lancar_nota",														
							"nm_banco_xcmg","rd_lancado");
		
	}else if(activity == Activity.LANCAR_NOTA){
		fieldsEnabled.push("rd_lancado", "ds_obs_lancar_nota", "aux_lancado");
		disableAllFields(form);	
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
	}else if(activity == Activity.DEFINIR_CONTA_PA){
		fieldsEnabled.push("rd_aprov_financeiro", "ds_obs_aprov_financeiro");
		fieldsEnabled.push("nm_banco_xcmg", "cd_agencia_xcmg", "cd_digito_agencia");
		fieldsEnabled.push("cd_conta_xcmg", "cd_digito_conta");
		fieldsEnabled.push("cd_classdeb", "cd_classcred");
		disableAllFields(form);
	}else if(activity == Activity.VERIFICAR_SITUACAO){
		fieldsEnabled.push("nm_banco_xcmg", "cd_agencia_xcmg", "cd_digito_agencia");
		fieldsEnabled.push("cd_conta_xcmg", "cd_digito_conta", "cd_natureza");
		fieldsEnabled.push("cd_classdeb", "cd_classcred");
		disableAllFields(form);
	}else if(activity == Activity.AGUARDAR_VENCIMENTO){
		disableAllFields(form);
	}else if(activity == Activity.RECEBIDO_CONFERIDO){	
		disableAllFields(form);
	}
	
	//Todos auxiliares devem estar habilitados
	fieldsEnabled.push("aux_aprov_gerente_area");
	fieldsEnabled.push("aux_aprov_aprovador_financeiro");
	fieldsEnabled.push("aux_aprov_controladoria" );
	fieldsEnabled.push("aux_aprov_diretor_geral");
	fieldsEnabled.push("aux_aprov_diretor_financeiro");
	fieldsEnabled.push("aux_aprov_presidencia");
	fieldsEnabled.push("aux_lancado");
	
	disabledFieldList(form, fieldsDisabled);
	enabledFieldList(form, fieldsEnabled);
}

function disableAllFields(form) {
	var fields = form.getCardData();
	var keys = fields.keySet().toArray();
	for (var k in keys) {
		var field = keys[k];
		form.setEnabled(field, false);
	}
}

function disabledFieldList(form, fields) {
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i], false);
	}
}

function enabledFieldList(form, fields) {
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i], true);
	}
}