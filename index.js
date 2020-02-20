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


// this function will allow the user to start the quiz when CLICK START.
function startQuiz(){ 
    $('#start').on('click', function(event){
    templateQuestion(0);  
        $('.js-intro').hide();
        $('.questionNumber').text(1);
        $('.questions').show();
    });
}

  
    //this function should display the structure of the the questions form.
function templateQuestion(questionIndex){
    let questionForm = $(`
    <form class="form" action="" method ="get">           
        <fieldset>   
            <legend class="question">${STORE[questionIndex].question}</legend>
            <ul></ul>
        </fieldset> 
    </form>`)
   
    let formSection = $(questionForm).find('ul');

    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
        $(`<li>
        <label class="option" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
        </label>
        </li>`).appendTo(formSection);
    });
    $(`<button type="submit" class="submit">Submit</button>`).appendTo(formSection);
    return questionForm;
}
    

//this function displays what question the user is, also current score.
let scoreNumber = 0;
let questionNumber = 0;

function feedbackQuestionAndScore(){
    //console.log('feedbackQuestionAndScore() activated');
    scoreNumber++;
    $('.scoreNumber').text(score);
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
}    
  
function goodAnswer(){
    $('.feedback').html(`<h3 class="success">Well Done!</h3>
        <img src="images/giphy-right.gif" alt="" class="success-image"> 
        <button type="button" class="nextButton button">Next</button>`
    );
} 

function wrongAnswer(){
    $('.feedback').html( `<h3 class="failure">Oops!</h3>
        <p>The correct answer was: ${STORE[questionNumber].correctAnswer}</p>
            <img src="images/giphy-wrong.gif" alt="" class="failure-image"></img>
            <button type="button" class="nextButton button">Next</button>`
            );
}

  // Upon CLICK on SUBMIT, this function will display TEXTUAL + VISUAL feedback. 
  // IF incorrect, will DISPLAY correct answer.
function handleAnswers(){
    $('#submit').on('click', function(event){ 
        event.preventDefault();
        $('.feedback').show();
        feedbackQuestionAndScore();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer === correct){
        goodAnswer();
        }else{
        wrongAnswer();
        } 
    }); 
}

  //this function generates the next question when user CLICK on button "NEXT"
  //and render the next question on the form
function nextQuestion(){
    // $('#submit').on('click', function(event){
    // });
}

  //this function generate overall score and feedback at the end of the quiz.
function finalScore(){
    console.log('finalScore() activated'); 
}

  //this function bring back that starting page when CLICK START AGAIN.
function restartQuiz(){
//     $('#start').on('click', function(event){
// });
}


  //this is the callback function
function handleQuiz(){
    startQuiz();
    templateQuestion();
    feedbackQuestionAndScore();
    handleAnswers();
    nextQuestion();
    finalScore();
    restartQuiz();
    }
    
    $(handleQuiz);