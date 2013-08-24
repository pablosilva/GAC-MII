function start(){
	
}

function filtraPlanta(){
	var myQuery = document.gridPlanta.getQueryObject();
	
	myQuery.setParam(1,document.getElementById('idPlantaFiltro').value);
	myQuery.setParam(2,document.getElementById('descricaoFiltro').value);
	
	document.gridPlanta.refresh();
	
	if(document.gridPlanta.getGridObject().getRowCount()==0){
		showMessage('Não existem plantas cadastradas para este filtro.','W');
	}
}

function selecionaPlanta(){
	var myGrid = document.gridPlanta.getGridObject();

   	var myBrowser = document.selectLocal.getQueryObject();
	
	myBrowser.setParam(1, myGrid.getSelectedCellValueByName("IDCENTRO"));
	
	document.selectLocal.refresh();
	
	if(myGrid.getSelectedCellValueByName("IDLOCALNAOCONFORME")!='---' && myGrid.getSelectedCellValueByName("IDLOCALNAOCONFORME")!=""){
		document.selectLocal.getBrowserObject().setSelectedItemByDatalinkValue(myGrid.getSelectedCellValueByName("IDLOCALNAOCONFORME"));
	}

	document.getElementById('acao').value = 'U'

	document.getElementById('idPlanta').value = myGrid.getSelectedCellValueByName("IDCENTRO");
	document.getElementById('idPlanta').disabled = true;
	document.getElementById('dsDescricao').value = myGrid.getSelectedCellValueByName("DESCRICAO");
	document.getElementById('dsDescricao').disabled = false;

    if (myGrid.getSelectedCellValueByName("INATIVO")==0)
	document.getElementById('flInativo0').checked = true;
	else
	document.getElementById('flInativo1').checked = true;
	
	document.getElementById('flInativo0').disabled = false;
	document.getElementById('flInativo1').disabled = false;
	
	document.getElementById('BtExcluir').disabled = false;
	document.getElementById('BtSalvar').disabled = false;
}

function novaPlanta(){
	document.gridPlanta.getGridObject().deselectAllRows();
	document.getElementById('acao').value = 'I';

	document.getElementById('idPlanta').value = '';
	document.getElementById('idPlanta').disabled = false;
	document.getElementById('dsDescricao').value = '';
	document.getElementById('dsDescricao').disabled = false;
	document.getElementById('flInativo0').checked = true;
	document.getElementById('flInativo0').disabled = false;
	document.getElementById('flInativo1').disabled = false;
	
	document.getElementById('BtExcluir').disabled = true;
	document.getElementById('BtSalvar').disabled = false;
}

function salvaPlanta(){
	var idpla = document.getElementById('idPlanta');
	var desc  = document.getElementById('dsDescricao');
	
	if(idpla.value==""){
		showMessage('Erro ao executar operação: Código da planta é necessário.','W');
		idpla.focus();
		return false;
	}
	if(desc.value==""){
		showMessage('Erro ao executar operação: Descrição da planta é necessário.','W');
		desc.focus();
		return false;
	}
		
	var usuario = document.gridPlanta.getPropertyValue("illumloginname");
	var commandObj = document.plantaInsUpdDel;
	var commandQuery = commandObj.getQueryObject();
	var acao = document.getElementById('acao').value;
	
	var textoAcao = (acao=='I'?'Deseja inserir a planta?':'Deseja atualizar a planta?')
	if(confirm(textoAcao)){	
		commandQuery.setParam(1,idpla.value);
		commandQuery.setParam(2,desc.value);
		commandQuery.setParam(3,document.selectLocal.getBrowserObject().getSelectedDatalinkValue());
		commandQuery.setParam(4,(document.getElementById('flInativo0').checked?0:1));
		commandQuery.setParam(5,usuario);		
		commandQuery.setParam(6,acao);
					
		if(commandObj.executeCommand()){
			cancelaEdit();
			filtraPlanta();
			showMessage('Operação executada com sucesso.','S');
		}
		else {
			showMessage('Erro ao executar operação:'+commandObj.getLastError()+'.','E');
		}
	}
}

function excluirPlanta(){
    var usuario = document.plantaInsUpdDel.getUserName();
	var commandObj = document.plantaInsUpdDel;
    var commandQuery = commandObj.getQueryObject();
	
	if(confirm('Deseja excluir esta planta?')){
		commandQuery.setParam(1,document.getElementById('idPlanta').value);
		commandQuery.setParam(5,usuario);
		commandQuery.setParam(6,'D');
//		commandQuery.setParam(3,'1');
		if(document.plantaInsUpdDel.executeCommand()){
			cancelaEdit();
			filtraPlanta();
			showMessage('Operação executada com sucesso.','S');
		}
		else {
			showMessage('Erro ao executar operação:'+commandObj.getLastError()+'.','E');
		}
	}
}

function cancelaEdit(){
	novaPlanta();
	document.getElementById('BtSalvar').disabled = true;
	document.getElementById('idPlanta').disabled = true;
	document.getElementById('dsDescricao').disabled = true;
	document.getElementById('flInativo0').checked = true;
	document.getElementById('flInativo0').disabled = true;
	document.getElementById('flInativo1').disabled = true;
}