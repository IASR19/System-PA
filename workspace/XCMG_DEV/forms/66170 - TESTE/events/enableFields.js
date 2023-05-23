function enableFields(form) {
	var CURRENT_STATE = getValue("WKNumState");
	var currentUser = fluigAPI.getUserService().getCurrent();
	var fieldsEnabled = [];
	var fieldsDisabled = [];
	

	//disableFieldList(form, fieldsDisabled);
	//enableFieldList(form, fieldsEnabled);
	
	if (CURRENT_STATE != Activity.ZERO) {
		form.setValue('cd_requisitante', currentUser.getCode());
		form.setValue('lg_requisitante', currentUser.getLogin());
		form.setValue('nm_requisitante', currentUser.getFullName());
		form.setValue('dt_solicitacao', getCurrentDate('PT_BR'));
	}
	
	if (CURRENT_STATE != Activity.ZERO && CURRENT_STATE == Activity.INFRA ) {
		
		//form.setEnabled('#div_servico');
		$('#div_servico').show();
	}
	
	
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