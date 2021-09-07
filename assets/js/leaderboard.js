let scoresElement = document.getElementById('scores');

function showScores() {
	scoresElement.innerHTML = localStorage.getItem('quizvar-scores');
}

function clearScores() {
	localStorage.setItem('quizvar-scores', '[]');
	scoresElement.innerHTML = '';
}

showScores();
