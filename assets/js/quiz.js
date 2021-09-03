/**
 * @type {HTMLDivElement}
 */
let root = document.querySelector('.wrapper');

/**
 * @type {HTMLSpanElement}
 */
let progressBar = document.querySelector('.progress-bar span');

/**
 * @type {HTMLDivElement}
 */
let progressMarkers = document.querySelector('.markers');

let answered = 0;

let answeredCorrectly = 0;

/**
 * @typedef QuestionShape
 * @property {string} title - the actual question
 * @property {string} choiceA - choice with index 0
 * @property {string} choiceB - choice with index 1
 * @property {string} choiceC - choice with index 2
 * @property {string} choiceD - choice with index 3
 * @property {number} correct - the correct choice's index
 */

/**
 * @param {QuestionShape} question
 * @param {number} currentIndex
 * @param {number} numQuestions
 */
function Question(
	{ title, choiceA, choiceB, choiceC, choiceD, correct },
	currentIndex,
	numQuestions
) {
	let question = document.createElement('div');
	question.className = 'question';

	const offset = (numQuestions - currentIndex - 1) * 10;

	const margin = `-${offset}px`;

	question.style.marginTop = margin;
	question.style.marginLeft = margin;
	question.style.zIndex = currentIndex.toString();

	question.innerHTML = `<h2>${title}</h2>`;

	[choiceA, choiceB, choiceC, choiceD].forEach((text, i) => {
		let choice = document.createElement('button');
		choice.className = 'choice';
		choice.innerHTML = /*html*/ `
			<div>
				<span>${text}</span>
			</div>
		`;

		choice.addEventListener('click', () => {
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

		question.appendChild(choice);
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
