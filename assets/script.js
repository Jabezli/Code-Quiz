// link all the classes  Var has many limitations. Per discuss with Tutor, I will start using const and let.
const viewScoreBtn = document.querySelector(".viewScore");
const secondLeft = document.querySelector(".secLeft");
const firstPage = document.querySelector(".quizDescr");
const startBtnEl = document.querySelector(".startBtn");
const quizContent = document.querySelector(".quizContent");
const scorePage = document.querySelector(".scorepage");
const goBackBtn = document.querySelector(".goback");
const questions = document.querySelector(".questions");
const answerBtn0 = document.querySelector("#answerBtn0");
const answerBtn1 = document.querySelector("#answerBtn1");
const answerBtn2 = document.querySelector("#answerBtn2");
const answerBtn3 = document.querySelector("#answerBtn3");
const a = document.querySelector("#a");
const b = document.querySelector("#b");
const c = document.querySelector("#c");
const d = document.querySelector("#d");
const finalPage = document.querySelector(".finalpage");
const finalScore = document.querySelector('#finalscore');
const submitBtn = document.querySelector('#submit-form');
const scoreList = document.querySelector("#highscores");
const secLeft = document.querySelector(".secLeft");
const react = document.querySelector(".react");
const clearBtn = document.querySelector(".clearscores");
const textEL = document.querySelector("#text");

let currentIndex = 0;
let timer = 100;
// this is an array with objects
const questionList = [
    {
        question: "Commonly used data types DO Not include: ",
        //this is an array inside an array
        choices: ["string", "booleans", "alerts", "numbers"],
        answer: "c"
    },
    {
        question: "The condition in an if / else statement is enclosed with _______. ",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "b"
    },
    {
        question: "Arrays in JavaScript can be used to store_______. ",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "d"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables. ",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "c"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is ",
        choices: ["JavaScript", "teminal/bash", "for loops", "console.log"],
        answer: "d"
    }
]



goBackBtn.addEventListener("click", function() {
    firstPage.style.display="block";
    quizContent.style.display="none";
    finalPage.style.display = "none";
    scorePage.style.display="none";
    //window.location.reload();
    
} )


startBtnEl.addEventListener("click",quizStart);

function quizStart (){
    firstPage.style.display="none";
    quizContent.style.display="flex";
    currentIndex = 0;
    timer = 100;
    secLeft.textContent = timer;
    displayQuestions();
    countDown();
};

function countDown () {
setInterval(function(){
    if (timer >= 1 && currentIndex < 5){
    timer--;
    secLeft.textContent = timer;}
    else {
        secLeft.textContent = "Time up";

    }

}, 1000)};

function displayQuestions() {
// if it is the end of the quiz, quizContent should be gone and finalPage will be rendered
    if (currentIndex === questionList.length) {
       quizContent.style.display="none";
       finalPage.style.display="flex";
       //this will ensure an empty "input box" every time enter an initial
       textEL.value = "";
       finalScore.textContent = timer;
       //if I don't add the return here, there will be an issue as the next line of the function will keep running but 
       //there is not more question to render

       return;
    } 

    questions.textContent = questionList[currentIndex].question;
    a.textContent = questionList[currentIndex].choices[0];
    b.textContent = questionList[currentIndex].choices[1];
    c.textContent = questionList[currentIndex].choices[2];
    d.textContent = questionList[currentIndex].choices[3];
}

function moveOnToNextQuestion(choice) {
    //choice here is the same as the parameter of the html abcd under id  answerBtn
    const correctAnswer = questionList[currentIndex].answer;

    if (correctAnswer != choice) {
        timer -= 10;
        react.textContent = "Wrong... The correct answer is " + correctAnswer;

    } else {
        react.textContent = "Correct!";
    }

    currentIndex++;
    displayQuestions();
    secLeft.textContent = timer;
}

viewScoreBtn.addEventListener("click",checkScores)

submitBtn.addEventListener("submit", function(event) {
    event.preventDefault();
    inputValidate();
    saveScores();
    createScoreEl();
    }
);



function inputValidate (){
    let initialContent = document.querySelector("#text").value;
    let letters = /^[A-Za-z]+$/;
    if (initialContent.match(letters)){
        checkScores();
    }
    else {
        alert("Please enter a valid initial.");
    }
};

function getScores(){
    let scoreArray = JSON.parse(localStorage.getItem('scoreRecords')) || [];
    return scoreArray;
}

function saveScores(){
    let scoreRecords = {};
    scoreRecords.initials = document.querySelector("#text").value;
    scoreRecords.score = finalScore.textContent;
    let scores = getScores();
    console.log(scores);
    scores.push(scoreRecords);
    //console.log(scoreArray);
    localStorage.setItem("scoreRecords", JSON.stringify(scores));
}


function createScoreEl(){
    // the while loop is to remove all "li" so when get the string back from local storage, it got listed only once.
    while (scoreList.firstChild) {
        scoreList.removeChild(scoreList.firstChild);
      };

    let scores = getScores();  

    for (var i = 0; i < scores.length; i++){
        let li = document.createElement("li");
        let name = scores[i].initials + "-" + scores[i].score;
        li.textContent = name;
        scoreList.appendChild(li);
    }  
};

clearBtn.addEventListener("click", function(){
    localStorage.clear(); 
    scoreList.textContent = "";
});

function checkScores(){
    firstPage.style.display="none";
    quizContent.style.display="none";
    finalPage.style.display = "none";
    scorePage.style.display="flex";
}





