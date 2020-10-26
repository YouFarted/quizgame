"use strict"

var questions = [
  { text: "What is the best color?",
    choices: ["orange", "green", "yellow", "red"],
    correct: 1 },
  { text: "But what is the REAL best color?",
    choices: ["orange","FOR REAL, it's GREEN!  Don't ask again","blue","I don't know - I'm stupid"],
    correct: 1 }, 
];

var timeDiv = document.getElementById("time");
var highscoreModal = document.getElementById("highscoreModal");
var questionElement = document.getElementById("question");
var questionTextElement = document.getElementById("question-text");
var answerListElement = document.getElementById("answer-list");

var secondsLeft = 5;
const allowedSecondsPerQuestion = 5; /*crank this to 30 or so later*/
var currentQuestion = 0;

timeDiv.textContent = secondsLeft;

var interval = setInterval(function(){
  secondsLeft--;
  if(secondsLeft===0)
  {
    var hasNext = nextQuestion();
    if(!hasNext)
    {
      endGame();
    }
  }
  timeDiv.textContent = secondsLeft;
}, 1000);

function nextQuestion()
{
  secondsLeft = allowedSecondsPerQuestion;
  questionElement.style.display = "block";
  currentQuestion++;
  if (currentQuestion >= questions.length)
  {
    return false;
  }
  var question = questions[currentQuestion];
  populateQuestionUI(question);
  return true;
}

function populateQuestionUI(question)
{
  questionTextElement.textContent = question.text;
  answerListElement.textContent = ""; // clears it
  for(let i=0; i<question.choices.length; ++i)
  {
    var choiceText = question.choices[i];
    let li = document.createElement("li");
    li.innerText = choiceText;
    answerListElement.appendChild(li);
  }
}

function registerHighScore()
{
}

function endGame()
{
  clearInterval(interval);
  registerHighScore();
}

currentQuestion = -1;
nextQuestion();