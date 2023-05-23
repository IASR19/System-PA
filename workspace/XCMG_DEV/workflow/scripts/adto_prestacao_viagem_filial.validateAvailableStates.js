function validateAvailableStates(iCurrentState, stateList) {
    // Código: 1 - Descrição: Atividade inicial
    // Código: 2 - Descrição: Atividade ordem 3
    // Código: 3 - Descrição: Atividade ordem 2
    // Código: 4 - Descrição: Atividade ordem 1
      
    // stateList atual: [2,3,4]
  
    var stateArray = new Array();
    
    /*
    if (iCurrentState == 1) {
        stateList.clear();
        stateArray.push(4,3,2);
    }
    */
   
    log.info("stateList"+stateList)
     
    //stateArray.forEach(function(code) {
    //    stateList.add(new java.lang.Integer(code));
    //});
      
    // stateList reordenado: [4,3,2]
    return stateList;
}