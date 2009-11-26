
function csa_ajax_get_rights(id, issn, pd, f1, jdf, sid) {
	var dv = document.getElementById(id);
	if(dv.innerHTML == "") {
		dv.innerHTML = '<img src="/ids70/images/waiting.gif" />';
		var url = '/ids70/rights_management/index.php';
		var pars = 'issn=' + URLEncode(issn) 
			+ '&year=' + URLEncode(pd) 
			+ '&format=html&f1=' + URLEncode(f1) 
			+ '&jdf=' + URLEncode(jdf) 
			+ '&SID=' + sid;

		var myAjax = new Ajax.Updater(id, url, { method: 'get', parameters: pars});
	}
}

function csa_copy_rights(srcid, destid) {
	var src = document.getElementById(srcid);
	var dest = document.getElementById(destid);
	dest.innerHTML = src.innerHTML;
}

