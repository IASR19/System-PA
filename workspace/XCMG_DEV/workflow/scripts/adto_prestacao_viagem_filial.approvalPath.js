function approvalPath(currentState, nextState){
	if(currentState == Activity.CONFERENCIA_FINANCEIRO){
		var map = {};
		map[Activity.AVALIAR_CONTROLADORIA] = "Aprovado";
		map[Activity.GATEWAY_CORRIGIR] = "Reprovado";
		return map[nextState];
	}
	else if(currentState == Activity.AVALIAR_CONTROLADORIA){
		var map = {};
		map[Activity.AVALIAR_DIRETOR_GERAL] = "Aprovado";
		map[Activity.GATEWAY_CORRIGIR] = "Reprovado";
		return map[nextState];
	}
	else if(currentState == Activity.AVALIAR_DIRETOR_GERAL){
		var map = {};
		map[Activity.GATEWAY_ENVOLVE_DIRETOR_FINANCEIRO] = "Aprovado";
		map[Activity.GATEWAY_CORRIGIR] = "Reprovado";
		return map[nextState];
	}
	else if(currentState == Activity.AVALIAR_GERENTE_FINANCEIRO){
		var map = {};
		map[Activity.GATEWAY_ENVOLVE_DIRETOR_FINANCEIRO] = "Aprovado";
		map[Activity.GATEWAY_CORRIGIR] = "Reprovado";
		return map[nextState];
	}
	else if(currentState == Activity.AVALIAR_DIRETOR_FINANCEIRO){
		var map = {};
		map[Activity.GATEWAY_ENVOLVE_PRESIDENTE] = "Aprovado";
		map[Activity.GATEWAY_CORRIGIR] = "Reprovado";
		return map[nextState];
	}
	else if(currentState == Activity.AVALIAR_PRESIDENTE){
		var map = {};
		map[Activity.GATEWAY_PA] = "Aprovado";
		map[Activity.GATEWAY_CORRIGIR] = "Reprovado";
		return map[nextState];
	}
	return null;
}
