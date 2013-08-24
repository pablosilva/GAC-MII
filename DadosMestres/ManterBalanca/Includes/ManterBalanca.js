function start(){
	
}

function filtraBalanca(){
	var myQuery = document.gridBalanca.getQueryObject();
	
	myQuery.setParam(1,document.getElementById('idBalancaFiltro').value);
	myQuery.setParam(2,document.getElementById('descricaoFiltro').value);
	myQuery.setParam(3,document.getElementById('modeloFiltro').value);
	
	document.gridBalanca.refresh();
	
	if(document.gridBalanca.getGridObject().getRowCount()==0){
		showMessage('Não existem balanças cadastradas para este filtro.','W');
	}
}

function selecionaBalanca(){
	var myGrid = document.gridBalanca.getGridObject();

	document.getElementById('acao').value = 'U'

	document.getElementById('idBalanca').value = myGrid.getSelectedCellValueByName("IDBALANCA");
	document.getElementById('idBalanca').disabled = true;
	document.getElementById('dsDescrica').value = myGrid.getSelectedCellValueByName("DESCRICAO");
	document.getElementById('dsDescrica').disabled = false;

    if (myGrid.getSelectedCellValueByName("CONTINGENCIAATIVA")=='Sim')
	document.getElementById('flContigencia1').checked = true;
	else
	document.getElementById('flContigencia0').checked = true;
	
	document.getElementById('flContigencia1').disabled = false;
	document.getElementById('flContigencia0').disabled = false;
	
	document.getElementById('cdModelo').value = myGrid.getSelectedCellValueByName("MODELO");
	document.getElementById('cdModelo').disabled = false;
	document.getElementById('dsConexao').value = myGrid.getSelectedCellValueByName("CONNECTIONSTRING");
	document.getElementById('dsConexao').disabled = false;
	
	document.getElementById('BtExcluir').disabled = false;
	document.getElementById('BtSalvar').disabled = false;
}

function novaBalanca(){
	document.gridBalanca.getGridObject().deselectAllRows();
	document.getElementById('acao').value = 'I';

	document.getElementById('idBalanca').value = '';
	document.getElementById('idBalanca').disabled = false;
	document.getElementById('dsDescrica').value = '';
	document.getElementById('dsDescrica').disabled = false;
	document.getElementById('flContigencia1').disabled = false;
	document.getElementById('flContigencia0').disabled = false;
	document.getElementById('flContigencia0').checked = true;
	document.getElementById('cdModelo').value = '';
	document.getElementById('cdModelo').disabled = false;
	document.getElementById('dsConexao').value = '';
	document.getElementById('dsConexao').disabled = false;
	
	document.getElementById('BtExcluir').disabled = true;
	document.getElementById('BtSalvar').disabled = false;
}

function salvaBalanca(){
	var idbal = document.getElementById('idBalanca');
	var desc  = document.getElementById('dsDescrica');
	var conex = document.getElementById('dsConexao');
	var model = document.getElementById('cdModelo');
	
	if(idbal.value==""){
		showMessage('Erro ao executar operação: Código da balança é necessário.','W');
		idbal.focus();
		return false;
	}
	if(desc.value==""){
		showMessage('Erro ao executar operação: Descrição da balança é necessário.','W');
		desc.focus();
		return false;
	}
	if(model.value==""){
		showMessage('Erro ao executar operação: Modelo da balança é necessário.','W');
		model.focus();
		return false;
	}
	if(conex.value==""){
		showMessage('Erro ao executar operação: Conexão da balança é necessário.','W');
		conex.focus();
		return false;
	}
		
	var usuario = document.balancaInsUpdDel.getPropertyValue("illumloginname");
	var commandObj = document.balancaInsUpdDel;
	var commandQuery = commandObj.getQueryObject();
	var acao = document.getElementById('acao').value;
	var textoAcao = (acao=='I'?'Deseja inserir a balança?':'Deseja atualizar a balança?')
	if(confirm(textoAcao)){	
		commandQuery.setParam(1,idbal.value);
		commandQuery.setParam(2,desc.value);
		commandQuery.setParam(3,conex.value);
		commandQuery.setParam(4,model.value);
		commandQuery.setParam(5,(document.getElementById('flContigencia1').checked?1:0));
		commandQuery.setParam(6,usuario);		
		commandQuery.setParam(7,acao);
					
		if(commandObj.executeCommand()){
			cancelaEdit();
			filtraBalanca();
			showMessage('Operação executada com sucesso.','S');
		}
		else {
			showMessage('Erro ao executar operação:'+commandObj.getLastError()+'.','E');
		}
	}
}

function excluirBalanca(){
    var usuario = document.balancaInsUpdDel.getUserName();
	var commandObj = document.balancaInsUpdDel;
    var commandQuery = commandObj.getQueryObject();
	
	if(confirm('Deseja excluir esta balança?')){
		//document.balancaInsUpdDel.setQueryTemplate("ACOCEARENSE/DadosMestres/Atualizar/Balanca/Query/teste");
		commandQuery.setParam(1,document.getElementById('idBalanca').value);
		commandQuery.setParam(6,usuario);
		commandQuery.setParam(7,'D');
//		commandQuery.setParam(3,'1');
		if(document.balancaInsUpdDel.executeCommand()){
			cancelaEdit();
			filtraBalanca();
			showMessage('Operação executada com sucesso.','S');
		}
		else {
			showMessage('Erro ao executar operação:'+commandObj.getLastError()+'.','E');
		}
	}
}

function cancelaEdit(){
	novaBalanca();
	document.getElementById('BtSalvar').disabled = true;
	document.getElementById('idBalanca').disabled = true;
	document.getElementById('dsDescrica').disabled = true;
	document.getElementById('flContigencia1').checked = true;
	document.getElementById('flContigencia1').disabled = true;
	document.getElementById('flContigencia0').disabled = true;
	document.getElementById('cdModelo').disabled = true;
	document.getElementById('dsConexao').disabled = true;
}