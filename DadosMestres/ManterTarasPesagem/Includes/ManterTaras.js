
function filtraTara(){
	var myQuery = document.gridTaras.getQueryObject();
	
	myQuery.setParam(1,document.getElementById('idTara').value);
	myQuery.setParam(2,document.getElementById('dsTara').value);
	
	document.gridTaras.refresh();
	
	if(document.gridTaras.getGridObject().getRowCount()==0){
		showMessage('Não existem Taras cadastradas para este filtro.','W');
	}
}

function selecionaTara(){
	
	var myGrid = document.gridTaras.getGridObject();

   // var myBrowser = document.selectLocal.getQueryObject();
	//myBrowser.setParam(1, myGrid.getSelectedCellValueByName("IDCENTRO"));
	//document.selectLocal.refresh();
	
	//if(myGrid.getSelectedCellValueByName("IDLOCALNAOCONFORME")!='---' && myGrid.getSelectedCellValueByName("IDLOCALNAOCONFORME")!=""){
	//	document.selectLocal.getBrowserObject().setSelectedItemByDatalinkValue(myGrid.getSelectedCellValueByName("IDLOCALNAOCONFORME"));
	//}

	document.getElementById('acao').value = 'U'

	document.getElementById('inpIdTara').value = myGrid.getSelectedCellValueByName("IDTARA");
	document.getElementById('inpIdTara').disabled = true;
	document.getElementById('inpDsTara').value = myGrid.getSelectedCellValueByName("DESCRICAO");
	document.getElementById('inpDsTara').disabled = false;
	document.getElementById('inpKgTara').value = myGrid.getSelectedCellValueByName("PESO");
	document.getElementById('inpKgTara').disabled = false;
	
	document.getElementById('BtExcluir').disabled = false;
	document.getElementById('BtSalvar').disabled = false;
	
  /*  if (myGrid.getSelectedCellValueByName("INATIVO")==0)
	document.getElementById('flInativo0').checked = true;
	else
	document.getElementById('flInativo1').checked = true;
	
	document.getElementById('flInativo0').disabled = false;
	document.getElementById('flInativo1').disabled = false;
	
	document.getElementById('BtExcluir').disabled = false;
	document.getElementById('BtSalvar').disabled = false;*/
}

function novaTara(){
	document.gridTaras.getGridObject().deselectAllRows();
	document.getElementById('acao').value = 'I';

	document.getElementById('inpIdTara').value = '';
	document.getElementById('inpIdTara').disabled = false;
	document.getElementById('inpDsTara').value = '';
	document.getElementById('inpDsTara').disabled = false;
	document.getElementById('inpKgTara').value = "";
	document.getElementById('inpKgTara').disabled = false;
	
	document.getElementById('BtExcluir').disabled = true;
	document.getElementById('BtSalvar').disabled = false;
}

function salvaTara(){
	var idTara     = document.getElementById('inpIdTara');
	var inpDsTara  = document.getElementById('inpDsTara');
	var kgTara     = document.getElementById('inpKgTara');
	
	if(idTara.value==""){
		showMessage('Erro ao executar operação: Código da Tara é necessário.','W');
		
		idTara.focus();
		return false;
	}
	
	if(inpDsTara.value==""){
		showMessage('Erro ao executar operação: Descrição da Tara é necessário.','W');
		inpDsTara.focus();
		return false;
	}
	
	if(kgTara.value==""){
		showMessage('Erro ao executar operação: Paso(Kg) é necessário.','W');
		kgTara.focus();
		return false;
	}else{
		kgTara.value = kgTara.value.replace(",",".");
	}
		
	var usuario = document.gridTaras.getPropertyValue("illumloginname");
	var commandObj = document.TaraInsDelUp;
	var commandQuery = commandObj.getQueryObject();
	var acao = document.getElementById('acao').value;
	
	var textoAcao = (acao=='I'?'Deseja Inserir a Tara?':'Deseja atualizar a Tara?')
	if(confirm(textoAcao)){	
		commandQuery.setParam(1,idTara.value);
		commandQuery.setParam(2,inpDsTara.value);
		commandQuery.setParam(3,kgTara.value);
		commandQuery.setParam(4,usuario);
		commandQuery.setParam(5,acao);
					
		if(commandObj.executeCommand()){
			cancelaEdit();
			filtraTara();
			showMessage('Operação executada com sucesso.','S');
		}
		else {
			showMessage('Erro ao executar operação:'+commandObj.getLastError()+'.','E');
		}
	}
}

function excluirTara(){
	
    var usuario      = document.TaraInsDelUp.getUserName();
	var commandObj   = document.TaraInsDelUp;
    var commandQuery = commandObj.getQueryObject();
	
	if(confirm('Deseja excluir esta Tara?')){
		commandQuery.setParam(1,document.getElementById('inpIdTara').value);
		commandQuery.setParam(4,usuario);
		commandQuery.setParam(5,'D');
//		commandQuery.setParam(3,'1');
		if(document.TaraInsDelUp.executeCommand()){
			cancelaEdit();
			filtraTara();
			showMessage('Operação executada com sucesso.','S');
		}
		else {
			showMessage('Erro ao executar operação:'+commandObj.getLastError()+'.','E');
		}
	}
}

function cancelaEdit(){
            hideMessage();;
	novaTara();
	document.getElementById('BtSalvar').disabled = true;
	document.getElementById('inpIdTara').disabled = true;
	document.getElementById('inpDsTara').disabled = true;
	document.getElementById('inpKgTara').disabled = true;
}