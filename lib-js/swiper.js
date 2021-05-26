
// ====== swiper we ======

var mySwiper = new Swiper('.@@name__swiper', {
	// spaceBetween: 20,
	loop: true,
	autoHeight: true,
	grabCursor: true,
	// effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	navigation: {
		nextEl: '.@@name__btn-next',
		prevEl: '.@@name__btn-prev',
	},
	pagination: {
		el: '.@@name__swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		768: {
			// pagination: ' ',
		}
	}
});