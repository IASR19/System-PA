function afterTaskComplete(colleagueId,nextSequenceId,userList){
var sequenceId = getValue("WKNumState");
	
	log.info("#sequenceId: "+sequenceId);
	log.info("#colleagueId: "+colleagueId);
	log.info("#nextSequenceId: "+nextSequenceId);
	log.info("#userList: "+userList);
	
	
	if(sequenceId == Activity.AVALIAR_DOCUMENTOS && nextSequenceId == Activity.AVALIAR_CREDITO_COBRANCA){
		hAPI.setCardValue("rd_aprov_documentos","Aprovado");
		hAPI.setCardValue("aux_aprov_documentos","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_CREDITO_COBRANCA && nextSequenceId == Activity.AVALIAR_GERENTE_LOCACAO){
		hAPI.setCardValue("rd_aprov_credito_cobranca","Aprovado");
		hAPI.setCardValue("aux_aprov_credito_cobranca","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_GERENTE_LOCACAO && nextSequenceId == Activity.AVALIAR_GERENTE_NEGOCIOS){
		hAPI.setCardValue("rd_aprov_gerente_locacao","Aprovado");
		hAPI.setCardValue("aux_aprov_gerente_locacao","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_GERENTE_NEGOCIOS && nextSequenceId == Activity.AVALIAR_DIRETOR_COMERCIAL){
		hAPI.setCardValue("rd_aprov_gerente_negocios","Aprovado");
		hAPI.setCardValue("aux_aprov_gerente_negocios","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_COMERCIAL && nextSequenceId == Activity.AVALIAR_JURIDICO){
		hAPI.setCardValue("rd_aprov_diretor_comercial","Aprovado");
		hAPI.setCardValue("aux_aprov_diretor_comercial","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_JURIDICO && nextSequenceId == Activity.FIM){
		hAPI.setCardValue("rd_aprov_juridico","Aprovado");
		hAPI.setCardValue("aux_aprov_juridico","Aprovado");
	}
	
	//Quando reprovado atualiza campos se caso usuario colocar errado
	
	if(sequenceId == Activity.AVALIAR_DOCUMENTOS && nextSequenceId == Activity.REPROVADO){
		hAPI.setCardValue("rd_aprov_documentos","Aprovado");
		hAPI.setCardValue("aux_aprov_documentos","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_CREDITO_COBRANCA && nextSequenceId == Activity.REPROVADO){
		hAPI.setCardValue("rd_aprov_credito_cobranca","Reprovado");
		hAPI.setCardValue("aux_aprov_credito_cobranca","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_GERENTE_LOCACAO && nextSequenceId == Activity.REPROVADO){
		hAPI.setCardValue("rd_aprov_gerente_locacao","Reprovado");
		hAPI.setCardValue("aux_aprov_gerente_locacao","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_GERENTE_NEGOCIOS && nextSequenceId == Activity.REPROVADO){
		hAPI.setCardValue("rd_aprov_gerente_negocios","Reprovado");
		hAPI.setCardValue("aux_aprov_gerente_negocios","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_COMERCIAL && nextSequenceId == Activity.REPROVADO){
		hAPI.setCardValue("rd_aprov_diretor_comercial","Reprovado");
		hAPI.setCardValue("aux_aprov_diretor_comercial","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_JURIDICO && nextSequenceId == Activity.SOLICITAR_PARECER){
		hAPI.setCardValue("rd_aprov_juridico","Reprovado");
		hAPI.setCardValue("aux_aprov_juridico","Reprovado");
	}
}