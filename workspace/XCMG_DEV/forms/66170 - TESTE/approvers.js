let APPROVERS = {
	SCOPE: {
		MECANISM: "MECANISMO", ALL: "TODOS", ALL_FLUIG: "TODOS_FLUIG"
	}
	, LOADING: FLUIGC.loading("#div-aprovacoes") 
	
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
		APPROVERS.setGenericApprovers();
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
		$("#cd_gerente_area").val("");
		$("#nm_gerente_area").val("");
		
		$("#cd_diretor_area").val("");
		$("#nm_diretor_area").val("");
	}
	
	, setCostCenterApprovers: function(data){		
		
		$("#nm_funcao_2").val("Coordenador\\Supervisor\\Gerente da área 协调员/主管/部门经理");
		if(data && data.CodGer_area != null) {
			$("#cd_gerente_area").val(data.CodGer_area.cd);
			$("#nm_gerente_area").val(data.CodGer_area.nm);
			
			if(data.CodGer_area.nm == null || data.CodGer_area.nm.trim() == "") {
				FLUIGC.toast({
					title: 'Erro 錯誤: ',
					message: 'Gerente de matrícula "'+data.CodGer_area.cd+'" não existe no Fluig.'
						+' Por favor, crie a conta do usuário.'
						+' Fluig 中不存在代碼為 "'+data.CodGer_area.cd+'" 的管理器。請創建用戶帳戶。',
					type: 'danger'
				});
			}
		}
		
		$("#nm_funcao_3").val("Diretor da Area");
		if(data && data.CodDir_area != null){
			$("#cd_diretor_area").val(data.CodDir_area.cd);
			$("#nm_diretor_area").val(data.CodDir_area.nm);
			
			if(data.CodDir_area.nm == null || data.CodDir_area.nm.trim() == "") {
				FLUIGC.toast({
					title: 'Erro 錯誤: ',
					message: 'Diretor de matrícula "'+data.CodDir_area.cd+'" não existe no Fluig.'
						+' Por favor, crie a conta do usuário.'
						+' Fluig 中不存在代碼為 "'+data.CodDir_area.cd+'" 的導演。請創建用戶帳戶。',
					type: 'danger'
				});
			}
		}
	}
	
	, setGenericApprovers: function(data){
		$("#nm_funcao_1").val("Aprovador Armazém 控制部");
		if(data && data.aprovador_armazem != null) {
			$("#cd_aprov_armazem").val(data.aprovador_armazem.cd);
			$("#nm_aprov_armazem").val(data.aprovador_armazem.nm);
		}
		
		$("#nm_funcao_4").val("Aprovador Engenharia de Produto");
		if(data && data.aprovador_engenharia_produto != null) {
			$("#cd_aprov_eng_produto").val(data.aprovador_engenharia_produto.cd);
			$("#nm_aprov_eng_produto").val(data.aprovador_engenharia_produto.nm);
		}
		
		$("#nm_funcao_5").val("Aprovador Departamento Importação");
		if(data && data.aprovador_departamento_importacao != null) {
			$("#cd_aprov_dep_importacao").val(data.aprovador_departamento_importacao.cd);
			$("#nm_aprov_dep_importacao").val(data.aprovador_departamento_importacao.nm);
		}
		
		/*
		$("#nm_funcao_6").val("Aprovador Pós-vendas Serviços");
		if(data && data.presidencia != null) {
			$("#cd_aprov_pos_vendas_servicos").val(data.presidencia.cd);
			$("#nm_aprov_pos_vendas_servicos").val(data.presidencia.nm);
		}
		*/
		
		$("#nm_funcao_7").val("Presidente 總統");
		if(data && data.presidencia != null) {
			$("#cd_presidencia").val(data.presidencia.cd);
			$("#nm_presidencia").val(data.presidencia.nm);
		}
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
			var userId = usersInGroup.values[i]["colleagueGroupPK.colleagueId"]
			constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userId, userId, ConstraintType.SHOULD));
		}
		var users = DatasetFactory.getDataset("colleague", ["colleaguePK.colleagueId", "colleagueName"], constraints, null);
		if(users != null && users.values.length > 0){
			for(var i = 0; i < users.values.length; i++){
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