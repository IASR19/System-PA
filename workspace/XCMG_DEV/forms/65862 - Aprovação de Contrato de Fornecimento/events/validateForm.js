function validateForm(form) {
	log.info("XCMG - Aprovação de Contrato Jurídico - validateForm - mode: " + form.getFormMode());
	
	var msgError = "";
	var isMobile = (form.getMobile() != null && form.getMobile()) ? true : false;
	var lineBreaker = (isMobile) ? "\n" : "<br/>";
	var parecer_juridico, historico_parecer_juridico;
	var CURRENT_STATE = getValue('WKNumState');
	var NEXT_STATE = getValue("WKNextState");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");
	var POLICY = { NOK: "Fora política", OK: "Dentro política" };
	var currentUser = fluigAPI.getUserService().getCurrent();
	
	parecer_juridico = '';
	historico_parecer_juridico= '';
	
	
	log.info(CURRENT_STATE);
	log.info(Activity.AVALIAR_JURIDICO);
	log.info(NEXT_STATE);
	log.info(Activity.SOLICITAR_PARECER);
    log.info(isEmpty(form,"parecer_juridico"));
	
    
	if(!COMPLETED_TASK || CURRENT_STATE == NEXT_STATE) return;
    
    if(CURRENT_STATE == Activity.ZERO || CURRENT_STATE == Activity.INICIO){
    	if (isEmpty(form, "cd_empresa") || isEmpty(form, "cd_filial")) {
			msgError += "Filial 分公司 é obrigatorio." + lineBreaker;
		}
		if (isEmpty(form, "cd_centro_custo")) {
			msgError += "Centro de custo 成本中心 é obrigatorio." + lineBreaker;
		}
		if (isEmpty(form, "cd_fornecedor")) {
			msgError += "Fornecedor 供应商 é obrigatorio." + lineBreaker;
		}
		if (isEmpty(form, "nm_forma_pagamento")) {
			msgError += "Forma de pagamento 付款方式 é obrigatorio." + lineBreaker;
		}
    
	    if (isEmpty(form, "cd_gerente_area") || isEmpty(form, "nm_gerente_area")) {
			msgError += "Falha ao recuperar os aprovadores."
				+ " Selecione o centro de custo novamente. 無法檢索批准人。再次選擇成本中心。" + lineBreaker;
		}
	    
	    if (isEmpty(form,"tipo_contrato")){
	    	msgError += "Tipo do Contrato é Obrigatório";
	    }
	    
	    if (isEmpty(form, "representante_legal_1")){
	    	msgError += "Nome do Representante é Obrigatório \n";
	    }
	    
	    if (isEmpty(form, "nacionalidade_1")){
	    	msgError += "Nacionalidade do Representante é Obrigatório \n";
	    }
	    
	    if (isEmpty(form, "profissao_1")){
	    	msgError += "Profissão do Representante é Obrigatório \n";
	    }
	    
	    if (isEmpty(form, "nm_estado_civil_1")){
	    	msgError += "Estado Civil do Representante é Obrigatório \n";
	    }
	    
	    if (isEmpty(form, "cpf_1")){
	    	msgError += "CPF do Representante é Obrigatório \n";
	    }
	    
	    if (isEmpty(form, "rg_1")){
	    	msgError += "RG do Representante é Obrigatório \n";
	    }
	    if (isEmpty(form, "email_representante_1")){
	    	msgError += "E-MAIL do Representante é Obrigatório";
	    }
    }
    
    if(CURRENT_STATE == Activity.AVALIAR_JURIDICO && NEXT_STATE == Activity.SOLICITAR_PARECER){
    	
    	if (isEmpty(form,"parecer_juridico")){
	    	msgError += "O parecer juridico é obrigatório!";
	    }    
    }
    
	if (msgError != "") {
		throw msgError;
	}
}

function isEmpty(form, fieldname) {
	return ((form.getValue(fieldname) == null) 
			|| (form.getValue(fieldname) == undefined) 
			|| (form.getValue(fieldname).trim() == ""));
}