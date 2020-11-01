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

var title = "Coding Quiz Challenge";
var instructions = "Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
const penaltyForWrongAnswer = 10;

var timeDiv = document.getElementById("time");
var questionElement = document.getElementById("question");
var enterInitialsElement = document.getElementById("enter-initials-for-high-score");
var doneElement = document.getElementById("done");
var questionTextElement = document.getElementById("question-text");
var answerListElement = document.getElementById("answer-list");

// right/wrong pops up and hangs out on the bottom of the following question

// display=none most of the time except show it briefly after an answer was given as display=initial.
var correctOrWrongSection = document.getElementById("correctOrWrongSection");

// make the text "Correct" or "Wrong"
var correctOrWrongText = document.getElementById("correctOrWrongText");

var secondsLeft = 75;
const allowedSecondsPerQuestion = 5; /*crank this to 30 or so later*/
const penaltyPerWrongAnswer = 10;
var currentQuestion = 0;

timeDiv.textContent = secondsLeft;

var interval = setInterval(function(){
  secondsLeft--;
  hideWasCorrect();
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

function setShowDiv(whichmode)
{
  questionElement.style.display = "none";
  enterInitialsElement.style.display = "none";
  doneElement.style.display = "none";

  switch(whichmode){
    case "questions": questionElement.style.display = "block"; break;
    case "enter-initials": enterInitialsElement.style.display = "block"; break;
    case "done": doneElement.style.display = "block"; break;
  }
}

function recordFinalScore()
{
  return;
  setShowDiv("enter-initials");
}

function nextQuestion()
{
  currentQuestion++;
  if (currentQuestion >= questions.length)
  {
    recordFinalScore();
    return false;
  }
  setShowDiv("questions");
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
    li.dataset.index = i;
    li.innerText = (i+1) + ". " + choiceText;
    answerListElement.appendChild(li);
  }
}

function ShowLastQuestionWasCorrect(wasCorrect)
{
  correctOrWrongSection.style = "display:initial";
  correctOrWrongText.innerText = wasCorrect ? "Correct" : "Wrong";
}

function hideWasCorrect()
{
  correctOrWrongSection.style = "display:none";
}

function endGame()
{
  clearInterval(interval);
  recordFinalScore();
}

currentQuestion = -1;
nextQuestion();

function reactToQuestionClicked(index)
{
  let thisquestion = questions[currentQuestion];
  let wasCorrect = (index == thisquestion.correct);
  if(!wasCorrect)
  {
    secondsLeft -= penaltyForWrongAnswer;
  }
  ShowLastQuestionWasCorrect(wasCorrect);
  
  nextQuestion();
}

answerListElement.addEventListener("click", function(event){
  console.log("click happened on a " + event.target.nodeName)
  if(event.target.nodeName !=="LI")
  {
    return;
  }
  let index = event.target.dataset.index;
  console.log("you picked index=" + index);
  reactToQuestionClicked(index);
});