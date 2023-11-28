var startScreen = document.querySelector('#start-screen')
var startButton = document.querySelector('#start');
var questionTitle = document.querySelector('#question-title')
var questions = document.querySelector('#questions');
var choices = document.querySelector('#choices');
var time = document.querySelector('#time');
var finishScreen = document.querySelector('#finish-screen');
var finalScore = document.querySelector('#final-score');
var inputName = document.querySelector('#name');
var saveButton = document.querySelector('#submit');
var feedback = document.querySelector('#feedback');

//variables
let questionIndex = 0;
let countdownTimer = 0;
let orderList = document.createElement('ol');
choices.appendChild(orderList);
let ol = document.querySelector('ol');

//event listener
ol.addEventListener('click', function (event) {
    let element = event.target;
    if (element.matches('button')) {
        let selectedState = element.getAttribute('data-state');
        let correctAnswerIndex = quizQuestions[questionIndex].correct;

        console.log('Selected State:', selectedState);
        console.log('Correct Answer Index:', correctAnswerIndex.toString());

        if (selectedState === correctAnswerIndex.toString()) {
            message('Correct!');
        } else {
            message('Wrong!');
            countdownTimer -= 10;
            console.log(countdownTimer);
        }

        questionIndex++;

        if (questionIndex < quizQuestions.length) {
        // Show the next question
            ol.textContent = '';
            showQuestion(questionIndex);
        } else {
        // Quiz has ended, show final score
            endQuiz();
        }
    }
});



//
function message(string) {
  console.log(string);
  let p1 = document.createElement("p");
  p1.textContent = string;
  choices.appendChild(p1);
  let clearId = setInterval(function () {
    p1.textContent = "";
    console.log((p1.textContent = ""));
    setTimeout(function () {
      clearInterval(clearId);
    }, 1000);
  }, 1000);
}

var intervalId;

//
function startCountdown() {
  countdownTimer = 60;
  time.textContent = countdownTimer;
  let intervalId = setInterval(function () {
    countdownTimer--;
    time.textContent = countdownTimer;
    console.log(countdownTimer);
    if (countdownTimer > 0 && questionIndex >= quizQuestions.length) {
      clearInterval(intervalId);
      time.textContent = countdownTimer;
      questions.setAttribute("class", "hide");
      finishScreen.setAttribute("class", "start");
      finalScore.textContent = countdownTimer;
    }
    if (questionIndex >= quizQuestions.length) {
      clearInterval(intervalId);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
    // Display the final score and perform any other necessary actions
        questions.setAttribute('class', 'hide');
        finishScreen.setAttribute('class', 'start');
        finalScore.textContent = countdownTimer;
    
    // Clear the countdown interval
        clearInterval(intervalId);    
    }

// Function to display a question
function showQuestion(index) {
    if (index < quizQuestions.length) {
        questionTitle.textContent = quizQuestions[index].question;
        console.log(index);
        console.log(quizQuestions.length);
        for (let i = 0; i < quizQuestions[index].answers.length; i++) {
            let li = document.createElement('li');
            let selectOlist = document.querySelector('ol');
            selectOlist.appendChild(li);
            let buttonAnswer = document.createElement('button');
            buttonAnswer.setAttribute('data-state', i);
            buttonAnswer.textContent = quizQuestions[index].answers[i];
            li.appendChild(buttonAnswer);
        }
    }   else {
        questionTitle.textContent = '';
    }
}

startButton.addEventListener("click", function () {
    startCountdown();
    startScreen.setAttribute("class", "hide");
    questions.setAttribute("class", "");
    showQuestion(questionIndex);
  });
  
  let highscore = JSON.parse(localStorage.getItem("scores")) || [];
  saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    let initialStore = inputName.value;
    let currentScore = {
      initial: initialStore,
      score: countdownTimer,
    };
    highscore.push(currentScore);
    console.log(currentScore);
    highscore.sort(function (a, b) {
      if (a.score > b.score) {
        return -1;
      }
  
      if (a.score == b.score) {
        return 0;
      }
  
      if (a.score < b.score) {
        return 1;
      }
    });
    localStorage.setItem("scores", JSON.stringify(highscore));
    document.location.assign("highscores.html");
  });