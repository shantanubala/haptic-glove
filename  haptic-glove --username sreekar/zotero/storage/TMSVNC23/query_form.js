function insert_value_into(source, target) {
	target.value += source.value;
	return false;
}

function clear_quick_form() {
	document.query_form.query.value = "";
	return false;
}

function openWindow(strTitle, strUrl) {
	var w_left = (screen.width/4);
	var w_top = (screen.height/4);
	var w_width = (screen.width/2);
	var w_height = (screen.height/2);

	if(w_width < 400) {
		w_width = 400;
	}

	if(w_height < 200) {
		w_height = 200;
	}

	var strOptions = "location=no";
	strOptions += ",toolbar=no";
	strOptions += ",menubar=yes";
	strOptions += ",status=no";
	strOptions += ",scrollbars=yes";
	strOptions += ",resizable=yes";
	strOptions += ",left=" + w_left;
	strOptions += ",top=" + w_top;
	strOptions += ",width=" + w_width;
	strOptions += ",height=" + w_height;
	strOptions += ";";
	newWin = window.open(strUrl, strTitle, strOptions);
	newWin.focus();
}

function setFormElementValue(elementName, elementValue) {
	document.getElementById(elementName).value = elementValue;
}

