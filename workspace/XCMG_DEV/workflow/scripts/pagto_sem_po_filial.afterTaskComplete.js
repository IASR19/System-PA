function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var sequenceId = getValue("WKNumState");
	
	log.info("#sequenceId: "+sequenceId);
	log.info("#colleagueId: "+colleagueId);
	log.info("#nextSequenceId: "+nextSequenceId);
	log.info("#userList: "+userList);
	
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.CONFERENCIA_FINANCEIRO && nextSequenceId == Activity.AVALIAR_CONTROLADORIA){
		hAPI.setCardValue("_rd_aprov_aprovador_financeiro","Aprovado");
		hAPI.setCardValue("aux_aprov_aprovador_financeiro","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_CONTROLADORIA && nextSequenceId == Activity.AVALIAR_DIRETOR_GERAL){
		hAPI.setCardValue("_rd_aprov_controladoria","Aprovado");
		hAPI.setCardValue("aux_aprov_controladoria","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_GERAL && nextSequenceId == Activity.GATEWAY_ENVOLVE_DIRETOR_FINANCEIRO){
		hAPI.setCardValue("_rd_aprov_diretor_geral","Aprovado");
		hAPI.setCardValue("aux_aprov_diretor_geral","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_FINANCEIRO && nextSequenceId == Activity.GATEWAY_ENVOLVE_PRESIDENTE){
		hAPI.setCardValue("_rd_aprov_diretor_financeiro","Aprovado");
		hAPI.setCardValue("aux_aprov_diretor_financeiro","Aprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_PRESIDENTE && nextSequenceId == Activity.DEFINIR_CONTA_PA){
		hAPI.setCardValue("_rd_aprov_presidencia","Aprovado");
		hAPI.setCardValue("aux_aprov_presidencia","Aprovado");
	}
	
	
	//Quando reprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.CONFERENCIA_FINANCEIRO && nextSequenceId == Activity.GATEWAY_CORRIGIR){
		hAPI.setCardValue("_rd_aprov_aprovador_financeiro","Reprovado");
		hAPI.setCardValue("aux_aprov_aprovador_financeiro","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_CONTROLADORIA && nextSequenceId == Activity.GATEWAY_CORRIGIR){
		hAPI.setCardValue("_rd_aprov_controladoria","Reprovado");
		hAPI.setCardValue("aux_aprov_controladoria","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_GERAL && nextSequenceId == Activity.GATEWAY_CORRIGIR){
		hAPI.setCardValue("_rd_aprov_diretor_geral","Reprovado");
		hAPI.setCardValue("aux_aprov_diretor_geral","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_DIRETOR_FINANCEIRO && nextSequenceId == Activity.GATEWAY_CORRIGIR){
		hAPI.setCardValue("_rd_aprov_diretor_financeiro","Reprovado");
		hAPI.setCardValue("aux_aprov_diretor_financeiro","Reprovado");
	}
	
	if(sequenceId == Activity.AVALIAR_PRESIDENTE && nextSequenceId == Activity.GATEWAY_CORRIGIR){
		hAPI.setCardValue("_rd_aprov_presidencia","Reprovado");
		hAPI.setCardValue("aux_aprov_presidencia","Reprovado");
	}
	
}