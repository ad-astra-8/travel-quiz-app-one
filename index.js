'use strict';

//question database
const STORE = [
    {
        //1 [0]
        question: 'What Ocean is Bora Bora in?',
        answers: [
            'Pacific Ocean',
            'Atlantic Ocean',
            'Arctic Ocean',
            'Indian Ocean'
        ],
        correctAnswer:
            'Pacific Ocean'
    },
    {
        //2 [1]
        question: 'What is the Capital of Italy?',
        answers: [
            'Milan',
            'Rome',
            'Madrid',
            'Sicily'
        ],
        correctAnswer:
            ' Rome'
    },
    {
        //3 [2]
        question: 'Which is the world\'s highest mountain?',
        answers: [
            'K2',
            'Kilimanjaro',
            'Mount Everest',
            'Mont Blanc'
        ],
        correctAnswer:
            'Mount Everest'
    },
    {
        //4 [3]
        question: 'Which one of these cities is not in Europe?',
        answers: [
            'Barcelona',
            'Prague',
            'Moscow',
            'Reykjavik'
        ],
        correctAnswer:
            'Moscow '
    },
    {
        //5 [4]
        question: 'How many countries are in Africa?',
        answers: [
            54,
            32,
            21,
            10
        ],
        correctAnswer:
            54
    },
    {
        //6 [5]
        question: 'What is the unit currency in Europe?',
        answers: [
            'Dollars',
            'Pesos',
            'Euros',
            'Pounds'
        ],
        correctAnswer:
            'Euros'
    },
    {
        //7 [6]
        question: 'Where are the Mayans Temples located?',
        answers: [
            'Italy',
            'Mexico',
            'Scotland',
            'Egypt'
        ],
    },
    {
        //8 [7]
        question: 'Which country is not part of Scandinavia?',
        answers: [
            'Finland',
            'Sweden',
            'Latvia',
            'Denmark'
        ],
        correctAnswer:
            'Latvia'
    },
    {
        //9 [8]
        question: 'What colors are on the French Flag?',
        answers: [
            'Blue, White, Red',
            'Green, White, Red',
            'Purple, White, Red',
            'Black, Yellow, Red'
        ],
        correctAnswer:
            'Blue, White, Red'
    },
    {
        //10 [9]
        question: 'Which one is the capital of the U.S?',
        answers: [
            'New York City',
            'Washington DC',
            'Miami',
            'Los Angeles'
        ],
        correctAnswer:
            'Washington DC'
    },
];

//this function displays what question the user is, also current score.
let scoreNumber = 0;
let questionNumber = 0;

// this function will allow the user to start the quiz when CLICK START.
function startQuiz() {
    $('#start').on('click', function (event) {
        templateQuestion(0);
        $('.js-intro').hide();
        $('.questionNumber').text(questionNumber);
        $('.questions').show();
    });
}


//this function should display the structure of the the questions form.
function templateQuestion(questionIndex) {
   
    let questionForm = $(`
    <form class="form">           
        <fieldset>   
            <legend class="question">${STORE[questionIndex].question}</legend>
            <ul></ul>
        </fieldset> 
    </form>
`)

    let formSection = $(questionForm).find('ul');

    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
        $(`<li>
        <label class="option" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
        </label>
        </li>`).appendTo(formSection);
    });
    $(`<div class="block-button"><button type="submit" class="submit">Go</button></div>`).appendTo(formSection);
    $('.questions').append(questionForm);
    $('.questions').show();
}

function goodAnswer() {
    let isRight = $(`<h3 class="success">Bravo!</h3>
        <img src="images/giphy-right.gif" alt="happy flight attendants" class="success-image"> 
        <button type="button" class="nextButton button">Next</button>`)
    $('.feedback').html(isRight);

    scoreNumber++;
    $('.scoreNumber').text(scoreNumber);
    $('.questions').hide();
}

function wrongAnswer() {
    let isWrong = $(`<h3 class="failure">Oops!</h3>
        <p>The correct answer was: ${STORE[questionNumber].correctAnswer}</p>
            <img src="images/giphy-wrong.gif" alt="flight attendants saying no" class="failure-image"></img>
            <button type="button" class="nextButton button">Next</button>`)
    $('.feedback').html(isWrong);
    $('.questions').hide();
}

// Upon CLICK on SUBMIT, this function will display TEXTUAL + VISUAL feedback. 
// IF incorrect, will DISPLAY correct answer.
function handleAnswers() {
    $(document).on('click', '.submit', function (event) {
        event.preventDefault(); 
        let questionNumber = parseInt( $('.questionNumber').text());
        console.log(questionNumber);
        // console.log('hello');
        //$('.feedback').show();
        let correct = STORE[questionNumber].correctAnswer;
        //console.log(correct);
        let answer = $("input[class='radio']:checked").val();
        //console.log(answer);
        if (answer == correct) {
            goodAnswer();
        } else if (answer == undefined) {
            alert('Please choose an option!');
        } else {
            wrongAnswer();
        }
        $('.feedback').show();
        nextQuestion();
    });
}

//this function generates the next question when user CLICK on button "NEXT"
//and render the next question on the form
function nextQuestion() {
    $(document).on('click', '.nextButton', function (event) {
        event.preventDefault();
        let questionNumber = parseInt( $('.questionNumber').text());
      //  console.log(questionNumber);
        $('.feedback').html('');
        $('.questions').show();
        $('.form').replaceWith(templateQuestion(questionNumber)); 
        questionNumber++;
        $('.questionNumber').text(questionNumber);
        //handleAnswers(questionNumber);
    });
}

//this function generate overall score and feedback at the end of the quiz.
function excellent() {
    let moreThanAverage =
        $(`<h3 class="moreThanAverage">The world is yours!</h3> 
    <img src="images/giphy-nice-job.gif" alt="globe-spinning" class="success-image">`)
    $('.result').append(moreThanAverage);
}
function notTooBad() {
    let average =
        $(`<h3 class="average">Hey, Not bad!</h3> 
    <img src="images/destinations.jpg" alt="airport departure board" class="success-image">`)
    $('.result').append(average);
}
function notSoGood() {
    let lessThanAverage =
        $(`<h3 class="lessThanAverage">You'll do better next time!</h3> 
    <img src="images/denied.jpg" alt="rainy day" class="success-image">`)
    $('.result').append(lessThanAverage);
}

function finalScore() {
    console.log('finalScore() activated');

    if (score >= 8) {
        excellent()
    } else if (score >= 5) {
        notTooBad()
    } else {
        notSoGood()
    }
    $('.result').show();
    $(`<button type="button" class="startAgain button">Start Again</button>`).appendTo('.result');
}

//this function bring back that starting page when CLICK START AGAIN.
function restartQuiz() {
    $(document).on('click', '.startAgain', function (event) {  
        event.preventDefault();
        templateQuestion(0);
        scoreNumber = 0;
        $('.scoreNumber').text(scoreNumber);
        $('.questionNumber').text(questionNumber);
        $('.questions').show();
        $('.result').hide();
    });
}


//this is the callback function
function handleQuiz() {
    startQuiz();
    handleAnswers();
    nextQuestion();
    restartQuiz();
}

$(handleQuiz);