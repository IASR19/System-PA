let ZOOMS = {
	interval: {},
	callbacks: {}

	, isReady(zoomId){
		return window[zoomId] != undefined && window[zoomId] != null && window[zoomId].open != null;
	}
	, executeQuandoPronto: function(zoomId, callback){
		if(ZOOMS.callbacks[zoomId] == null) ZOOMS.callbacks[zoomId] = [];
		
		ZOOMS.callbacks[zoomId].push(callback);
		ZOOMS.interval[zoomId] = setInterval(function(){
			if(ZOOMS.interval[zoomId] > 0 && ZOOMS.isReady(zoomId)){
				while (_callback = ZOOMS.callbacks[zoomId].pop()){
					//console.log("ZOOMS.callbacks",zoomId,_callback);
					_callback();
				}
				ZOOMS.clearInterval(zoomId);
			}
		});
	}
	
	, clearInterval: function(zoomId){
		window.clearInterval(ZOOMS.interval[zoomId]);
		ZOOMS.interval[zoomId] = 0;
	}
	
	, getValue:function(zoomId, qual){
		if (CONTEXT.MODE == "VIEW" || window[zoomId].getSelectedItems == undefined){
			return $("#"+zoomId).val();
		}
		else if (qual == undefined || qual == "todos"){
			return window[zoomId].getSelectedItems();
		}
		else if (qual != undefined){
			let values = window[zoomId].getSelectedItems();
			return values != null && values.length > qual ? values[qual] : "";
		}
		return "";
	}
	, clear:function(zoomId){
		if (window[zoomId].clear == undefined){
			return $("#"+zoomId).val("");
		} else window[zoomId].clear();
		
		removedZoomItem( { "inputId": zoomId } );
	}
}

//CUSTOM
function setSelectedZoomItem(item) {
	if(item.inputId == "filial") {
		$("#cd_empresa").val(item.CompanyCode);
		$("#cd_filial").val(item.Code);
		
		window.cd_centro_custo.clear();
		reloadZoomFilterValues("cd_centro_custo"
			, `cd_matricula,${CONTEXT.USER},cd_filial,${item.Code}`);
	
	} 
	else if(item.inputId == "cd_centro_custo") {
		let cd_filial = $('#cd_filial').val();
		$("#nm_centro_custo").val(item.NomeCC);

		APPROVERS.reloadApprovers();
		APPROVERS.loadGenericApprovers();
		
	} 
	else if(item.inputId == "fornecedor"){
		$("#cd_fornecedor").val(item.A2_COD);
		$("#lj_fornecedor").val(item.A2_LOJA);
		$("#cgc_fornecedor").val(item.A2_CGC);
		$("#nm_fornecedor_fantasia").val(item.A2_NREDUZ);
		$("#nm_fornecedor").val(item.A2_NREDUZ);
		$("#A2_END").val(item.A2_END);
		$("#A2_BAIRRO").val(item.A2_BAIRRO);
		$("#A2_MUN").val(item.A2_MUN);
		$("#A2_EST").val(item.A2_EST);
		$("#A2_CEP").val(item.A2_CEP);
		$("#A2_TIPO").val(item.A2_TIPO);
				
		prepareSecurityPayableZoomList();
	} 
	
}

function removedZoomItem(item) {
	if(item.inputId == "filial") {
		$("#cd_empresa").val("");
		$("#cd_filial").val("");
		
		ZOOMS.clear("cd_centro_custo");
		
		prepareSecurityPayableZoomList();
		prepareCostCenterZoomList();
		prepareNatureZoomList();
		
		ZOOMS.reloadSupplierZoom();
	}
	else if(item.inputId == "cd_centro_custo") {
		$("#nm_centro_custo").val("");
		
		ZOOMS.clear("cd_conta_contabil");
		
		APPROVERS.clearCostCenterApprovers();
	}
	else if(item.inputId == "cd_conta_contabil") {
		$("#ds_conta_contabil").val("");
	}
	else if(item.inputId == "fornecedor") {
		$("#cd_fornecedor").val("");
		$("#lj_fornecedor").val("");
		$("#cgc_fornecedor").val("");
		$("#nm_razao_social").val("");
		$("#A2_END").val("");
		$("#A2_BAIRRO").val("");
		$("#A2_MUN").val("");
		$("#A2_EST").val("");
		$("#A2_CEP").val("");
		
		prepareSecurityPayableZoomList();
	} 
}

function prepareSecurityPayableZoomList(idx){
	let fornecedor = $('#cd_fornecedor').val();
	let filial = $('#cd_filial').val();
	
	let arr = (idx != undefined && idx != null) ? [idx]
		: UTILS.getChildrenIndexes("tbTitulos"); 
	
	for(var i in arr){
		//Apenas títulos não baixados com saldo > 0
		reloadZoomFilterValues("titulo___"+arr[i] //AND E2_TIPO='TX'
				, `queryAddWhere,E2_BAIXA='' AND E2_SALDO>0  AND (E2_PREFIXO = 'EIC' OR E2_PREFIXO = 'EEC') AND E2_FORNECE='${fornecedor}',branch,${filial}`);
	}
}
function prepareCostCenterZoomList(idx){
	let filial = $('#cd_filial').val();
	
	let arr = (idx != undefined && idx != null) ? [idx]
		: UTILS.getChildrenIndexes("tbTitulos"); 
	
	for(var i in arr){
		ZOOMS.executeQuandoPronto("tit_centro_custo___"+arr[i], function(){
			reloadZoomFilterValues("tit_centro_custo___"+arr[i]
					, `cd_matricula,${CONTEXT.USER},cd_filial,${filial}`);
		});
	}
	console.warn("TODO");
};
function prepareNatureZoomList(idx){
	let filial = $('#cd_filial').val();
	
	let arr = (idx != undefined && idx != null) ? [idx]
		: UTILS.getChildrenIndexes("tbTitulos"); 
	
	for(var i in arr){
		ZOOMS.executeQuandoPronto("tit_natureza___"+arr[i], function(){
			reloadZoomFilterValues("tit_natureza___"+arr[i]
					, `branch,${filial}`);
		});
	}
};

function getCostCenter(idx, id){
	if(id == null || id.trim() == "") {
		console.info("getCostCenter - ID centro custo vazio");
		return false;
	}
	
	let filial = $('#cd_filial').val();
	let constraints = [];
	constraints.push(DatasetFactory.createConstraint("branch", filial, null, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("queryAddWhere", `CTT_CUSTO='${id}'`, null, ConstraintType.MUST));
	DatasetFactory.getDataset("protheus_centro_custo", null, constraints, null, {
		success : function(data) {
			if(data != null && data.values.length > 0) {
				let row = data.values[0];
				window["tit_centro_custo___"+idx].setValue({"CodCC": id,"NomeCC": row.CTT_DESC01});
			}
		}, error : function(err) {
			console.error("Erro ao consultar centro de custo: " + id, err);
		}
	});
}
function getPaymentNature(idx, id){
	let filial = $('#cd_filial').val();
	let constraints = [];
	constraints.push(DatasetFactory.createConstraint("branch", filial, null, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("queryAddWhere", `ED_CODIGO='${id}'`, null, ConstraintType.MUST));
	DatasetFactory.getDataset("protheus_natureza", null, constraints, null, {
		success : function(data) {
			if(data != null && data.values.length > 0) {
				let row = data.values[0];
				window["tit_natureza___"+idx].setValue({"ED_CODIGO": id,"ED_DESCRIC": row.ED_DESCRIC});
			}
		}, error : function(err) {
			console.error("Erro ao consultar natureza: " + id, err);
		}
	});
}

ZOOMS.reloadSupplierZoom = function(){
	let cd_empresa = $('#cd_empresa').val();
	reloadZoomFilterValues("fornecedor", "branch,"+cd_empresa);
}