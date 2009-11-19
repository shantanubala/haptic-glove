// js config object. used to store global vars
var CONFIG = {
	img_path : "/icons/" // global path to site image assets
};


// -----------------------------------------------------------------------------


// used in search results pages
function toggleQueryDetails() {
	if (!getDomObj('query-details-toggle') || !getDomObj('query-details')) return;

	var qd = DOM_OBJECTS['query-details'];
	var qdt = DOM_OBJECTS['query-details-toggle'];

	// default, non-persistent state of page is hidden
	if ( (qd.style.display == 'none') || (qd.style.display == '') ) {
		qd.style.display = 'block';
		qdt.style.backgroundImage = 'url(' + CONFIG['img_path'] + 'icon.circle.arrow.dn.gif)';
		qdt.innerHTML = 'Hide Query Details';

	} else {
		qd.style.display = 'none';
		qdt.style.backgroundImage = 'url(' + CONFIG['img_path'] + 'icon.circle.plus.gif)';
		qdt.innerHTML = 'Show Query Details';
	}

	qdt.blur();
} // END: toggleQueryDetails()


// -----------------------------------------------------------------------------


function uncheckSelectAll(current_checkbox, checkbox_name) {
	current_checkbox.form.elements[checkbox_name].checked = false;
} // END: uncheckSelectAll()


function toggleSelectAllInFieldset(checkbox) {
	// bail out if browser isn't capable of simple DOM methods...
	// this function is just necessary for the UI to update, anyway
	if (!document.getElementsByTagName) return;

	// if we are unchecking the checkbox, then bail out... we don't need to do anything
	if (!checkbox.checked) return;

	var fieldset = checkbox.parentNode;
	var all_checkboxes = fieldset.getElementsByTagName('INPUT');

	for (var i=0; i < all_checkboxes.length; i++) {
		if ( (all_checkboxes[i] == checkbox) || (all_checkboxes[i].title == "Pubmed") ) continue;
		if ( (all_checkboxes[i].id == "search_articles-only") || (all_checkboxes[i].id == "search_articles-and-e-letters")  ) continue;
		// if (all_checkboxes[i] == checkbox) continue;
		// all_checkboxes[i].checked = checkbox.checked;
		all_checkboxes[i].checked = false;
	}
} // END: toggleSelectAllInFieldset()

// -----------------------------------------------------------------------------


// attach this to the onfocus of an INPUT or TEXTAREA, passing the 'this' object as the argument
function textFieldStoreAndClear(el) {
	el.originalText = (el.originalText == null) ? el.value : el.originalText;
	if (el.value == el.originalText) el.value = '';
}

// attach this to the onblur of an INPUT or TEXTAREA, passing the 'this' object as the argument
function textFieldRestore(el) {
	el.value = (el.value == '') ? el.originalText : el.value;
}

// takes title attribute from INPUTs with .ShowTitle and sticks it in the value attrib.
addWindowEvent('onload', function(){
	if (!document.getElementById) return;

	var all_inputs = document.getElementsByTagName('INPUT');
	var temp_class = "";

	for (var i=0; i < all_inputs.length; i++) {
		temp_class = " " + all_inputs[i].className;
		if (temp_class == " ") continue;

		if ( (temp_class.indexOf(" ShowTitle") > 0) && (all_inputs[i].value == "") ) {
			all_inputs[i].value = all_inputs[i].title;
			all_inputs[i].onfocus = function() { textFieldStoreAndClear(this) };
			all_inputs[i].onblur = function() { textFieldRestore(this) };
		}

		temp_class = "";
	}
});


// -----------------------------------------------------------------------------


var DOM_OBJECTS = []; // hash to store frequently used DOM objects

// utility function to get DOM objects
function getDomObj(object_name) {
	// bail out if browser is not capable
	if (!document.getElementById) return false;

	// return true if object was already fetched
	if (DOM_OBJECTS[object_name]) return true;

	// get the object and return the result of the get
	return (DOM_OBJECTS[object_name] = document.getElementById(object_name)) ? true : false;
} // END: getDomObj


// -----------------------------------------------------------------------------


// extension of an idea from simon willison
// http://simon.incutio.com/archive/2004/05/26/addLoadEvent
// adds function call to an arbitrary window event trigger
function addWindowEvent(event_name, function_to_add) {
  var current_event = window[event_name];

  if (typeof(current_event) != 'function') {
    window[event_name] = function_to_add;

  } else {
    window[event_name] = function() {
      current_event();
      function_to_add();
    };
  }
} // END: addWindowEvent()


// =============================================================================


var DEBUG = true;
var DEBUG_MESSAGE_TYPES = ["ERROR", "WARNING", 'STATUS'];
var debug_win;

function debug(message_type, message) {
	if (DEBUG && (DEBUG_MESSAGE_TYPES.join(" ").indexOf(message_type) > -1 )) {
		if (!debug_win) {
			debug_win = window.open("","","");
			debug_win.document.open();
		}
		message = message.replace(/</g, "&lt;");
		message = message.replace(/>/g, "&gt;");
		
		try {
			debug_win.document.write("");
		} catch(e) {
			debug_win = window.open("","","");
			debug_win.document.open();			
		}

		debug_win.document.write("<h1 style='font-size: 80%; margin:0;border-bottom: 1px solid #CCC;'>" + message_type  + "</h1>");
		debug_win.document.write("<pre style='font-size: 75%; margin: .5em 0 2em 0;'>" + message + "</pre>");
	}
} // END: debug()

/* Simple client-side validation of the My Directory Entries form for STKE.  Batch-mode only.
Adapted by SW from several sources (including JS and DHTML Cookbook, O'Reilly, 2003), 2006/08/09 */ 

// Routine to validate that a text field has at least a character or two

function isNotEmpty(elem) {
    var str = elem.value;
    if(str == null || str.length == 0) {
        return false;

    } else {
        return true;
    }
}


// Routine to validate that a pull-down selection has been made

function isChosen(select) {
    if (select.selectedIndex == 0) {
        return false;
    } else {
        return true;
    }
}


/* Batch-mode validation of the specific entries to be validated in the My Directory Entries form.
Fields that are supposed to be completed and are not are highlighted in yellow, and the user
gets an alert asking for full info.  Very ugly series of if-statements, but it works. */ 

function validateDirForm(form) {
   var fn = "";
   var sn = "";
   var ps = "";
   var inst = "";
   var wr = "";
    if (isNotEmpty(form.firstname)) {
        if (isNotEmpty(form.lastname)) {
	   if (isChosen(form.position)){
               if (isNotEmpty(form.institution_1)) {
	           if (isChosen(form.world_region_id)){
                            return true;
                   }
               }
           }
	} 
    }
    if (!isNotEmpty(form.firstname)){
      form.firstname.style.backgroundColor = "#ffffdd";
      fn = "First Name\n";}
    else {
      form.firstname.style.backgroundColor = "#ffffff";}
    if (!isNotEmpty(form.lastname)){
      form.lastname.style.backgroundColor = "#ffffdd";
      sn = "Last Name\n";}
    else {
      form.lastname.style.backgroundColor = "#ffffff";}
    if (!isChosen(form.position)){
      form.position.style.backgroundColor = "#ffffdd";
      ps = "Position\n";}
    else {
      form.position.style.backgroundColor = "#ffffff";}
    if (!isNotEmpty(form.institution_1)){
      form.institution_1.style.backgroundColor = "#ffffdd";
      form.institution_2.style.backgroundColor = "#ffffdd";
      inst = "Institution\n";}
    else {
      form.institution_1.style.backgroundColor = "#ffffff";
      form.institution_2.style.backgroundColor = "#ffffff";}
    if (!isChosen(form.world_region_id)){
      form.world_region_id.style.backgroundColor = "#ffffdd";
      wr = "World Region\n";}
    else {
      form.world_region_id.style.backgroundColor = "#ffffff";}
    alert("We ask that your directory information include at least the following: First Name, Last Name, Position, Institution, and World Region.\n\nPlease provide responses for:\n" + fn + sn + ps + inst + wr);
    return false;

}

//End of validation script


//--------------cookie stuff



function setCookie (name, value, expires, path, domain, secure)
{
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "")
+
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "")
+
        ((secure) ? "; secure" : "");
}

function getCookie(name) {
        var cookie = " " + document.cookie;
        var search = " " + name + "=";
        var setStr = null;
        var offset = 0;
        var end = 0;
        if (cookie.length > 0) {
                offset = cookie.indexOf(search);
                if (offset != -1) {
                        offset += search.length;
                        end = cookie.indexOf(";", offset)
                        if (end == -1) {
                                end = cookie.length;
                        }
                        setStr = unescape(cookie.substring(offset, end));
                }
        }
        return(setStr);
}
function survey_popup () {
	var survey_popup = getCookie('survey_popup');
        if (survey_popup == null) {
                setCookie("survey_popup", "true", "", "/");
window.open("http://www.sciencemag.org/marketing/ed_survey/ed_survey.dtl", 'surveypop', 'toolbar=0, location=0, directories=0, menuBar=0,  resizable=1, width=425, height=475, left=50, top=50');
  }

}




       

//end cookies

/***********institutional user pop up******************/

function inst_popup () {
	var inst_popup = getCookie('inst_popup');
        if (inst_popup == null) {
                setCookie("inst_popup", "true", "Sun, 14 Feb 2010 02:04:57 GMT", "/");	
window.open("http://www.sciencemag.org/inst_popup.dtl", 'instpopup', 'toolbar=0, location=0, directories=0, menuBar=0,  resizable=1, width=575, height=500, left=50, top=50');
  }
}



/* Miscellaneous routines to toggle styles and text for specific IDs */


function toggleElement(id){ 
    if(!document.getElementById)
        return;
    var elem = document.getElementById(id);
    elem.style.display = (elem.style.display == 'block') ? 'none' : 'block';
}
function toggleWeight(id2){ 
    if(!document.getElementById)
        return;
    var elem2 = document.getElementById(id2);
    elem2.style.fontWeight = (elem2.style.fontWeight == '400') ? '700' : '400';
}
function toggleBckImg(id3,img1,img2){ 
    if(!document.getElementById)
        return;
    var elem3 = document.getElementById(id3);
    elem3.style.backgroundImage = (elem3.style.backgroundImage == 'url(' + img1 + ')') ? 'url(' + img2 + ')' : 'url(' + img1 + ')';
}

function toggleStyle(id4,stylename,val1,val2){ 
    if(!document.getElementById)
        return;
    var elem4 = document.getElementById(id4);
    elem4.style[stylename] = (elem4.style[stylename] == val1) ? val2 : val1 ;
}   
function switchText(id5,val1,val2){ 
    if(!document.getElementById)
        return;
    var elem5 = document.getElementById(id5);
    elem5.innerHTML = (elem5.innerHTML == val1) ? val2 : val1 ;
}   		


/* Image resize toggle for ScienceNOW */

function SNOWImageResize() {

    toggleStyle('PhotoForExp', 'width', '450px', '190px');
    toggleBckImg('ResizeImage', '/icons/blueminus.gif', '/icons/blueplus.gif');
    switchText('RItext', 'Enlarge Image', 'Reduce Image Size');
}

/* sciLoadExtText -- simple AJAX routine for pulling HTML from external source into a designated DIV without page reload */

function sciLoadExtText(url,docid) {
  var req = new XMLHttpRequest();
  if (req) {
    req.onreadystatechange = function() {
      if (req.readyState == 4 && (req.status == 200 || req.status == 304)) {
        var sciswitch = document.getElementById(docid);
	var sciswitchval = sciswitch.innerHTML;
	if (sciswitchval == ''){
	sciswitch.style.display = "block";
        sciswitch.innerHTML = req.responseText;
	}
	else {
	sciswitch.style.display="inline";
	sciswitch.innerHTML = '';
	}
      }
    };
    req.open('GET', url);
    req.send(null);
  }
}

// -----------------------------------------------------------------------------
// Utility functions ------------------------------------------------------------
//
// MGreen
// Updated: May 9 2008
//
// ------------------------------------------------------------------------------

function _loadExtText(url, callback, returnXML) {
// loads content from an external file on the server

    var req = new XMLHttpRequest();

    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
	req = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    if (returnXML && req.overrideMimeType) {
        req.overrideMimeType('text/xml');
    }

    if (req) {
        req.onreadystatechange = function() {
        if (req.readyState == 4 && (req.status == 200 || req.status == 304)) {
            if (returnXML) {
                callback(req.responseXML);
            } else {
                callback(req.responseText);
            }
        }
    };
    req.open('GET', url);
    req.send(null);
  }
}

function _processing(docId) {
// replaces contents of an element with a 'processing' message

    if(!document.getElementById) return;
    var obj = document.getElementById(docId);
    obj.innerHTML = '<div class="processing">Processing...</div>';;
}

function _updateContent(docId, newContent) {
// updates a specified element on the page with new content.

    if(!document.getElementById) return;
    var obj = document.getElementById(docId);
    obj.innerHTML = newContent;
}

function _emptyContent(docid) {
// remove all inner nodes from one specified

    if(!document.getElementById) return;
    var obj = document.getElementById(docid);
    while (obj.hasChildNodes()) {
        obj.removeChild(demo.firstChild);
    }

}

function _executeOnLoad(function1, function2) {
//creates a stack of functions which will execute when the page loads. Allowing multiple functions to be called.

    return function() {
        if (function1)
            function1();
        if (function2)
            function2();
    }
}

