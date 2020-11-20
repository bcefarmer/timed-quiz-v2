"use strict";
/* Navigates from index.html to timedQuiz.html based on click of Start button. */



/*
The first step when landing on the start page is to establish 1) if a JSON
string exists in localStorage, and 2) if it does, to parse the JSON and to
create a display of the user's last quiz score near the bottom of the screen.
*/


if(localStorage.pastString != null && localStorage.pastString != "" ){
    var pastString = localStorage.pastString;
    var scoreSection = document.getElementById("lastScore");
    var obj = JSON.parse(pastString);
    var takerInit= obj.Initials;
    var takerScore = obj.Score;
    var smallHeader = document.createElement("h5");
    scoreSection.appendChild(smallHeader);
    smallHeader.textContent = "Last Quiz Score:"
    var pastInfo = document.createElement("p");
    scoreSection.appendChild(pastInfo);
    pastInfo.textContent = "Initials: " + takerInit + " Score: " + takerScore;
}


var  runButton = document.querySelector("#beginTest"); 
runButton.addEventListener("click", function(event){
window.location.href = "timedQuiz.html";
    })




    


    