var appletsCount=0;
var appletsLoaded=false;
var filterInterval = 0;
var messageInterval = 0;
var messageDelay = 5;
var loadingMessage = "Loading...";
var nullstring = "---";
var nullnumber = "NA";
var nulldate = "TimeUnavailable";
var dt=new Date();

function daysInMonth(month,year) {
var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
if (month != 2) return m[month - 1];
if (year % 4 != 0) return m[1];
if (year % 100 == 0 && year%400 != 0) return m[1];
return m[1] + 1;
}

function setAppletsLoaded() {
	if(document.getElementById("messageBar")) if(document.getElementById("messageBar").innerHTML=="") {
		try{
			if(!dialogArguments.parent.document.getElementById("LoadingLayer")) dialogArguments.parent.showMessage(loadingMessage, "L");
		}catch(err) {
			try{
				if(!dialogArguments.document.getElementById("LoadingLayer")) dialogArguments.showMessage(loadingMessage, "L");
			}catch(err) {
				if(!document.getElementById("LoadingLayer")) showMessage(loadingMessage, "L");
			}	
		}	
	}
	var appletTotal = document.getElementsByTagName("applet").length;
	appletsCount++;
	if(appletsCount == appletTotal) {
		appletsLoaded = true;
		if(document.getElementById("messageBar")) if(document.getElementById("messageBar").innerHTML==loadingMessage) {
			try{
				dialogArguments.parent.hideMessage();
			}catch(err) {
				try{
					dialogArguments.hideMessage();
				}catch(err) {
					hideMessage();
				}
			}
		}
		highlightInputs();
		setTimeout("start()", 100);
	}
}

function highlightTables() {
	var tableTotal = document.getElementsByTagName("table");		
	for(var i=0; i<tableTotal.length; i++) {
		if(tableTotal[i].className=="objectGrid" && tableTotal[i].allowSelection=="true") {
			var trTotal = tableTotal[i].getElementsByTagName("tr");		
			for(var j=0; j<trTotal.length; j++) {
				trTotal[j].style.cursor = 'hand';
				trTotal[j].onclick = new Function("if(this.style.backgroundColor == '#f8bd47') { this.style.backgroundColor = '' } else { highlightTablesDeselectAllRows(); this.style.backgroundColor = '#f8bd47';}");
				//trTotal[j].onmouseover = new Function("this.style.backgroundColor = '#f8bd47'");
				//trTotal[j].onmouseout = new Function("this.style.backgroundColor = ''");					
			}
		}
	}	
}

function highlightTablesDeselectAllRows() {
	var tableTotal = document.getElementsByTagName("table");		
	for(var i=0; i<tableTotal.length; i++) {
		if(tableTotal[i].className=="objectGrid") {
			var trTotal = tableTotal[i].getElementsByTagName("tr");		
			for(var j=0; j<trTotal.length; j++) {		
				trTotal[j].style.backgroundColor = '';				
			}
		}
	}			
}

function highlightInputs() {
	var inputTotal = document.getElementsByTagName("input");
	for(var i=0; i<inputTotal.length; i++) {
		if(inputTotal[i].readOnly == '') {
			if(inputTotal[i].className=="objectButton") {
				if(inputTotal[i].disabled == '') {
					inputTotal[i].onmouseover = new Function("this.style.backgroundColor = '#f8bd47'");
					inputTotal[i].onmouseout = new Function("this.style.backgroundColor = ''");		
				}
				inputTotal[i].style.cursor = 'hand';
			} else {
				if(inputTotal[i].disabled == '') {
					inputTotal[i].onfocus = new Function("this.style.backgroundColor = '#f8bd47'");
					inputTotal[i].onblur = new Function("this.style.backgroundColor = ''");								
				}			
			} 
		}
	}	
}

function showMessage(messageText, messageType) {
	messageText = validateMessage(messageText);
	document.getElementById("messageBar").innerHTML = messageText;
	if(messageText!="") {
		clearInterval(messageInterval);								
 		if(messageType=="L") {
			document.getElementById("messageBar").className = "containerMessages msgLoading";	
			document.getElementById("messageBar").onclick = new Function();
		}
		else if(messageType=="E") {
			document.getElementById("messageBar").className = "containerMessages msgError";
			document.getElementById("messageBar").onclick = new Function("hideMessage()");
		}
		else if(messageType=="W") {
			document.getElementById("messageBar").className = "containerMessages msgWarning";
			document.getElementById("messageBar").onclick = new Function("hideMessage()");
			messageInterval = setInterval("hideMessage();", messageDelay*1000);
		}
		else if(messageType=="S") {
			document.getElementById("messageBar").className = "containerMessages msgSuccessful";	
			document.getElementById("messageBar").onclick = new Function();
			messageInterval = setInterval("hideMessage();", messageDelay*1000);
		}
		document.getElementById("messageBar").style.display = "block";	
	}
	else 
hideMessage();
}

function hideMessage() {
	document.getElementById("messageBar").className = "containerMessages";	
	document.getElementById("messageBar").style.display = "none";
	document.getElementById("messageBar").innerHTML = "";
	clearInterval(messageInterval);	
}

function validateMessage(messageText) {
	if(messageText.indexOf("The DELETE statement conflicted with the REFERENCE")>=0) return "Unable to delete this item. Record being used in other table.";
	else if(messageText.indexOf("Violation of PRIMARY KEY constraint")>=0) return "Unable to insert this item. Record already exists.";
	else return messageText;
}

function openWindow(pageUrl, pageName, w, h) {
	var AuxUrl= "";
	if(pageUrl.indexOf("?")>0) AuxUrl = pageUrl;
	else AuxUrl = pageUrl + "?t=" + new Date();
	showModalDialog(AuxUrl, window, "help:no;status:no;scroll:auto;edge:raised;dialogWidth:"+w+"px;edge:raised;dialogHeight:"+h+"px");
	/*
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',status=no,scrollbars=yes,resizable=no,menubar=no'
	win = window.open(pageUrl, pageName, winprops)
	if (parseInt(navigator.appVersion) >= 4) win.window.focus();
	*/
}

function openTab(id) {
	for(var i=1; document.getElementById("tab_cel_"+i)!=null; i++) {
		if(i==1) document.getElementById("tab_img_"+i).src = "../Common/Images/tab_ini_off.gif";
		else document.getElementById("tab_img_"+i).src = "../Common/Images/tab_int_off.gif";
		if(document.getElementById("tab_cel_"+(i+1))==null) document.getElementById("tab_img_"+(i+1)).src = "../Common/Images/tab_fim_off.gif";					
		document.getElementById("tab_cel_"+i).background = "../Common/Images/tab_fun_off.gif";
		document.getElementById("tab_cel_"+i).style.color = "#666666";	
		document.getElementById("tab_cel_"+i).style.fontWeight = "normal";		
		if(document.getElementById("tab_"+i)) document.getElementById("tab_"+i).style.display = 'none';
	}
	if(id>0) {
		if(id==1) document.getElementById("tab_img_"+id).src = "../Common/Images/tab_ini_on.gif";
		else document.getElementById("tab_img_"+id).src = "../Common/Images/tab_int_on.gif";
		if(id==(i-1)) document.getElementById("tab_img_"+(id+1)).src = "../Common/Images/tab_fim_on.gif";				
		else document.getElementById("tab_img_"+(id+1)).src = "../Common/Images/tab_pos_on.gif";				
		document.getElementById("tab_cel_"+id).background = "../Common/Images/tab_fun_on.gif";	
		document.getElementById("tab_cel_"+id).style.color = "#000000";	
		document.getElementById("tab_cel_"+id).style.fontWeight = "bold";
		if(document.getElementById("tab_"+id)) document.getElementById("tab_"+id).style.display = '';	
	}
}

function disableBrowser(obj) {
	setTimeout("disableBrowserSubmit('"+obj+"')", 100);
}

function disableBrowserSubmit(obj) {
	var browserObj = eval("document." + obj);
	var Item = browserObj.getBrowserObject().getSelectedItem();
	var Datalink = browserObj.getBrowserObject().getSelectedDatalinkValue();
	browserObj.getBrowserObject().removeAll();
	browserObj.getBrowserObject().addItemWithDatalink(Item, Datalink);
}

function openLocalization() {
	openWindow("../Common/Localization.irpt", "Localization", 600, 345);
}

function openLocalizationMaterial() {
	openWindow("../Common/LocalizationMaterial.irpt", "LocalizationMaterial", 600, 345);
}

function openLocalizationShift() {
	openWindow("../Common/LocalizationShift.irpt", "LocalizationShift", 600, 345);
}

function openBrowser() {
	openWindow("../Common/Browser.irpt", "Browser", 600, 345);
}

function openCalendar() {
	openWindow("../Common/Calendar.irpt", "Calendar", 300, 445);
}

function openProductHierarchy() {
	openWindow("../Common/ProductHierarchy.irpt", "ProductHierarchy", 500, 445);
}

function IsNumeric(sText)
{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
   
   }

function formatNumberToSQL(Value, DecimalDelimiter) {
	var Aux = Value;
	Aux =Aux.replace(/\-/gi, ""); // Remove negative values
	if(DecimalDelimiter.replace(/\ /gi, "")==",") {
		Aux =Aux.replace(/\./gi, "");
		Aux =Aux.replace(/\,/gi, ".");
	}
	else {
		Aux =Aux.replace(/\,/gi, "");
	}
	return Aux;
}

function formatNumber(n, len) {  
	var s = n.toString();  
	if (s.length < len) {  
		s = ('00000000000000000000' + s).slice(-len);  
	}  
	return s;  
}

function replaceArray(arrayName,replaceTo, replaceWith){
	for(var i=0; i<arrayName.length;i++ ) if(arrayName[i]==replaceTo) arrayName.splice(i,1,replaceWith);          
	return arrayName;
} 


function distinctArray(arrayName) {
	var newArray=new Array();
	label:for(var i=0; i<arrayName.length;i++ ) {  
		for(var j=0; j<newArray.length;j++ ) if(newArray[j]==arrayName[i]) continue label;
            	newArray[newArray.length] = arrayName[i];
	}
	return newArray;
}

function onlyNumbers(field, decimal, evt) {
	var e = event || evt; // for trans-browser compatibility
	var charCode = e.which || e.keyCode;
	var decimalPlaces = 3;
	if(decimal=="." && charCode==46 && field.value.indexOf(".")>=0) return false;
	if(decimal=="," && charCode==44 && field.value.indexOf(",")>=0) return false;
	//if(decimal=="." && charCode==44) return false;
	//if(decimal=="," && charCode==46) return false;
	if (charCode > 31 && (charCode < 48 || charCode > 57) &&  charCode != 44 && charCode != 46) return false;
	/*
	var AuxArray = field.value.split(decimal);
	if(AuxArray.length>1) {
		if(AuxArray[1].length>=decimalPlaces) {
			return false;
		}
	}
	*/
	return true;
}

function onlyNumbersFocus(id) {
	var Aux = document.getElementById(id).value;
	document.getElementById(id).value = "";
	document.getElementById(id).value = Aux;
}

function onlyID(evt) {
	var e = event || evt; // for trans-browser compatibility
	var charCode = e.which || e.keyCode;
	if (charCode==32) return false; // Space
	return true;
}

function onlyUpperCase(field, evt) {
	field.value = field.value.toUpperCase();
	return true;
}

function getDateNow() {
	var now = new Date();
	return  formatNumber(now.getYear(), 4) + "-" + formatNumber((now.getMonth()+1), 2) + "-" + formatNumber(now.getDate(), 2);
}

function showLoading() {
	document.write("<div id='LoadingLayer'><iframe src='../Common/LoadingLayer.htm' style='width:100%; height:100%;filter:alpha(opacity=100);border:0px;' border='0' frameborder='0'></iframe></div>");
}

function hideLoading() {
	if(document.getElementById("LoadingLayer")) document.getElementById("LoadingLayer").style.display = 'none';
	showMessage("It took " + ((new Date() - dt)/1000) + " seconds to load the screen.", "W");
}

function validateTime(timeStr) {
	var a,b,c,f,err=0;
	a=timeStr;
	if (a.length != 5) err=1;
	b = a.substring(0, 2);
	c = a.substring(2, 3);
	f = a.substring(3, 5);
	if (/\D/g.test(b)) err=1; //not a number
	if (/\D/g.test(f)) err=1;
	if (b<0 || b>23) err=1;
	if (f<0 || f>59) err=1;
	if (c != ':') err=1;
	if (err==1)  return false;
	else return true;
}


function trim (myString)
{
	return myString.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

function thousandSeparator(n,sep) {
	var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})'),
	sValue=n+"";
	if (sep === undefined) {sep=',';}
	while(sRegExp.test(sValue)) {
		sValue = sValue.replace(sRegExp, "$1"+sep+"$2");
	}
	return sValue;
}

//variaveis globais para datas
var mostraCal;
var campoData;

function showCalendario(campo) {

/*
No onclick do body dever se colocar uma funcao:
<body onclick="hideCalendario();">

deverá ser criado um applet na tela de html juntamente com um div
<div id="calendar" class="calendar">
  <APPLET NAME="calendarioData" id="calendarioData" CODEBASE="/XMII/Classes" CODE="iCalendar" ARCHIVE="illum8.zip" WIDTH="195" HEIGHT="136" TABINDEX=1 MAYSCRIPT>
  <PARAM NAME="DisplayTemplate" VALUE="ACOCEARENSE&#x2f;Common&#x2f;Display&#x2f;calendarioData">
  <PARAM NAME="Content-Type" VALUE="image&#x2f;png">
  <PARAM NAME="CreationEvent" VALUE="setAppletsLoaded">
  <PARAM NAME="SelectionEvent" VALUE="getDataCalendario">
</APPLET>
</div>
exemplo execução: 
        <img src="../../Common/Images/calendar.png" width="16" height="16" onclick="showCalendario(document.getElementById('dataInicioFiltro'));" style="cursor:pointer;"/>
*/
  campoData = campo;
  var x=window.event.clientX;
  var y=window.event.clientY;
  document.getElementById('calendar').style.top  = y;
  document.getElementById('calendar').style.left = x;
  document.getElementById('calendar').style.display = 'block';
  mostraCal=0;
  document.calendarioData.setDate(campoData.value, "dd/MM/yyyy");
}

function hideCalendario(){
  if(mostraCal==1){
    document.getElementById('calendar').style.display = "none";
    mostraCal=0;
  }
  if(document.getElementById('calendar').style.display=="block"){
    mostraCal=1;
  }
}

function getDataCalendario(){
  campoData.value = document.calendarioData.getDateAsString("dd/MM/yyyy");
  mostraCal==1;
  hideCalendario();
}