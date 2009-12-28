function expand(thistag, change) {
	styleObj = document.getElementById(thistag).style;
	if (change == "true") {
		if (styleObj.display == 'none') {
			styleObj.display = '';
		} else {
			styleObj.display = 'none';
		}
	} else {
		styleObj.display = '';
	}
}

function addSearchArgument(dropDownTag, valueSpan, keyTagHidden, valueTagHidden, addSearchTag) {
	var readDivElement = document.getElementById(valueSpan);
	var keyHiddenElement = document.getElementById(keyTagHidden);
	var valueHiddenElement = document.getElementById(valueTagHidden);

	var selected = document.getElementById(dropDownTag);
	var key = selected.options[selected.selectedIndex].value;
	var textValue = selected.options[selected.selectedIndex].text;
	if (key == "") {
		key = textValue;
	}

	if (valueHiddenElement.value != "All" && valueHiddenElement.value != "") {
		if (!valueHiddenElement.value.match(textValue) && !keyHiddenElement.value.match(key)) {
			keyHiddenElement.value += "," + key;
			valueHiddenElement.value += "," + textValue;
		}
	} else {
		if (!valueHiddenElement.value.match(textValue) && !keyHiddenElement.value.match(key)) {
			keyHiddenElement.value = key;
			valueHiddenElement.value = textValue;
		} else {
			keyHiddenElement.value = key;
			valueHiddenElement.value = textValue;
		}
	}

	if (!document.getElementById(key)) {
		valueSpanCreate(valueSpan, keyTagHidden, valueTagHidden, key, textValue, readDivElement, addSearchTag, dropDownTag);
	}
}

function clearSearchArgument(valueSpan, keyTagHidden, valueTagHidden, key, textValue, addSearchTag, dropDownTag) {
	var readDivElement = document.getElementById(valueSpan);
	var keyHiddenElement = document.getElementById(keyTagHidden);
	var valueHiddenElement = document.getElementById(valueTagHidden);
	var d_nested = document.getElementById(key);
	var throwaway_node = readDivElement.removeChild(d_nested);

	if (keyHiddenElement.value.match(key + ",")) {
		keyHiddenElement.value = keyHiddenElement.value.replace(key + ",", "");
		valueHiddenElement.value = valueHiddenElement.value.replace(textValue + ",","");
	} else if (keyHiddenElement.value.match(key)) {
		if (keyHiddenElement.value.match(",")) {
			keyHiddenElement.value = keyHiddenElement.value.replace("," + key, "");
			valueHiddenElement.value = valueHiddenElement.value.replace("," + textValue,"");
		} else {
			keyHiddenElement.value = keyHiddenElement.value.replace(key, "");
			valueHiddenElement.value = valueHiddenElement.value.replace(textValue,"");
		}
	}

	var keyValueLength = keyHiddenElement.value.length;
	var selected = document.getElementById(dropDownTag);

	if (keyValueLength > 0) {
		var keyStrArray = keyHiddenElement.value.split(",");
		var valueStrArray = valueHiddenElement.value.split(",");
		var keyStrLength = keyStrArray.length - 1;
		for (index = 0; index < selected.length; index++) {
			if (selected.options[index].value == keyStrArray[keyStrLength]) {
				selected.selectedIndex = index;
			}
		}
	} else {
		var readDivChildren = readDivElement.childNodes;
		var readDivLength = readDivChildren.length;
		for (i = readDivLength - 1; i >= 0; --i) {
			readDivElement.removeChild(readDivChildren[i]);
		}
		selected.selectedIndex = 0;
	}

	var dropDownTagElement = document.getElementById(dropDownTag);
	if (key == "us" || key == "au" || key == "ca" && dropDownTagElement.id == "country") {
		var stateReadDivElement = document.getElementById("selected_"+key+"_state_values");
		var stateSelected = document.getElementById(key+"_state");
		var stateKeyHiddenElement = document.getElementById("selected_"+key+"_state_keys");
		var stateValueHiddenElement = document.getElementById(+key+"_state_values_hidden");
		stateKeyHiddenElement.value = "";
		var stateReadDivChildren = stateReadDivElement.childNodes;
		var stateReadDivLength = stateReadDivElement.length;
		for (i = stateReadDivLength - 1; i >= 0; --i) {
			stateReadDivElement.removeChild(stateReadDivChildren[i]);
		}
		stateSelected.selectedIndex = 0;
		closeState("selected_"+key+"_state_values", "selected_"+key+"_state_keys", +key+"_state_values_hidden", key+"_states", "true");
	}
}

function checkForAllCountries(dropDownTag, valueSpan, keyTagHidden, valueTagHidden, addSearchTag) {
	var readDivElement = document.getElementById(valueSpan);
	var selected = document.getElementById(dropDownTag);
	var textValue = selected.options[selected.selectedIndex].text;

	var keyHiddenElement = document.getElementById(keyTagHidden);
	var valueHiddenElement = document.getElementById(valueTagHidden);

	if (textValue.indexOf("All") != -1) {
		keyHiddenElement.value = "";
		valueHiddenElement.value = "";
		var readDivChildren = readDivElement.childNodes;
		var readDivLength = readDivChildren.length;
		for (i = readDivLength - 1; i >= 0; --i) {
			readDivElement.removeChild(readDivChildren[i]);
		}

		for (index = 0; index < selected.length; index++) {
			var key = selected.options[index].value;
			var text = selected.options[index].text;
			if (text.indexOf("All") == -1) {
				if (index == 1) {
					keyHiddenElement.value += key;
					valueHiddenElement.value += text;
				} else {
					keyHiddenElement.value += "," + key;
					valueHiddenElement.value += "," + text;
				}
			}
		}
		reloadSpan(dropDownTag, valueSpan, keyTagHidden, valueTagHidden, addSearchTag);
	}
}

function checkForAll(dropDownTag, valueSpan, keyTagHidden, valueTagHidden, addSearchTag) {
	var readDivElement = document.getElementById(valueSpan);
	var keyHiddenElement = document.getElementById(keyTagHidden);
	var valueHiddenElement = document.getElementById(valueTagHidden);
	var keyHiddenElementValue = keyHiddenElement.value;
	var selected = document.getElementById(dropDownTag);
	var textValue = selected.options[selected.selectedIndex].text;

	if (textValue.indexOf("All") != -1) {
		keyHiddenElement.value = "";
		valueHiddenElement.value = "";
		var readDivChildren = readDivElement.childNodes;
		var readDivLength = readDivChildren.length;
		for (i = readDivLength - 1; i >= 0; --i) {
			readDivElement.removeChild(readDivChildren[i]);
		}
		if (keyHiddenElementValue.match("us") || keyHiddenElementValue.match("au") || keyHiddenElementValue.match("ca")) {
			var stateCountries = new Array("us", "au", "ca");
			for (country in stateCountries) {
				var stateReadDivElement = document.getElementById("selected_"+stateCountries[country]+"_state_values");
				var stateSelected = document.getElementById(stateCountries[country]+"_state");
				var stateKeyHiddenElement = document.getElementById("selected_"+stateCountries[country]+"_state_keys");
				var stateValueHiddenElement = document.getElementById(+stateCountries[country]+"_state_values_hidden");
				stateKeyHiddenElement.value = "";
				var stateReadDivChildren = stateReadDivElement.childNodes;
				var stateReadDivLength = stateReadDivElement.length;
				for (i = stateReadDivLength - 1; i >= 0; --i) {
					stateReadDivElement.removeChild(stateReadDivChildren[i]);
				}
				stateSelected.selectedIndex = 0;
			}
		}
	}
}

function closeState(valueSpan, keyTagHidden, valueTagHidden, stateTable, removeSpan) {
	var readDivElement = document.getElementById(valueSpan);
	var keyHiddenElement = document.getElementById(keyTagHidden);
	var valueHiddenElement = document.getElementById(valueTagHidden);

	keyHiddenElement.value = "";
	if (valueHiddenElement != null) {
		valueHiddenElement.value = "";
	}
	if (removeSpan.indexOf("true") != -1) {
		var readDivChildren = readDivElement.childNodes;
		var readDivLength = readDivChildren.length;
		for (i = readDivLength - 1; i >= 0; --i) {
			readDivElement.removeChild(readDivChildren[i]);
		}
	}

	document.getElementById(stateTable).style.display = 'none';
}

function reloadSpan(dropDownTag, valueSpan, keyTagHidden, valueTagHidden, addSearchTag) {
	var readDivElement = document.getElementById(valueSpan);
	var keyHiddenElement = document.getElementById(keyTagHidden);
	var valueHiddenElement = document.getElementById(valueTagHidden);
	var keyString = keyHiddenElement.value;
	var valueString = valueHiddenElement.value;
	var key;
	var value;

	if (keyString.length > 0) {
		var keyStrArray = keyString.split(",");
		var valueStrArray = valueString.split(",");
		for (i = keyStrArray.length - 1; i >= 0; --i) {
			key = keyStrArray[i];
			value = valueStrArray[i];
			valueSpanCreate(valueSpan, keyTagHidden, valueTagHidden, key, value, readDivElement, addSearchTag, dropDownTag);
		}
	}
}

function valueSpanCreate(valueSpan, keyTagHidden, valueTagHidden, key, value, readDivElement, addSearchTag, dropDownTag) {
	var newReadValue = document.createElement("span");
	newReadValue.setAttribute("id", key);
	newReadValue.setAttribute("name", value);
	newReadValue.innerHTML = value;
	var href = document.createElement("a");
	var myimage = document.createElement("img");
	myimage.setAttribute("src", "/ids70/images/delete.jpg");
	myimage.setAttribute("class", "img");

	var onClick = "clearSearchArgument('"+valueSpan+"','"+keyTagHidden+"','"+valueTagHidden+"','"+key+"','"+value+"','"+addSearchTag+"','"+dropDownTag+"');"
	if (dropDownTag.indexOf("country") != -1) {
		if ((key.indexOf("us") != -1) || (key.indexOf("au") != -1) || (key.indexOf("ca") != -1)) {
			var key2 = key + "_state";
			onClick += " closeState('selected_"+key2+"_values','selected_"+key2+"_keys','"+key2+"_values_hidden','"+key+"_states','false');";
			expand(key+"_states", "true");
		}
	}
	var image = "<img src='/ids70/images/delete.jpg' class='img'/>"
	var href = document.createElement("a");
	href.setAttribute("href", "javascript:" + onClick);
	href.innerHTML = image;
	newReadValue.appendChild(href);
	readDivElement.appendChild(newReadValue);
}


/* Functions for setting up the DHTML upon page reload */

function appendSearchParams(dropDownTag, valueSpan, keyValue, valueIn, addSearchTag, keyTagHidden, valueTagHidden) {
	var readDivElement = document.getElementById(valueSpan);
	var keyString = keyValue;
	var valueString = valueIn;
	var keyHiddenElement = document.getElementById(keyTagHidden);
	var valueHiddenElement = document.getElementById(valueTagHidden);

	if (keyHiddenElement.value != "") { keyHiddenElement.value += ","; }
	keyHiddenElement.value += keyString;
	if (valueHiddenElement.value != "") { valueHiddenElement.value += ","; }
	valueHiddenElement.value += valueString;

	if (keyString.length > 0) {
		var keyStrArray = keyString.split(",");
		var valueStrArray = valueString.split(",");
		var key, value;

		for (i = keyStrArray.length - 1; i >= 0; --i) {
			key = keyStrArray[i];
			value = valueStrArray[i];
			valueSpanCreate(valueSpan, keyTagHidden, valueTagHidden, key, value, readDivElement, addSearchTag, dropDownTag);
		}
	}
}

function resetCsCountry(country_opt) {
	appendSearchParams('country', 'selected_country_values', country_opt.value, country_opt.text, 'add_country', 'selected_country_keys', 'country_values_hidden');

	var name = country_opt.value + '_state';
	var state_select = document.getElementById(name);
	if (state_select == null) {
		return;
	}

	var selected_state_keys = document.getElementById("selected_" + name + "_keys");
	var keys = selected_state_keys.value;
	if (keys.length == 0) {
		return;
	}

	selected_state_keys.value = "";
	var keys_array = keys.split(',');

	var j, k;
	for (j = 0; j < state_select.length; ++j) {
		var state_opt = state_select.options[j];
		for (k = 0; k < keys_array.length; ++k) {
			if (keys_array[k] == state_opt.value) {
				break;
			}
		}
		if (k < keys_array.length) {
			appendSearchParams(name, 'selected_' + name + '_values', state_opt.value, state_opt.text, 'add_' + name, 'selected_' + name + '_keys', name + '_values_hidden');
			keys_array.splice(k, 1);
		}
	}
}

function resetCsLimits() {
	var country = document.getElementById("country");
	if (country == null) {
		return;
	}

	var selected_country_keys = document.getElementById("selected_country_keys");
	var keys = selected_country_keys.value;
	selected_country_keys.value = "";

	if (keys.length > 0) {
		var keys_array = keys.split(",");

		var i, j;
		for (i = 0; i < country.length; i++) {
			var country_opt = country.options[i];
			for (j = 0; j < keys_array.length; ++j) {
				if (country_opt.value == keys_array[j]) {
					break;
				}
			}
			if (j < keys_array.length) {
				resetCsCountry(country_opt);
				keys_array.splice(j, 1);
			}
		}
	}
}
