function preencherTbl(){
			
			var dataset = DatasetFactory.getDataset("protheus_historico_salarial", FIELDS, constraints, null);
			
			if(dataset != null && dataset.rowsCount > 0){
				
				var linha = dataset.values;
				
				for(var i = 0; i < dataset.rowsCount; i++){
					var linha = childAdd();
					
					var rep = row[i];
					
					var data = dataset["R7_DATA"];
					var funcao = dataset["R7_FUNCAO"] + " - " + dataset["R7_DESCFUN"];
					var valor_salario = dataset["teste_vlr_salario"];
					var descricao = dataset["R7_DESCTIP"];
					
					$("#dt_historico_salarial_data___" + rep).val(data);
					$("#nm_historico_salarial_funcao___" + rep).val(funcao);
					$("#vl_historico_salarial_salario___" + rep).val(valor_salario);
					$("#nm_historico_salarial_descricao___" + rep).val(descricao);		
					
				}
			}
		}


//Adicionar um novo item na tabela
function childAdd(){
	
	var row = wdkAddChild('tb_historico_salarial');
	
}
