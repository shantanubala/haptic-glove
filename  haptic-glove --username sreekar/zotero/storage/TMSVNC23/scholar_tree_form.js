function select_all_ontnodes(value) {
	for(var i=0;i<document.page_form.elements.length;i++)	{
		var e = document.page_form.elements[i];
		if (e.name == "ontnode" && e.disabled == false) {
			e.checked = value;
		}
	}
	if (value == false) {
		document.page_form.Go_ScholarTree.value = "clear";
	}
}

function select_ontnode(ontnode) {
	for(var i=0;i<document.page_form.elements.length;i++)	{
		var e = document.page_form.elements[i];
		if (e.name == "ontnode" && e.value == ontnode) {
			e.checked = true;
		}
	}
}

function expand_collapse_ontnode(type, ontnode) {
	document.page_form.Go_ScholarTree.value = type;
	document.page_form.tree_expand_collapse.value = ontnode;
}


function submit_scholar_tree(type) {
	document.page_form.Go_ScholarTree.value = type;
	document.page_form.submit();
}
