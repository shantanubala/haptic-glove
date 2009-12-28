var help_newWin = null;

function load_help_page(strUrl) {
	if (help_newWin == null || help_newWin.closed) {
		var w_left = (screen.width/4);
		var w_top = (screen.height/4);
		var w_width = (screen.width/2);
		if (w_width < 757) { w_width = 757; }
		var w_height = (screen.height/2);

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

		help_newWin = window.open(strUrl, "Help", strOptions);
	} else {
		help_newWin.location.href = strUrl;
	}
	help_newWin.focus();
}
