"use strict"

var questions = [
    { text: "Commonly used types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correct: 2 },
    { text: "The condition in an if / else statement is enclosed within _____.",
    choices: ["quotes","curly brackets","parenthesis","square brackets"],
    correct: 2 },
    { text: "Arrays in Javascript can be used to store _____.",
    choices: ["numbers and strings","other arrays","booleans","all of the above"],
    correct: 3 }, 
    { text: "String values must be closed within _______ when being assigned to variables.",
    choices: ["commas","curly brackets","quotes","parentheses"],
    correct: 2 }, 
    { text: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript","terminal/bash","for loops","console.log"],
    correct: 3 }, 
];
// right/wrong pops up and hangs out on the bottom of the following question

var title = "Coding Quiz Challenge";
var instructions = "Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!";

var timeDiv = document.getElementById("time");
var questionElement = document.getElementById("question");
var questionTextElement = document.getElementById("question-text");
var answerListElement = document.getElementById("answer-list");

var secondsLeft = 75;
const allowedSecondsPerQuestion = 5; /*crank this to 30 or so later*/
const penaltyPerWrongAnswer = 10;
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

function numQuestionsLeft()
{
  return questions.length - currentQuestion;
}

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