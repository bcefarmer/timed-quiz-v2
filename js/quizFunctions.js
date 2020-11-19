//---------------------
/* 
questionArray []

PURPOSE: Questions, answer choices and answers are passed in a single JSON object PER ARRAY INDEX.  I picked this approach because of the simplicity of evaluating single-letter answers
when user clicks a choice.

PARAMETERS: None.

Returns: N/A
*/
//---------------------

var questionArray = [
    {"Question": "What html tag represents a paragraph?",
     "Choices": {
                 "A" : "The <a> tag",
                 "B" : "The <br> tag",
                 "C" : "The <p> tag"
                },
     "Answer": "C"
            },
    //-----------------------------------0
            {"Question": "What html element represents a navigation object?",
            "Choices": {
                        "A" : "The <aside> tag",
                        "B" : "The <nav> tag",
                        "C" : "The <footer> tag"
                       },
            "Answer": "B"
                   },
   //------------------------------------1
           {"Question": "What css attribute might make a div's content partially hidden, but accessible via scrollbar?",
           "Choices": {
                      "A" : "background-color",
                      "B" : "overflow",
                      "C" : "opacity"
                    },
           "Answer": "B"
          }, 
   //--------------------------------------2
   {"Question": "What is the topmost level in the DOM?",
   "Choices": {
              "A" : "window",
              "B" : "overlord",
              "C" : "document"
            },
   "Answer": "A"
  }, 
  //--------------------------------------3
         ]; 

      
var correct = 0;
var wrong = 0;
var iteration = 0; // Which array index are we dealing with?
var secondsCounter = 60;  // Begin counter at 1 min.

/*
PURPOSE: variable counterStart starts counter interval of 1000ms.  Calls function
subtractTime(), which decrements secondsCounter at -1 per second.
*/ 

var counterStart = setInterval(subtractTime, 1000);
      


// answerList is the <ul> object that contains each answer button.
var answerList = document.body.querySelector(".answerList");
var countdownText= document.getElementById("timeLeft");
var rightAnswerText = document.getElementById("correctAnswers");
        


//---------------------
/* 
initiateStartingValues()

PURPOSE: Sends appropriate starting values to function fillInQuestions(). This
ensures that questionArray[] starts at index 0, and that the appropriate number
of wrong/right answers are tracked.

PARAMETERS: None.

Returns: N/A
*/
//---------------------

initiateStartingValues();

function initiateStartingValues(){
         // counterStart("start");
         fillInQuestions(0,0,0);
         

         console.log("--intiateStartingValues secondsCounter: " + secondsCounter);
};

//---------------------
/* 
function subtractTime()

PURPOSE: subtractTime subtracts -1 from counterSeconds when called.

PARAMETERS: None.

Returns: N/A

counterStart calls subtractTime.  subtractTime calls endQuiz.

*/
//---------------------


function subtractTime(){
        if(secondsCounter > 0){
        console.log("--Second went by")
        secondsCounter--;
        countdownText.textContent = "Time Left: " + secondsCounter;
        }
        else{
       endQuiz();
        }
}


//---------------------
/* 
timePenalty

PURPOSE: If user gives a wrong answer to a question, subtracts five seconds.

PARAMETERS: None.

Returns: N/A

*/
//---------------------

function timePenalty(){
if(secondsCounter > 5){
console.log("--secondsCounter BEFORE: " + secondsCounter);
secondsCounter = secondsCounter - 5;
console.log("--secondsCounter AFTER: " + secondsCounter);
countdownText.textContent="Time Left: " + secondsCounter;

}
else{
 secondsCounter = 0;
 endQuiz();
     
}
}



//--------------------
/* 
fillInQuestions(arrayPoint, countCorrect, countWrong)

PURPOSE: Generates a new question with a new set of answers.  Happens at the beginning
of the quiz and repeats after every clicked answer is evaluated.

PARAMETERS: arrayPoint (the current index), countCorrect and countWrong.

Returns: N/A
*/
//---------------------

function fillInQuestions(arrayPoint, countCorrect, countWrong){
       var questionBlock = document.getElementById("question");
       console.log("--questionblock: " + questionBlock);
       var choice1 = document.getElementById("answer_A");
       var choice2 = document.getElementById("answer_B");
       var choice3 = document.getElementById("answer_C");
       var obj = questionArray[arrayPoint];
       console.log("--obj: " + obj);
       questionBlock.textContent = obj.Question;
       choice1.textContent = obj.Choices.A;
       choice2.textContent = obj.Choices.B;
       choice3.textContent = obj.Choices.C;

       iteration = arrayPoint;
}

//---------------------
/* 
Event listener on user selection

PURPOSE: Begins evaluation process when user selects an answer by click a <li>.
         The id of each <li> element ends with a character which is compared
         to the CORRECT answer in the "Question" JSON object.

PARAMETERS: None.

Returns: N/A

Sends a single character string to function evaluateSubmission.
*/
//---------------------

         

        answerList.addEventListener("click", function(event){
                var choiceID = event.target.getAttribute("id");
                // Find last letter in id.  Will either be A, B, or C.
                var lastChar = choiceID.charAt(choiceID.length - 1);
                console.log(lastChar);
 
                evaluateSubmission(lastChar);
        }
        );

        //---------------------
/* 
evaluateSubmission

PURPOSE: Determines if user-submitted answer is correct or incorrect.

PARAMETERS: userAnswer (the letter corresponding to the user answer.  Will
             be compared to letter of the correct answer.)

Returns: N/A

If incorrect, sends to function timePenalty to exact a five-second penalty. Also
increments the iteration variable by +1.

If last iteration is complete, sends to endQuiz() function.
*/
//---------------------

        function evaluateSubmission(userAnswer){
         currentJSON = questionArray[iteration];
         correctAnswer = currentJSON.Answer;
         
         if(userAnswer === correctAnswer){
            correct++;
            rightAnswerText.textContent = "Correct: " + correct;

            console.log("User correct answer: " + userAnswer + " = " + correctAnswer);
         }
         else{
         wrong++;
         console.log("User wrong answer: " + userAnswer + " != " + correctAnswer);
         timePenalty();
         }
        
        iteration++;

        console.log("Sending the following values to fillInQuestions(" + iteration + ", " + correct + ", " + wrong + ")");

        var numberQuestions = questionArray.length;
        
        if(iteration >= numberQuestions){
        endQuiz();
        }
        else{
            fillInQuestions(iteration, correct, wrong);
            
        }
}

//---------------------
/* 
endQuiz()

PURPOSE: Ends the quiz and saves user's score.

PARAMETERS: None.

Returns: N/A

Saves user's initials and test information to local storage.
*/
//---------------------

function endQuiz(){
      clearInterval(counterStart);
     // Prevent user from skipping this part.
      do{
        input = prompt("Quiz is over!  Please type your initials to save your score.");
    }while(input == null || input == "" );
    
    // Pass results onto local storage.
    var storeResults = "{\"Initials\":" + input + "\"," +
                        "\"Score\":"+ "\"" + correct + "\""
                        + "}";

    localStorage.setItem('pastString', storeResults);
}


function housekeeping(){
        var correct = 0;
        var wrong = 0;
        var iteration = 0;
        var secondsCounter = 60;
}


        