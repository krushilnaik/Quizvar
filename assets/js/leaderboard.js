let scoresElement = document.getElementById('scores');

/**
 * @type {HTMLAnchorElement}
 */
let homeLink = document.querySelector('#go-back');

function showScores() {
	/**
	 * @type {{score: number, initials: string}[]}
	 */
	const scores = JSON.parse(localStorage.getItem('quizvar-scores'));

	const gradients = [
		'linear-gradient(-45deg, gold, goldenrod)',
		'linear-gradient(-45deg, aliceblue, gainsboro)',
		'linear-gradient(-45deg, chocolate, lightsalmon)'
	];

	scores
		.slice(0, 5)
		.sort((a, b) => (a.score > b.score ? -1 : 1))
		.forEach((score, i) => {
			scoresElement.innerHTML += /*html*/ `
				<div class="card">
					<div class="badge" style="${
						i < gradients.length ? `background: ${gradients[i]}` : 'opacity: 0'
					}">
						<img src="assets/images/star.png" alt="star">
					</div>
					<span class="player-initials">${score.initials}</span>
					<span class="number">${score.score}</span>
				</div>
			`;
		});
}

function clearScores() {
	localStorage.setItem('quizvar-scores', '[]');
	scoresElement.innerHTML = '';
}

showScores();

homeLink.addEventListener('mouseover', function (e) {
	document.body.style.backgroundColor = 'blanchedalmond';
});

homeLink.addEventListener('mouseleave', function (e) {
	document.body.style.backgroundColor = 'var(--backgroundColor)';
});
