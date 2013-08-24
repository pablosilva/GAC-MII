var valida_payoff = 0;
var GloIdCentro;
var selected_row = 0;

function trim(s)
{
	var l=0; var r=s.length -1;
	while(l < s.length && s[l] == ' ')
	{	l++; }
	while(r > l && s[r] == ' ')
	{	r-=1;	}
	return s.substring(l, r+1);
}


function filtraPlanta(){
	
	var myBrowser = document.selectPlant.getBrowserObject();
	var idCentro = myBrowser.getSelectedDatalinkValue();
	
	var myQuery = document.gridCentros.getQueryObject();
	
	myQuery.setParam(1,idCentro);
	myQuery.setParam(2,document.getElementById('codigo').value);
    myQuery.setParam(3,document.getElementById('descricao').value);
	
	document.gridCentros.refresh();
	
	if(document.gridCentros.getGridObject().getRowCount()==0){
		showMessage('Não existem centros de trabalho cadastrados para este filtro.','W');
	}
}
function filtrarPayoff(){
	
	var myQuery = document.gridPayoff.getQueryObject();
	
	myQuery.setParam(1,GloIdCentro);
		
	document.gridPayoff.refresh();
}
	

function selecionaCentro(){
	
	document.getElementById('BtInsert').disabled = false;
	
	var myGrid = document.gridCentros.getGridObject();
    
	selected_row = myGrid.getSelectedRow();
	 
	//combo Impressoras
	if(myGrid.getSelectedCellValueByName("IDIMPRESS")!='---' && myGrid.getSelectedCellValueByName("IDIMPRESS")!="" && myGrid.getSelectedCellValueByName("IDIMPRESS")!="NA"){
		document.selectImpressora.getBrowserObject().setSelectedItemByDatalinkValue(myGrid.getSelectedCellValueByName("IDIMPRESS"));
	}else{
	    document.selectImpressora.getBrowserObject().setSelectedItemByDatalinkValue("");
	}
	
	//Combo tipo de consumo
	if(myGrid.getSelectedCellValueByName("IDCONSUMO")!='---' && myGrid.getSelectedCellValueByName("IDCONSUMO")!=""){
		document.selectConsumo.getBrowserObject().setSelectedItemByDatalinkValue(myGrid.getSelectedCellValueByName("IDCONSUMO"));
	}else{
	    document.selectConsumo.getBrowserObject().setSelectedItemByDatalinkValue("");
	}
	
	//Combo Balancas
	if(myGrid.getSelectedCellValueByName("IDBALAN")!='---' && myGrid.getSelectedCellValueByName("IDBALAN")!="" && myGrid.getSelectedCellValueByName("IDBALAN")!="NA"){
		document.selectBalanca.getBrowserObject().setSelectedItemByDatalinkValue(myGrid.getSelectedCellValueByName("IDBALAN"));
	}else{
	    document.selectBalanca.getBrowserObject().setSelectedItemByDatalinkValue("");
	}
                                                                                 
	document.getElementById('idMaquina').value = myGrid.getSelectedCellValueByName("CODMAQUINALOTE");
	
	//Payoff?
	if(myGrid.getSelectedCellValueByName("PAYOFF")=="Sim"){
		document.getElementById('payoff_si').checked = true;
		payoff_but(false);
		valida_payoff = 1;
	}else{
    	document.getElementById('payoff_no').checked = true;
		valida_payoff = 0;
		payoff_but(true);
	}
	//Usa Tara?
	if(myGrid.getSelectedCellValueByName("TARAPESAGEM")=="Sim"){
		document.getElementById('tara_si').checked = true;
	}else{
    	document.getElementById('tara_no').checked = true;
	}
}

function salvaCentro(){

     var idMaquina  = trim(document.getElementById('idMaquina').value);
	
	if(idMaquina.length==0){
		showMessage('Campo Id M&aacute;quina &eacute; obrigat&oacute;rio.','E');
		document.getElementById('idMaquina').focus();
		return false;
	}
	
	if((valida_payoff == 0 && document.getElementById('payoff_si').checked == true) || (valida_payoff != 0 && document.getElementById('payoff_no').checked == true)){
		showMessage('Erro ao executar operação: verificar os Payoffs.','W');
		return false;
	}
	
	var myBrowser   = document.selectConsumo.getBrowserObject();	                           
	var TipoConsumo = myBrowser.getSelectedDatalinkValue();
    if(TipoConsumo==""){ 
	showMessage('Erro ao executar operação: escolher um Tipo de Consumo.','W');
		return false;
	}
	var myBrowser_imp   = document.selectImpressora.getBrowserObject();	                           
	var impresora = myBrowser_imp.getSelectedDatalinkValue();
    if(impresora==""){ 
	showMessage('Erro ao executar operação: escolher uma Impressora.','W');
		return false;
	}
    var myBrowser_bal   = document.selectBalanca.getBrowserObject();	                           
	var balanca = myBrowser_bal.getSelectedDatalinkValue();
    if(balanca==""){ 
	showMessage('Erro ao executar operação: escolher uma Balanca.','W');
		return false;
	}
	
	//var myBrowser_cen = document.selectPlant.getBrowserObject();
	//var idCentro = myBrowser_cen.getSelectedDatalinkValue();
	
	var myGrid        = document.gridCentros.getGridObject();
	var idCentro      =  myGrid.getSelectedCellValueByName("IDCENTRO");
  //  var row           = myGrid.getSelectedRow();
//	var idObjeto      = myGrid.getCellValue(row, 1);
	var idObjeto      = myGrid.getSelectedCellValueByName("IDOBJETO");
	var usuario       = document.gridCentros.getPropertyValue("illumloginname");
	var commandObj    = document.plantaUpdDel;
	var commandQuery  = commandObj.getQueryObject();
	
	var textoAcao = 'Deseja atualizar o centro?';
	
	if(confirm(textoAcao)){	

		commandQuery.setParam(1,idCentro);
		commandQuery.setParam(2,idObjeto);
		commandQuery.setParam(3,TipoConsumo);
		commandQuery.setParam(4,impresora);
     	commandQuery.setParam(5,(document.getElementById('tara_si').checked?1:0));				
		commandQuery.setParam(6,balanca);
		commandQuery.setParam(7,document.getElementById('idMaquina').value);				
		
		if(commandObj.executeCommand()){
			//cancelaEdit();
            filtraPlanta();
			showMessage('Operação executada com sucesso.','S');
		}
		else {
			showMessage('Erro ao executar operação:'+commandObj.getLastError()+'.','E');
		}
	}
}


function salvaPayoff(acao){
	
	var payoff  = trim(document.getElementById('payoff').value);
	
	if(payoff.length==0 && acao == "I"){
		showMessage('Campo PayOff &eacute; obrigat&oacute;rio.','E');
		document.getElementById('payoff').focus();
		return false;
	}

	
	var myGrid        = document.gridPayoff.getGridObject();
    var selected_row  = myGrid.getSelectedRow();
	var ParteCentro   = myGrid.getCellValue(selected_row, 2);
	
	if(ParteCentro=="" && acao == "D"){
		return false;
	}
	
	var usuario       = document.gridPayoff.getPropertyValue("illumloginname");
	var commandObj    = document.payoffInsDel;
	var commandQuery  = commandObj.getQueryObject();
		
	var textoAcao = (acao=='I'?'Deseja Inserir o PayOff?':'Deseja remover o PayOff?')
	if(confirm(textoAcao)){	

		commandQuery.setParam(1,GloIdCentro);
		commandQuery.setParam(2,ParteCentro);
		commandQuery.setParam(3,document.getElementById('payoff').value);
		commandQuery.setParam(4,usuario);
		commandQuery.setParam(5,acao);
					
		if(commandObj.executeCommand()){
			//cancelaEdit();
            filtrarPayoff();
			showMessage('Operação executada com sucesso.','S');
		}
		else {
			showMessage('Erro ao executar operação:'+commandObj.getLastError()+'.','E');
		}
	}
}

function payoff_but(status){

document.getElementById('BtPayoff').disabled = status;

}

function UpdateFields(payoff) {
	//var myGrid       = document.gridCentros.getGridObject();
    //var selected_row = myGrid.getSelectedRow();	
	valida_payoff = payoff;
	
	if(payoff != 0){
		document.getElementById('payoff_si').checked = true;	
		//myGrid.setCellValue(selected_row, 8, "Sim");
	}else{
		document.getElementById('payoff_no').checked = true;
		//myGrid.setCellValue(selected_row, 8, "Não");
		payoff_but(true);
	}

}

function ShowModal () {

	if(selected_row == 0){
		return false;
	}
	var myGrid = document.gridCentros.getGridObject();

	var idCentro = myGrid.getSelectedCellValueByName("IDOBJETO");
    var payoff;          
	var sharedObject = {};

	sharedObject.payoff   = 0;
	sharedObject.idCentro = idCentro;
	sharedObject.dsCentro = myGrid.getSelectedCellValueByName("DESCRICAO");
	//sharedObject.surname = "SURN";
            
	if (window.showModalDialog) {
		var retValue = showModalDialog ("CentroTrabalhoPayOff.htm", sharedObject, "dialogWidth:350px; dialogHeight:310px; dialogLeft:300px;");
		if (retValue) {

			UpdateFields(retValue.payoff);
			filtraPlanta();
			myGrid.setSelectedRow(selected_row);
		}
	}/*else {
		// for similar functionality in Opera, but it's not modal!
		var modal = window.open ("modal.htm", null, "width=200,height=200,left=300,modal=yes,alwaysRaised=yes", null);
		modal.dialogArguments = sharedObject;
	}*/
}

function Init() {
	//esta funcion estaba en el onload de la ventana modal
	Prototype_setAppletsLoaded();
	
	var sharedObject = window.dialogArguments;

	GloIdCentro = sharedObject.idCentro;
	document.getElementById('dsCentro').value = sharedObject.dsCentro;
	
	//refresca la grilla de payoffs
    filtrarPayoff();
}

function OnOK () {

	
	if (window.showModalDialog) {
		//contar cuantas lineas tiene la grilla para el centro
	    var myGrid = document.gridPayoff.getGridObject();
		var payoffs = myGrid.getRowCount();
		
		var sharedObject = {};

		sharedObject.payoff = payoffs;

		window.returnValue = sharedObject;
	}else {
		// if not modal, we cannot use the returnValue property, we need to update the opener window
		window.opener.UpdateFields(payoff.value);
	}
	window.close ();
}

function OnCancel () {
	window.close ();
}

function cancelEdit(){
	hideMessage()
	document.gridCentros.getGridObject().deselectAllRows();
	document.getElementById('payoff_no').checked = true;
            document.getElementById('BtInsert').disabled = true;
	payoff_but(true);
	document.selectImpressora.getBrowserObject().setSelectedItemByDatalinkValue("");
	document.selectConsumo.getBrowserObject().setSelectedItemByDatalinkValue("");
	document.selectBalanca.getBrowserObject().setSelectedItemByDatalinkValue("");
	document.getElementById('idMaquina').value = ""
}