document.addEventListener("DOMContentLoaded", function () {
    const question = document.querySelector('#question');
    const choices = Array.from(document.querySelectorAll('.choice-text'));
    const progressText = document.querySelector('#progressText');
    const scoreText = document.querySelector('#score');
    const progressBarFull = document.querySelector('#progressBarFull');

    let currentQuestion = {};
    let acceptingAnswers = true;
    let score = 0;
    let questionCounter = 0;
    let availableQuestions = [];
    console.log(availableQuestions);

    var questions = [];
    let jqxhr = $.getJSON("https://esotemp.vse.cz/~kovj19/questions.json", function () {
        console.log("success");
        //console.log(JSON.parse(jqxhr.responseText))
        questions = JSON.parse(jqxhr.responseText);
        //console.log(questions);
    }).always( function(){
        startGame(); 
    });
    
    // let questions = [
    //     {
    //         question: 'Jaké je hlavní město Česka?',
    //         choice1: 'Kodaň',
    //         choice2: 'Londýn',
    //         choice3: 'Praha',
    //         choice4: 'Bruntál',
    //         answer: '3'
    //     },
    //     {
    //         question: 'Jak se jmenuje nejvyšší hora alp?',
    //         choice1: 'Mont Blanc',
    //         choice2: 'Matterhorn',
    //         choice3: 'Grossglockner',
    //         choice4: 'Monte Rosa',
    //         answer: '1'
    //     },
    //     {
    //         question: 'Jaké je hlavní město Rumunska?',
    //         choice1: 'Budapešť',
    //         choice2: 'Sofie',
    //         choice3: 'Bukurešť',
    //         choice4: 'Kišiněv',
    //         answer: '3'
    //     },
    //     {
    //         question: 'Na jakém stromě roste avokádo?',
    //         choice1: 'avokádovník obecný',
    //         choice2: 'hruškovec přelahodný',
    //         choice3: 'slivoň zelená',
    //         choice4: 'jabloň přelahodná',
    //         answer: '2'
    //     },
    //     {
    //         question: 'Kdo je autorem Krtečka?',
    //         choice1: 'Eduard Petiška',
    //         choice2: 'Josef Brukner',
    //         choice3: 'Jiří Žáček',
    //         choice4: 'Zdeněk Miler',
    //         answer: '4'
    //     }
    // ];

    const SCORE_POINTS = 100;
    const MAX_QUESTIONS = 5;

    function startGame() {
        //console.log('started game')
        questionCounter = 0;
        score = 0;
        availableQuestions = questions;
        getNewQuestion();
        console.log(availableQuestions);
    }

    // min and max inclusive
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    console.log(choices)

    function getNewQuestion() {
        questionCounter++;
        if (availableQuestions.lenght === 0 || questionCounter > MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score);

            return window.location.assign('end.html');
        }

        progressText.innerText = `Otázka ${questionCounter} z ${MAX_QUESTIONS}`;
        progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

        //Chooses random question
        const questionsIndex = getRandomInt(0, (availableQuestions.length - 1));
        currentQuestion = availableQuestions[questionsIndex];
        //console.log(currentQuestion);

        question.innerText = currentQuestion.question;
        console.log(choices)

        choices.forEach(choice => {
            const number = choice.dataset['number'];
            console.log(choice.dataset)
            choice.innerText = currentQuestion['choice' + number]; //funguje jako currentQuestion.choice1
        });

        availableQuestions.splice(questionsIndex, 1);
        acceptingAnswers = true;
    }

    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!acceptingAnswers) {
                return;
            }

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            if (selectedAnswer == currentQuestion.answer) {
                classToApply = 'correct';
                incrementScore(SCORE_POINTS);
            } else {
                classToApply = 'wrong';
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 750);
        });
    });


    function incrementScore(num) {
        score += num;
        scoreText.innerText = score;
    }

    
});