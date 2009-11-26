/**
 * Capture email addresses.  If the user is logged in, do a quiet capture.  If the
 * user is not logged in, gather the information using a form.
 */
function getEmail(link, message) {
    try {
        gotoURL = link;
        gotoMessage = message;

        // See if the info is available in a cookie
        var userInfo = new UserData();
        if (userInfo.isValid()) {
            gotoLink(link, userInfo, message);
        }
        else {
            emailWindow.show();
        }
    }
    catch (e) {
        //alert('Exception: ' + e.message);
    }
}

var handleSuccess = function(o) {
//	alert('handleSuccess');
    //logger.removeScriptTag();
	if (logger.link != "done") {
		var loc = logger.link;
		logger.link = "done";
//	    document.location = loc;
	    window.open(loc, "Download", "menubar=no,resizable=1,width=900,height=600");
	}
};

var handleCancelReturn = function(o) {
    document.location.href = document.location.href;
};

var logger;

function gotoLink(link, userInfo, message) {
    if ((link == null) || (link.length < 1) || (userInfo == null) || (message == null) || (message.length < 1))
        return;
    var req = "/emailcapture/log?output=json&callback=handleSuccess";
    var data = "&firstname=" + userInfo.firstname +"&lastname=" + userInfo.lastname + "&email=" + userInfo.email + "&message=" + message + "&loggedIn=" + userInfo.loggedIn;

    logger = new JSONscriptRequest(req + data);
    logger.link = link;
    logger.buildScriptTag();
    logger.addScriptTag();
    
//    alert('add script tag \'' + req + data + '\'');

    // just in case the logger is down, set it so that we go to the success
    // in 10 seconds
    setTimeout("handleSuccess();", 10000);
}

var emailWindow = null;
var gotoURL = "";
var gotoMessage = "";

var dialogDiv = 
    '<div id="dialog1" style="border:2px solid gray; width:320px; background-color:white; text-align:center;"> \
        <div class="hd" style="padding-bottom: 3px; font-size: 10pt; font-weight: bold; color: white; background: #003399;"> \
            Thank You! \
        </div> \
        <div class="bd" style="padding: 12px 0px 6px 0px;"> \
            <div style="font-size: 9pt; text-align: left; margin: 0px 10px 5px 10px;"> \
                Thank you for your interest in this free content.  If you are a member, <a href="/portal/c/portal/login">login</a> \
                to view this and all of your subscribed benefits.  If you are not a member, please enter the information below to view this content: \
            </div> \
            <form name="emailForm"> \
                <table border="0" cellspacing="2" align="center">\
                    <tr><th align="right" style="font-size: 9pt;">First Name:</th><td align="left"><input id="firstname" type="textbox" name="firstname" style="height: 14px;"/></td></tr> \
                    <tr><th align="right" style="font-size: 9pt;">Last Name:</th><td align="left"><input id="lastname" type="textbox" name="lastname" style="height: 14px;"/></td></tr> \
                    <tr><th align="right" style="font-size: 9pt;">Email Address:</th><td align="left"><input id="email" type="textbox" name="email" style="height: 14px;"/></td></tr> \
                    <tr><th align="center" colspan="2"><input id="saveThis" name="saveThis" type="checkbox" value="1" /><span style="font-size: 9pt;"> Save this information.<br/></span></th></tr> \
                    <tr><td colspan="2" align="center"> \
                        <input type=button id="emailSubmit" value="Submit" onclick="handleSubmit()">&nbsp;&nbsp; \
                        <input type=button id="emailCancel" value="Cancel" onclick="handleCancel()"> \
                    </td></tr> \
                </table> \
                <div style="font-size: 7pt; text-align: left; margin: 5px 5px 0px 5px;"> \
                    We will use this information to send you occassional announcements of IEEE Computer Society products and \
                    services.  You will be able to "opt-out" of these announcements.  \
                    We will not share this information with any third-party entity.  \
                    <a href="http://www.ieee.org/web/publications/rights/privacy.html" target="blank">\
                    Access the IEEE\'s policy with this link.</a> \
                </div> \
            </form> \
        </div> \
    </div>';

// Define various event handlers for Dialog
function handleSubmit() {
    var userInfo = new UserData();
    userInfo.firstname = document.emailForm.firstname.value;
    userInfo.lastname = document.emailForm.lastname.value;
    userInfo.email = document.emailForm.email.value;
    var persist = document.emailForm.saveThis.checked;

    if (!userInfo.isValid())
        alert("Please enter a valid First Name, Last Name and Email address.");
    else {
        userInfo.save(persist);
        emailWindow.hide();
        gotoLink(gotoURL, userInfo, gotoMessage);
    }
};

var cancelledOnce = false;

function handleCancel() {
    if (!cancelledOnce) {
            cancelledOnce = true;
    var req = "/emailcapture/log?output=json&callback=handleCancelReturn";
    var data = "&cancel=true&message=" + gotoMessage;
    logger = new JSONscriptRequest(req + data);
    logger.buildScriptTag();
    logger.addScriptTag();
    // just in case the logger is down, set it so that we go to the success
    // in 10 seconds
    setTimeout("handleCancelReturn();", 10000);
    }
    emailWindow.hide();
};

// Initialize the dialog window
function initEmailPanel() {
    try {
        var emailDiv = document.createElement("DIV");
        emailDiv.style.width = 320;
        emailDiv.innerHTML = dialogDiv;
        document.body.appendChild(emailDiv);
        emailWindow = new Dialog("dialog1", false);
    }
    catch (e) {
        alert('Exception: ' + e.message);
    }
}

// browser detection
var ua = navigator.userAgent.toLowerCase(),
    isOpera = (ua.indexOf('opera') > -1),
    isSafari = (ua.indexOf('safari') > -1),
    isGecko = (!isOpera && !isSafari && ua.indexOf('gecko') > -1),
    isIE = (!isOpera && ua.indexOf('msie') > -1); 

/**
 * Dialog
 *
 */
Dialog = function(divName, visible) {
    this.init(divName, visible);
};

Dialog.prototype = {
    divName: "",
    visible: false,
    div: null,

    init: function(divName, visible) {
        this.divName = divName;
        this.visible = visible;
        this.div = document.getElementById(divName);
        if (this.visible)
            this.show();
        else
            this.hide();
    },

    show: function() {
        try {
            this.div.style.display = "block";
            this.div.style.zIndex = 999;
            var viewport = [
                    this.getViewportWidth(),
                    this.getViewportHeight()
            ];

            var viewportScroll = this.scrollXY();

            var regionPosition = [
                    ((viewport[0] - this.div.offsetWidth) / 2) + viewportScroll[0],
                    ((viewport[1] - this.div.offsetHeight) / 2) + viewportScroll[1]
            ];
            this.setXY(regionPosition);
        } catch (e) {
            alert('Error in show: ' + e.message);
        }
    },

    hide: function() {
        this.div.style.display = "none";
    },

    scrollXY: function() {
        var scrOfX = 0, scrOfY = 0;
        if( typeof( window.pageYOffset ) == 'number' ) {
                //Netscape compliant
                scrOfY = window.pageYOffset;
                scrOfX = window.pageXOffset;
        } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
                //DOM compliant
                scrOfY = document.body.scrollTop;
                scrOfX = document.body.scrollLeft;
        } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
                //IE6 standards compliant mode
                scrOfY = document.documentElement.scrollTop;
                scrOfX = document.documentElement.scrollLeft;
        }
        return [ scrOfX, scrOfY ];
    },

    getViewportWidth: function() {
        var width = self.innerWidth;  // Safari
        var mode = document.compatMode;

        if (mode || isIE) { // IE, Gecko, Opera
            width = (mode == 'CSS1Compat') ?
                    document.documentElement.clientWidth : // Standards
                    document.body.clientWidth; // Quirks
        }
        return width;
    },

    getViewportHeight: function() {
        var height = self.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || isIE) && !isOpera ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
                    document.documentElement.clientHeight : // Standards
                    document.body.clientHeight; // Quirks
        }

        return height;
    },

    getXY: function() {
        if (this.div.parentNode === null || this.div.offsetParent === null ||
                this.div.style.display == 'none') {
            return false;
        }

        var parentNode = null;
        var pos = [];
        var box;

        if (this.div.getBoundingClientRect) { // IE
            box = this.div.getBoundingClientRect();
            var doc = document;
            var scrollTop = Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
            var scrollLeft = Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);

            return [box.left + scrollLeft, box.top + scrollTop];
        }
        else { // safari, opera, & gecko
            pos = [this.div.offsetLeft, this.div.offsetTop];
            parentNode = this.div.offsetParent;
            if (parentNode != this.div) {
                while (parentNode) {
                    pos[0] += parentNode.offsetLeft;
                    pos[1] += parentNode.offsetTop;
                    parentNode = parentNode.offsetParent;
                }
            }
            if (isSafari && this.div.style.position == 'absolute' ) { // safari doubles in some cases
                pos[0] -= document.body.offsetLeft;
                pos[1] -= document.body.offsetTop;
            } 
        }

        if (this.div.parentNode) { parentNode = this.div.parentNode; }
        else { parentNode = null; }

        while (parentNode && parentNode.tagName.toUpperCase() != 'BODY' && parentNode.tagName.toUpperCase() != 'HTML') 
        { // account for any scrolled ancestors
            if (parentNode.style.display != 'inline') { // work around opera inline scrollLeft/Top bug
                pos[0] -= parentNode.scrollLeft;
                pos[1] -= parentNode.scrollTop;
            }

            if (parentNode.parentNode) {
                parentNode = parentNode.parentNode; 
            } else { parentNode = null; }
        }


        return pos;
    },

    setXY: function(pos) {
        var style_pos = this.div.style.position;
        if (style_pos != 'relative') { // default to relative
            this.div.style.position = 'relative';
            style_pos = 'relative';
        }

        var pageXY = this.getXY();
        if (pageXY === false) { // has to be part of doc to have pageXY
            return false; 
        }

        var delta = [ // assuming pixels; if not we will have to retry
            parseInt( this.div.style.left, 10 ),
            parseInt( this.div.style.top, 10 )
        ];

        if ( isNaN(delta[0]) ) {// in case of 'auto'
            delta[0] = (style_pos == 'relative') ? 0 : this.div.offsetLeft;
        } 
        if ( isNaN(delta[1]) ) { // in case of 'auto'
            delta[1] = (style_pos == 'relative') ? 0 : this.div.offsetTop;
        } 

        if (pos[0] !== null) { this.div.style.left = pos[0] - pageXY[0] + delta[0] + 'px'; }
        if (pos[1] !== null) { this.div.style.top = pos[1] - pageXY[1] + delta[1] + 'px'; }
    }

};

/**
 * UserData
 *
 */
UserData = function() {
	this.init();
};

UserData.prototype = {
	firstname: "",
	lastname: "",
	email: "",
	loggedIn: false,
	freeAccessCookie: "freeaccess",
	path: "/",
	domain: "computer.org",
	
	init: function() {
            this.restore();
	},
	
	restore: function() {
		this.loggedIn = loggedIn;
		if (this.loggedIn) {
			this.firstname = firstName;
			this.lastname = lastName;
			this.email = email;
		}
		// If there are cookies and the freeaccess cookie is present
		else if ((document.cookie.length > 0) && this.hasCookie(this.freeAccessCookie)) {
				var values = this.getCookieValue(this.freeAccessCookie).split("|");
				this.firstname = values[0];
				this.lastname = values[1];
				this.email = values[2];
		}
	},
	
	hasCookie: function(cookieName) {
		if (document.cookie.length > 0)
			return (document.cookie.indexOf(cookieName) > -1);
		else
			return false;
	},
	
	getCookieValue: function(cookieName) {
		if (document.cookie.length > 0) {
			// Look for the cookie
			var start = document.cookie.indexOf(cookieName + "=");
			if (start != -1) {
				start = start + cookieName.length + 1;
				var end = document.cookie.indexOf(";", start);
				if (end == -1) {
					end = document.cookie.length;
				}
				return unescape(document.cookie.substring(start, end));
			}
		}
		return "";
	},
	
	trimTrailingChar: function(value, chr) {
		var end = value.indexOf(chr, 0);
		if (end != -1)
			return value.substring(0, end);
		else
			return value;
	},
	
	save: function(persist) {
		if (persist)
			document.cookie = this.freeAccessCookie + "=" + this.getValuesAsString() + ";path=" + this.path + ";domain=" + this.domain + ";expires = Thu,31-Dec-2020 00:00:00 GMT;";
		else
			document.cookie = this.freeAccessCookie + "=" + this.getValuesAsString() + ";path=" + this.path + ";domain=" + this.domain;
	},
	
	getValuesAsString: function() {
		return escape(this.trim(this.firstname) + "|" + this.trim(this.lastname) + "|" + this.trim(this.email));
	},

	ltrim: function(value) {
		var re = /\s*((\S+\s*)*)/;
		return value.replace(re, "$1");
	},

	rtrim: function(value) {
		var re = /((\s*\S+)*)\s*/;
		return value.replace(re, "$1");
	},

	trim: function(value) {
		return this.ltrim(this.rtrim(value));
	},

	isValid: function() {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		var valid = true;
		if (this.trim(this.firstname) < 1) valid = false;
		if (this.trim(this.lastname) < 1) valid = false;
		if (!this.email.match(re)) valid = false;
		return valid;
	},

	toString: function() {
			return this.trim(this.firstname + ' ' + this.lastname + ' ' + this.email);
	}

};

function ss(id) {
    window.status = "";
    return true;
}

initEmailPanel();

