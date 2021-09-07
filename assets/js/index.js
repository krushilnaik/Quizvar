/**
 * the start "button" (actually a link to the quiz page)
 * @type {HTMLDivElement}
 */
let startButton = document.querySelector('.start-button');
let [openTag, closeTag] = startButton.querySelectorAll('span');

function fadeIn() {
	openTag.animate([{ opacity: 1, transform: 'translateX(0)' }], buttonOptions);
	closeTag.animate([{ opacity: 1, transform: 'translateX(0)' }], buttonOptions);
}

function fadeOut() {
	openTag.animate([{ opacity: 0, transform: 'translateX(-50%)' }], buttonOptions);
	closeTag.animate([{ opacity: 0, transform: 'translateX(50%)' }], buttonOptions);
}

/**
 * Dummy element that expands and shrinks the emulate a background animation
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
	fadeIn();

	background.animate(
		[{ borderRadius: '0', width: '100vw', height: '100vh' }],
		backgroundOptions
	);
});

// fade it out
startButton.addEventListener('mouseleave', () => {
	fadeOut();

	background.animate(
		[{ borderRadius: '50%', width: '0', height: '0' }],
		backgroundOptions
	);
});

(() => {
	fadeIn();
	setTimeout(() => {
		fadeOut();
	}, 400);

	if (localStorage.getItem('quizvar-scores') === null) {
		localStorage.setItem('quizvar-scores', '[]');
	}
})();
