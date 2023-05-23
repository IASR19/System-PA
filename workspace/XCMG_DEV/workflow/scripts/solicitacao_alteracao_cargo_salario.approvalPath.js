function approvalPath(currentState, nextState){
	if(currentState == Activity.AVALIAR_GERENTE_AREA){
		var map = {};
		map[Activity.AVALIAR_DIRETOR_AREA] = "Aprovado";
		map[Activity.GATEWAY_CORRIGIR] = "Reprovado";
		return map[nextState];
	}
	else if(currentState == Activity.AVALIAR_DIRETOR_AREA){
		var map = {};
		map[Activity.AVALIAR_GERENTE_RH] = "Aprovado";
		map[Activity.GATEWAY_CORRIGIR] = "Reprovado";
		return map[nextState];
	}
	else if(currentState == Activity.AVALIAR_GERENTE_RH){
		var map = {};
		map[Activity.AVALIAR_DIRETOR_RH] = "Aprovado";
		map[Activity.GATEWAY_CORRIGIR] = "Reprovado";
		return map[nextState];
	}
	else if(currentState == Activity.AVALIAR_DIRETOR_RH){
		var map = {};
		map[Activity.AVALIAR_DIRETOR_GERAL] = "Aprovado";
		map[Activity.GATEWAY_CORRIGIR] = "Reprovado";
		return map[nextState];
	}
	else if(currentState == Activity.AVALIAR_DIRETOR_GERAL){
		var map = {};
		map[Activity.FIM] = "Aprovado";
		map[Activity.GATEWAY_CORRIGIR] = "Reprovado";
		return map[nextState];
	}
	return null;
}