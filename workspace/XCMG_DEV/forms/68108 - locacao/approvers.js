let APPROVERS = {
	SCOPE: {
		MECANISM: "MECANISMO", ALL: "TODOS", ALL_FLUIG: "TODOS_FLUIG"
	}
	, LOADING: FLUIGC.loading("#div_aprovacoes") 
	
	, init: function(){
	
	}
	
	/**
	* Busca os aprovadores genéricos, ou seja, que não variam de acordo com centro de custo
	* e estão configurados no Fluig
	*/
	, loadGenericApprovers: function(){
		APPROVERS.LOADING.show();	
		let constraints = [
			DatasetFactory.createConstraint("escopo", APPROVERS.SCOPE.ALL_FLUIG, null, ConstraintType.MUST)
		];
		DatasetFactory.getDataset("aprovadores", null, constraints, null, {
			success: function(data){
				if(data != null && data.values != null && data.values.length > 0){
					let obj = JSON.parse(data.values[0].aprovadores);
					APPROVERS.setGenericApprovers(obj);
				}
				else{
				    FLUIGC.toast({
						title: 'Erro 錯誤: ',
						message: 'Nenhum aprovador obtido 未獲得批准人',
						type: 'danger'
					});
				}
				APPROVERS.LOADING.hide();
			}
			, error: function(msg){
				FLUIGC.toast({
					title: 'Erro 錯誤: ',
					message: 'Não foi possível consultar os aprovadores 無法諮詢審批人',
					type: 'danger'
				});
				APPROVERS.LOADING.hide();
			}
		});
	}
	
	/**
	* Recarrega os aprovadores. Usar quando retorna ao solicitante.
	*/
	, reloadApprovers: function(){
		let requester = $('#cd_requisitante').val();
		let branch = $('#cd_filial').val();
		if(branch == null || branch.length == 0 || branch.trim() == ""){
			let msg = 'Informe a filial 進入分行';
			FLUIGC.toast({
				title: 'Atenção 當心: ',
				message: msg,
				type: 'warning'
			});
			throw msg;
		}
		
		let transitoryCostCenter = $('#cd_centro_custo').val();
		let costCenter = (transitoryCostCenter["map"] != undefined) 
			? transitoryCostCenter[0] : transitoryCostCenter;
		if(costCenter == null || costCenter.length == 0 || costCenter[0].trim() == ""){
			let msg = 'Informe o centro de custo 進入成本中心';
			FLUIGC.toast({
				title: 'Atenção 當心: ',
				message: msg,
				type: 'warning'
			});
			throw msg;
		}
		
		APPROVERS.LOADING.show();
		APPROVERS.setCostCenterApprovers();
		APPROVERS.LOADING.hide();
		
		let constraints = [
			DatasetFactory.createConstraint("escopo", APPROVERS.SCOPE.ALL, null, ConstraintType.MUST)
			, DatasetFactory.createConstraint("cd_requisitante", CONTEXT.USER, null, ConstraintType.MUST)
			, DatasetFactory.createConstraint("cd_filial", branch, null, ConstraintType.MUST)
			, DatasetFactory.createConstraint("cd_centro_custo", costCenter, null, ConstraintType.MUST)
			, DatasetFactory.createConstraint("processo", CONTEXT.PROCESS, null, ConstraintType.MUST)
			, DatasetFactory.createConstraint("solicitacao", CONTEXT.NUM_PROCESS, null, ConstraintType.MUST)
		];
		
		DatasetFactory.getDataset("aprovadores", null, constraints, null, {			
			success: function(data){
				if(data != null && data.values != null 
					&& data.values.length > 0 && data.values[0].aprovadores != ""){
					let obj = JSON.parse(data.values[0].aprovadores);
					APPROVERS.setCostCenterApprovers(obj);
					APPROVERS.setGenericApprovers(obj);
				}
				else{
				    FLUIGC.toast({
						title: 'Erro 錯誤: ',
						message: 'Nenhum aprovador obtido 未獲得批准人',
						type: 'danger'
					});
				}
				APPROVERS.LOADING.hide();
			}
			, error: function(msg){
				FLUIGC.toast({
					title: 'Erro 錯誤: ',
					message: 'Não foi possível consultar os aprovadores 無法諮詢審批人',
					type: 'danger'
				});
				APPROVERS.LOADING.hide();
			}
		});
		
	}
		
	
	, clearCostCenterApprovers: function(){

	}
	
	, setCostCenterApprovers: function(data){
		
		$("#nm_funcao_1").val("Crédito/Cobrança 信用/托收");

		if(data && data.credito_cobranca != null) {
			$("#cd_credito_cobranca").val(data.credito_cobranca.cd);
			$("#nm_credito_cobranca").val(data.credito_cobranca.nm);
			
			if(data.credito_cobranca.nm == null || data.credito_cobranca.nm.trim() == "") {
				FLUIGC.toast({
					title: 'Erro 錯誤: ',
					message: 'Gerente de matrícula "'+data.credito_cobranca.cd+'" não existe no Fluig.'
						+' Por favor, crie a conta do usuário.'
						+' Fluig 中不存在代碼為 "'+data.credito_cobranca.cd+'" 的管理器。請創建用戶帳戶。',
					type: 'danger'
				});
			}
		}
	
		$("#nm_funcao_2").val("Gerente Locação 租赁经理");
		
		if(data && data.gerencia_locacao != null){
			$("#cd_gerente_locacao").val(data.gerencia_locacao.cd);
			$("#nm_gerente_locacao").val(data.gerencia_locacao.nm);
			
			if(data.gerencia_locacao.nm == null || data.gerencia_locacao.nm.trim() == "") {
				FLUIGC.toast({
					title: 'Erro 錯誤: ',
					message: 'Diretor de matrícula "'+data.gerencia_locacao.cd+'" não existe no Fluig.'
						+' Por favor, crie a conta do usuário.'
						+' Fluig 中不存在代碼為 "'+data.gerencia_locacao.cd+'" 的導演。請創建用戶帳戶。',
					type: 'danger'
				});
			}
		}
		
		$("#nm_funcao_3").val("Gerente de Negócios 业务经理");	
		data = getUsersByGroup("gerente_negocios");
		
		if(data.length > 0) {
			$("#cd_gerente_negocios").val(data[0].cd);
			$("#nm_gerente_negocios").val(data[0].nm);
		}
		
		$("#nm_funcao_4").val("Diretor Comercial 商业总监");
		data = getUsersByGroup("diretor_comercial");		
		
		if(data.length > 0) {
			$("#cd_diretor_comercial").val(data[0].cd);
			$("#nm_diretor_comercial").val(data[0].nm);
		}
		
		$("#nm_funcao_5").val("Jurídico 合法的");
		data = getUsersByGroup("juridico");
		
		if(data.length > 0) {
			$("#cd_juridico").val(data[0].cd)
			$("#nm_juridico").val(data[0].nm);
		}
		
		$("#nm_funcao_6").val("Documentação 文档");
		data = getUsersByGroup("credito_cobranca");
		
		if(data.length > 0) {
			$("#cd_documentos").val(data[0].cd)
			$("#nm_documentos").val(data[0].nm);
		}
	
	}
	
	, setGenericApprovers: function(data){
	
	}	
	, clearAllApprovers: function(){
		$("#div-aprovacoes input[type=text], #div-aprovacoes input[type=hidden]").each(function(){$(this).val("");})
	}
	
}

function getUsersByGroup(group){
	var rows = [];
	var cod = "";
	var nome = "";
	var groupId = group;
	var constraints = [
		DatasetFactory.createConstraint("colleagueGroupPK.groupId", groupId, groupId, ConstraintType.MUST)
	];
	var colleagueField = "colleagueGroupPK.colleagueId";
	var usersInGroup = DatasetFactory.getDataset("colleagueGroup", [colleagueField], constraints, null);
	if(usersInGroup != null && usersInGroup.values.length > 0){
		var constraints = [ DatasetFactory.createConstraint("active" , true, true, ConstraintType.MUST) ];
		for(var i = 0; i < usersInGroup.values.length; i++){
			//var userId = usersInGroup.getValue(i, "colleagueGroupPK.colleagueId");
			var userId = usersInGroup.values[i]["colleagueGroupPK.colleagueId"]
			constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userId, userId, ConstraintType.SHOULD));
		}
		var users = DatasetFactory.getDataset("colleague", ["colleaguePK.colleagueId", "colleagueName"], constraints, null);
		if(users != null && users.values.length > 0){
			for(var i = 0; i < users.values.length; i++){
				/*
				rows.push( { 
					"cd": users.getValue(i, "colleaguePK.colleagueId")
					, "nm": users.getValue(i, "colleagueName")
				} );
				*/
				
				if (i > 0){
					cod += "; ";
					nome += "; ";
				}
				cod += users.values[i]["colleaguePK.colleagueId"];
				nome += users.values[i]["colleagueName"];
			}
		}
		rows.push( { 
			"cd": cod
			, "nm": nome
		} );
	}
	return rows;
}