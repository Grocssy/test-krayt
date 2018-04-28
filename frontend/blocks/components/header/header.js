function toggleHeaderFix() {
	let fromTop = $(window).scrollTop();
	$('#header').toggleClass('header--fix', fromTop>0);
}

document.addEventListener('DOMContentLoaded', toggleHeaderFix);
window.addEventListener('load', toggleHeaderFix);
window.addEventListener('scroll', toggleHeaderFix);