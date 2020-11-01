"use strict"

//let button = document.getElementById("testbutton");
let scoreListElement = document.getElementById("highscores");

/*
button.addEventListener("click", function(){
    addTestDataToLocalStorage();
});
*/

function addTestDataToLocalStorage(){
    let allscores = new Array();

    for(let i=0; i<10; ++i)
    {
        let scoreRecord = {initials: "aeo",score:(100+i)};
        allscores.push(scoreRecord);
    }

    let jsobjstring = JSON.stringify(allscores);

    localStorage.setItem("allscores", jsobjstring);
}

function loadIntoPageTable()
{
    let allscores = JSON.parse(localStorage.getItem("allscores"));

    if(allscores === null || typeof(allscores) !== "object")
    {
        localStorage.setItem("allscores", "[]");
        return;
    }

    let sortedscores = allscores.sort(function(a,b){return b.score - a.score;});

    for(let i=0; i<sortedscores.length; ++i)
    {
        addScoreToPage(sortedscores[i]);
    }
}

function addScoreToPage(scorerecord)
{
    let li = document.createElement("li");
    let initialsSpan = document.createElement("div");
    let scoreSpan = document.createElement("div");

    initialsSpan.textContent = scorerecord.initials;
    scoreSpan.textContent = scorerecord.score;

    li.appendChild(initialsSpan);
    li.appendChild(scoreSpan);
    
    scoreListElement.appendChild(li);
}

loadIntoPageTable();