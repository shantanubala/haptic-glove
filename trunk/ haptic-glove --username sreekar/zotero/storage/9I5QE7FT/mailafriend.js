function mailafriend(url, form_url, width, height){
	var rel_url = document.URL.substring(document.URL.indexOf("/",8));
	var newform_url = "/foxtrot/svc/mailform?file=";
	window.location = newform_url + rel_url;
}
