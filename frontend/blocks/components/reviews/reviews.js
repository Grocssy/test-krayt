import "slick-carousel";

let gallery;

const sectionSelector = '#reviews';
const gallerySelector = '#reviews-gallery';

const options = {
	
	slidesToShow: 3,
	slidesToScroll: 1,
	centerMode: false,
	infinite: true,
	speed: 300,
	prevArrow: sectionSelector + ' .slick-nav-btn--prev',
	nextArrow: sectionSelector + ' .slick-nav-btn--next',
	responsive: [
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1
			}
		},
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2
			}
		}
	]
};

function initReviewsGallery() {
	$(gallerySelector).slick(options);
}

document.addEventListener('DOMContentLoaded', initReviewsGallery);