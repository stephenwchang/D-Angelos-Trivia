let triviaQuestions = [

  question1 = {
    question: 'Who is the shortest player of all time?',
    choice1: 'Nate Robinson',
    choice2: 'Spud Webb',
    choice3: 'Earl Boykins',
    answer: 'Muggsy Bogues',
  },

  question2 = {
    question: 'Who is the lowest seeded team to ever win an NBA championship?',
    choice1: '2002-2003 New Jersey Nets',
    choice2: 'temp',
    choice3: 'temp',
    answer: '1994-95 Houston Rockets, sixth seed',
  },

  question3 = {
    question: 'What player has the scored the most points in NBA history',
    choice1: 'temp',
    choice2: 'temp',
    choice3: 'temp',
    answer: 'Kareem Abdul-Jabar',
  },

  question2 = {
    question: 'Which team had the best nba record',
    choice1: 'temp',
    choice2: 'temp',
    choice3: 'temp',
    answer: '2016-2017 Golden State Warriors, 72-10',
  },

]

let timeRemaining = 30;
let timerRunning = false;
let level = 0;
let gameRunning = false;
let intervalId;
let numCorrect = 0;


document.getElementById('start-button').onclick = startGame;


function startGame() {
  if (!gameRunning){
    gameRunning = true;
    if (!timerRunning) {
      timerRunning = true;
      intervalId = setInterval(timeCounter, 1000);
    }
    generateQuestion();
  }
}

// countdown timer
function timeCounter() {
  // timer cannot go past 0
  if (timeRemaining > -1) {
    document.getElementById('time-remaining').innerHTML = "Time Remaining: " + timeRemaining + " Seconds";
    timeRemaining --
  }

  // when timer runs out, user loses
  if (timeRemaining === -1) {
    document.getElementById('question-caption-text').innerHTML = "You ran out of time!";
    reset();
  }
}

// displays question and randomly generates order of choices as well as adds onclick events for each created choice
function generateQuestion() {

  let c1, c2, c3, c4;
  let randomizeFunctions = [writeC1, writeC2, writeC3, writeAnswer]
  document.getElementById('question-caption-text').innerHTML = triviaQuestions[level].question;

  function writeC1() {
    c1 = document.createElement('div');
    c1.setAttribute('id', 'choice-1');
    c1.innerHTML = triviaQuestions[level].choice1;
    document.getElementById('game-display').appendChild(c1);
  }

  function writeC2() {
    c2 = document.createElement('div');
    c2.setAttribute('id', 'choice-2');
    c2.innerHTML = triviaQuestions[level].choice2;
    document.getElementById('game-display').appendChild(c2);
  }

  function writeC3() {
    c3 = document.createElement('div');
    c3.setAttribute('id', 'choice-3');
    c3.innerHTML = triviaQuestions[level].choice3;
    document.getElementById('game-display').appendChild(c3);
  }

  function writeAnswer() {
    c4 = document.createElement('div');
    c4.setAttribute('id', 'answer');
    c4.innerHTML = triviaQuestions[level].answer;
    document.getElementById('game-display').appendChild(c4);
  }

  // randomize order of functions to display different order of choices
  let i = 0
  let random
  while (i < randomizeFunctions.length) {
      random = Math.floor(Math.random() * randomizeFunctions.length)
      if (randomizeFunctions[random] != false) {
        randomizeFunctions[random]();
          randomizeFunctions[random] = false;
          i++
      }
  }

  document.getElementById('answer').onclick = correctAnswer;
  document.getElementById('choice-1').onclick = wrongAnswer;
  document.getElementById('choice-2').onclick = wrongAnswer;
  document.getElementById('choice-3').onclick = wrongAnswer;

  // if correct answer is selected
  function correctAnswer() {
    level ++;
    numCorrect ++;
    document.getElementById('question-caption-text').innerHTML = "Correct!";
    document.getElementById('wins-text').innerHTML = 'Correct: ' + numCorrect;
    reset();
  }

  function wrongAnswer() {
    document.getElementById('question-caption-text').innerHTML = "Wrong answer.";
    level ++;
    reset();
  }
}

function reset(){
  document.getElementById('game-display').removeChild(document.getElementById('choice-1'));
  document.getElementById('game-display').removeChild(document.getElementById('choice-2'));
  document.getElementById('game-display').removeChild(document.getElementById('choice-3'));
  clearInterval(intervalId);
  setTimeout(function() {
    timeRemaining = 30;
    document.getElementById('game-display').innerHTML = "";
    intervalId = setInterval(timeCounter, 1000);
    generateQuestion();
  },4000)

}
