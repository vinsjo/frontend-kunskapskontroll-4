import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.js';

(function () {
	if (!$('.swiper').length) return;

	const images = [
		'https://vincentsjogren.com/api/img/vsjogren_112_m.jpg',
		'https://vincentsjogren.com/api/img/vsjogren_135_m.jpg',
		'https://vincentsjogren.com/api/img/vsjogren_131_m.jpg',
		'https://vincentsjogren.com/api/img/vsjogren_021_m.jpg',
		'https://vincentsjogren.com/api/img/vsjogren_111_m.jpg',
	];

	$('.swiper-wrapper').append(
		...images.map(url =>
			$('<div></div>', {
				class: 'swiper-slide',
			}).append(
				$('<img>', {
					src: url,
					alt: 'An example image from my photography website, vincentsjogren.com',
				})
			)
		)
	);

	$('.swiper button.swiper-zoom').on('pointerdown', function () {
		$('.swiper').toggleClass('zoom');
	});

	$('.swiper').on('dblclick', function (ev) {
		const evTarget = $(ev.target);
		if (
			evTarget.is('.swiper-nav') ||
			evTarget.is('.swiper-pagination-bullet')
		)
			return;
		$('.swiper button.swiper-zoom').trigger('pointerdown');
	});

	const swiper = new Swiper('.swiper', {
		loop: true,
		keyboard: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
})();
