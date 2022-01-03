/**
 * @param {String[]} urls
 */
async function preloadImages(urls) {
	const preload = urls.map(
		url =>
			new Promise(resolve => {
				const img = $(`<img src="${url}">`);
				img.on('load', function () {
					resolve(this);
				}).on('error', () => resolve(false));
				if (img.get(0).complete) img.trigger('load');
			})
	);
	const output = [];
	for await (const img of preload) {
		if (!img) continue;
		output.push(img);
	}
	return output;
}

/**
 * @param {String[]} elements
 * @param {String[]} eventTypes
 */
function stopMultiplePropagations(elements, eventTypes) {
	elements.forEach(element => {
		eventTypes.forEach(event => {
			$(element).on(event, function (ev) {
				ev.stopPropagation();
			});
		});
	});
}

export { preloadImages, stopMultiplePropagations };
