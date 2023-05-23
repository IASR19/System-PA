let ZOOM = {
	interval: {},
	callbacks: {},
	isReady: function(zoomId){
		return window[zoomId] != undefined && window[zoomId] != null && window[zoomId].open != null;
	}
	, execWhenReady: function(zoomId, callback){
		ZOOM.interval[zoomId] = setInterval(function(){
			if(ZOOM.interval[zoomId] > 0 && ZOOM.isReady(zoomId)){
				callback();
				ZOOM.clearInterval(zoomId);
			}
		});
	}		
	, clearInterval: function(zoomId){
		window.clearInterval(ZOOM.interval[zoomId]);
		ZOOM.interval[zoomId] = 0;
	}	
	, prepareCostCenterZoom: function(){
		let branch = $("#cd_filial").val();
		reloadZoomFilterValues("cd_centro_custo", 'cd_matricula,'+CONTEXT.USER+',cd_filial,'+branch);
	}
	,loadProductZoom: function(){
		
	}	
	,prepareProductZoom: function(index){
		
	}
	,clearProductZoom: function(){
		
		
	}	
	,loadLedgerAccountZoom: function(){
		
		ZOOM.execWhenReady("cd_conta_contabil", function(){
			ZOOM.prepareLedgerAccountZoom();
		});
		
	}	
	,prepareLedgerAccountZoom: function(){
		let branch = $("#cd_filial").val();
		let costCenter = $("#cd_centro_custo").val()[0];
		reloadZoomFilterValues("cd_conta_contabil", 'cd_matricula,'+CONTEXT.USER+',cd_filial,'+branch+',cd_centro_custo,'+costCenter);
	}
	,clearLedgerAccountZoom: function(){
		
		window["cd_conta_contabil"].clear();
		$("#nm_conta_contabil").val("");
		reloadZoomFilterValues("cd_conta_contabil", 'cd_matricula,,cd_filial,,cd_centro_custo,');
		
	},validequipament: function(lin) {
		
		var index = UTILS.getChildrenIndexes("tb_itens_locacao");
		//var chassi = '';
		var zoomId = "chassi___"+lin.toString();
		
		if (index.length > 0) {
			for (var i = 0; i < index.length; i++) {
				var linha = i + 1;
				chassi = $("#chassi___"+linha).val();
				
					if (linha != lin){
						if (chassi[0] == $("#chassi___"+lin).val()[0]){
							
							$("#cd_produto_estoque___"+lin).val("");
							$("#nm_modelo_produto___"+lin).val("");
							$("#chassi___"+lin).val("");
							$("#peso___"+lin).val("");
							$("#quantidade___"+lin).val("");
							
							window[zoomId].clear();

														
							FLUIGC.toast({
								title: 'Erro 錯誤: ',
								message: 'Esse Chassi já foi utilizado na linha '+linha.toString(),
								type: 'danger'
							});
							return
						}
					}
					
				
			}
		}
		
	}	
}

function setSelectedZoomItem(selectedItem) {
	let id = "";
	let index = "";
	if(selectedItem.inputId.indexOf("___") > -1){
		id = selectedItem.inputId.split('___')[0];
		index = selectedItem.inputId.split('___')[1];
	}else {
		id = selectedItem.inputId;
	}	
	
	if(id == "nm_filial"){
		 $('#cd_filial').val(selectedItem['Code']);	
		 $('#cd_empresa').val(selectedItem['CompanyCode']);
		 reloadZoomFilterValues("cd_centro_custo", 'cd_matricula,' + CONTEXT.USER + ',cd_filial,' + selectedItem['Code']);
		 reloadZoomFilterValues("A1_COD", 'branch,' + selectedItem['CompanyCode']);

	
	}else if(id == "cd_centro_custo"){
		$("#nm_centro_custo").val(selectedItem["NomeCC"]);
		ZOOM.loadLedgerAccountZoom();		 		 
		APPROVERS.reloadApprovers();
		 
	}else if(id == "chassi"){

		$("#chassi___"+index).val(selectedItem['BF_NUMSERI']);
		$("#cd_produto_estoque___"+index).val(selectedItem['B1_DESC']);
		$("#nm_modelo_produto___"+index).val(selectedItem['BM_DESC']);
		$("#peso___"+index).val(selectedItem['B1_PESO']);
		$("#quantidade___"+index).val('1');
		
		ZOOM.validequipament(index);
		 		 
		 
	}else if(id == "A1_COD"){
		 $("#A1_LOJA").val(selectedItem["LOJA"]);
		 $("#A1_NREDUZ").val(selectedItem["Nome reduzido"]);
		 
		 $("#A1_NOME").val(selectedItem["A1_NOME"]);
		 $("#A1_CGC").val(selectedItem["A1_CGC"]);
		 $("#A1_INSCR").val(selectedItem["A1_INSCR"]);
		 $("#A1_DDD").val(selectedItem["A1_DDD"]);
		 $("#A1_TEL").val(selectedItem["A1_TEL"]);
		 $("#A1_END").val(selectedItem["A1_END"]);
		 $("#A1_CEP").val(selectedItem["A1_CEP"]);
		 $("#A1_BAIRRO").val(selectedItem["A1_BAIRRO"]);
		 $("#A1_MUN").val(selectedItem["A1_MUN"]);
		 $("#A1_EST").val(selectedItem["A1_EST"]);
		 $("#A1_PAIS").val(selectedItem["A1_PAIS"]);
		 $("#A1_EMAIL").val(selectedItem["A1_EMAIL"]);
		 $("#A1_CODPAIS").val(selectedItem["A1_CODPAIS"]);
		 
		 if (selectedItem["PESSOA"]=='J'){
			 $("#A1_PESSOA").val("JURÍDICA");
		 }
		 else
		 	{
				 $("#A1_PESSOA").val("FÍSICA");
			 }
		 
		 if (selectedItem["A1_TIPO"]=='F'){
			 $("#A1_TIPO").val("CONSUMIDOR FINAL");
		 }
		 else if(selectedItem["A1_TIPO"]=='L'){
			 $("#A1_TIPO").val("PRODUTOR RURAL");
		 }
		 else if(selectedItem["A1_TIPO"]=='R'){
			 $("#A1_TIPO").val("REVENDEDOR");
		 }
		 else if(selectedItem["A1_TIPO"]=='S'){
			 $("#A1_TIPO").val("SOLIDÁRIO");
		 }
		 else if(selectedItem["A1_TIPO"]=='X'){
			 $("#A1_TIPO").val("EXPORTAÇÃO");
		 }
		 
		 if (selectedItem["CONTRIB"]=='1'){
		 	$("#A1_CONTRIB").val("SIM");
		 }
		 else
		 	{
			 	$("#A1_CONTRIB").val("NÃO");
			 }
		 }
		 
		 if (selectedItem["A1_TPESSOA"]=='CI'){
			 $("#A1_TPESSOA").val("COMÉRCIO/INDÚSTRIA");
		 }
		 else if(selectedItem["A1_TPESSOA"]=='PF'){
			 $("#A1_TPESSOA").val("PESSOA FÍSICA");
		 }
		 else if(selectedItem["A1_TPESSOA"]=='OS'){
			 $("#A1_TPESSOA").val("PRESTAÇÃO DE SERVIÇO");
		 }
		 else if(selectedItem["A1_TPESSOA"]=='EP'){
			 $("#A1_TPESSOA").val("EMPRESA PÚBLICA");
		 }
		 
		 
	}

function removedZoomItem(removedItem) {
	let id = "";
	let index = "";
	if(removedItem.inputId.indexOf("___") > -1){
		id = removedItem.inputId.split('___')[0];
		index = removedItem.inputId.split('___')[1];
	}else {
		id = removedItem.inputId;
	}			
	
	if(id == "nm_filial"){
		 $('#cd_filial').val('');	
		 $('#cd_empresa').val('');
		 
		 window["cd_centro_custo"].clear();
		 $("#nm_centro_custo").val('');
		 ZOOM.reloadSupplierZoom();
		 reloadZoomFilterValues("cd_centro_custo", 'cd_matricula,,cd_filial,');
		 ZOOM.clearProductZoom();
		 ZOOM.clearLedgerAccountZoom();
		 
		 APPROVERS.clearAllApprovers();
		 		 
	}else if(id == "cd_centro_custo"){
		 $('#nm_centro_custo').val('');	
		 ZOOM.clearLedgerAccountZoom();
		 APPROVERS.clearAllApprovers();	
	
}}
ZOOM.reloadSupplierZoom = function(){
	let cd_empresa = $('#cd_empresa').val();
	reloadZoomFilterValues("fornecedor", "branch,"+cd_empresa);
}