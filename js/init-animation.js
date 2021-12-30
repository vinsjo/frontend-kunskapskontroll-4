import * as THREE from 'https://threejs.org/build/three.module.js';
import { vertShader, fragShader } from './modules/shaders.js';
import { preloadImages } from './modules/helpers.js';

(async function () {
	setTimeout(() => {
		$('.animation-caption').addClass('show');
	}, 1000);
	const dpr = 1;
	// const dpr = window.devicePixelRatio;
	const scene = new THREE.Scene();
	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: false,
	});

	$('.animation-container').append(renderer.domElement);

	const canvasRect = renderer.domElement.getBoundingClientRect();

	renderer.setPixelRatio(dpr);
	renderer.setSize(canvasRect.width, canvasRect.height, false);

	const camera = new THREE.PerspectiveCamera(
		25,
		canvasRect.width / canvasRect.height,
		0.1,
		1000
	);

	camera.position.z = 2;

	const rows = Math.ceil(Math.random() * 4);
	const cols = Math.ceil(canvasRect.width / (canvasRect.height / rows));
	const textureImage = await createImageGrid(
		['assets/icons/smiley.svg', 'assets/icons/smiley-nofill.svg'],
		rows,
		cols,
		canvasRect.width * dpr,
		canvasRect.height * dpr,
		0.25,
		0.25
	);
	if (!textureImage) {
		console.error('Failed creating texture for three.js animation');
		return;
	}

	const mesh = new THREE.Mesh(
		new THREE.PlaneGeometry(canvasRect.width / canvasRect.height, 1),
		new THREE.ShaderMaterial({
			vertexShader: vertShader,
			fragmentShader: fragShader,
			transparent: true,
			side: THREE.DoubleSide,
			uniforms: {
				uTime: { value: 0.0 },
				uTexture: {
					value: new THREE.TextureLoader().load(textureImage),
				},
				uNoiseFreq: {
					value: 5,
				},
				uNoiseAmp: {
					value: 0.2,
				},
				uNoiseLimit: {
					value: 0.2,
				},
				uNoiseSpeed: {
					value: 0.01,
				},
			},
		})
	);

	scene.add(mesh);

	let frameCount = 0;
	let isAnimating = false;

	function animate() {
		if (frameCount >= 3 && !isAnimating) return;
		requestAnimationFrame(animate);
		frameCount++;
		mesh.material.uniforms.uTime.value = frameCount;
		renderer.render(scene, camera);
	}

	$(window).on('resize', () => {
		const canvasRect = renderer.domElement.getBoundingClientRect();
		camera.aspect = canvasRect.width / canvasRect.height;
		camera.updateProjectionMatrix();
		renderer.setSize(canvasRect.width, canvasRect.height, false);
	});

	const animation = {
		start() {
			isAnimating = true;
			animate();
		},
		stop() {
			isAnimating = false;
		},
		toggle() {
			isAnimating ? this.stop() : this.start();
		},
		get isAnimating() {
			return frameCount < 3 || isAnimating;
		},
	};

	$(window).on('keydown', event => {
		switch (event.key) {
			case ' ':
				animation.toggle();
				break;
		}
	});

	animation.start();
})();

async function createImageGrid(
	imageURLs,
	rows,
	cols,
	width = 1024,
	height = 1024,
	cellPaddingRatio = 0.2,
	outerPaddingRatio = 0.1
) {
	const images = await preloadImages(imageURLs);
	if (!images.length) return false;

	const imgSize = {
		width: Math.max(...images.map(img => img.naturalWidth)),
		height: Math.max(...images.map(img => img.naturalHeight)),
	};

	const outerPadding = Math.min(width, height) * outerPaddingRatio;

	const cell = {
		width: Math.floor((width - outerPadding * 2) / cols),
		height: Math.floor((height - outerPadding * 2) / rows),
	};

	const padding = Math.min(cell.width, cell.height) * cellPaddingRatio;

	const scale =
		(Math.min(cell.width, cell.height) - padding) /
		Math.max(imgSize.width, imgSize.height);

	const offset = new THREE.Vector2(
		(cell.width - imgSize.width * scale) * 0.5,
		(cell.height - imgSize.height * scale) * 0.5
	);

	const cnv = $(`<canvas width="${width}" height="${height}"></canvas>`);

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const img = images[Math.floor(Math.random() * images.length)];
			cnv.drawImage({
				source: img,
				x: outerPadding + col * cell.width + offset.x,
				y: outerPadding + row * cell.height + offset.y,
				width: imgSize.width * scale,
				height: imgSize.height * scale,
				fromCenter: false,
			});
		}
	}
	return cnv.getCanvasImage('png');
}
