function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var sequenceId = getValue("WKNumState");
	
	log.info("#sequenceId: "+sequenceId);
	log.info("#colleagueId: "+colleagueId);
	log.info("#nextSequenceId: "+nextSequenceId);
	log.info("#userList: "+userList);
	
	
	//Quando aprovado atualiza campos se caso usuario colocar errado
	if(sequenceId == Activity.LANCAR_NOTA && nextSequenceId == Activity.CONFERENCIA_FINANCEIRO){
		hAPI.setCardValue("_rd_lancado","Sim");
		hAPI.setCardValue("aux_lancado","Sim");
	}
	
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
	if(sequenceId == Activity.LANCAR_NOTA && nextSequenceId == Activity.GATEWAY_CORRIGIR){
		hAPI.setCardValue("_rd_lancado","Não");
		hAPI.setCardValue("aux_lancado","Não");
	}
	
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
	
	/*
	ABERTURA: 0,
	INICIO: 4,
	GATEWAY_ENVOLVE_FISCAL: 12,
	LANCAR_NOTA: 111,
	GATEWAY_LANCADO: 47,
	GATEWAY_CORRIGIR: 94,
	AVALIAR_GERENTE_AREA: 16,
	AVALIAR_DIRETOR_AREA: 19,
	GATEWAY_ENVOLVE_CONTROLADORIA: 21,
	AVALIAR_CONTROLADORIA: 31,
	AVALIAR_GERENTE_FINANCEIRO: 74,
	GATEWAY_ENVOLVE_DIRETOR_FINANCEIRO: 78,
	AVALIAR_DIRETOR_FINANCEIRO: 33,
	GATEWAY_ENVOLVE_PRESIDENTE: 43,
	AVALIAR_PRESIDENTE: 35,
    GATEWAY_PA: 86,
    DEFINIR_CONTA_PA: 89,
    SERVICE_TITULO_PAGAR: 65,
    SERVICE_TITULO_RECEBER: 57,
    VERIFICAR_SITUACAO: 69,
	AGUARDAR_VENCIMENTO: 82,
	RECEBIDO_CONFERIDO: 52,
	FIM_PAGO: 40
	*/
	
}