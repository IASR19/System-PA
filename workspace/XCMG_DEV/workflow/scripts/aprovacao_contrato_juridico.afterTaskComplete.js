function afterTaskComplete(colleagueId,nextSequenceId,userList){
var sequenceId = getValue("WKNumState");
	
	log.info("#sequenceId: "+sequenceId);
	log.info("#colleagueId: "+colleagueId);
	log.info("#nextSequenceId: "+nextSequenceId);
	log.info("#userList: "+userList);
	
	
	if(sequenceId == Activity.AVALIAR_GER_AREA && nextSequenceId == Activity.AVALIAR_DIR_AREA){
		hAPI.setCardValue("rd_aprov_gerente_area","Aprovado");
		hAPI.setCardValue("aux_aprov_gerente_area","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIR_AREA && nextSequenceId == Activity.AVALIAR_JURIDICO){
		hAPI.setCardValue("rd_aprov_diretor_area","Aprovado");
		hAPI.setCardValue("aux_aprov_diretor_area","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_JURIDICO && nextSequenceId == Activity.AVALIAR_CONTROLADORIA){
		hAPI.setCardValue("rd_aprov_advogado","Aprovado");
		hAPI.setCardValue("aux_aprov_juridico","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_CONTROLADORIA && nextSequenceId == Activity.AVALIAR_GER_FINANCEIRO){
		hAPI.setCardValue("rd_aprov_controladoria","Aprovado");
		hAPI.setCardValue("aux_aprov_controladoria","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_GER_FINANCEIRO && nextSequenceId == Activity.AVALIAR_DIR_FINANCEIRO){
		hAPI.setCardValue("rd_aprov_ger_fin","Aprovado");
		hAPI.setCardValue("aux_aprov_gerente_financeiro","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIR_FINANCEIRO && nextSequenceId == Activity.AVALIAR_PRESIDENTE){
		hAPI.setCardValue("rd_aprov_diretor_financeiro","Aprovado");
		hAPI.setCardValue("aux_aprov_diretor_financeiro","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_PRESIDENTE && nextSequenceId == Activity.CONFERENCIA_JURIDICA){
		hAPI.setCardValue("rd_aprov_presidente","Aprovado");
		hAPI.setCardValue("aux_aprov_presidente","Aprovado");
	}
	
	
	//Quando reprovado atualiza campos se caso usuario colocar errado
	
	if(sequenceId == Activity.AVALIAR_GER_AREA && nextSequenceId == Activity.INICIO){
		hAPI.setCardValue("rd_aprov_gerente_area","Reprovado");
		hAPI.setCardValue("aux_aprov_gerente_area","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIR_AREA && nextSequenceId == Activity.INICIO){
		hAPI.setCardValue("rd_aprov_diretor_area","Reprovado");
		hAPI.setCardValue("aux_aprov_diretor_area","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_JURIDICO && nextSequenceId == Activity.INICIO){
		hAPI.setCardValue("rd_aprov_advogado","Reprovado");
		hAPI.setCardValue("aux_aprov_juridico","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_JURIDICO && nextSequenceId == Activity.SOLICITAR_PARECER){
		hAPI.setCardValue("rd_aprov_advogado","Reprovado");
		hAPI.setCardValue("aux_aprov_juridico","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_CONTROLADORIA && nextSequenceId == Activity.INICIO){
		hAPI.setCardValue("rd_aprov_controladoria","Reprovado");
		hAPI.setCardValue("aux_aprov_controladoria","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_GER_FINANCEIRO && nextSequenceId == Activity.INICIO){
		hAPI.setCardValue("rd_aprov_ger_finan","Reprovado");
		hAPI.setCardValue("aux_aprov_gerente_financeiro","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIR_FINANCEIRO && nextSequenceId == Activity.INICIO){
		hAPI.setCardValue("rd_aprov_diretor_financeiro","Reprovado");
		hAPI.setCardValue("aux_aprov_diretor_financeiro","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_PRESIDENTE && nextSequenceId == Activity.INICIO){
		hAPI.setCardValue("rd_aprov_presidente","Reprovado");
		hAPI.setCardValue("aux_aprov_presidente","Reprovado");
	}
}