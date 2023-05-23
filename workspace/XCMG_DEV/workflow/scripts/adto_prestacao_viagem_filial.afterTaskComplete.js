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
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.AVALIAR_CONTROLADORIA && nextSequenceId == Activity.AVALIAR_DIRETOR_GERAL){
		hAPI.setCardValue("_rd_aprov_controladoria","Aprovado");
		hAPI.setCardValue("aux_aprov_controladoria","Aprovado");
	}
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.AVALIAR_DIRETOR_GERAL && nextSequenceId == Activity.GATEWAY_ENVOLVE_DIRETOR_FINANCEIRO){
		hAPI.setCardValue("_rd_aprov_diretor_geral","Aprovado");
		hAPI.setCardValue("aux_aprov_diretor_geral","Aprovado");
	}
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.AVALIAR_DIRETOR_FINANCEIRO && nextSequenceId == Activity.GATEWAY_ENVOLVE_PRESIDENTE){
		hAPI.setCardValue("_rd_aprov_diretor_financeiro","Aprovado");
		hAPI.setCardValue("aux_aprov_diretor_financeiro","Aprovado");
	}
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.AVALIAR_PRESIDENTE && nextSequenceId == Activity.GATEWAY_PA){
		hAPI.setCardValue("_rd_aprov_presidencia","Aprovado");
		hAPI.setCardValue("aux_aprov_presidencia","Aprovado");
	}
	
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.CONFERENCIA_FINANCEIRO && nextSequenceId == Activity.CORRIGIR){
		hAPI.setCardValue("_rd_aprov_aprovador_financeiro","Reprovado");
		hAPI.setCardValue("aux_aprov_aprovador_financeiro","Reprovado");
	}
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.AVALIAR_CONTROLADORIA && nextSequenceId == Activity.CORRIGIR){
		hAPI.setCardValue("_rd_aprov_controladoria","Reprovado");
		hAPI.setCardValue("aux_aprov_controladoria","Reprovado");
	}
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.AVALIAR_DIRETOR_GERAL && nextSequenceId == Activity.CORRIGIR){
		hAPI.setCardValue("_rd_aprov_diretor_geral","Reprovado");
		hAPI.setCardValue("aux_aprov_diretor_geral","Reprovado");
	}
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.AVALIAR_DIRETOR_FINANCEIRO && nextSequenceId == Activity.CORRIGIR){
		hAPI.setCardValue("_rd_aprov_diretor_financeiro","Reprovado");
		hAPI.setCardValue("aux_aprov_diretor_financeiro","Reprovado");
	}
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.AVALIAR_PRESIDENTE && nextSequenceId == Activity.CORRIGIR){
		hAPI.setCardValue("_rd_aprov_presidencia","Reprovado");
		hAPI.setCardValue("aux_aprov_presidencia","Reprovado");
	}
	
	/*
	ABERTURA: 0,
	INICIO: 4,
	LANCAR_NOTA: 162,
	CONFERENCIA_FINANCEIRO: 16,
	AVALIAR_CONTROLADORIA: 31,
	AVALIAR_DIRETOR_GERAL: 19,
	AVALIAR_DIRETOR_FINANCEIRO: 33,
	AVALIAR_PRESIDENTE: 35,
	DEFINIR_CONTA_PA: 89,
	SERVICE_TITULO_PAGAR: 65,
	SERVICE_TITULO_RECEBER: 57,
	VERIFICAR_SITUACAO: 69,
	SERVICE_TITULO_PAGAR: 65,
	RECEBIDO_CONFERIDO: 52,
	GATEWAY_ENVOLVE_DIRETOR_FINANCEIRO: 78,
	GATEWAY_ENVOLVE_PRESIDENTE: 43,
	GATEWAY_PA: 86,
	CORRIGIR: 94,
	FIM_PAGO: 40
	*/
	
}