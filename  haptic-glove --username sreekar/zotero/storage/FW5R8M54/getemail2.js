/**
 * This is the generic version of the email capture script.  It loads
 * getemail-version_2.0.js.  That version only prompts for email information
 * if the user is not logged into the system.
 */

function JSONscriptRequest(fullUrl) {
    this.fullUrl = fullUrl; 
    this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
    this.headLoc = document.getElementsByTagName("head").item(0);
    this.scriptId = 'JscriptId' + JSONscriptRequest.scriptCounter++;
};
JSONscriptRequest.scriptCounter = 1;
JSONscriptRequest.prototype.buildScriptTag = function () {
    this.scriptObj = document.createElement("script");
    this.scriptObj.setAttribute("type", "text/javascript");
    this.scriptObj.setAttribute("charset", "utf-8");
//    this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
    this.scriptObj.setAttribute("src", this.fullUrl);
    this.scriptObj.setAttribute("id", this.scriptId);
};
JSONscriptRequest.prototype.removeScriptTag = function () {
    this.headLoc.removeChild(this.scriptObj);  
};
JSONscriptRequest.prototype.addScriptTag = function () {
    // Create the script tag
    this.headLoc.appendChild(this.scriptObj);
};

var origOnload = window.onload;
window.onload = function() {
	var getemailJs = new JSONscriptRequest("/emailcapture/getemail-version_2.0.js");
	getemailJs.buildScriptTag();
	getemailJs.addScriptTag();
	if (typeof oldOnload == 'function') {
//		alert ('Execute original onload');
		origOnload();
	}
//	alert('onload complete');
};
