/**
 * @type {HTMLDivElement}
 */
let startButton = document.querySelector('.start-button');
let [openTag, closeTag] = startButton.querySelectorAll('span');

/**
 * @type {HTMLDivElement}
 */
let background = document.querySelector('.background');

/**
 * @type {KeyframeAnimationOptions}
 */
const buttonOptions = {
	duration: 150,
	fill: 'forwards'
};

/**
 * @type {KeyframeAnimationOptions}
 */
const backgroundOptions = {
	duration: 200,
	easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
	fill: 'forwards'
};

// fade it in
startButton.addEventListener('mouseover', () => {
	openTag.animate([{ opacity: 1, transform: 'translateX(0)' }], buttonOptions);
	closeTag.animate([{ opacity: 1, transform: 'translateX(0)' }], buttonOptions);

	background.animate(
		[{ borderRadius: '0', width: '100vw', height: '100vh' }],
		backgroundOptions
	);
});

// fade it out
startButton.addEventListener('mouseleave', () => {
	openTag.animate([{ opacity: 0, transform: 'translateX(-50%)' }], buttonOptions);
	closeTag.animate([{ opacity: 0, transform: 'translateX(50%)' }], buttonOptions);

	background.animate(
		[{ borderRadius: '50%', width: '0', height: '0' }],
		backgroundOptions
	);
});
