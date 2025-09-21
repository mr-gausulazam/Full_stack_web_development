// Global variables to track the user's attempts and quiz data
let attemptCount = 0;
let maxAttempts = 10;
let quizData = {
    username: "",
    email: "",
    score: 0
};

// Handle login
document.getElementById("loginButton").addEventListener("click", function() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    if (username && email) {
        quizData.username = username;
        quizData.email = email;
        attemptCount = localStorage.getItem(email) ? parseInt(localStorage.getItem(email)) : 0;

        if (attemptCount >= maxAttempts) {
            alert("You have reached the maximum attempts!");
            return;
        }

        localStorage.setItem(email, attemptCount + 1);

        document.getElementById("userNameDisplay").textContent = username;
        document.getElementById("attemptCount").textContent = attemptCount + 1;
        
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("quizSection").style.display = "block";
        startQuizTimer();
    } else {
        alert("Please enter both name and email.");
    }
});

// Timer functionality
let timerInterval;
let timeRemaining = 20 * 60; // 20 minutes in seconds

function startQuizTimer() {
    timerInterval = setInterval(function() {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        document.getElementById("timer").textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

// Submit the quiz and show results
document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();
    submitQuiz();
});

function submitQuiz() {
    let score = calculateScore();
    quizData.score = score;

    localStorage.setItem("quizData", JSON.stringify(quizData));

    document.getElementById("quizSection").style.display = "none";
    document.getElementById("resultSection").style.display = "block";
    document.getElementById("score").textContent = score;
}

// Calculate quiz score (dummy logic for demonstration)
function calculateScore() {
    let correctAnswers = 0;
    let answers = document.querySelectorAll('input[type="radio"]:checked');
    answers.forEach(answer => {
        if (answer.value === "A") correctAnswers++; // assume "A" is correct
    });
    return correctAnswers;
}

// Logout functionality
document.getElementById("logoutButton").addEventListener("click", function() {
    localStorage.clear();
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
});
