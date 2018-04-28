import "slick-carousel";

const sectionSelector = '#portfolio';
const gallerySelector = "#portfolio-gallery";
const sliderSelector = gallerySelector + " .slick-slide";
const innerSelector = ".slick-slide__inner";
const sizeMultiplier = 0.05;
const options = {
	slidesToShow: 7,
	centerMode: true,
	infinite: true,
	speed: 300,
	prevArrow: sectionSelector + ' .slick-nav-btn--prev',
	nextArrow: sectionSelector + ' .slick-nav-btn--next',
	responsive: [
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 1199,
			settings: {
				slidesToShow: 5
			}
		}
	]
};

function initGallery() {
	
	$(gallerySelector).on('init', function(event, slick) {
		stylizeSlides(slick);
		setSliderSize();
	});
	
	$(gallerySelector).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		stylizeSlides(slick, nextSlide);
	});
	
	$(gallerySelector).slick(options);
}

function setSliderSize(event) {
	$(gallerySelector).css('height', $('.slick-track', $(gallerySelector)).height()+'px');
}

function stylizeSlides(slick, activeIndex) {
	activeIndex = activeIndex || 0;
	const slideCount = slick.slideCount;
	const maxLevel = Math.floor(slideCount/2);
	
	$(sliderSelector).each(function(){
		let $slide = $(this);
		let slideIndex = $slide.data('slick-index');
		let slideLevel = getSlideLevel(slideIndex, activeIndex, slideCount);
		
		let slideZIndex = maxLevel - slideLevel;
		let $inner = $(innerSelector, $slide);
		let slideHPadding = $inner.innerWidth()*sizeMultiplier*slideLevel + 'px';
		
		$slide.css({
			"z-index": slideZIndex,
		});
		$inner.css({
			'padding-left': slideHPadding,
			'padding-right': slideHPadding
		});
		$inner.attr('data-level', slideLevel)
		
	});
}

function getSlideLevel(currentIndex, activeIndex, slideCount) {
	let levelInArray = Math.abs(currentIndex - activeIndex);
	let levelCrossArray = slideCount - currentIndex + Math.abs(activeIndex) ;
	return Math.min(levelInArray, levelCrossArray);
}

document.addEventListener('DOMContentLoaded', initGallery);
$(window).on({
	'load': setSliderSize,
	'resize': setSliderSize,
	'resizeEnd': setSliderSize
});