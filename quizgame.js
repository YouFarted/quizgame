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

const penaltyForWrongAnswer = 10;

var timeDiv = document.getElementById("time");
var questionElement = document.getElementById("question");
var startScreenElement = document.getElementById("start-screen");
var startButton = document.getElementById("start");
var enterInitialsOuterElement = document.getElementById("enter-initials-for-high-score");
var initialsInputElement = document.getElementById("initials");
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

var interval = null;

function numQuestionsLeft()
{
  return questions.length - currentQuestion;
}

function setShowDiv(whichmode)
{
  questionElement.style.display = "none";
  enterInitialsOuterElement.style.display = "none";
  doneElement.style.display = "none";
  startScreenElement.style.display = "none";

  switch(whichmode){
    case "questions": questionElement.style.display = "block"; break;
    case "enter-initials": enterInitialsOuterElement.style.display = "block"; initialsInputElement.focus(); break;
    case "done": doneElement.style.display = "block"; break;
    case "start": startScreenElement.style.display = "block"; break;
  }
}

function showEnterHighscoreUI()
{
  // stop the clock.  Done is done.  It shouldn't cost score to enter your initials
  clearInterval(interval);
  setShowDiv("enter-initials");
}

enterInitialsOuterElement.addEventListener("keydown", function(e){
  
  if(e.key === "Enter")
  {
    saveScoreAndInitials();
    // show high scores
    window.location.replace("./highscores.html");
  }
});

function saveScoreAndInitials()
{
  let score = secondsLeft;
  let initials = initialsInputElement.value;
  addDataToLocalStorage0(initials, score);
}


function addDataToLocalStorage0(initials, score){
  let newscoreobj = {initials: initials,score: score};
  let allscores = JSON.parse(localStorage.getItem("allscores"));
  if(allscores == null || (typeof(allscores) != "object"))
  {
    allscores = new Array();
  }
  allscores.push(newscoreobj)
  let jsobjstring = JSON.stringify(allscores);

  localStorage.setItem("allscores", jsobjstring);
}

function nextQuestion()
{
  currentQuestion++;
  if (currentQuestion >= questions.length)
  {
    showEnterHighscoreUI();
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
  alert("Do I reach this???");
  clearInterval(interval);
  showEnterHighscoreUI();
}

function startGame() 
{
  setInterval(function(){
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

  currentQuestion = -1;
  nextQuestion();
}

function registerEvents()
{
  startButton.addEventListener("click", function(){
    startGame();
  });
}

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
  if(event.target.nodeName !=="LI")
  {
    return;
  }
  let index = event.target.dataset.index;
  reactToQuestionClicked(index);
});

function main()
{
  setShowDiv("start");
  registerEvents();
}

main();
