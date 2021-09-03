const data = {
	title: 'This is a question',
	choiceA: 'Choice A',
	choiceB: 'Choice B',
	choiceC: 'Choice C',
	choiceD: 'Choice D',
	correct: 2
};

/**
 * @param {string} title - the actual question
 * @param {string} choiceA - choice index 0
 * @param {string} choiceB - choice index 1
 * @param {string} choiceC - choice index 2
 * @param {string} choiceD - choice index 3
 * @param {number} correct - index of the correct choice
 */
function Question(title, choiceA, choiceB, choiceC, choiceD, correct) {
	let question = document.createElement('div');
	question.className = 'question';

	question.innerHTML = `<h2>${title}</h2>`;

	[choiceA, choiceB, choiceC, choiceD].forEach((text, i) => {
		let choice = document.createElement('button');
		choice.className = 'choice';
		choice.innerHTML = /*html*/ `
			<div><span>${text}</span></div>
		`;

		choice.addEventListener('click', () => {
			console.log(i === correct ? 'Correct!' : 'Nah');
		});

		question.appendChild(choice);
	});

	return question;
}

const { title, choiceA, choiceB, choiceC, choiceD, correct } = data;

document
	.querySelector('main')
	.appendChild(Question(title, choiceA, choiceB, choiceC, choiceD, correct));
