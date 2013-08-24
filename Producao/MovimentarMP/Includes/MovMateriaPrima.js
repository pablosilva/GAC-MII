function start(){
  //esconde links de navegação do mii
  //window.parent.document.all.NavigationArea.style.display='none';
  
  //seta datas iniciais
  hoje = new Date();
  dia = hoje.getDate();
  mes = hoje.getMonth()+1;
  ano = hoje.getFullYear();
  
  document.getElementById('dataInicioFiltro').value = "01"+"/"+(mes<10?"0"+mes:mes)+"/"+ano;
  document.getElementById('dataFimFiltro').value    = daysInMonth(mes,ano)+"/"+(mes<10?"0"+mes:mes)+"/"+ano;
  filtraOrdensProducao();
}

function filtraOrdensProducao(){
	var applet = document.gridOPs;
	var myQuery = applet.getQueryObject();
	
	myQuery.setParam(1,document.selectCentro.getBrowserObject().getSelectedDatalinkValue());
	myQuery.setParam(2,document.selectStatus.getBrowserObject().getSelectedDatalinkValue());
	myQuery.setParam(3,applet.dateToXMLFormat(document.getElementById('dataInicioFiltro').value+" 00:00:00", "dd/MM/yyyy HH:mm:ss"));
	myQuery.setParam(4,applet.dateToXMLFormat(document.getElementById('dataFimFiltro').value+" 23:59:59", "dd/MM/yyyy HH:mm:ss"));
//	myQuery.setParam(5,document.selectStatus.getBrowserObject().getSelectedDatalinkValue());
	
	applet.refresh();
	
	if(applet.getGridObject().getRowCount()==0){
		showMessage('Não existem ordens cadastradas para este filtro.','W');
	}
}

function filtraMovimentoEstoque(){
  var applet = document.gridMateriaPrima;
  
  var query = applet.getQueryObject();
  
  var gridOP = document.gridOPs.getGridObject();
  
  document.getElementById('btExibeComponente').disabled = false;
  document.getElementById('btExibePlanoCorte').disabled = false;
  document.getElementById('btVincularMaterial').disabled = false;
  document.getElementById('btDesvincularMaterial').disabled = false;

  query.setParam(1,gridOP.getSelectedCellValueByName("IDOP"));
  
  applet.refresh();
  
  	if(applet.getGridObject().getRowCount()==0){
		showMessage('Não existem materiais vinculados para esta ordem.','W');
	}
  //gridMateriaPrima
}

function openComponentes() {
	var applet = document.gridOPs;
	var gridOP = applet.getGridObject();
	applet.setPropertyValue("idOrdemProducao", gridOP.getSelectedCellValueByName("IDOP"));
	applet.setPropertyValue("idMaterial", gridOP.getSelectedCellValueByName("IDMATERIAL"));
	
	openWindow("MovMateriaPrimaComponentes.irpt", "MovMateriaPrimaComponentes", 380, 290);
}

function openPlanoCorte() {
	var applet = document.gridOPs;
	var gridOP = applet.getGridObject();
	applet.setPropertyValue("idOrdemProducao", gridOP.getSelectedCellValueByName("IDOP"));
	applet.setPropertyValue("idMaterial", gridOP.getSelectedCellValueByName("IDMATERIAL"));
	
	openWindow("MovMateriaPrimaPlanoCorte.irpt", "MovMateriaPrimaPlanoCorte", 380, 290);
}

function openVincular() {
	var applet = document.gridOPs;
	var gridOP = applet.getGridObject();
	applet.setPropertyValue("idOrdemProducao", gridOP.getSelectedCellValueByName("IDOP"));
		
	openWindow("MovMateriaPrimaVincular.irpt", "MovMateriaPrimaVincular", 320, 220);
}

function openSobrar() {
	openWindow("MovMateriaPrimaSobra.htm", "MovMateriaPrimaSobra", 300, 170);
}