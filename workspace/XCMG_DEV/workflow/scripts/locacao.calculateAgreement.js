/****** 
** Enable customization script to change agreement calculation. 
** Input: 
**	stateId -> Current state, whose agreement percentage is being calculated. 
**	agreementData.get("currentPercentage") -> Current percentage, calculated by the workflow engine
**	agreementData.get("currentDestState") -> Current destination state. Zero, if process won't move
**	agreementData.get("currentDestUsers") -> Current destination users. Empty if process won't move
**/
function calculateAgreement(currentState, agreementData) {
	var NEXT_STATE = getValue("WKNextState");
	var currentDestState = agreementData.get("currentDestState"); 
	
	log.info(_log + " - calculateAgreement - currentState: " + currentState
		+ " - NEXT_STATE: " + NEXT_STATE
		+ " - currentDestState: " + currentDestState);
	
	if(!isApprovalActivity(currentState)) return;
	
	var userList = [];
	if(isApprovalActivity(NEXT_STATE)){
		var SCOPE = {
			MECANISM: "MECANISMO", ALL: "TODOS", ALL_FLUIG: "TODOS_FLUIG"
		}
		
		var constraints = [
			DatasetFactory.createConstraint("processo", _codigoProcesso, null, ConstraintType.MUST)
			, DatasetFactory.createConstraint("solicitacao", _solicitacao, null, ConstraintType.MUST)
			, DatasetFactory.createConstraint("atividade", NEXT_STATE, null, ConstraintType.MUST)
			, DatasetFactory.createConstraint("escopo", SCOPE.MECANISM, null, ConstraintType.MUST)
		];
		var dataset = DatasetFactory.getDataset("aprovadores", null, constraints, null);
		log.info(_log + " - calculateAgreement - ds: " + dataset);
		log.dir(dataset);
		if(dataset != null && dataset.rowsCount > 0){
			for(var i = 0; i < dataset.rowsCount; i++){
				userList.push(dataset.getValue(i, "cd_matricula"));
			}
		}
	}
	else{
		userList.push("System:Auto");
	}
	log.info(_log + " - calculateAgreement - NEXT_STATE: " + NEXT_STATE + " - userList: " + userList.join(";"));
	agreementData.put("currentPercentage", 100); 
	agreementData.put("currentDestState", NEXT_STATE); 
	agreementData.put("currentDestUsers", userList.join(","));
}