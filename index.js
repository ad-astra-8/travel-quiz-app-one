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
            'Rome'
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
            'Moscow'
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
        correctAnswer:
            'Mexico'
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
let userQuestionNumber = 0;

// this function will allow the user to start the quiz when CLICK START.
function startQuiz() {
    $(document).on('click', '.start', function (event) {
        console.log("function startQuiz", userQuestionNumber);
        $('.js-intro').hide();     
        $('.result').hide(); 
        $('.questionAndScore').show();
        $('.question-number').text(counter);
        templateQuestion(0);
    });
}

let counter = 1;
function increaseQuestion(){
    counter += 1;
    $('.question-number').text(counter);
}

function updateQuestionAndScore(){
let board =  $(`
<p>Question: <span class="question-number">${counter}</span>/10</p>
<p>Score: <span class="scoreNumber">${scoreNumber}</span></p>`);
$('.questionAndScore').html(board);
}

//this function should display the structure of the the questions form.
function templateQuestion(questionIndex) {
    console.log("function templateQuestion", questionIndex);
    updateQuestionAndScore();
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
    $('.result').hide(); 
}

// Upon CLICK on SUBMIT, this function will display TEXTUAL + VISUAL feedback. 
// IF incorrect, will DISPLAY correct answer.
function handleAnswers() {
    $(document).on('click', '.submit', function (event) {
        event.preventDefault(); 
        // let userQuestionNumber = parseInt( $('.question-number').text());
       
        console.log("function handleAnswers", userQuestionNumber);
        let correct = STORE[(userQuestionNumber)].correctAnswer;   
        console.log(correct);
     
        
        function wrongAnswer() {
            let isWrong = 
            $(`<h3 class="failure">Oops!</h3>
                <p>The correct answer was: \"${STORE[userQuestionNumber].correctAnswer}\"</p>
                <div class="gif-container"><img src="images/giphy-wrong.gif" alt="flight attendants saying no"></div>
                <button type="button" class="nextButton button">Next</button>`)
            console.log(STORE[(userQuestionNumber)].correctAnswer);
            $('.feedback').html(isWrong); 
            $('.questions').hide(); 
        }

        function goodAnswer() {
            let isRight = $(`<h3>Bravo!</h3>
            <div class="gif-container"><img src="images/giphy-right.gif" alt="happy flight attendants"></div> 
            <button type="button" class="nextButton button">Next</button>`)
            $('.feedback').html(isRight);
        
            scoreNumber++;
            $('.scoreNumber').text(scoreNumber);
            $('.questions').hide();
        }

         let answer = $("input[class='radio']:checked").val();
        console.log(answer);
        if (answer == correct) {
            goodAnswer();
        } else if (answer == undefined) {
            alert('Please choose an option!');
        } else {
            wrongAnswer();
        }
        $('.feedback').show();
        // nextQuestion();
    });
}

//this function generates the next question when user CLICK on button "NEXT"
//and render the next question on the form
function nextQuestion() {
    $(document).on('click', '.nextButton', function (event) {
        event.preventDefault();
            // let userQuestionNumber = parseInt( $('.question-number').text());
            userQuestionNumber++;
            console.log("score number", scoreNumber);
            console.log("function nextQuestion", userQuestionNumber);
            // console.log("increaseQuestionNumber(), after next");
            $('.feedback').html('');
            $('.result').html(''); 
            $('.questions').show();
            // $('.form').replaceWith(templateQuestion(userQuestionNumber)); 
            //  userQuestionNumber++;
            // $('.question-number').text(userQuestionNumber);

            if (userQuestionNumber === STORE.length){
                finalScore(userQuestionNumber) 
                console.log("function finalScore", userQuestionNumber);
                $('.result').show();
                $(`<button type="button" class="startAgain button">Start Again</button>`).appendTo('.result');
            }else {
                $('.form').replaceWith(templateQuestion(userQuestionNumber));
                $('.question-number').text(userQuestionNumber);
                increaseQuestion();
                // userQuestionNumber++;
            }
    });   
}
           
// this function generate overall score and feedback at the end of the quiz.

        function finalScore(userQuestionNumber) {
            console.log("function finalScore", userQuestionNumber);
                
                console.log('score number', scoreNumber);
            
                let moreThanAverage =
                    $(`<h3 class="moreThanAverage">The world is yours!</h3> 
                <img src="images/giphy-nice-job.gif" alt="spinning globe" class="globe">`)
                $('.result').html(moreThanAverage);
               
            
        
                let average =
                    $(`<h3 class="average">Hey! Not bad!</h3> 
                <img src="images/destinations.jpg" alt="destinations and directions signs">`)
                $('.result').html(average);
            
            
             
                let lessThanAverage =
                    $(`<h3 class="lessThanAverage">You'll do better next time!</h3> 
                <img src="images/denied.jpg" alt="denied stamped passport">`)
                $('.result').html(lessThanAverage); 

            
                $('.questions').hide();
                $('.feedback').hide();
                $('.result').show();
                $(`<button type="button" class="startAgain button">Start Again</button>`).appendTo('.result');
                
                if  (scoreNumber >= 8) {
                $('.result').html(moreThanAverage); 
                } else if (scoreNumber >= 5) {
                $('.result').html(average); 
                } else if (scoreNumber <= 4){
                $('.result').html(lessThanAverage); 
                }
        }

//this function bring back that starting page when CLICK START AGAIN.
function restartQuiz() {
    $(document).on('click', '.startAgain', function (event) {  
        event.preventDefault();
        console.log("function restartQuiz", userQuestionNumber);
        templateQuestion(0);
        $('.form').replaceWith(templateQuestion(userQuestionNumber)); 
        scoreNumber = 0;
        $('.scoreNumber').text(scoreNumber);
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