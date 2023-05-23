const formatter = new Intl.NumberFormat('pt-BR', {
	minimumFractionDigits: 2,
});

$(document).ready(function() {
	MAIN.init();
});

let MAIN = {
	loading: {},
	
	init: function(){
		loading = FLUIGC.loading(window);												
				
		BINDINGS.init();
		MAIN.displayForm();
	}
	, displayForm : function() {
		if(CONTEXT.MODE != "VIEW"){
			if(CONTEXT.ACTIVITY == Activity.ABERTURA || CONTEXT.ACTIVITY == Activity.INICIO){
				ZOOM.execWhenReady("cd_centro_custo", function(){
					ZOOM.prepareCostCenterZoom();
				});
			}
		}
	}
	/* , validateAdvancePolicy: function(){
		let payDayDate = moment($("#dt_pagamento").val() + " 22:59:59", "DD/MM/YYYY hh:mm:ss");
		let today = moment().add(7, 'days');
		let policy = $("#nm_politica_antecedencia").val();
		if(payDayDate.format("DD/MM/YYYY") != $("#dt_pagamento").val()){
			console.warn("validateAdvancePolicy - Diferente"
				, payDayDate.format("DD/MM/YYYY")
				, $("#dt_pagamento").val());
		}
		
		if(payDayDate.isBefore(today)){			
			FLUIGC.toast({
				message : "Pagamento fora da política de antecedência", 
				type: "warning"
			});
			$("#nm_politica_antecedencia").val("Fora política");
		}else{
			$("#nm_politica_antecedencia").val("Dentro política");
		}
		
		$("#dt_pagamento_iso").val(moment(payDayDate).format("YYYY-MM-DD"));
		$('#dt_prazo_antecedencia_iso').val(payDayDate.subtract(7, 'days').format("YYYY-MM-DD"));
		
		MAIN.requireObservation();
	} */
	/* , requireObservation: function(){
		let policy = $("#nm_politica_antecedencia").val();
		
		if(policy == "Fora política"){
			$('#div-politica-antecedencia').show();
		}
		else{
			$('#div-politica-antecedencia').hide();
			$("#ds_justificativa_politica").val('');
		}
	} */
	/* , requireFiscalObservation: function(){
		let decision = $("input[name=rd_lancado]:checked").val();
		let $obsLabel = $('[for="ds_obs_lancar_nota"]');
		if(decision == "Sim"){
			$obsLabel.removeClass('required');
		}
		else{
			$obsLabel.addClass('required');
		}
	}, */
};

let BINDINGS = {
	init: function(){
		BINDINGS.bindMasks();
		BINDINGS.bindFields();
		//BINDINGS.bindDateFields();
	}
	, bindMasks: function(){
		$('.campo-data').mask('00/00/0000');
	}
	, bindFields: function(){
		$('input[type="text"]').on("change", function(){
		    this.value = $.trim(this.value);
		});						
		
		/* if(CONTEXT.CURRENT_STATE != Activity.ABERTURA && CONTEXT.CURRENT_STATE != Activity.INICIO){
			$('input[name="rd_lancado"]').on('change', function(e,i,a){
				MAIN.requireFiscalObservation();		
			});
			
			$('input[name="rd_aprov_financeiro"]').on('change', function(e,i,a){
				let decision = $(this).val();
				let $obsLabel = $('[for="ds_obs_aprov_financeiro"]');
				if(decision == "Aprovado"){
					$obsLabel.removeClass('required');
				}
				else{
					$obsLabel.addClass('required');
				}					
			});
						
			$(".money").mask("###.###.##0,00", {reverse: true});
		} */
	}
	/* , bindDateFields: function(){
		if(CONTEXT.ACTIVITY == Activity.ABERTURA || CONTEXT.ACTIVITY == Activity.INICIO || CONTEXT.ACTIVITY == Activity.VERIFICAR_SITUACAO){				
			FLUIGC.calendar('#campo-dt_inic_altera_cargo_salario', {
				useCurrent: false,
				minDate: new Date(),
				pickDate: true,
				daysOfWeekDisabled: [0,6]
			});				
		}

		$(".campo-data" ).on("change", function() {
			if(this.value != '')
				UTILS.validateDate($(this));
				
			MAIN.validateAdvancePolicy();	
		});
	} */
};