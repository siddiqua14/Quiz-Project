const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        choices: ["William Shakespeare", "Charles Dickens", "Leo Tolstoy", "Mark Twain"],
        correct: 0
    },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15; // Timer duration in seconds

function loadQuestion() {
    let currentQuestionData = quizData[currentQuestion];

    // Add question title and number out of total questions
    document.getElementById("question").textContent = `Q${currentQuestion + 1} of ${quizData.length}: ${currentQuestionData.question}`;

    let choices = document.querySelectorAll(".choice");
    choices.forEach((choice, index) => {
        choice.textContent = currentQuestionData.choices[index];
        choice.style.background = "#007bff";
        choice.disabled = false;
    });

    document.getElementById("nextButton").style.display = "none";

    // Reset and start the timer
    resetTimer();
    startTimer();
}

function selectAnswer(index) {
    let currentQuestionData = quizData[currentQuestion];
    let choices = document.querySelectorAll(".choice");

    // Stop the timer when an answer is selected
    clearInterval(timer);

    if (index === currentQuestionData.correct) {
        score++;
        choices[index].style.backgroundColor = "#28a745";
    } else {
        choices[index].style.backgroundColor = "#dc3545";
        choices[currentQuestionData.correct].style.backgroundColor = "#28a745";
    }

    choices.forEach(choice => {
        choice.disabled = true;
    });

    document.getElementById("nextButton").style.display = "block";
}

function nextQuestion() {
    clearInterval(timer); // Stop the timer before moving to the next question
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById('quiz').innerHTML = `
    <h2>Your score: ${score} out of ${quizData.length} </h2> 
    <button id="restartButton">Restart Quiz</button>
    `;

    document.getElementById("restartButton").addEventListener("click", restartQuiz);
}

function restartQuiz() {
    window.location.reload();
}

function startTimer() {
    let timerElement = document.getElementById("timer");
    timeLeft = 15; // Reset the time for each question

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); // Automatically move to the next question if time runs out
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById("timer").textContent = `Time Left: 15s`; // Reset the timer display
}

window.onload = loadQuestion;
