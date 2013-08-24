function getSelectedRadio(){
    	var radios = document.getElementsByName('response');
	var value;
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].type == 'radio' && radios[i].checked) {
			// get value, set checked flag or do whatever you need to
			value = radios[i].value;
			//alert(value);
		}
	}
}