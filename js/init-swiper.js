import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.js';
import { stopMultiplePropagations } from './modules/helpers.js';

const swiper = new Swiper('.swiper', {
	loop: true,
	keyboard: true,
	centeredSlides: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

stopMultiplePropagations(
	['.swiper-pagination', '.swiper-nav', '.swiper button.zoom'],
	['click', 'dblclick']
);

$('.swiper button.zoom').on('click', function () {
	$('.swiper').toggleClass('zoom');
});

$('.swiper').on('dblclick', function () {
	$('.swiper button.zoom').trigger('click');
});

$(window).on('keydown', function (ev) {
	if (!$('.swiper').is('.zoom') || ev.key !== 'Escape') return;
	$('.swiper').removeClass('zoom');
});
