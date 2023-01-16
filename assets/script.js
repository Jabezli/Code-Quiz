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
const submitBtn = document.querySelector('.submitbutton');
const initial = document.querySelector("#text");


const secLeft = document.querySelector(".secLeft");
const react = document.querySelector(".react");

const lowerCase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const upperCase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];


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





startBtnEl.addEventListener("click",quizStart);

function quizStart (){
    firstPage.style.display="none";
    quizContent.style.display="flex";
    secLeft.textContent = timer;
    displayQuestions();
    countDown();
};

function countDown () {
setInterval(function(){
    if (timer >= 1 && currentIndex < 5){
    timer--;
    secLeft.textContent = timer;}
    else{
        secLeft.textContent = "Time up"
    }

}, 1000)};

function displayQuestions() {
// if it is the end of the quiz, quizContent should be gone and finalPage will be rendered
    if (currentIndex === questionList.length) {
       quizContent.style.display="none";
       finalPage.style.display="flex";
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

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    inputValidate();
    }
);

function inputValidate (){
    let initialContent = document.querySelector("#text").value;
    if (lowerCase.includes(initialContent) || upperCase.includes(initialContent)){
        checkScores();
    }
    else {
        alert("Please enter a valid initial.");
    }
}

function checkScores(){
    firstPage.style.display="none";
    quizContent.style.display="none";
    finalPage.style.display = "none";
    scorePage.style.display="flex";
}





