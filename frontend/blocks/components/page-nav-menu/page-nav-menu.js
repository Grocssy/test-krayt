const offsetBlockSelector = '#header';
const menuSelector = ".page-nav-menu";
const linkSelector = menuSelector + ' a';

import scrollToTarget from '../../../common/scripts/js-scroll-to-target';

function setAnchor() {
	$(linkSelector).each(function() {
		let target = $(this).attr('href');
		let $target = $(target);

		if ($target.length > 0) {
			if (inViewport($target)) {
				$(this).parents('li').addClass('active').siblings().removeClass('active');
			}
		}
	});
}

function inViewport($block) {
	let fromTop = $(window).scrollTop() + $(offsetBlockSelector).innerHeight();
	let blockTop = $block.offset().top;
	let blockH = $block.innerHeight();
	
	let scrolledToBlockTop = fromTop >= blockTop;
	let scrolledToBlockBottom = fromTop > Math.floor(blockTop + blockH);
	
	return scrolledToBlockTop && !scrolledToBlockBottom;
}

function setClickListener() {
	$(linkSelector).on('click', scrollToTarget);
}

function scrollListener() {
	if (!window.scrollState) setAnchor();
}

document.addEventListener('DOMContentLoaded', setClickListener);
document.addEventListener('DOMContentLoaded', setAnchor);
window.addEventListener('load', setAnchor);
window.addEventListener('scroll', scrollListener);