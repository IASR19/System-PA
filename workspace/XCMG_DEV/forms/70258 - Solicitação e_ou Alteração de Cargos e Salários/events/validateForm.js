function validateForm(form){
	var currentTaskId = getValue("WKNumState");
	var nextTaskId = getValue("WKNextState");
	var completedTask = (getValue("WKCompletTask")=="true");
	var isMobile = (form.getMobile() != null && form.getMobile()) ? true : false;
	
	if (!completedTask || currentTaskId == nextTaskId) {
		return;
	}

	var msgError = "";
	var lineBreaker = (isMobile) ? "\n" : "<br/>";
  
	if (currentTaskId == Activity.ABERTURA || currentTaskId == Activity.INICIO) {
		if (isEmpty(form.getValue("nm_filial"))) {
			msgError +="Filial 分公司 é obrigatorio."+lineBreaker;
		}
		if (isEmpty(form.getValue("cd_centro_custo"))) {
			msgError +="Centro de Custo 成本中心 é obrigatorio."+lineBreaker;
		}
		/*if (isEmpty(form.getValue("ds_descricao"))) {
			msgError +="Descrição 描述 é obrigatorio."+lineBreaker;
		}
		if (isEmpty(form.getValue("cd_fornecedor"))) {
			msgError +="Fornecedor 供应商 é obrigatorio."+lineBreaker;
		}
		if (isEmpty(form.getValue("sl_forma_pagamento"))) {
			msgError +="Forma de pagamento 付款方式 é obrigatorio."+lineBreaker;
		}
		if (isEmpty(form.getValue("pedido"))) {
			msgError +="Pedido 订单 é obrigatorio."+lineBreaker;
		}
		if (isEmpty(form.getValue("vl_total"))) {
			msgError +="Valor líquido 金额  é obrigatorio."+lineBreaker;
		}		
		if (isEmpty(form.getValue("vl_total_bruto"))) {
			msgError +="Valor bruto 总额 é obrigatorio."+lineBreaker;
		}
		if (isEmpty(form.getValue("dt_pagamento"))) {
			msgError +="Data de pagamento 到期日 é obrigatório."+lineBreaker;
		}
		if(form.getValue("nm_politica_antecedencia") == "Fora política"){	    	
	    	if (isEmpty(form.getValue("ds_justificativa_politica"))) {
	    		msgError +="Justificativa - política de antecedência 理由 - 提前保单政策 é obrigatorio."+lineBreaker;
	    	}
	    }*/
	}

	/*if(currentTaskId == Activity.LANCAR_NOTA){
		if (isEmpty(form.getValue("rd_lancado"))) {
			msgError +="Lançado? 输入了吗 ? é obrigatorio."+lineBreaker;
		}else if(form.getValue("rd_lancado") == "Não") {
			if (isEmpty(form.getValue("ds_obs_lancar_nota"))) {
				msgError +="Observações 备注 é obrigatorio."+lineBreaker;
			}
		}					
	}	
	
	if(currentTaskId == Activity.RECEBIDO_CONFERIDO){
		if (form.getValue("rd_aprov_financeiro") != null && form.getValue("rd_aprov_financeiro") != undefined) {
		
			if (isEmpty(form.getValue("rd_aprov_financeiro"))) {			
				msgError +="Aprovado? 批准了吗 ? é obrigatorio."+lineBreaker;
			}else if(form.getValue("rd_aprov_financeiro") == "Reprovado") {			
				if (isEmpty(form.getValue("ds_obs_aprov_financeiro"))) {
					msgError +="Observações 备注 é obrigatorio."+lineBreaker;
				}
			}		
		}
	}*/


	if(currentTaskId == Activity.AVALIAR_GERENTE_AREA && nextTaskId == Activity.GATEWAY_CORRIGIR){
		//if (form.getValue("rd_aprov_analise_credito") != null && form.getValue("rd_aprov_analise_credito") != undefined) {
		
			//if (isEmpty(form.getValue("rd_aprov_analise_credito"))) {			
			//	msgError +="Aprovado? 批准了吗 ? é obrigatorio."+lineBreaker;
			//}else if(form.getValue("rd_aprov_analise_credito") == "Reprovado") {			
				if (isEmpty(form.getValue("ds_obs_aprov_gerente_area"))) {
					msgError +="Observações 备注 é obrigatorio."+lineBreaker;
				}
			//}		
		//}
	}

	if(currentTaskId == Activity.AVALIAR_DIRETOR_AREA && nextTaskId == Activity.GATEWAY_CORRIGIR){
		//if (form.getValue("rd_aprov_analise_credito") != null && form.getValue("rd_aprov_analise_credito") != undefined) {
		
			//if (isEmpty(form.getValue("rd_aprov_analise_credito"))) {			
			//	msgError +="Aprovado? 批准了吗 ? é obrigatorio."+lineBreaker;
			//}else if(form.getValue("rd_aprov_analise_credito") == "Reprovado") {			
				if (isEmpty(form.getValue("ds_obs_aprov_diretor_area"))) {
					msgError +="Observações 备注 é obrigatorio."+lineBreaker;
				}
			//}		
		//}
	}

	if(currentTaskId == Activity.AVALIAR_GERENTE_RH && nextTaskId == Activity.GATEWAY_CORRIGIR){
		//if (form.getValue("rd_aprov_analise_credito") != null && form.getValue("rd_aprov_analise_credito") != undefined) {
		
			//if (isEmpty(form.getValue("rd_aprov_analise_credito"))) {			
			//	msgError +="Aprovado? 批准了吗 ? é obrigatorio."+lineBreaker;
			//}else if(form.getValue("rd_aprov_analise_credito") == "Reprovado") {			
				if (isEmpty(form.getValue("ds_obs_aprov_gerente_rh"))) {
					msgError +="Observações 备注 é obrigatorio."+lineBreaker;
				}
			//}		
		//}
	}

	if(currentTaskId == Activity.AVALIAR_DIRETOR_RH && nextTaskId == Activity.GATEWAY_CORRIGIR){
		//if (form.getValue("rd_aprov_analise_credito") != null && form.getValue("rd_aprov_analise_credito") != undefined) {
		
			//if (isEmpty(form.getValue("rd_aprov_analise_credito"))) {			
			//	msgError +="Aprovado? 批准了吗 ? é obrigatorio."+lineBreaker;
			//}else if(form.getValue("rd_aprov_analise_credito") == "Reprovado") {			
				if (isEmpty(form.getValue("ds_obs_aprov_diretor_rh"))) {
					msgError +="Observações 备注 é obrigatorio."+lineBreaker;
				}
			//}		
		//}
	}

	if(currentTaskId == Activity.AVALIAR_DIRETOR_GERAL && nextTaskId == Activity.GATEWAY_CORRIGIR){
		//if (form.getValue("rd_aprov_analise_credito") != null && form.getValue("rd_aprov_analise_credito") != undefined) {
		
			//if (isEmpty(form.getValue("rd_aprov_analise_credito"))) {			
			//	msgError +="Aprovado? 批准了吗 ? é obrigatorio."+lineBreaker;
			//}else if(form.getValue("rd_aprov_analise_credito") == "Reprovado") {			
				if (isEmpty(form.getValue("ds_obs_aprov_diretor_geral"))) {
					msgError +="Observações 备注 é obrigatorio."+lineBreaker;
				}
			//}		
		//}
	}
	
	if(msgError != ""){
		throw msgError;
	}
}

function isEmpty(value) {
	return (value == null || value == undefined || value.trim() == "");
}