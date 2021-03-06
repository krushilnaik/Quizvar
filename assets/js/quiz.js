/**
 * The mount points for each JS-driven part of the UI
 * (basically the entire site because web dev amirite?)
 * @type {HTMLElement[]}
 */
let [root, progressBar, timer, pulse] = [
	document.querySelector('.wrapper'),
	document.querySelector('.progress-bar span'),
	document.querySelector('.timer'),
	document.querySelector('.pulse')
];

let answered = 0;
let answeredCorrectly = 0;
let timeRemaining = 61;
let timerRef;

function updateTimer(time = 1) {
	if (timeRemaining <= time) {
		clearInterval(timerRef);

		root.replaceChildren(SubmissionForm());
	}

	timeRemaining -= time;
	timer.innerHTML = timeRemaining.toString();

	if (timeRemaining <= 5) {
		pulseTimer();
	}
}

function pulseTimer() {
	timer.animate([{}, { color: 'crimson', fontSize: '40px' }, {}], {
		duration: 400
	});

	pulse.animate([{ width: '150%', height: '150%', opacity: 0 }], {
		duration: 400
	});
}

// The countdown
timerRef = setInterval(() => {
	updateTimer();

	if (Math.max(0, timeRemaining) === 0) {
		clearInterval(timerRef);
	}
}, 1000);

function SubmissionForm() {
	let form = document.createElement('div');
	form.className = 'card form';

	/**
	 * Record player's score in LocalStorage
	 * @param {Event} event
	 */
	const onClick = (event) => {
		event.preventDefault();

		/**
		 * Where the player typed their initials
		 * @type {HTMLInputElement}
		 */
		const input = document.querySelector('#initials');

		let temp = JSON.parse(localStorage.getItem('quizvar-scores'));
		const initials = input.value.trim();

		temp.push({ initials, score: answeredCorrectly });

		localStorage.setItem('quizvar-scores', JSON.stringify(temp));

		window.location.replace('leaderboard.html');
	};

	form.innerHTML = /*html*/ `
		<span class='score-report'>You scored ${answeredCorrectly} out of ${answered}!</span>
		<form action="">
			<input type="text" name="initials" id="initials" required>
			<button type="submit" class='pill'>
				<div>
					<span>Submit</span>
				</div>
			</button>
		</form>
	`;

	form.querySelector('form').addEventListener('submit', onClick);

	return form;
}

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
	question.className = 'card question';

	/**
	 * how many pixels forward to bring each card (top and left)
	 * this is entirely for aesthetic (depth perception)
	 */
	const offset = (numQuestions - currentIndex - 1) * 7;

	const margin = `-${offset}px`;

	question.style.marginTop = margin;
	question.style.marginLeft = margin;

	question.innerHTML += /*html*/ `
		<h2>
			<span style="color: cornflowerblue;">Q${answered + 1}:</span>
			<span style="font-style: italic">${title}</span>
		</h2>
	`;

	choices.forEach((choice, i) => {
		let button = document.createElement('button');
		button.className = 'pill choice';
		button.innerHTML = /*html*/ `
			<div>
				<span></span>
			</div>
		`;

		button.querySelector('span').textContent = choice;

		/**
		 * The main functionality of the quiz
		 * The user clicks one of the choices
		 * The "game" responds accordingly:
		 *
		 * 1) If they were right, play a neat animation
		 * 2) If they were wrong... also play a neat animation
		 * 	but also shave 10 secconds off the timer as penalty
		 */
		button.addEventListener('click', (event) => {
			event.preventDefault();

			const wasCorrect = i === correct;

			question
				.querySelector(`button:nth-child(${correct + 2})`)
				.classList.add('correct');

			if (wasCorrect) {
				// if they got it right, yay!
				answeredCorrectly++;
			} else {
				// if not, rub it in their face
				pulseTimer();
				updateTimer(10);
			}

			question.style.backgroundColor = wasCorrect ? 'mediumseagreen' : 'salmon';

			answered++;

			progressBar.style.width = `${(answered / numQuestions) * 100}%`;

			question.classList.add('answered');

			question.innerHTML += /*html*/ `
				<div class="blocker">
					<span>${wasCorrect ? '???' : 'X'}</span>
				</div>
			`;

			// "drop" the flashcard
			setTimeout(() => {
				question.style.marginTop = `500px`;
				question.style.opacity = '0';

				if (answered === numQuestions) {
					setTimeout(() => {
						clearInterval(timerRef);

						root.style.top = '0';
						root.style.left = '0';

						setTimeout(() => {
							root.appendChild(SubmissionForm());
						}, 350);
					}, 500);
				}
			}, 450);

			// center the remaining cards
			setTimeout(() => {
				root.style.top = `${answered * 10}px`;
				root.style.left = `${answered * 10}px`;

				setTimeout(() => {
					question.remove();
				}, 250);
			}, 500);
		});

		question.appendChild(button);
	});

	return question;
}

/**
 * Build the quiz
 */
fetch('assets/json/sampleQuiz.json')
	.then((response) => response.json())
	.then((sampleQuiz) => {
		const numQuestions = sampleQuiz.length;

		sampleQuiz.reverse().forEach((question, i) => {
			root.appendChild(Question(question, i, numQuestions));
		});
	});
