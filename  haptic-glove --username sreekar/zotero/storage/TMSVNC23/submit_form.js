// Functions for form submission
// http://codebetter.com/blogs/darrell.norton/archive/2004/03/03/8374.aspx

function fnTrapKD(event, btn) {
	if (document.all) {
		if (event.keyCode == 13) {
			event.returnValue = false;
			event.cancel = true;
			btn.click();
			return false;
		}
	} else if (document.getElementById) {
		if (event.which == 13){
			event.returnValue = false;
			event.cancel = true;
			btn.click();
			return false;
		}
	} else if (document.layers) {
		if (event.which == 13){
			event.returnValue = false;
			event.cancel = true;
			btn.click();
			return false;
		}
	}
}
