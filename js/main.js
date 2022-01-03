// Add "current" class to link in nav which points to current page
const path = location.pathname.split('/').filter(str => str.length);
const currentPage = path[path.length - 1] || 'index.html';

$(`header a[href="${currentPage}"]`)
	.addClass('current')
	.attr('title', 'You are here');

// Add event listener to burger-icon to toggle burger-menu
$('button.icon.burger').on('pointerdown', function () {
	$('nav').toggleClass('open');
});

/**
 * "Closes" burger-menu when window is resized to more than 720px in width,
 * and hides initial transition-animation when width is less
 */
window
	.matchMedia('only screen and (min-width: 768px)')
	.addEventListener('change', function (ev) {
		if (ev.matches) return $('nav').removeClass('open');
		$('.nav-links').hide();
		setTimeout(() => {
			$('.nav-links').show();
		}, 0);
	});
