const formatter = new Intl.NumberFormat('pt-BR', {
	minimumFractionDigits: 2,
});

let MAIN = {
	loading: {},
	
	init: function(){
		loading = FLUIGC.loading(window);												
				
		BINDINGS.init();
		MAIN.displayForm();
		enableFields();
		
		let branch = "'1001'";
		
		
		//Adiciona registro na tabela de itens_produtos 
		$("#bt_add_prod").on("click", function(){
			let index = wdkAddChild("tb_itens_locacao");
			$('.currency').maskMoney({showSymbol:true, symbol:"R$ ", decimal:",", thousands:"."});
			$('#pe___' + index).show();
			$('#pa' + index).hide();
			reloadZoomFilterValues("cd_produto_estoque___" + index, 'branch,'+branch);
			reloadZoomFilterValues("cd_produto_ativo___" + index, 'branch,'+branch);            
		});
		
	},
	
	
	
	displayForm : function() {
		if(CONTEXT.MODE == "VIEW" || (CONTEXT.ACTIVITY != Activity.ABERTURA && CONTEXT.ACTIVITY != Activity.INICIO)){
			$(".no-view").hide();
		}	
		
		if(CONTEXT.MODE != "VIEW"){
			if(CONTEXT.ACTIVITY == Activity.ABERTURA || CONTEXT.ACTIVITY == Activity.INICIO){
				ZOOM.execWhenReady("cd_centro_custo", function(){
					ZOOM.prepareCostCenterZoom();
				});
				
				ZOOM.loadLedgerAccountZoom();
				
				if($("#cd_filial").val() != ""){
					ZOOM.loadProductZoom();
					
					if($("#cd_centro_custo").val() != ""){
						APPROVERS.reloadApprovers();
					}
				}
			}			
		}
						
		if(CONTEXT.ACTIVITY == Activity.AVALIAR_JURIDICO) {
			$('#div_parecer_juridico').show();
			$('#div_impressao').show();
		}
		
		if(CONTEXT.ACTIVITY == Activity.SOLICITAR_PARECER) {
			$('#div_parecer_juridico').show();
		}
				
			if(CONTEXT.MODE == "VIEW"){
				
				//recarrega na tela a decisão dos aprovadores pois o radio perde valor			
				var aux_aprov_credito_cobranca = $("#aux_aprov_credito_cobranca").val();
				if (aux_aprov_credito_cobranca != ""){
					$("input[name=rd_aprov_credito_cobranca][value=" + aux_aprov_credito_cobranca + "]").prop('checked', true);
				}
		
				var aux_aprov_gerente_locacao = $("#aux_aprov_gerente_locacao").val();
				if (aux_aprov_gerente_locacao != ""){
					$("input[name=rd_aprov_gerente_locacao][value=" + aux_aprov_gerente_locacao + "]").prop('checked', true);
				}
				
				var aux_aprov_gerente_negocios = $("#aux_aprov_gerente_negocios").val();
				if (aux_aprov_gerente_negocios != ""){
					$("input[name=rd_aprov_gerente_negocios][value=" + aux_aprov_gerente_negocios + "]").prop('checked', true);
				}
							
				var aux_aprov_diretor_comercial = $("#aux_aprov_diretor_comercial").val();
				if (aux_aprov_diretor_comercial != ""){
					$("input[name=rd_aprov_diretor_comercial][value=" + aux_aprov_diretor_comercial + "]").prop('checked', true);
				}
				
				var aux_aprov_juridico = $("#aux_aprov_juridico").val();
				if (aux_aprov_juridico != ""){
					$("input[name=rd_aprov_juridico][value=" + aux_aprov_juridico + "]").prop('checked', true);					
				}
				
			}else{				
				
				//recarrega na tela a decisão dos aprovadores pois o radio perde valor			
				
				var aux_aprov_credito_cobranca = $("input[name^=aux_aprov_credito_cobranca]").val();
				if (aux_aprov_credito_cobranca != ""){
					$("input[name^=_rd_aprov_credito_cobranca][value=" + aux_aprov_credito_cobranca + "]").prop('checked', true);
				}
		
				var aux_aprov_gerente_locacao = $("input[name^=aux_aprov_gerente_locacao]").val();
				if (aux_aprov_gerente_locacao != ""){
					$("input[name^=_rd_aprov_gerente_locacao][value=" + aux_aprov_gerente_locacao + "]").prop('checked', true);
				}
				
				var aux_aprov_gerente_negocios = $("input[name^=aux_aprov_gerente_negocios]").val();
				if (aux_aprov_gerente_negocios != ""){
					$("input[name^=_rd_aprov_gerente_negocios][value=" + aux_aprov_gerente_negocios + "]").prop('checked', true);
				}
							
				var aux_aprov_diretor_comercial = $("input[name^=aux_aprov_diretor_comercial]").val();
				if (aux_aprov_diretor_comercial != ""){
					$("input[name^=_rd_aux_aprov_diretor_comercial][value=" + aux_aprov_diretor_comercial + "]").prop('checked', true);
				}
								
				var aux_aprov_juridico = $("input[name^=aux_aprov_juridico]").val();
				if (aux_aprov_juridico != ""){
					$("input[name^=_rd_aux_aprov_juridico][value=" + aux_aprov_juridico + "]").prop('checked', true);
				}
				
			}
		
	},
	requireApproverObservation: function(target){
		let decision = target.value;
		let $obsLabel = $('[for="' + $(target).data("obsId") + '"]');
		if(decision == "Aprovado"){
			$obsLabel.removeClass('required');
		}
		else{
			$obsLabel.addClass('required');
		}
	},
	
	setApproverDecision: function(target){
		
		console.log(target);
		
		let aux_field = $(target).data("auxId");
		let decision = target.value;
		
		console.log(aux_field);

		$("input[name^=" + aux_field +  "]").val(decision);
		
	},
	
	enableMoneyField: function($field, enabled){
		enableField($field, enabled);
		
		if(enabled){
			$field.mask("#.##0,00", {reverse: true});
		}
		else{
			$field.val("");
			$field.unbind();
		}
	}
};

let BINDINGS = {
		init: function(){
			BINDINGS.bindMasks();
			BINDINGS.bindFields();
			BINDINGS.bindDateFields();
		},
		bindMasks: function(){
			$('.campo-data').mask('00/00/0000');
			
		},
		bindFields: function(){
			$('input[type="text"]').on("change", function(){
			    this.value = $.trim(this.value);
			});						
						
			
			$(".money").mask("#.##0,00", {reverse: true});
			
		},
		bindDateFields: function(id){
			let selector = (id == null) ? '.campo-data' : id;
			if(CONTEXT.ACTIVITY == Activity.ABERTURA || CONTEXT.ACTIVITY == Activity.INICIO){
				$(selector).mask("00/00/0000");
								
				FLUIGC.calendar(selector, {
					useCurrent: false,
					minDate: new Date()
				});				
			
				$(selector).on("blur", function() {
					if(this.value != '')
						UTILS.validateDate($(this));
				});
			}
		}
};


function action_slacao(x) {
	
	var index = x.name.substring(9);
	var branch = "'1001'";

		if(x.value == "ESTOQUE"){
			
			$('#pe'+index).show();
			$('#pa'+index.substring(3)).hide();

		}
		
		if(x.value == "ATIVO"){
			
			$('#pe'+index).hide();
			$('#pa'+index.substring(3)).show();
			
		}
		
		reloadZoomFilterValues("cd_produto_estoque___" + index.substring(3), 'branch,'+branch);
		reloadZoomFilterValues("cd_produto_ativo___" + index.substring(3), 'branch,'+branch);
		
	}

$(document).ready(function() {
	
  	//$(".currency").maskMoney({showSymbol:true, symbol:"R$ ", decimal:",", thousands:"."});
	
	MAIN.init();
	
});
