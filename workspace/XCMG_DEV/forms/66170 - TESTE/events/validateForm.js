function validateForm(form) {	
	var msgError = "";
	
	var CURRENT_STATE = getValue('WKNumState');
	var NEXT_STATE = getValue("WKNextState");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");
	var POLICY = { NOK: "Fora política", OK: "Dentro política" };
    
    
	if (msgError != "") {
		throw msgError;
	}
}

function isEmpty(form, fieldname) {
	return ((form.getValue(fieldname) == null) 
			|| (form.getValue(fieldname) == undefined) 
			|| (form.getValue(fieldname).trim() == ""));
}