function enableFields(form) {
	var CURRENT_STATE = getValue("WKNumState");
	var fieldsEnabled = [];
	var fieldsDisabled = [];

	fieldsDisabled.push("rd_aprov_gerente_area", "ds_obs_gerente_area",
						"rd_aprov_diretor_area", "ds_obs_diretor_area",
						"rd_aprov_advogado","ds_obs_advogado",
						"rd_aprov_controladoria", "ds_obs_controladoria",
						"rd_aprov_ger_fin", "ds_obs_gerente_financeiro",
						"rd_aprov_diretor_financeiro", "ds_obs_diretor_financeiro",
						"rd_aprov_presidente", "ds_obs_presidente");
						
if (CURRENT_STATE != Activity.ZERO && CURRENT_STATE != Activity.INICIO) {

		fieldsDisabled.push("filial");
		fieldsDisabled.push("cd_centro_custo");
		fieldsDisabled.push("fornecedor");
		fieldsDisabled.push("tipo_contrato");
		fieldsDisabled.push("valor_total_contrato");
		fieldsDisabled.push("inicio_contrato");
		fieldsDisabled.push("fim_contrato");
		fieldsDisabled.push("garantia");
		fieldsDisabled.push("nm_forma_pagamento");
		fieldsDisabled.push("seguro");
		fieldsDisabled.push("valor_pagamento");
		fieldsDisabled.push("tipo_ass_contrato");
		fieldsDisabled.push("nm_contrato_obra");
	

		if (CURRENT_STATE == Activity.AVALIAR_GER_AREA) {
			fieldsEnabled.push("ds_obs_gerente_area");
		}
		if (CURRENT_STATE == Activity.AVALIAR_DIR_AREA) {
			fieldsEnabled.push("ds_obs_diretor_area");
		}
		if (CURRENT_STATE == Activity.AVALIAR_JURIDICO) {
			fieldsEnabled.push("ds_obs_advogado");
		}
		else if (CURRENT_STATE == Activity.AVALIAR_CONTROLADORIA) {
			fieldsEnabled.push("ds_obs_controladoria");
		}
		else if (CURRENT_STATE == Activity.AVALIAR_GER_FINANCEIRO) {
			fieldsEnabled.push("ds_obs_gerente_financeiro");	
		}
		else if (CURRENT_STATE == Activity.AVALIAR_DIR_FINANCEIRO) {
			fieldsEnabled.push("ds_obs_diretor_financeiro");
		}
		else if (CURRENT_STATE == Activity.AVALIAR_PRESIDENTE) {
			fieldsEnabled.push("ds_obs_presidente");
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