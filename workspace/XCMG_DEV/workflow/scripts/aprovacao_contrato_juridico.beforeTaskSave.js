function beforeTaskSave(colleagueId,nextSequenceId,userList){

	var sequenceId = getValue("WKNumState");
	var currentUser = fluigAPI.getUserService().getCurrent();
	var parecer_juridico, historico_parecer_juridico;
	var atv = getValue("WKNumState");
	
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
	/*if(sequenceId == Activity.ABERTURA || sequenceId == Activity.INICIO){
		
		try{
		
			log.info("TENTANDO CRIAR E-MAIL");

			//ENVIO DE EMAIL
			var idFluig = getValue("WKNumProces") + '';
			//var emails = hAPI.getCardValue('emails');
			var emails = "leonardo.oliveira@xcmgbrasil.com.br;rodrigo.almeida@xcmgbrasil.com.br";
			//var nome_solicitante = hAPI.getCardValue('nm_requisitante');
			var nome_solicitante = idFluig;
			
			log.info("-----------------------");
			log.info(idFluig);
			log.info("-----------------------");
			log.info("emails: " + emails);
			log.info("-----------------------");
			log.info(nome_solicitante);
			log.info("-----------------------");
			
			//var nome_gerente = hAPI.getCardValue('nomeGerente');
			//var nome_supervisor = hAPI.getCardValue('nomeSupervisor');
			
		    var parametros = new java.util.HashMap();	
			
			parametros.put = ("NOME_USUARIO", nome_solicitante);
			parametros.put = ("NOME_SOLICITANTE", nome_solicitante);
			//parametros.put = ("NOME_GERENTE", nome_gerente);
			//parametros.put = ("NOME_SUPERVISOR", nome_supervisor);
			
			parametros.put = ("subject", "TESTE DE ENVIO DA SOLICITAÇÃO (" + idFluig + ") / Colaborador (" + nome_solicitante + ")");
			
			var destinatarios = new java.util.arrayList();
			
			var emails = emails.split(';');
			
			for (var i =0; i < emails.length; i++){
				//A cada email detectado, adiciona ao array destinatarios
				destinatarios.add(emails[i]);
			}
			
			notify ("integrador", "tpl_aprovacao_contrato_juridico", parametros, destinatarios, "text/html");
		}	
	
			catch(e){
			log.info(e);
		}

	}*/
	
	
	
}
	
	