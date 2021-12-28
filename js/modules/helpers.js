/**
 * @param {String[]} urls
 */
async function preloadImages(urls) {
	const preload = urls.map(
		url =>
			new Promise(resolve => {
				const img = $(`<img src="${url}">`);
				img.on('load error', function () {
					resolve(this);
				});
				if (img.get(0).complete) img.trigger('load');
			})
	);
	const output = [];
	for await (const img of preload) output.push(img);
	return output;
}

export { preloadImages };
