function enableFields(form) {
	var CURRENT_STATE = getValue("WKNumState");
	var fieldsEnabled = [];
	var fieldsDisabled = [];

	fieldsDisabled.push("rd_aprov_gerente_area", "ds_obs_aprov_gerente_area",
						"rd_aprov_diretor_area", "ds_obs_aprov_diretor_area",
						"rd_aprov_gerente_rh", "ds_obs_aprov_gerente_rh",
						"rd_aprov_diretor_rh", "ds_obs_aprov_diretor_rh",
						"rd_aprov_diretor_geral", "ds_obs_aprov_diretor_geral");
						
if (CURRENT_STATE != Activity.ZERO && CURRENT_STATE != Activity.INICIO) {

		fieldsDisabled.push("filial");
		fieldsDisabled.push("cd_centro_custo");

		if (CURRENT_STATE == Activity.AVALIAR_GERENTE_AREA) {
			fieldsEnabled.push("ds_obs_aprov_gerente_area");
		}
		if (CURRENT_STATE == Activity.AVALIAR_DIRETOR_AREA) {
			fieldsEnabled.push("ds_obs_aprov_diretor_area");
		}
		if (CURRENT_STATE == Activity.AVALIAR_GERENTE_RH) {
			fieldsEnabled.push("ds_obs_aprov_gerente_rh");
		}
		if (CURRENT_STATE == Activity.AVALIAR_DIRETOR_RH) {
			fieldsEnabled.push("ds_obs_aprov_diretor_rh");
		}
		if (CURRENT_STATE == Activity.AVALIAR_DIRETOR_GERAL) {
			fieldsEnabled.push("ds_obs_aprov_diretor_geral");
		}
	}
	
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