window['scrollState'] = false;
const offsetBlockSelector = '#header';

function scrollToTarget(event) {
	const $link = $(event.target);
	const target = $link.attr('href');
	const $target = $(target);
	
	if ($target.length > 0) {
		window.scrollState = true;
		
		let targetPos = $target.offset().top - $(offsetBlockSelector).outerHeight();
		let deltaY = Math.abs($(window).scrollTop() - targetPos);
		let time = Math.round(deltaY/2);
		
		$('body,html').stop().animate({scrollTop: Math.max(targetPos, 0)}, time, function() {
			setTimeout(function() {
				window.scrollState = false;
			}, 100);
		});
		
		$(this).closest('li').addClass('active').siblings().removeClass('active');
		
		event.preventDefault();
	}
}

const linkSelector = '.js-scroll-to-target';

function setClickLinksListener() {
	$(linkSelector).on('click', scrollToTarget);
}

document.addEventListener('DOMContentLoaded', setClickLinksListener);

export default scrollToTarget;