function beforeSendData(customFields,customFacts){
	
	/*
	Alterar fluxos para mandar:
		- data de pagamento/vencimento
		- centro de custo
		- valor total

		Padrao analytics
		- numero solicitação
		- data abertura
		- solicitante
		- responsavel tarefa aprovação
	*/
	
	
	log.info("teste_analytics dt_pagamento = " + hAPI.getCardValue("dt_pagamento")+'');
	log.info("teste_analytics nm_centro_custo = " + hAPI.getCardValue("nm_centro_custo"));

		
	var vl_total_aux = hAPI.getCardValue("vl_total").replace(".","").replace(".","").replace(",",".");
	
		
    customFields[0] = hAPI.getCardValue("dt_pagamento").toString();    
	customFields[1] = hAPI.getCardValue("nm_centro_custo").toString();
    customFields[2] = hAPI.getCardValue("vl_total").toString();
 
	
	customFacts[0] = 999.99;
	
	customFacts[1]=java.lang.Double.parseDouble(vl_total_aux);
	
	
	
    log.info("teste_analytics vl_total = " + hAPI.getCardValue("vl_total")+'');
    
    /*
    customFacts[0]=10.53;
    customFacts[1]=java.lang.Double.parseDouble(hAPI.getCardValue("campo_valor"));
	*/
	
}
