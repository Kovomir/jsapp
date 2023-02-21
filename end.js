document.addEventListener("DOMContentLoaded", function () {
    const username = document.querySelector('#username');
    const saveScoreButton = document.querySelector('#saveScoreButton');
    const finalScore = document.querySelector('#finalScore');
    const mostRecentScore = localStorage.getItem('mostRecentScore');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    finalScore.innerText = `Finální skóre: ${mostRecentScore}`;

    username.addEventListener("keyup", () => {
        saveScoreButton.disabled = !username.value;
    });


    saveScore = e => {
        e.preventDefault();

        const score = {
            score: mostRecentScore,
            name: username.value
        }

        highScores.push(score);

        highScores.sort((a, b) => {
            return b.score - a.score;
        });

        highScores.splice(5);

        localStorage.setItem('highScores', JSON.stringify(highScores));
        window.location.assign('index.html');
    }
});