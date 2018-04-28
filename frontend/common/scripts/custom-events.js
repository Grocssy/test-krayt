// resizeEnd
let isResizing;
$(window).on('resize.resizeEnd', function() {
	clearTimeout(isResizing);
	isResizing = setTimeout(function() {
		$(window).trigger('resizeEnd');
	}, 250);
});