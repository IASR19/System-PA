function beforeStateEntry(sequenceId) {
	var anexos_devidos = ["proposta", "cronograma", "projeto", "ultima alteração contratual", "documento do representante"];
	var anexos_devidos2 = ["ultima alteração contratual", "documento do representante", "documento de residencia", "proposta", "escopo de negociação"];
	var atv = getValue("WKNumState");

	if (atv == 4) {

		var attachments = hAPI.listAttachments();
		var hasAttachment = false;

		/*if (hAPI.getCardValue("tipo_contrato") == "COMPRA") {
			 if (attachments.size() < 4) {
				 throw "É preciso anexar 4 documentos para continuar o processo!";
			 }
		}*/

		if (hAPI.getCardValue("tipo_contrato") == "EMPREITADA") {

			

			var anexo_registro = [];

			if (attachments.size() < 5) {
				throw "É preciso anexar 5 documentos para continuar o processo!";
			}

			log.info("TOTAL DE ANEXOS: " + attachments.size());

			//proposta, cronograma, projeto, ultima alteração contratual, documento do representante
			for (var i = 0; i < attachments.size(); i++) {

				var attachment = attachments.get(i);
				//log.info("----- * -----" + attachment);

				var nome_arquivo_att = String(attachment.getDocumentDescription());
				//log.info("nome_arquivo_att " + (i+1) + ":" + nome_arquivo_att);

				var int_nome_arquivo = nome_arquivo_att.length;
				//log.info("int_nome_arquivo: " + int_nome_arquivo);
				int_nome_arquivo_formatado = parseInt(int_nome_arquivo);
				int_nome_arquivo_formatado = int_nome_arquivo - 4;

				//log.info("int_nome_arquivo_formatado: " + int_nome_arquivo_formatado);

				var nome_arquivo = nome_arquivo_att.substring(0, int_nome_arquivo_formatado);
				log.info("nome_arquivo: " + nome_arquivo);

				anexo_registro[i] = nome_arquivo;
				log.info("anexo_registro " + anexo_registro[i] + ": INSERIDO");

			}

			var total_registros_armazenados = anexo_registro.length;

			log.info("TOTAL DE REGISTROS ARMAZENADOS: " + total_registros_armazenados);

			log.info("TESTE DO ANEXO \n");

			var resultado_new = [];

			for (var cont = 0; cont < anexos_devidos.length; cont++) {
				var encontrado = false;

				for (var j = 0; j < anexo_registro.length; j++) {
					if (anexos_devidos[cont] === anexo_registro[j]) {
						encontrado = true;
						break;
					}
				}

				if (!encontrado) {
					resultado_new.push(anexos_devidos[cont]);

					
					//log.info("PÓS FOR:");
					//log.info("ARQUIVOS FALTANTES:" + StringItens);


				}
			}

			var StringItens = resultado_new.join(', ');
			if (StringItens != null) {
				throw "Documentos obrigatórios não inseridos: " + StringItens;
			}
		}


		/*var anexos_devidos = [];
		var anexo_registro = [];
		var resultado_new = [];*/



		if (hAPI.getCardValue("tipo_contrato") == "PRESTACAO_SERVICOS") {


			var anexo_registro2 = [];

			if (attachments.size() < 5) {
				throw "É preciso anexar 5 documentos para continuar o processo!";
			}

			log.info("TOTAL DE ANEXOS: " + attachments.size());

			for (var i = 0; i < attachments.size(); i++) {

				var attachment2 = attachments.get(i);
				//log.info("----- * -----" + attachment);

				var nome_arquivo_att2 = String(attachment2.getDocumentDescription());
				//log.info("nome_arquivo_att " + (i+1) + ":" + nome_arquivo_att);

				var int_nome_arquivo2 = nome_arquivo_att2.length;
				//log.info("int_nome_arquivo: " + int_nome_arquivo);
				int_nome_arquivo_formatado2 = parseInt(int_nome_arquivo2);
				int_nome_arquivo_formatado2 = int_nome_arquivo2 - 4;

				//log.info("int_nome_arquivo_formatado: " + int_nome_arquivo_formatado);

				var nome_arquivo2 = nome_arquivo_att2.substring(0, int_nome_arquivo_formatado2);
				log.info("nome_arquivo: " + nome_arquivo2);

				anexo_registro2[i] = nome_arquivo2;
				log.info("anexo_registro " + anexo_registro2[i] + ": INSERIDO");

			}

			var total_registros_armazenados2 = anexo_registro2.length;

			log.info("TOTAL DE REGISTROS ARMAZENADOS: " + total_registros_armazenados2);

			log.info("TESTE DO ANEXO \n");

			var resultado_new2 = [];

			for (var cont = 0; cont < anexos_devidos2.length; cont++) {
				var encontrado2 = false;

				for (var j = 0; j < anexo_registro2.length; j++) {
					if (anexos_devidos2[cont] === anexo_registro2[j]) {
						encontrado2 = true;
						break;
					}
				}

				if (!encontrado2) {
					resultado_new2.push(anexos_devidos2[cont]);

					//log.info("PÓS FOR:");
					//log.info("ARQUIVOS FALTANTES:" + StringItens);

					
				}
			}

			var StringItens2 = resultado_new2.join(', ');
			if (StringItens2 != null) {
				throw "Documentos obrigatórios não inseridos: " + StringItens2;
			}

		}
	}

	processMobileApproval();

}
