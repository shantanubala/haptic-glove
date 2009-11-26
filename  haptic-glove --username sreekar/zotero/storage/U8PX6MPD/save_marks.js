function csa_ajax_mark_record(obj) {
	var url = '/ids70/ajax/mark_record.php' + '?SID=' + getIlluminaSID();

	url += '&search_id=' + $('search_id').getValue();
	url += '&' + (obj.checked ? 'mark' : 'clear') + '=' + obj.value;

	new Ajax.Updater('marks_link', url, { method: 'get' });
}

function getIlluminaSID() {
	var SID;
	var pos = location.href.indexOf('SID=');
	if (pos != -1) {
		var rpos = location.href.indexOf('&', pos);
		if (rpos != -1) {
			SID = location.href.substring(pos + 4, rpos);
		} else {
			SID = location.href.substring(pos + 4);
		}
		rpos = SID.indexOf('#');
		if (rpos != -1) {
			SID = SID.substring(0, rpos);
		}
	} else {
		var SID = $('SID').getValue();
	}

	return SID;
}

function create_mark_list() {
	var vform = document.page_form;
	var marked = "";
	if (typeof(vform) == "undefined") {
		return "";
	}
	if (typeof(vform.mark_id) == "undefined") {
		return "";
	}

	marked += "mark_id=" + escape(vform.mark_id.value);

	if (typeof(vform.mark) == "undefined") {
		return "";
	} else if (typeof(vform.mark.length) == "undefined") {
		if (vform.mark.checked == true) {
			marked += "&mark=" + vform.mark.value;
		}
	} else {
		for (i = 0; i < vform.mark.length; i++) {
			if (vform.mark[i].checked == true) {
				marked += "&mark=" + vform.mark[i].value;
			}
		}
	}
	return marked;
}

function form_save_marks(vform) {
	var marked = create_mark_list();
	if (marked.length > 0) {
		if (vform.action.indexOf('?') >= 0) {
			vform.action += "&" + marked;
		} else {
			vform.action += "?" + marked;
		}
	}
	return true;
}

function href_save_marks(a) {
	var marked = create_mark_list();
	if (marked.length > 0) {
		var href = a.href;
		var anchor = "";

		var anchor_pos = href.indexOf('#');
		if (anchor_pos >= 0) {
			anchor = href.substring(anchor_pos);
			href = href.substring(0, anchor_pos);
		}

		if (href.indexOf('?') >= 0) {
			href += "&" + marked;
		} else {
			href += "?" + marked;
		}

		a.href = href + anchor;
	}
	return true;
}
