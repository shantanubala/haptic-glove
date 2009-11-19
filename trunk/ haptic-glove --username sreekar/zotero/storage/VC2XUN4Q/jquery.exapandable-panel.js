
////////////////////////////
$(function() {
	$('#purchaseexpand')/*.find('div.collapse').hide().end()*/
	.find('span.expand').wrapInner('<a href="#expand/collapse" title="Expand/Collapse" />');

    $('span.expand').click(function() {
        $(this).toggleClass('open')
        .next('div.collapse.normal').slideToggle('slow').end()
        .next('div.collapse.slow').slideToggle('slow','linear');
    });
});

