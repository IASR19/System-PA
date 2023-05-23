function afterProcessCreate(processId){
	hAPI.setCardValue("nr_solicitacao", processId);
	hAPI.setCardValue("nm_contrato", processId);
}