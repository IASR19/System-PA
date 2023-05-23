function displayFields(form, customHTML) {

    form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
    var activity = getValue("WKNumState");
    var mode = form.getFormMode();
    var currentUser = fluigAPI.getUserService().getCurrent();
	
	var date = getCurrentDate();
	var time = getCurrentTime();
	
	console.log("::::displayFields:::::");
	console.log(activity);
	console.log(mode);
	console.log(currentUser);
	console.log(Activity.LANCAR_NOTA);
	
	if(mode != "VIEW"){	
		console.log("diferente de view")
		if(activity == Activity.ABERTURA && isEmpty(form, "nm_requisitante")) {
			console.log("ABERTURA");
			form.setValue("nm_requisitante", currentUser.getFullName());
			form.setValue("cd_requisitante", currentUser.getCode());
			form.setValue('lg_requisitante', currentUser.getLogin());
			form.setValue("dt_solicitacao", date);
		}
		else if(activity == Activity.LANCAR_NOTA) {
			console.log("LANCAR_NOTA");
			form.setValue("nm_executor_lancar_nota", currentUser.getFullName());
			form.setValue("cd_executor_lancar_nota", currentUser.getCode());
			form.setValue("dt_lancar_nota", date);
		}
		else if(activity == Activity.DEFINIR_CONTA_PA) {
			console.log("DEFINIR_CONTA_PA");
			form.setValue("nm_executor_conf_financ", currentUser.getFullName());
			form.setValue("cd_executor_conf_financ", currentUser.getCode());
			form.setValue("dt_aprov_financeiro", date);
		}		
		
	}
	
	customHTML.append('<script type="text/javascript" >');
	customHTML.append('	let CONTEXT = {');
	customHTML.append('		"MODE": "' + form.getFormMode()	+ '"');	
	customHTML.append('		, "ACTIVITY": "' + activity + '"');
	customHTML.append('		, "PROCESS": "' + getValue("WKDef") + '"');
	customHTML.append('		, "PROCESS_TYPE": "PRINCIPAL"');
	customHTML.append('		, "USER": "' + currentUser.getLogin() + '"');
	customHTML.append('		, "USER_CODE": "' + currentUser.getCode() + '"');
	customHTML.append('		, "NAME_USER": "' + currentUser.getFullName() + '"');
	customHTML.append('	};');
	customHTML.append('</script>');
}