function expandOrCollapse(target_id) {
	var target = document.getElementById(target_id);
	if (typeof(target) != "undefined") {
		if (target.style.display != 'none') {
			target.style.display = 'none';
		} else {
			target.style.display = '';
		}
	}
}

function swapLabels(obj, label1, label2) {
	if (obj.innerHTML == label1) {
		obj.innerHTML = label2;
	} else {
		obj.innerHTML = label1;
	}
}
