// Functions for select_databases.php

function open_browse_window(href, title, attributes) {
	var my_win = window.open(href, title, attributes);
	my_win.focus();
}

function url_append(arg, add) {
	if (arg.length > 0) {
		arg += "&";
	}
	arg += add;
	return arg;
}

function href_insert_into_url(a, arg) {
	if (arg.length > 0) {
		var href = a.href;
		var anchor = "";

		var anchor_pos = href.indexOf('#');
		if (anchor_pos >= 0) {
			anchor = href.substring(anchor_pos);
			href = href.substring(0, anchor_pos);
		}

		if (href.indexOf('?') >= 0) {
			href += "&" + arg;
		} else {
			href += "?" + arg;
		}

		a.href = href + anchor;
	}
}


function create_collection_argument() {
	var arg = "";
	var vform = document.page_form;
	if (typeof(vform) == "undefined") {
		vform = document.search_form;
		if (typeof(vform) == "undefined") {
			return "";
		}
	}

	if (typeof(vform.collection_id) == "undefined") {
		return "";
	}
	if (typeof(vform.collection_id.selectedIndex) == "undefined") {
		return "";
	}

	arg += "tab_collection_id=" + vform.collection_id.options[vform.collection_id.selectedIndex].value;
	return arg;
}

function href_main_tab(a) {
	href_save_marks(a);
	href_insert_into_url(a, create_collection_argument());
}

function href_tools_tab(a) {
	href_save_marks(a);
	href_insert_into_url(a, create_collection_argument());
}


function get_dbtype() {
	var vform = document.page_form;
	
	if (typeof(vform.dbtype) == "undefined") {
		return "";
	} else if( typeof(vform.dbtype.value) == "undefined"){  // For IE6: sometimes these are not objects/null
		return "";
	} else if( typeof(vform.dbtype.value.length) == "undefined" ){ // For IE6: sometimes these are not objects/null
		return "";
	} else if (vform.dbtype.value.length == 0) {
		return "";
	}

	return "&dbtype=" + vform.dbtype.value;
}

function create_selected_db_list() {
	var arg = "";
	var vform = document.page_form;
	if (typeof(vform) == "undefined") {
		return "";
	}

	if (typeof(vform.db) == "undefined") {
		return "";
	} else if (typeof(vform.db.length) == "undefined") {
		if (vform.db.checked == true) {
			arg += "&arg=" + vform.db.value;
		}
	} else {
		for (i = 0; i < vform.db.length; i++) {
			if (vform.db[i].checked == true) {
				arg += "&db=" + vform.db[i].value;
			}
		}
	}

	return arg;
}

function get_sid_from_href(href) {
	var sid_pos = href.indexOf('SID=');
	var amp_pos = href.indexOf('&', sid_pos);

	if (amp_pos == -1) {
		return href.substr(sid_pos);
	} else {
		return href.substr(sid_pos, amp_pos - sid_pos);
	}
}

function href_main_tab_select_db(a) {
	var select_db_url = "";

	select_db_url = "p_select_databases.php?";
	select_db_url += get_sid_from_href(a.href) + create_selected_db_list() + get_dbtype() + "&Go_url&url=" + escape(a.href);

	a.href = select_db_url;
}


function create_query_form_argument() {
	var arg = "";
	var vform = document.page_form;
	if (typeof(vform) == "undefined") {
		vform = document.search_form;
		if (typeof(vform) == "undefined") {
			return "form=undefined";
		}
	}

	var idx = 0;
	for (idx = 0; idx < vform.elements.length; idx++) {
		var e = vform.elements[idx];

		if (e.type == "checkbox") {
			if (e.checked) {
				arg = url_append(arg, e.name + "=" + escape(e.value));
			}
		} else if (e.type == "hidden") {
			if (e.name != "SID") {
				arg = url_append(arg, e.name + "=" + escape(e.value));
			}
		} else if (e.type == "select-one") {
			arg = url_append(arg, e.name + "=" + escape(e.value));
		} else if (e.type == "radio") {
			if (e.checked) {
				arg = url_append(arg, e.name + "=" + escape(e.value));
			}
		}
	}

	return arg;
}

function href_append_query_form(a) {
	href_insert_into_url(a, create_query_form_argument());
}

function toggleLayer( whichLayer, showLink, hideLink ){
	var elem, vis, elem_show, elem_hide;
		
	if( document.getElementById ){ // this is the way the standards work
		elem = document.getElementById( whichLayer );
		elem_show = document.getElementById( showLink );
		elem_hide = document.getElementById( hideLink );
	}else if( document.all ){ // this is the way old msie versions work
		elem = document.all[whichLayer];
		elem_show = document.all[showLink];
		elem_hide = document.all[hideLink];
	}else if( document.layers ){ // this is the way nn4 works
		elem = document.layers[whichLayer];
		elem_show = document.layers[showLink];
		elem_hide = document.layers[hideLink];
	}
	vis = elem.style;
		
	// if the style.display value is blank we try to figure it out here
	if(vis.display==''&&elem.offsetWidth!=undefined&&elem.offsetHeight!=undefined)
		vis.display = (elem.offsetWidth!=0&&elem.offsetHeight!=0)?'block':'none';
	
	vis.display = (vis.display==''||vis.display=='block')?'none':'block';
	elem_show.style.display = 'block';
	elem_hide.style.display = 'none';

	//document.getElementById( showLink ).style.display = 'block';
	//document.getElementById( hideLink ).style.display = 'none';
}
