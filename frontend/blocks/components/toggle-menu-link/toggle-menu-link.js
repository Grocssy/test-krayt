const linkSelector = '#toggle-menu-link';

function toggleMenu(event) {
	event.preventDefault();
	
	const $link = $(linkSelector);
	const menuSelector = $link.attr('href');
	const $menu = $(menuSelector);
	
	$link.toggleClass('active');
	$menu.collapse('toggle');
}

function setClickListener() {
	$(linkSelector).on('click', toggleMenu);
}

document.addEventListener('DOMContentLoaded', setClickListener);