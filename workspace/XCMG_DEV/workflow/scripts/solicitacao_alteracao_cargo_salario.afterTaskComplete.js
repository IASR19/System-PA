function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var sequenceId = getValue("WKNumState");
	
	log.info("#sequenceId: "+sequenceId);
	log.info("#colleagueId: "+colleagueId);
	log.info("#nextSequenceId: "+nextSequenceId);
	log.info("#userList: "+userList);
	
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.AVALIAR_GERENTE_AREA && nextSequenceId == Activity.AVALIAR_DIRETOR_AREA){
		hAPI.setCardValue("_rd_aprov_gerente_area","Aprovado");
		hAPI.setCardValue("aux_aprov_gerente_area","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_AREA && nextSequenceId == Activity.AVALIAR_GERENTE_RH){
		hAPI.setCardValue("_rd_aprov_diretor_area","Aprovado");
		hAPI.setCardValue("aux_aprov_diretor_area","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_GERENTE_RH && nextSequenceId == Activity.AVALIAR_DIRETOR_RH){
		hAPI.setCardValue("_rd_aprov_gerente_rh","Aprovado");
		hAPI.setCardValue("aux_aprov_gerente_rh","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_RH && nextSequenceId == Activity.AVALIAR_DIRETOR_GERAL){
		hAPI.setCardValue("_rd_aprov_diretor_rh","Aprovado");
		hAPI.setCardValue("aux_aprov_diretor_rh","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_GERAL && nextSequenceId == Activity.FIM){
		hAPI.setCardValue("_rd_aprov_diretor_geral","Aprovado");
		hAPI.setCardValue("aux_aprov_diretor_geral","Aprovado");
	}
	
	//Quando reprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.AVALIAR_GERENTE_AREA && nextSequenceId == Activity.GATEWAY_CORRIGIR){
		hAPI.setCardValue("_rd_aprov_gerente_area","Reprovado");
		hAPI.setCardValue("aux_aprov_gerente_area","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_AREA && nextSequenceId == Activity.GATEWAY_CORRIGIR){
		hAPI.setCardValue("_rd_aprov_diretor_area","Reprovado");
		hAPI.setCardValue("aux_aprov_diretor_area","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_GERENTE_RH && nextSequenceId == Activity.GATEWAY_CORRIGIR){
		hAPI.setCardValue("_rd_aprov_gerente_rh","Reprovado");
		hAPI.setCardValue("aux_aprov_gerente_rh","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_RH && nextSequenceId == Activity.GATEWAY_CORRIGIR){
		hAPI.setCardValue("_rd_aprov_diretor_rh","Reprovado");
		hAPI.setCardValue("aux_aprov_diretor_rh","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_GERAL && nextSequenceId == Activity.GATEWAY_CORRIGIR){
		hAPI.setCardValue("_rd_aprov_diretor_geral","Reprovado");
		hAPI.setCardValue("aux_aprov_diretor_geral","Reprovado");
	}	
}