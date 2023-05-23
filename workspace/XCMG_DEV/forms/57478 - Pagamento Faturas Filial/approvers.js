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
		APPROVERS.setCostCenterApprovers();
		APPROVERS.setGenericApprovers();
		APPROVERS.LOADING.hide();
		
		/*
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
		*/
		
	}
	
	, clearCostCenterApprovers: function(){
		$("#cd_gerente_area").val("");
		$("#nm_gerente_area").val("");
		
		$("#cd_aprovador_financeiro").val("");
		$("#nm_aprovador_financeiro").val("");
	}
	
	, setCostCenterApprovers: function(){
		data = getUsersByGroup("fiscal_filial");
		
		if(data.length > 0) {
			$("#cd_executor_lancar_nota").val(data[0].cd);
			$("#nm_executor_lancar_nota").val(data[0].nm);
		}
		/*
		$("#nm_funcao_1").val("Coordenador\\Supervisor\\Gerente da área 协调员/主管/部门经理");
		data = getUsersByGroup("aprovador_controladoria");
		
		if(data.length > 0) {
			$("#cd_gerente_area").val(data[0].cd);
			$("#nm_gerente_area").val(data[0].nm);
		}
		*/
		$("#nm_funcao_2").val("Aprovação Financeira");
		data = getUsersByGroup("financeiro_filial");
		
		if(data.length > 0) {
			$("#cd_aprovador_financeiro").val(data[0].cd);
			$("#nm_aprovador_financeiro").val(data[0].nm);
		}
		
	}
	
	, setGenericApprovers: function(){
		$("#nm_funcao_3").val("Controladoria 控制部");
		data = getUsersByGroup("aprovador_controladoria_filial");
		
		if(data.length > 0) {
			$("#cd_controladoria").val(data[0].cd);
			$("#nm_controladoria").val(data[0].nm);
		}
		
		$("#nm_funcao_4").val("Diretor Geral 財務經理");
		data = getUsersByGroup("diretor_geral_filial");
		
		if(data.length > 0) {
			$("#cd_diretor_geral").val(data[0].cd);
			$("#nm_diretor_geral").val(data[0].nm);
		}
		
		$("#nm_funcao_5").val("Diretor Financeiro 首席財務官");
		data = getUsersByGroup("financeiro_diretoria_filial");
		
		if(data.length > 0) {
			$("#cd_diretor_financeiro").val(data[0].cd);
			$("#nm_diretor_financeiro").val(data[0].nm);
		}
		
		
		$("#nm_funcao_6").val("Presidente 總統");
		data = getUsersByGroup("presidencia_filial");
		
		if(data.length > 0) {
			$("#cd_presidencia").val(data[0].cd);
			$("#nm_presidencia").val(data[0].nm);
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