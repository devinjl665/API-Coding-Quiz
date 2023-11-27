var startScreen = document.querySelector('#start-screen')
var startButton = document.querySelector('#start');
var questionsTitle = document.querySelector('#question-title')
var questions = document.querySelector('#questions');
var choices = document.querySelector('#choices');
var time = document.querySelector('#time');
var finishScreen = document.querySelector('#finish-screen');
var finalScore = document.querySelector('#final-score');
var inputName = document.querySelector('#name');
var saveButton = document.querySelector('#submit');
var feedback = document.querySelector('#feedback');

//variables
let currentQuestionIndex = 0;
let timer = 0;
let orderList = document.createElement('ol');
choices.appendChild(orderList);
let ol = document.querySelector('ol');

//event listener
ol.addEventListener('click', function (event) {
    let element = event.target;
    if (element.matches('button')) {
        let state = element.getAttribute('data-state');
        if (state == questions[currentQuestionIndex].correct) {
            message('Correct!');
        } else {
            message('Wrong!');
            countdownTimer -= 10;
            console.log(countdownTimer);
        }
        currentQuestionIndex++;
        ol.textContent = '';
        showQuestion(currentQuestionIndex);
    }
});

function startQuiz() {}
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

function startCountdown() {
  timer = 60;
  time.textContent = timer;
  let intervalId = setInterval(function () {
    timer--;
    time.textContent = timer;
    console.log(timer);
    if (timer > 0 && currentQuestionIndex >= questions.length) {
      clearInterval(intervalId);
      time.textContent = countdownTimer;
      questions.setAttribute("class", "hide");
      finishScreen.setAttribute("class", "start");
      finalScore.textContent = timer;
    }
    if (timer <= 0) {
      clearInterval(intervalId);
      time.textContent = 0;
      questions.setAttribute("class", "hide");
      finishScreen.setAttribute("class", "start");
      finalScore.textContent = 0;
    }
  }, 1000);
}

// Function to display a question
function showQuestion(index) {
    if (index < questions.length) {
        questionsTitle.textContent = questions[index].question;
        console.log(index);
        console.log(questions.length);
        for (let i = 0; i < questions[index].answers.length; i++) {
            let li = document.createElement('li');
            let selectOlist = document.querySelector('ol');
            selectOlist.appendChild(li);
            let buttonAnswer = document.createElement('button');
            buttonAnswer.setAttribute('data-state', i);
            buttonAnswer.textContent = questions[index].answers[i];
            li.appendChild(buttonAnswer);
        }
    } else {
        questionsTitle.textContent = '';
    }
}

startButton.addEventListener("click", function () {
    startCountdown();
    startScreen.setAttribute("class", "hide");
    questions.setAttribute("class", "");
    showQuestion(currentQuestionIndex);
  });
  
  let highscore = JSON.parse(localStorage.getItem("scores")) || [];
  saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    let initialStore = inputName.value;
    let currentScore = {
      initial: initialStore,
      score: timer,
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