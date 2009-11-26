
function csa_ajax_get_limits(id, db, sid) {
	var hide_show;
	var buttonid = 'showhidetext-' + db + '-b';
	var sectionid = 'extended_limits';

	if( undefined == document.getElementById(id) || undefined == document.getElementById(buttonid) || undefined == document.getElementById(sectionid) ) {
		return;
	}

	var inverse_hs = 1;

	var url = '/ids70/snippets/limits.php';
	var url2 = '/ids70/snippets/hide_show_limits.php';

	var param = 'SF=section|' + db + '|' + hide_show + "&" + sid;
	var param2= "db=" + db + "&hd=" + hide_show;

	// change element of the layer
	var param;

	if (document.getElementById( buttonid ).value == 'section|' + db + '|0' || document.getElementById( buttonid ).value == document.getElementById('textu').innerHTML) {
		
		param = 'SF=section|' + db + '|0&' + sid ;
	
		// Set up the style for hiding the limits
		document.getElementById( buttonid ).value = 'section|' + db + '|1';
		document.getElementById( id ).style.display = 'none';
		csa_ajax_phrase_book(buttonid, sid, 'TX_SHOW');
		var myAjax = new Ajax.Updater(id, url, { method: 'get', parameters: param});

	} else {
		param = 'SF=section|' + db + '|1&' + sid ;
		document.getElementById( buttonid ).value = 'section|' + db + '|0';
		document.getElementById( id ).innerHTML = '<img src="/ids70/images/waiting.gif" />';
		csa_ajax_phrase_book(buttonid, sid, 'TX_HIDE');

		// Set up the style for displaying the limits
		document.getElementById( id ).style.display = '';
		document.getElementById( id ).style.width = '100%';
		document.getElementById( id ).style.float = 'none';
		document.getElementById( id ).style.padding = '4px 4px';

		if(db == "MORESEARCHOPTIONS" || db == "MORESEARCHOPTIONSsmall") {
			document.getElementById( sectionid ).innerHTML = '<img src="/ids70/images/waiting.gif" />';
			var myAjax = new Ajax.Updater(sectionid, url, { method: 'get', parameters: param});
			
		} else {
			var myAjax = new Ajax.Updater(id, url, { method: 'get', parameters: param});
		}

	}

};

function csa_ajax_search_options(id, option, hideOrShow){
	if(undefined == document.getElementById(id)) {
		return;
	}

	var url = '/ids70/snippets/show_limits.php';
	
	if(hideOrShow == 1){
		hideOrShow = true;
	}
	else{
		hideOrShow = false;
	}

	var param = 'op='+option+'&hs='+hideOrShow;

	if( hideOrShow ){
		document.getElementById( option ).style.display = '';
	}
	else{
		document.getElementById( option ).style.display = 'none';
	}
	var myAjax = new Ajax.Updater(id, url, { method: 'get', parameters: param});
	
};

// allows use of csa_ajax_phrase_book within functions.
function csa_ajax_phrase_book(element_id, session, name) {
	if(undefined == document.getElementById(element_id)) {
		return;
	}

	var param = session + '&name='+name;
	var url = "/ids70/snippets/phrase_book.php";
	document.getElementById( element_id ).innerHTML = '<img src="/ids70/images/waiting.gif" />';
	var myAjax = new Ajax.Request( url, { 
		method: 'get', 
		parameters: param, 
		onComplete: function(response) { 
			document.getElementById( element_id ).innerHTML = response.responseText;
		} 
	});
}

// change the selected databases based on the input.
function csa_ajax_select_collection_update_limits(sessionid, collection_id) {
	// alert(collection_id);
	window.sessionid = sessionid;
	var param = sessionid + "&collection_id=" + collection_id + "&Go_UpdateAndExit=1";
	var url = "/ids70/p_search_form.php";
	var myAjax = new Ajax.Request( url, { method: 'get', parameters: param, onComplete: refresh_limits } );
}

function refresh_limits(unused_response) {

	var elemArray = new Array('now_selected_label', 'now_selected_data', 'hideShow', 'hideShow2' );
	
	var i = 0;

	for( i = 0; i < elemArray.length; i++){
		if( undefined != document.getElementById(elemArray[i]) ){
			document.getElementById(elemArray[i]).style.display = 'none';
		}
	}

	var sectionid = 'extended_limits';
	
	var url = '/ids70/snippets/limits.php';
	
	var param = window.sessionid + '&SF=section|MORESEARCHOPTIONS|-';
	
	if(undefined == document.getElementById(sectionid)) {
		sectionid = 'all_limits';
		if(undefined == document.getElementById(sectionid)) {
			return;
		}
		param = window.sessionid + '&SF=section|ALLLIMITS|-';
		var myAjax = new Ajax.Updater(sectionid, url, { method: 'get', parameters: param});
	}

	document.getElementById( sectionid ).innerHTML = '<img src="/ids70/images/waiting.gif" />';
	
	var myAjax = new Ajax.Updater(sectionid, url, { method: 'get', parameters: param});
}
