const MAIN = {
	loading: {}

	,init: function() {
		MAIN.loading = FLUIGC.loading(window);
		
		MAIN.bind();
		MAIN.bindDateFields();
		MAIN.setCurrencyRate();
		MAIN.displayForm();
		enableFields();
		
	}
	, setCurrencyRate: function(){
		let rate = $("#sl_moeda").val();
		
		if(rate != "1"){
			$(".taxa-moeda").show();
		}else{
			$(".taxa-moeda").hide();
			$("#vl_taxa").val("0");
		}
	}
	, bind: function(){
		if(CONTEXT.MODE != "VIEW"){
			if(CONTEXT.CURRENT_STATE == Activity.ZERO
				|| CONTEXT.CURRENT_STATE == Activity.INICIO){
				
				$('#valor_pagamento').on('change', function() {
					//MAIN.setCurrencyRate();
					MAIN.calculateBudget();
				});
			}
			
		}
	}


	, getDateBR : function(date) {
		return new Date(date.split("/")[2], date.split("/")[1] - 1, date.split("/")[0])
	}
	
	, getDateEN_US : function(date) {
		return new Date(date.split("/")[0], date.split("/")[1] - 1, date.split("/")[2])
	}
}

function Contrato() {
	var id = document.getElementById("nr_solicitacao").value
	window.open('https://myxcqm.xcmgbrasil.com.br:443/portal/p/1/ecmnavigation?app_ecm_navigation_doc=65865&solicitacao='+id,'','width=1000,height=600');	    							
}

function myFunction(el) {
	   
	var x = document.getElementById("nome_setor").value;
	  
	  /*
	  if (x == "infra") {
		  document.getElementById("id_resposta").style.display = "block";
		  document.getElementById("txt_resposta").value = "INFRA";
	  	}
		  else if (x == "adm"){
			  document.getElementById("id_resposta").style.display = "block";
			  document.getElementById("txt_resposta").value = "ADM";
		  }
		  else if (x == "sistema"){
			  document.getElementById("id_resposta").style.display = "block";
			  document.getElementById("txt_resposta").value = "SISTEMA";
		  }*/

}