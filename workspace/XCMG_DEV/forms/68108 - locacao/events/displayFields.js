function displayFields(form, customHTML) {

    form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
    var activity = getValue("WKNumState");
    var mode = form.getFormMode();
    var currentUser = fluigAPI.getUserService().getCurrent();
	var date = getCurrentDate();
	var time = getCurrentTime();
	
	if(mode != "VIEW"){	
		if(activity == Activity.ABERTURA) {
			form.setValue("nm_requisitante", currentUser.getFullName());
			form.setValue("cd_requisitante", currentUser.getCode());
			form.setValue('lg_requisitante', currentUser.getLogin());
			form.setValue("dt_solicitacao", date);
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

function ehAdmin(usuario){
	return estaNoPapel("admin", usuario);
}

function estaNoPapel(papelAlvo, usuario){
	var papeis = usuario.getRoles();
	return (papeis == null || papeis.isEmpty()) 
		? false : papeis.contains(papelAlvo);
}