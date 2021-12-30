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
 * Bind click handler and "touch-tap"
 *
 * @param {String} elementQuery
 * @param {Function} handlerCallback
 */
function handleClickTouch(elementQuery, handlerCallback) {
	let touchDown = false,
		touchMove = false,
		timeOut = Date.now();
	const el = $(elementQuery);
	el.on('click', function (ev) {
		if (Date.now() - timeOut < 30) return;
		timeOut = Date.now();
		handlerCallback(ev);
	});
	el.on('touchstart', () => (touchDown = true));
	el.on('touchmove', () => (touchMove = touchDown));
	el.on('touchend', () => {
		if (touchDown && !touchMove) el.trigger('click');
		touchDown = touchMove = false;
	});
}

export { preloadImages, handleClickTouch };
