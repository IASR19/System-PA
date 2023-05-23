function servicetask57(attempt, message) {
	log.info(_log + " - servicetask57 - receber");
	var quais = precisaIntegrarQuaisTitulos();
	if(quais.receber) {
		integrarTitulosAReceber();
	}
	else{
		log.info(_log + " - servicetask65 - não gera títulos a pagar");
	}
}