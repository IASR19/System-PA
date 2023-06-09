var Activity = {

	ABERTURA: 0,
	INICIO: 4,
	LANCAR_NOTA: 111,
	CONFERENCIA_FINANCEIRO: 16,
	AVALIAR_CONTROLADORIA: 19,
	AVALIAR_DIRETOR_GERAL: 31,
	GATEWAY_ENVOLVE_DIRETOR_FINANCEIRO: 78,
	AVALIAR_DIRETOR_FINANCEIRO: 33,
	GATEWAY_ENVOLVE_PRESIDENTE: 43,
	AVALIAR_PRESIDENTE: 35,
	DEFINIR_CONTA_PA: 89,
	SERVICE_TITULO_PAGAR: 65,
	VERIFICAR_SITUACAO: 69,
	RECEBIDO_CONFERIDO: 52,
	GATEWAY_CORRIGIR: 94,
	FIM_PAGO: 40
	
	, wasIntegrated: function(state){
		return state == Activity.DEFINIR_CONTA_PA
			|| state == Activity.SERVICE_TITULO_PAGAR
			|| state == Activity.VERIFICAR_SITUACAO
			|| state == Activity.RECEBIDO_CONFERIDO
			|| state == Activity.FIM_PAGO;
	}
	, isBeginning: function(state){
		return state == Activity.ABERTURA
			|| state == Activity.INICIO;
	}
};