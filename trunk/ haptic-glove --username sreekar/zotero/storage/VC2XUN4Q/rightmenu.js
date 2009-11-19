
function writeSpan (rewriteSpan, hideDiv, altText, rewriteText, additionalHideDiv, arrowRequired) {
	if (!document.getElementById) {
		return false;
	}
	var spanToChange = document.getElementById(rewriteSpan);
	if (spanToChange != null) {
		var elementToHide = document.getElementById(hideDiv);
		if (elementToHide != null) {
			elementToHide.className = "hide";
		}
		if (additionalHideDiv != null) {
			var additionalDivToHide = document.getElementById(additionalHideDiv);
			if (additionalDivToHide != null) {
				additionalDivToHide.className = "hide";
			}
		}
		if (arrowRequired) {
			var textToInsert = "<span class=\"right-arrow\"><a href=\"javascript:toggleDiv('"+ rewriteSpan + "','" + hideDiv + "', 'show' ,'" + altText +"' , '" + rewriteText + "', '" + additionalHideDiv + "','" + arrowRequired + "')\" alt=\"" + altText + "\">" + rewriteText +"</a></span>";
		} else {
			var textToInsert = "<a href=\"javascript:toggleDiv('"+ rewriteSpan + "','" + hideDiv + "', 'show' ,'" + altText +"' , '" + rewriteText + "', '" + additionalHideDiv + "')\" alt=\"" + altText + "\">" + rewriteText +"</a>";
		}
		spanToChange.innerHTML = textToInsert;
	} else {
		return false;
	}
}
function toggleDiv (rewriteSpan, hideDiv, showHide, altText, rewriteText, additionalHideDiv, arrowRequired) {
	if (!document.getElementById) {
		return false;
	}
	var elementToHide = document.getElementById(hideDiv);
	var spanToChange = document.getElementById(rewriteSpan);
	if (additionalHideDiv != 'none') {
		var additionalElementToHide = document.getElementById(additionalHideDiv);
	}
	if (elementToHide != null && spanToChange != null) {
		if (showHide == 'show') {
			elementToHide.className = "show";
			if (additionalElementToHide != null){
				additionalElementToHide.className = "show";
			}
			var newSpanHTML = "<span class=\"down-arrow\"><a href=\"javascript:toggleDiv('"+ rewriteSpan + "','" + hideDiv + "', 'hide', '" + altText +"', '" + rewriteText + "', '" + additionalHideDiv + "', '" + arrowRequired + "')\" alt=\"" + altText + "\">" +  rewriteText +"</a></span>";
			spanToChange.innerHTML = newSpanHTML;
		} else if (showHide == 'hide') {
			elementToHide.className = "hide";
			if (additionalElementToHide != null){
				additionalElementToHide.className = "hide";
			}
			if (arrowRequired) {
			var newSpanHTML = "<span class=\"right-arrow\"><a href=\"javascript:toggleDiv('"+ rewriteSpan + "','" + hideDiv + "', 'show', '" + altText +"', '" + rewriteText + "', '" + additionalHideDiv + "', '" + arrowRequired + "')\" alt=\"" + altText + "\">" +  rewriteText +"</a></span>";
			} else {
				var newSpanHTML = "<a href=\"javascript:toggleDiv('"+ rewriteSpan + "','" + hideDiv + "', 'show', '" + altText + "', '" + rewriteText + "', '" + additionalHideDiv + "' , '" + arrowRequired + "')\" alt=\"" + altText + "\">" + rewriteText +"</a></span>";
			}
			spanToChange.innerHTML = newSpanHTML;
		}
	}
}
function signIn(span, div) {
	if (!document.getElementById) {
		return false;
	}
	var elementToHide = document.getElementById(span);
	var elementToShow = document.getElementById(div);
	if (elementToShow == null || elementToHide == null) {
		return false;
	} else {
		elementToHide.className = "hide";
		elementToShow.className = "show";
	}
}
function flipflop (showDiv, hideDiv) {
	if (!document.getElementById) {
		return false;
	}
	var elementToShow = document.getElementById(showDiv);
	var elementToHide = document.getElementById(hideDiv);
	elementToShow.className = 'show';
	elementToHide.className = 'hide';
}
function flipflopText (element, visibleDiv, hiddenDiv) {
	if (!document.getElementById) {
		return false;
	}
	var elementToChange = document.getElementById(element);
	var elementToChangeText = elementToChange.innerHTML;
	var newText = '<a href="#" onclick="flipflop(\'' + hiddenDiv +'\', \'' + visibleDiv +'\'); return false">' + elementToChangeText + '</a>';
	elementToChange.innerHTML = newText;
}
addLoadEvent(function() {
	writeSpan('search-history-link', 'search-history-results', 'show Search History entries', 'Search History', null);
	writeSpan('write-my-ingenta', 'my-ingenta-content', 'my ingenta', 'Manage My Ingenta', null, true);
});
