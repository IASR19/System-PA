function beforeTaskSave(colleagueId,nextSequenceId,userList){

	var sequenceId = getValue("WKNumState");
	var nextSequenceId = getValue("WKNextState");
	var currentUser = fluigAPI.getUserService().getCurrent();
	var parecer_juridico, historico_parecer_juridico;
	var msgError = "";
	
	if(sequenceId == Activity.AVALIAR_JURIDICO && nextSequenceId == Activity.SOLICITAR_PARECER){
    	
    	var dtEmissao = new Date();
  	    var cdtEmissao = dtEmissao.toISOString().substr(8, 2)+"/"+dtEmissao.toISOString().substr(5, 2)+"/"+dtEmissao.toISOString().substr(0, 4);    
    	var usuario = currentUser.getFullName();
    	var sentido = "Comentário do Jurídico para o Solicitante";
    	
    	parecer_juridico = hAPI.getCardValue("parecer_juridico"); 
    	historico_parecer_juridico = hAPI.getCardValue("historico_parecer_juridico"); 
    	hAPI.setCardValue("historico_parecer_juridico",historico_parecer_juridico+"\n"+sentido+"\nData: "+cdtEmissao+" - Usuário: "+usuario+"\nParecer: "+parecer_juridico+"\n-------------------------");
    	hAPI.setCardValue("parecer_juridico","");
    	
    }
	
	if(sequenceId == Activity.SOLICITAR_PARECER && nextSequenceId == Activity.AVALIAR_JURIDICO){
    	
    	var dtEmissao = new Date();
  	    var cdtEmissao = dtEmissao.toISOString().substr(8, 2)+"/"+dtEmissao.toISOString().substr(5, 2)+"/"+dtEmissao.toISOString().substr(0, 4);    
    	var usuario = currentUser.getFullName();
    	var sentido = "Comentário do Solicitante para o Jurídico";
    	
    	parecer_juridico = hAPI.getCardValue("parecer_juridico"); 
    	historico_parecer_juridico = hAPI.getCardValue("historico_parecer_juridico"); 
    	hAPI.setCardValue("historico_parecer_juridico",historico_parecer_juridico+"\n"+sentido+"\nData: "+cdtEmissao+" - Usuário: "+usuario+"\nParecer: "+parecer_juridico+"\n-------------------------");
    	hAPI.setCardValue("parecer_juridico","");
        
    }
	
	//VALIDANDO A ETAPA DOCUMENTOS SE FOR REPROVADO
    if(sequenceId == Activity.AVALIAR_DOCUMENTOS && nextSequenceId == Activity.REPROVADO){
		if(hAPI.getCardValue("ds_obs_documentos") == ""){
			msgError += "Observações Documentos é obrigatório. / 观察文件是强制性的.";
		}
    }
	
	//VALIDANDO A ETAPA COBRANÇA SE FOR REPROVADO
    if(sequenceId == Activity.AVALIAR_CREDITO_COBRANCA && nextSequenceId == Activity.REPROVADO){
		if(hAPI.getCardValue("ds_obs_credito_cobranca") == ""){
			msgError += "Observações Crédito/Cobrança é obrigatorio. / 需要信用证/托收票据.";
		}
    }
		
    //VALIDANDO A ETAPA GERENCIA_LOCACAO SE FOR REPROVADO
    if(sequenceId == Activity.AVALIAR_GERENTE_LOCACAO && nextSequenceId == Activity.REPROVADO){    	
    	if (hAPI.getCardValue("ds_obs_gerente_locacao") == "") {    		
    		msgError += "Observações Gerente de Locação é obrigatorio. / 备注 Location Manager 是必需的.";
    	}
    }

    //VALIDANDO A ETAPA GERENTE DE NEGÓCIOS SE FOR REPROVADO
    if(sequenceId == Activity.AVALIAR_GERENTE_NEGOCIOS && nextSequenceId == Activity.REPROVADO){
    	if (hAPI.getCardValue("ds_obs_gerente_negocios") == "") {    		
    		msgError += "Observações Gerente de Negócios é obrigatório. / Notes Business Manager 是必需的.";
    	}
    }
    
    //VALIDANDO A ETAPA DIRETOR COMERCIAL SE FOR REPROVADO
    if(sequenceId == Activity.AVALIAR_DIRETOR_COMERCIAL && nextSequenceId == Activity.REPROVADO){
    	if (hAPI.getCardValue("ds_obs_diretor_comercial") == "") {    		
    		msgError += "Observações Diretor Comercial é obrigatorio. / 需要商务总监.";
    	}
    }
    
    //VALIDANDO A ETAPA JURÍDICO SE FOR REPROVADO
    if(sequenceId == Activity.AVALIAR_JURIDICO && nextSequenceId == Activity.SOLICITAR_PARECER){
    	if (hAPI.getCardValue("ds_obs_juridico") == "") {    		
    		msgError += "Observações Jurídico é obrigatorio. / 需要法律说明.";
    	}
    }
 
    
    //VALIDAR ANEXOS ANALISE CRÉDITO
    if(sequenceId == Activity.AVALIAR_CREDITO_COBRANCA && nextSequenceId == Activity.AVALIAR_GERENTE_LOCACAO){
    	
    	var num_anexos_inicio = hAPI.getCardValue("num_anexos");
    	var attachments = hAPI.listAttachments();
    	var num_anexos_etapa = attachments.size();
    	var valida_anexos = num_anexos_etapa - num_anexos_inicio;
    	
    	if (valida_anexos == 0) {
    		    		
    		throw "É obrigatório adicionar pelo menos 1 Anexo!";
    
    	}
    		
    }    
    
    //ANEXOS
    if(sequenceId == Activity.INICIO){			
		
    	var attachments = hAPI.listAttachments();
    	
    	if (attachments.size() < 1) {
	   		 throw "É preciso anexar 1 documento para continuar o processo!";
    	}
	   	else{
	   		hAPI.setCardValue("num_anexos", attachments.size());
	   		var num_anexos = hAPI.getCardValue("num_anexos");
	   	}
	}
    	
    	//FORMATAÇÃO CAMPOS
    	var cpf = hAPI.getCardValue("cpf_representante");
    	cpf = cpf.replace(".", "");
    	cpf = cpf.replace("-", "");
    	hAPI.setCardValue("cpf_representante",cpf);
    	
    	var cep_representante = hAPI.getCardValue("cep_representante");
    	cep_representante = cep_representante.replace("-", "");
    	hAPI.setCardValue("cep_representante", cep_representante);
    	
    	//FORMATAÇÃO TABELA FILHO
    	var tbl_itens_locacao = hAPI.getChildrenIndexes("tb_itens_locacao");
		
	    if ( tbl_itens_locacao.length > 0) {
	        
	        for (var i = 0; i < tbl_itens_locacao.length; i++) {
	        	var linha = i + 1;

	        	var valor_nf = hAPI.getCardValue("valor_nf___" + linha);
	        	valor_nf = valor_nf.replace("R$ ", "");
	        	valor_nf = valor_nf.replace(".", "");
	        	valor_nf = valor_nf.replace(",", ".");
	        	hAPI.setCardValue("valor_nf___" + linha, valor_nf);
	        	
	        	var valor_produto = hAPI.getCardValue("valor_produto___" + linha);
	        	valor_produto = valor_produto.replace("R$ ", "");
	        	valor_produto = valor_produto.replace(".", "");
	        	valor_produto = valor_produto.replace(",", ".");
	        	hAPI.setCardValue("valor_produto___" + linha, valor_produto); 
	        	
	        	var vl_locacao_mensal = hAPI.getCardValue("vl_locacao_mensal___" + linha);
	        	vl_locacao_mensal = vl_locacao_mensal.replace("R$ ", "");
	        	vl_locacao_mensal = vl_locacao_mensal.replace(".", "");
	        	vl_locacao_mensal = vl_locacao_mensal.replace(",", ".");
	        	hAPI.setCardValue("vl_locacao_mensal___" + linha, vl_locacao_mensal);
	        	
			}
	        
	    }
    	
	    var caucao = hAPI.getCardValue("caucao");
    	caucao = caucao.replace("R$ ", "");
    	caucao = caucao.replace(".", "");
    	caucao = caucao.replace(",", ".");
    	hAPI.setCardValue("caucao", caucao);
    	
	processMobileApproval();

}

    
function isEmpty(getCardValue, fieldname) {
	return ((hAPI.getCardValue(fieldname) == null) 
			|| (hAPI.getCardValue(fieldname) == undefined) 
			|| (hAPI.getCardValue(fieldname).trim() == ""));
}