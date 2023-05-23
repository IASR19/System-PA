function beforeStateEntry(sequenceId){
	
	var atv = getValue("WKNumState");
	
	if (atv == 4) {
				
		var attachments = hAPI.listAttachments();
		var hasAttachment = false;
		
		/*if (hAPI.getCardValue("tipo_contrato") == "COMPRA") {
        	 if (attachments.size() < 4) {
        		 throw "É preciso anexar 4 documentos para continuar o processo!";
             }
        }*/
			
		if (hAPI.getCardValue("tipo_contrato") == "EMPREITADA"){
        	if (attachments.size() < 5) {
       		 throw "É preciso anexar 5 documentos para continuar o processo!";
            }

			var n = 0;
        	//proposta, cronograma, projeto, ultima alteração contratual, documento do representante
        	for (var i = 0; i < attachments.size(); i++) {
        		
        		var attachment = attachments.get(i);  
        		log.info("----- * -----" + attachment);
    	        
    	        var	nome_arquivo_att = String(attachment.getDocumentDescription());
    	        log.info("nome_arquivo_att: " + nome_arquivo_att);
    	        
    	        var int_nome_arquivo = nome_arquivo_att.length;
    	        log.info("int_nome_arquivo_: " + int_nome_arquivo);
    	        	int_nome_arquivo = parseInt(int_nome_arquivo);
    	        	int_nome_arquivo = int_nome_arquivo - 4

    	        
    	        var nome_arquivo = nome_arquivo_att.substring(0, int_nome_arquivo);
    	        log.info("nome_arquivo :" + nome_arquivo);
    	        
    	        var anexo1 = "proposta";
        	    var anexo2 = "cronograma";
        	    var anexo3 = "projeto";
        	    var anexo4 = "ultima alteração contratual";
                var anexo5 = "documento do representante";
                
                log.info("anexo1: " + anexo1);
    	        
				const anexos_devidos = [anexo1,anexo2,anexo3,anexo4,anexo5];
				const anexo_registro =[];
				const diferenca = anexos_devidos(item => !anexo_registro.includes(item));
    	        
    	        if ((nome_arquivo ==  anexo1) ||
					(nome_arquivo ==  anexo2) ||
					(nome_arquivo ==  anexo3) ||
					(nome_arquivo ==  anexo4) ||
					(nome_arquivo ==  anexo5)) 
				{

					anexo_registro[n] = nome_arquivo;

					hasAttachment = true;
					
					//var valida_arquivo = 0;
					var nome_arquivo_faltante = nome_arquivo_att;

					n++
    	        	  
    	        }
    	        	
    	        				
				else{
										
					hasAttachment = false;
										
					//	var valida_arquivo = 1;
					nome_arquivo_faltante = nome_arquivo_att;
							
				}			
			
				
				if (!hasAttachment) {

					throw "Anexo " + diferenca.String +  " não encontrado!";
					}

			
			}	

			
			
		}
		
		
		if (hAPI.getCardValue("tipo_contrato") == "PRESTACAO_SERVICOS"){
        	if (attachments.size() < 5) {
       		 throw "É preciso anexar 5 documentos para continuar o processo!";
            }
        	//ultima alteração contratual, documento do representante, documento de residencia, proposta, escopo de negociação
        	for (var i = 0; i < attachments.size(); i++) {
    	        var attachment = attachments.get(i);
    	        
    	        var	nome_arquivo_att = attachment.getDocumentDescription();
    	        var	int_nome_arquivo = parseInt (nome_arquivo_att.length);
    	        	int_nome_arquivo = (int_nome_arquivo - 4);
    	        
    	        var nome_arquivo = nome_arquivo_att.substring(0,(int_nome_arquivo));
    	        
    	        if (nome_arquivo == "ultima alteração contratual" ||
    	        	nome_arquivo == "documento do representante" ||
    	        	nome_arquivo == "documento de residencia" ||
    	        	nome_arquivo == "proposta" ||
    	        	nome_arquivo == "escopo de negociação" ) { 	            
    	        	
    	        	hasAttachment = true;
    	    	}
    	    	
				if (!hasAttachment) {
    	        	throw "Anexo " + nome_arquivo +  " não encontrado!";
    	    	}
			}
		}
	}
	
	processMobileApproval();

}