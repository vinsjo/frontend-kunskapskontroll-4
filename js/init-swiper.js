import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.js';
import { handleClickTouch } from './modules/helpers.js';

const swiper = new Swiper('.swiper', {
	loop: true,
	keyboard: true,
	centeredSlides: true,
	spaceBetween: 25,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

handleClickTouch('.swiper button.zoom', () => $('.swiper').toggleClass('zoom'));

$('.swiper').on('dblclick', function (ev) {
	if (
		$(ev.target).is('.swiper-nav') ||
		$(ev.target).is('.swiper-pagination')
	) {
		return;
	}
	$('.swiper button.zoom').trigger('click');
});
