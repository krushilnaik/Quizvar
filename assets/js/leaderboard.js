let scoresElement = document.getElementById('scores');

function showScores() {
	scoresElement.innerHTML = localStorage.getItem('quizvar-scores');
}

function clearScores() {
	localStorage.setItem('quizvar-scores', '');
	scoresElement.innerHTML = '';
}

localStorage.setItem(
	'quizvar-scores',
	JSON.stringify([
		{ initials: 'KN', score: 5 },
		{ initials: 'RDJ', score: 5 },
		{ initials: 'KN', score: 3 },
		{ initials: 'KN', score: 3 }
	])
);

showScores();
