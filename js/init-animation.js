import { preloadImages } from './modules/helpers.js';

(async function () {
	const imageURLs = [
		'assets/icons/smiley.svg',
		'assets/icons/smiley-nofill.svg',
	];
	const images = await preloadImages(imageURLs);

	setTimeout(() => {
		$('.animation-container').addClass('show');
		setTimeout(() => {
			$('.caption-container').addClass('show');
		}, 500);
	}, 500);

	if (!images.length) return;

	for (let i = 0; i < 3; i++) {
		const src = i % 2 === 0 ? images[0] : images[1] || images[0];
		const clone = $(src).clone().attr({
			class: 'smiley',
			alt: 'Smiley Icon',
		});
		$('.animation-container').append(clone);
	}
})();
