function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var activity = getValue("WKNumState");
	
	if(activity == Activity.ABERTURA || activity == Activity.INICIO)	
		hAPI.setCardValue("status_adiantamento","");

	
}