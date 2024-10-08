// All questions
const questions = [
    {
        question: "What is the most consumed fruit in the world?",
        answers: [
            {text: "Apple", correct: false},
            {text: "Banana", correct: true},
            {text: "Orange", correct: false},
            {text: "Grapes", correct: false},
        ]
    },
    {
        question: "Which country is responsible for creating hot sauce?",
        answers: [
            {text: "Australia", correct: false},
            {text: "India", correct: false},
            {text: "Mexico", correct: true},
            {text: "Argentina", correct: false},
        ] 
    },
    {
        question: "In which country did the Caesar salad originate?",
        answers: [
            {text: "Mexico", correct: true},
            {text: "Bangladesh", correct: false},
            {text: "England", correct: false},
            {text: "Bahamas", correct: false},
        ]  
    },
    {
        question: "What is the main ingredient in hummus?",
        answers: [
            {text: "Lemon Juice", correct: false},
            {text: "Chickpeas", correct: true},
            {text: "Olive Oil", correct: false},
            {text: "Garlic", correct: false},
        ]  
    },
    {
        question: "Which popular condiment is made from fermented soybeans?",
        answers: [
            {text: "Soy Sauce", correct: true},
            {text: "Vinegar", correct: false},
            {text: "Hot Sauce", correct: false},
            {text: "Ketchup", correct: false},
        ]  
    },
    {
        question: "What is the most expensive spice in the world by weight?",
        answers: [
            {text: "Cummin", correct: false},
            {text: "Clove", correct: false},
            {text: "Cardamom", correct: false},
            {text: "Saffron", correct: true},
        ]  
    },
    {
        question: "Which vegetable has the highest water content?",
        answers: [
            {text: "Water melon", correct: false},
            {text: "Tomato", correct: false},
            {text: "Cucumber", correct: true},
            {text: "Onion", correct: false},
        ]  
    },
    {
        question: "Which food establishment has the most number of stores in the world?",
        answers: [
            {text: "KFC", correct: false},
            {text: "McDonald’s", correct: true},
            {text: "Burger King", correct: false},
            {text: "Starbucks", correct: false},
        ]  
    },
    {
        question: "What is the name of the sweet, tangy fruit used to flavour Worcestershire sauce?",
        answers: [
            {text: "Lemon", correct: false},
            {text: "Orange", correct: false},
            {text: "Tamarind", correct: true},
            {text: "Kiwi", correct: false},
        ]  
    },
    {
        question: "Which type of tea is known as the ‘champagne of teas’ due to its delicate flavour and high price?",
        answers: [
            {text: "Darjeeling tea", correct: true},
            {text: "Green tea", correct: false},
            {text: "Herbal tea", correct: false},
            {text: "Chamomile tea", correct: false},
        ]  
    }
];

const questionElement = document.getElementById("question");
const answersButtonElement = document.getElementById("answers-button");
const nextButtonElement = document.getElementById("next-btn");

let totalList = [];
let currentQuestionIndex = 0;
let score = 0;

//Generate random number

function generateUniqueRandom(maxNr) {
    
    let random = Math.floor(Math.random()*maxNr);
    if(!totalList.includes(random)) {
        totalList.push(random);
        return random;
    } else {
        if(totalList.length < maxNr) {
         return  generateUniqueRandom(maxNr);
        } 
    }
}
// For Game page questions style display

function showQuestion() {
    resetState();

    const randomQuestion= generateUniqueRandom(questions.length);    
    let currentQuestion = questions[randomQuestion];
    questionElement.innerHTML ="*   " + currentQuestion.question;

// Answer button options code
   
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersButtonElement.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAns);
    });
}


function selectAns(e) {
    nextButtonElement.innerHTML = "Next";
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answersButtonElement.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
            button.disabled = true;
    });
    nextButtonElement.style.display = "block";
}

// For invisible Next button
function resetState() {
    nextButtonElement.style.display = "none";
    while(answersButtonElement.firstChild){
        answersButtonElement.removeChild(answersButtonElement.firstChild);
    }
}

// score page score and button display 
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButtonElement.innerHTML = "Play Again";
    nextButtonElement.style.display = "block";
}

// start page welcome message and button display
function startQuiz() {
    resetState();
    questionElement.innerHTML = `Are you Ready? Let's Start the Game!`;
    nextButtonElement.innerHTML = "Start";
    nextButtonElement.style.display = "block";
    resetValues();
}

function resetValues()
{
    currentQuestionIndex = 0;
    score = 0;
    totalList = [];
}

function handleNextButton() {
    if(nextButtonElement.innerHTML == "Next")
    {
        currentQuestionIndex++;
    }
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButtonElement.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();