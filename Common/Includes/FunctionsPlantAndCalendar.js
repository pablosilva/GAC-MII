function loadPlant() {
	document.ID_PLANT.getQueryObject().setParam(3, getDateNow());
	document.ID_PLANT.updateBrowser(true);
	if(document.ID_PLANT.getBrowserObject().getItemCount()<=0) return false;
	else return true;
}	

function loadCalendar() {
	var ID_CALEN = document.ID_PLANT.getBrowserObject().getSelectedDatalinkValue().split("|")[3];
	var DS_CALEN = document.ID_PLANT.getBrowserObject().getSelectedDatalinkValue().split("|")[4];
	if(ID_CALEN==undefined || ID_CALEN==nullstring || ID_CALEN=="") {
		document.getElementById("ID_CALEN").value = "";
		document.getElementById("DS_CALEN").value = "";
		return false;
	}
	else {
		document.getElementById("ID_CALEN").value = ID_CALEN;
		document.getElementById("DS_CALEN").value = DS_CALEN;
		return true;
	}
}