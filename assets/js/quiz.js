/**
 * The mount points for each JavJS-driven part of the UI
 * @type {HTMLElement[]}
 */
let [root, progressBar, progressMarkers, timer] = [
	document.querySelector('.wrapper'),
	document.querySelector('.progress-bar span'),
	document.querySelector('.markers'),
	document.createElement('div')
];

let answered = 0;
let answeredCorrectly = 0;

/**
 * Generate the HTML for each question
 * @param {{
 * 	title: string,
 * 	choices: string[],
 * 	correct: number
 * }} question - the question data, pulled from JSON down below
 * @param {number} currentIndex - which question number we're at
 * @param {number} numQuestions - the total number of questions in the quiz
 */
function Question({ title, choices, correct }, currentIndex, numQuestions) {
	let question = document.createElement('div');
	question.className = 'question';

	const offset = (numQuestions - currentIndex - 1) * 10;

	const margin = `-${offset}px`;

	question.style.marginTop = margin;
	question.style.marginLeft = margin;

	title.split('\n').forEach((part) => {
		let qPart = document.createElement('h2');

		qPart.textContent = part;

		question.appendChild(qPart);
	});

	choices.forEach((choice, i) => {
		let button = document.createElement('button');
		button.className = 'choice';
		button.innerHTML = /*html*/ `
			<div>
				<span></span>
			</div>
		`;

		button.querySelector('span').textContent = choice;

		button.addEventListener('click', () => {
			const wasCorrect = i === correct;

			if (wasCorrect) answeredCorrectly++;

			progressMarkers.children[answered].classList.add(wasCorrect ? 'right' : 'wrong');

			question.style.backgroundColor = wasCorrect ? 'mediumseagreen' : 'salmon';

			answered++;

			progressBar.style.width = `${(answered / numQuestions) * 100}%`;

			question.classList.add('answered');

			question.innerHTML += /*html*/ `
				<div class="blocker">
					<span>${wasCorrect ? '✓' : 'X'}</span>
				</div>
			`;

			setTimeout(() => {
				question.style.marginTop = `500px`;
				question.style.opacity = '0';
			}, 200);

			setTimeout(() => {
				root.style.top = `${answered * 10}px`;
				root.style.left = `${answered * 10}px`;

				setTimeout(() => {
					question.remove();
				}, 250);
			}, 300);

			if (answered === numQuestions) {
				setTimeout(() => {
					alert(
						`You finished the quiz with a score of ${answeredCorrectly} out of ${numQuestions}`
					);
				}, 500);
			}
		});

		question.appendChild(button);
	});

	return question;
}

fetch('../../sample/sampleQuiz.json')
	.then((response) => response.json())
	.then((sampleQuiz) => {
		const numQuestions = sampleQuiz.length;

		progressMarkers.style.gridTemplateColumns = `repeat(${numQuestions}, 1fr)`;

		for (let i = 0; i < numQuestions; i++) {
			progressMarkers.innerHTML += /*html*/ `
				<span class='tag'></span>
			`;
		}

		sampleQuiz.reverse().forEach((question, i) => {
			root.appendChild(Question(question, i, numQuestions));
		});
	});
