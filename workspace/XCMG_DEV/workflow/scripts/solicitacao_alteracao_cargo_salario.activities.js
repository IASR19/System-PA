var Activity = {
	ZERO: 0,
	INICIO: 4,
	GATEWAY_CORRIGIR: 17,
	AVALIAR_GERENTE_AREA: 33,
	AVALIAR_DIRETOR_AREA: 18,
	AVALIAR_GERENTE_RH: 19,
	AVALIAR_DIRETOR_RH: 20,
	AVALIAR_DIRETOR_GERAL: 21,
	FIM: 9

	, isBeginning: function(state){
		return state == Activity.ABERTURA
			|| state == Activity.INICIO;
	}
};