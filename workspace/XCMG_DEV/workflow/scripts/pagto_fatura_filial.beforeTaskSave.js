function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var sequenceId = getValue("WKNumState");
	
	if(sequenceId == Activity.ABERTURA || sequenceId == Activity.INICIO){
		var attachments = hAPI.listAttachments();
		var hasAttachment = (attachments != null && attachments.size() >= 1);
		
		log.info("pagamento_fatura.beforeTaskSave");
		log.info(attachments);
		log.info(hasAttachment);
		
		if (!hasAttachment) {
			var erro = "Atenção! 注意 ! Não esqueceça de adicionar os anexos";		
			throw erro;
	    }
		
	}
	
}