var Prototype_appletsCount=-1; 
var appletsCount=0;
var appletsLoaded=false;
var messageInterval = 0;
var messageDelay = 5;
var loadingMessage = "Loading screen...";
var nullstring = "---";
var nullnumber = "NA";
var nulldate = "TimeUnavailable";

function Prototype_setAppletsLoaded() {
	var appletTotal = document.getElementsByTagName("applet").length;
	Prototype_appletsCount++;
	if(Prototype_appletsCount == appletTotal) {
		setTimeout("start();", 100);
		var inputTotal = document.getElementsByTagName("input");		
		for(var i=0; i<inputTotal.length; i++) {
			if(inputTotal[i].className=="objectButton") {
				inputTotal[i].onmouseover = new Function("this.style.backgroundColor = '#f8bd47'");
				inputTotal[i].onmouseout = new Function("this.style.backgroundColor = ''");		
				inputTotal[i].style.cursor = 'hand';
			} else {
				inputTotal[i].onfocus = new Function("this.style.backgroundColor = '#f8bd47'");
				inputTotal[i].onblur = new Function("this.style.backgroundColor = ''");											
			} 
		}	
		var tableTotal = document.getElementsByTagName("table");		
		for(var i=0; i<tableTotal.length; i++) {
			if(tableTotal[i].className=="objectGrid" && tableTotal[i].allowSelection=="true") {
				var trTotal = tableTotal[i].getElementsByTagName("tr");		
				for(var j=0; j<trTotal.length; j++) {
					trTotal[j].style.cursor = 'hand';
					trTotal[j].onclick = new Function("if(this.style.backgroundColor == '#f8bd47') { this.style.backgroundColor = '' } else { Prototype_deselectAllRows(); this.style.backgroundColor = '#f8bd47';}");
					//trTotal[j].onmouseover = new Function("this.style.backgroundColor = '#f8bd47'");
					//trTotal[j].onmouseout = new Function("this.style.backgroundColor = ''");					
				}
			}
		}			
	}
}

function Prototype_deselectAllRows() {
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

function setAppletsLoaded() {
	if(document.getElementById("messageBar")) if(document.getElementById("messageBar").innerHTML=="") {
		try{
			dialogArguments.showMessage(loadingMessage, "L");
		}catch(err) {
			showMessage(loadingMessage, "L");
		}	
	}
	var appletTotal = document.getElementsByTagName("applet").length;
	appletsCount++;
	if(appletsCount == appletTotal) {
		appletsLoaded = true;
		if(document.getElementById("messageBar")) if(document.getElementById("messageBar").innerHTML==loadingMessage) {
			try{
				dialogArguments.hideMessage();
			}catch(err) {
				hideMessage();
			}	
		}
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
				trTotal[j].onclick = new Function("if(this.style.backgroundColor == '#f8bd47') { this.style.backgroundColor = '' } else { highlightTablesPrototype_deselectAllRows(); this.style.backgroundColor = '#f8bd47';}");
				//trTotal[j].onmouseover = new Function("this.style.backgroundColor = '#f8bd47'");
				//trTotal[j].onmouseout = new Function("this.style.backgroundColor = ''");					
			}
		}
	}	
}

function highlightTablesPrototype_deselectAllRows() {
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
		if(inputTotal[i].readOnly == '' && inputTotal[i].disabled == '') {
			if(inputTotal[i].className=="objectButton") {
				inputTotal[i].onmouseover = new Function("this.style.backgroundColor = '#f8bd47'");
				inputTotal[i].onmouseout = new Function("this.style.backgroundColor = ''");		
				inputTotal[i].style.cursor = 'hand';
			} else {
				inputTotal[i].onfocus = new Function("this.style.backgroundColor = '#f8bd47'");
				inputTotal[i].onblur = new Function("this.style.backgroundColor = ''");											
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