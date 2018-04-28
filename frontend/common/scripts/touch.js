const support_touch = ('ontouchstart' in document);
$('html').addClass(support_touch ? 'html-touch' : 'html-no-touch');

$(document).on('touchstart touchend', 'a, .btn', function() {
	$(this).toggleClass('touch-active');
});