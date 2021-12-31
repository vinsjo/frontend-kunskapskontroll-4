const currentPage = location.pathname.split('/').at(-1) || 'index.html';
$(`header a[href="${currentPage}"]`)
	.addClass('current')
	.attr('title', 'You are here');

$('button.icon.burger').on('pointerdown', function (ev) {
	// $('.animation-caption').text(ev.type);
	$('nav').toggleClass('open');
});

/**
 * "Closes" burger-menu when window is resized to more than 720px in width,
 * and hides initial transition-animation when width is less
 */

$(window).on('touchstart', function (ev) {
	$('.animation-caption').text($(ev.target).get(0).nodeName);
	console.log($(ev.target).get(0).nodeName);
});
window
	.matchMedia('only screen and (min-width: 768px)')
	.addEventListener('change', function (ev) {
		if (ev.matches) return $('nav').removeClass('open');
		$('.nav-links').hide();
		setTimeout(() => {
			$('.nav-links').show();
		}, 0);
	});
