function URLEncode( plaintext ) {
	// The Javascript escape and unescape functions do not correspond
	// with what browsers actually do...
	var SAFECHARS = "0123456789" +					// Numeric
					"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
					"abcdefghijklmnopqrstuvwxyz" +
					"-_.!~*'()";					// RFC2396 Mark characters
	var HEX = "0123456789ABCDEF";

	var encoded = "";
	for (var i = 0; i < plaintext.length; i++ ) {
		var ch = plaintext.charAt(i);
		 if (ch == " ") {
			 encoded += "+";				// x-www-urlencoded, rather than %20
		} else if (SAFECHARS.indexOf(ch) != -1) {
			 encoded += ch;
		} else {
			 var charCode = ch.charCodeAt(0);
			if (charCode > 255) {
				 alert( "Unicode Character '" 
					+ ch 
					+ "' cannot be encoded using standard URL encoding.\n"
					+ "(URL encoding only supports 8-bit characters.)\n"
					+ "A space (+) will be substituted." );
				encoded += "+";
			} else {
				encoded += "%";
				encoded += HEX.charAt((charCode >> 4) & 0xF);
				encoded += HEX.charAt(charCode & 0xF);
			}
		}
	} // for

	return encoded;
}

function URLDecode( encoded ) {
	// Replace + with ' '
	// Replace %xx with equivalent character
	// Put [ERROR] in output if %xx is invalid.
	var HEXCHARS = "0123456789ABCDEFabcdef"; 
	var plaintext = "";
	var i = 0;
	while (i < encoded.length) {
		 var ch = encoded.charAt(i);
		if (ch == "+") {
			 plaintext += " ";
			i++;
		} else if (ch == "%") {
			if (i < (encoded.length-2) 
					&& HEXCHARS.indexOf(encoded.charAt(i+1)) != -1 
					&& HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
				plaintext += unescape( encoded.substr(i,3) );
				i += 3;
			} else {
				alert( 'Bad escape combination near ...' + encoded.substr(i) );
				plaintext += "%[ERROR]";
				i++;
			}
		} else {
			plaintext += ch;
			i++;
		}
	} // while
	return plaintext;
};


/** 
	Useful javascript gotten from
	http://www.breakingpar.com/bkp/home.nsf/0/CA99375CC06FB52687256AFB0013E5E9
	I know it looks like a session key above but it isn't!
 */

function getSelectedRadio(buttonGroup) {
	// returns the array number of the selected radio button or -1 if no button is selected
	if (buttonGroup[0]) { // if the button group is an array (one button is not an array)
		for (var i=0; i<buttonGroup.length; i++) {
			if (buttonGroup[i].checked) {
				return i
			}
		}
	} else {
		if (buttonGroup.checked) { return 0; } // if the one button is checked, return zero
	}
	// if we get to this point, no radio button is selected
	return -1;
} // Ends the "getSelectedRadio" function

function getSelectedRadioValue(buttonGroup) {
	// returns the value of the selected radio button or "" if no button is selected
	var i = getSelectedRadio(buttonGroup);
	if (i == -1) {
		return "";
	} else {
		if (buttonGroup[i]) { // Make sure the button group is an array (not just one button)
			return buttonGroup[i].value;
		} else { // The button group is just the one button, and it is checked
			return buttonGroup.value;
		}
	}
} // Ends the "getSelectedRadioValue" function

function getSelectedCheckbox(buttonGroup) {
	// Go through all the check boxes. return an array of all the ones
	// that are selected (their position numbers). if no boxes were checked,
	// returned array will be empty (length will be zero)
	var retArr = new Array();
	var lastElement = 0;
	if (buttonGroup[0]) { // if the button group is an array (one check box is not an array)
		for (var i=0; i<buttonGroup.length; i++) {
			if (buttonGroup[i].checked) {
				retArr.length = lastElement;
				retArr[lastElement] = i;
				lastElement++;
			}
		}
	} else { // There is only one check box (it's not an array)
		if (buttonGroup.checked) { // if the one check box is checked
			retArr.length = lastElement;
			retArr[lastElement] = 0; // return zero as the only array value
		}
	}
	return retArr;
} // Ends the "getSelectedCheckbox" function

function getSelectedCheckboxValue(buttonGroup) {
	// return an array of values selected in the check box group. if no boxes
	// were checked, returned array will be empty (length will be zero)
	var retArr = new Array(); // set up empty array for the return values
	var selectedItems = getSelectedCheckbox(buttonGroup);
	if (selectedItems.length != 0) { // if there was something selected
		retArr.length = selectedItems.length;
		for (var i=0; i<selectedItems.length; i++) {
			if (buttonGroup[selectedItems[i]]) { // Make sure it's an array
				retArr[i] = buttonGroup[selectedItems[i]].value;
			} else { // It's not an array (there's just one check box and it's selected)
				retArr[i] = buttonGroup.value;// return that value
			}
		}
	}
	return retArr;
} // Ends the "getSelectedCheckBoxValue" function


/**
 * Gets the selected value of a <select> element <option> list
 */
function getSelectedOptionValue(selectElem) {
	var options = selectElem.options;
	var tmpVal = "";
	if (options != null) {
		for (var i = 0; i < options.length; i++) {
			if (options[i].selected) {
				tmpVal = options[i].value;
				break;
			}
		}
	}
	return tmpVal;
}
