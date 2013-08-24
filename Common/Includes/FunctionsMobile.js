// JavaScript Document

var dataProviderInterval = 0;
var dataProviderTimeout = 60;
var dataProviderHTTP;
var dataProviderXML;
var dataProviderError;
var requestError = "";
var nullstring = "---";
var nullnumber = "NA";
var nulldate = "TimeUnavailable";
var messageInterval = 0;
var messageDelay = 5;
var barcodeInterval = 0;
var barcodeFrequency = 300;

var lastSubmitedTransactionName;
var lastSubmitedParameters;
var lastSubmitedFunctionName;
var lastSubmitedReturnResult;

// AJAX FUNCTIONS ----------------------------------------------------------------------------------

function submitDataProvider(transactionName, parameters, functionName, returnResult) {
	lastSubmitedTransactionName = transactionName;
	lastSubmitedParameters = parameters;
	lastSubmitedFunctionName = functionName;
	lastSubmitedReturnResult = returnResult;
	if(window.XMLHttpRequest) dataProviderHTTP =  new XMLHttpRequest();
	else if(window.ActiveXObject) {
		try { 
			dataProviderHTTP = new ActiveXObject("Microsoft.XMLHTTP"); // Windows Mobile 6
		} catch(err) { 
			dataProviderHTTP = new ActiveXObject("Msxml2.XMLHTTP"); // Windows Mobile 5
		}
	}
	if(dataProviderHTTP) {
		var outputParam = "";
		if(returnResult) outputParam = "&OutputParameter=Output";
		var url = "/XMII/Runner?Transaction=" + transactionName + "&" + encodeURI(parameters) + outputParam + "&Content-Type=text/xml";
		dataProviderXML = null;
		dataProviderError = null;
		requestError = "";
		dataProviderHTTP.onreadystatechange = function() { stateChangedDataProvider(functionName) };
		dataProviderHTTP.open("GET", encodeUrl(url), true);
		dataProviderHTTP.send(null);
		clearTimeout(dataProviderInterval); 
		dataProviderInterval = setTimeout("abortDataProvider(\""+functionName+"\")", (dataProviderTimeout*1000));
	}
	else showCompErrorDataProvider();
}

function resubmitDataProvider() {
	submitDataProvider(lastSubmitedTransactionName, lastSubmitedParameters, lastSubmitedFunctionName, lastSubmitedReturnResult);
}

function encodeUrl(url) {
	var auxUrl = url;
	auxUrl = auxUrl.replace(/%/g, '%25');
	return auxUrl;
}

function stateChangedDataProvider(functionName) {
	if(dataProviderHTTP.readyState == 4) {
		clearTimeout(dataProviderInterval); 
		if(dataProviderHTTP.status == 200) {		
			try {
				dataProviderXML = dataProviderHTTP.responseXML.documentElement;
				dataProviderError = dataProviderXML.getElementsByTagName("FatalError")[0];
				eval(functionName);		
			} catch(err) {
				showXmlErrorDataProvider(functionName);
			}
		}
		else {
			showConnErrorDataProvider(functionName, dataProviderHTTP.status, dataProviderHTTP.statusText);
		}
	}
}

function abortDataProvider(functionName) {
	hideMessage();
	dataProviderHTTP.abort();	
	requestError = "Connection timeout...";
	dataProviderError = true;
	eval(functionName);	
}

function showCompErrorDataProvider() {
	hideMessage();
	alert("Your browser does not support AJAX.");	
}

function showConnErrorDataProvider(functionName, status, statusText) {
	if(status == "12029") {
		showMessage("Connecting to wireless...", "L");
		setTimeout("resubmitDataProvider()", 5000);
	}
	else {
		hideMessage();	
		requestError = "Connection error: " + status + " - " + statusText;
		dataProviderError = true;
		eval(functionName);
		lastSubmitedTransactionName = "";
		lastSubmitedParameters = "";
		lastSubmitedFunctionName = "";
		lastSubmitedReturnResult = "";
	}
}

function showXmlErrorDataProvider(functionName) {
	if(dataProviderHTTP.responseText.indexOf("<html>")>0 || dataProviderHTTP.responseText.indexOf("<HTML>")>0) {
		hideMessage();	
		requestError = "Your session has timed out. Please login again.";
		dataProviderError = true;
		eval(functionName);
		hideMessage();	
		alert(requestError);
		document.location.href='/XMII/';
	}
	else {
		hideMessage();	
		requestError = "XML format not supported.\n\nDetails: " + dataProviderHTTP.responseText;
		dataProviderError = true;
		eval(functionName);
	}
}

function getRowCount() {
	return dataProviderXML.getElementsByTagName("Row").length;
}

function getCellValueByName(rowNumber, columnName) {
	try {
		return dataProviderXML.getElementsByTagName("Row")[rowNumber-1].getElementsByTagName(columnName)[0].firstChild.nodeValue;		
	} catch(err) {
		return "";
	}	
}

function getLastError() {
	if(requestError!="") return requestError;
	else return dataProviderError.firstChild.nodeValue;
}

// FORM FUNCTIONS ----------------------------------------------------------------------------------

function saveResponse(url, message){
	if(dataProviderError) {
		alert(getLastError());
	}
	else {
		if(message!="" && message!=nullstring) alert(message);
		if(url!="" && url!=nullstring) document.location.href = url;	
	}
}

function cancel() {
	history.go(-1);
}

// SOUND FUNCTIONS ----------------------------------------------------------------------------------

var soundControler = {
	soundFiles : {},
	init : function() {
		if (navigator.appName.match(/^Microsoft.*Mobile/i)) {
			this.soundFiles = {
				"AudioFailure" : "file:///\\Windows\\Alarm2.wav",
				"AudioSuccess" : "file:///\\Windows\\VoicBeep.wav"
			};
		} else {
			this.soundFiles = {
				"AudioFailure" : "Sounds/failure.WAV",
				"AudioSuccess" : "Sounds/success.WAV"
			};
		}
		for (var key in this.soundFiles) {
			var e = document.getElementById(key);
			e.Settings.volume = 0;
			e.URL = this.soundFiles[key];
		}
	},
	play : function(id) {
		var e = document.getElementById(id);
		e.controls.Stop();
		e.Settings.volume = 100;
		e.controls.Play();
	}
}

// OTHERS FUNCTIONS ----------------------------------------------------------------------------------

function getRadioCheckedValue(radioObj) {
	if(!radioObj) return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked) return radioObj.value;
		else return "";
	for(var i = 0; i < radioLength; i++) if(radioObj[i].checked) return radioObj[i].value;
	return "";
}

function setCombobox(comboObj, value) {
	for(var i=0; i< comboObj.length; i++) {
		if(comboObj.options[i].value == value) {
			comboObj.selectedIndex = i;
			return true;
			break;
		}
	}
	comboObj.selectedIndex = 0;
	return false;
}

function setMultiCombobox(comboObj, value) {
	var auxArray = value.split(',');
	for(var i=0; i< comboObj.length; i++) comboObj[i].selected = false;
	for(var i=0; i< comboObj.length; i++) {
		for(var j=0; j<auxArray.length; j++) {		
			if(comboObj[i].value == auxArray[j]) comboObj[i].selected = true;
		}
	}
}

function getMultiCombobox(comboObj) {
	var auxArray = "";
	for (var i=0; i<comboObj.length; i++) {
		if (comboObj[i].selected) {
			if(auxArray=="") auxArray += comboObj[i].value;
			else auxArray += "," + comboObj[i].value;
		} 
	}
	return auxArray;
}

function openMenu() {
	clearTimeout(barcodeInterval);
	document.location.href = "/XMII/Illuminator?service=Personalization";
}

function showMessage(messageText, messageType) {
	document.getElementById("messageBar").innerHTML = messageText;
	if(messageText!="") {
		clearTimeout(messageInterval); 
 		if(messageType=="L") {
			try { document.getElementById("messageBar").className = "containerMessages msgLoading";	 } 
			catch(err) { 
				document.getElementById("messageBar").style.paddingLeft = '2px'; 				
				document.getElementById("messageBar").style.backgroundColor = '#999999'; 
			}
		}
		else if(messageType=="E") {
			try { document.getElementById("messageBar").className = "containerMessages msgError";	 } 
			catch(err) { 
				document.getElementById("messageBar").style.paddingLeft = '2px'; 
				document.getElementById("messageBar").style.backgroundColor = '#FF0000'; 
			}
			//soundControler.play("AudioFailure");
		}
		else if(messageType=="W") {
			try { document.getElementById("messageBar").className = "containerMessages msgWarning";	 } 
			catch(err) { 
				document.getElementById("messageBar").style.paddingLeft = '2px'; 
				document.getElementById("messageBar").style.backgroundColor = '#FFCC00'; 
			}
			messageInterval = setTimeout("hideMessage();", messageDelay*1000);
			//soundControler.play("AudioFailure");
		}
		else if(messageType=="S") {
			try { document.getElementById("messageBar").className = "containerMessages msgSuccessful";	 } 
			catch(err) { 
				document.getElementById("messageBar").style.paddingLeft = '2px'; 
				document.getElementById("messageBar").style.backgroundColor = '#00CC00'; 
			}
			messageInterval = setTimeout("hideMessage();", messageDelay*1000);
			//soundControler.play("AudioSuccess");
		}
		document.getElementById("messageBar").style.display = "block";	
	}
	else hideMessage();
}

function hideMessage() {
	try { document.getElementById("messageBar").className = "containerMessages";	 } 
	catch(err) { 
		document.getElementById("messageBar").style.paddingLeft = '2px'; 
		document.getElementById("messageBar").style.backgroundColor = '#E0E0E0'; 
	}
	document.getElementById("messageBar").style.display = "none";
	document.getElementById("messageBar").innerHTML = "";
	clearTimeout(messageInterval); 
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
function IsWholeNumeric(sText)
{
   var ValidChars = "0123456789";
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

function formatNumber(n, len) {  
	var s = n.toString();  
	if (s.length < len) {  
		s = ('00000000000000000000' + s).slice(-len);  
	}  
	return s;  
}

