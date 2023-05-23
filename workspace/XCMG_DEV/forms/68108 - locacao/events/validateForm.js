function validateForm(form) {
	log.info("XCMG - Aprovação de Contrato de Locação - validateForm - mode: " + form.getFormMode());
	
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
    
	if(!COMPLETED_TASK || CURRENT_STATE == NEXT_STATE) return;
    
    //VALIDANDO CAMPOS EMPRESA/RESPONSAVEL/FORMA DE PAGAMENTO
	if(CURRENT_STATE == Activity.ZERO || CURRENT_STATE == Activity.INICIO){
    	if (isEmpty(form, "cd_empresa") || isEmpty(form, "cd_filial")) {
			msgError += "Filial 分公司 é obrigatorio." + lineBreaker;
		}
		if (isEmpty(form, "cd_centro_custo")) {
			msgError += "Centro de custo 成本中心 é obrigatorio." + lineBreaker;
		}
		if (isEmpty(form, "nm_forma_pagamento")) {
			msgError += "Forma de pagamento 付款方式 é obrigatorio." + lineBreaker;
		}
	    if (isEmpty(form, "nome_representante")){
	    	msgError += "Nome do Representante é Obrigatório \n";
	    }
	    if (isEmpty(form, "cpf_representante")){
	    	msgError += "CPF do Representante é Obrigatório \n";
	    }
	        if (isEmpty(form, "rg_representante")){
	    	msgError += "RG do Representante é Obrigatório";
	    }
	    if (isEmpty(form, "email_representante")){
	    	msgError += "E-MAIL do Representante é Obrigatório";
	    }
    
	    //VALIDANDO LINHAS TB_ITENS_LOCACAO
		var tb_itens_locacao = form.getChildrenIndexes("tb_itens_locacao");	
		
		if (tb_itens_locacao.length > 0) {
			
			var linha = 0;
			
			 for (var i = 0; i < tb_itens_locacao.length; i++) {
				 var linha = i + 1;
		     	
		     	if (form.getValue("cd_produto_estoque___" + linha)==""){
		     		throw "Não foi add produto na linha "+linha.toString()+".";
		     	}		     	
		     }
			
		}else{
			
			throw "Nenhum produto foi adicionado nesta solicitação."
		
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