// Assignment 10 - JavaScript: Making the Portfolio Respond
// Verified against the 6-row Quiz Test Matrix (M1 - M6)

console.log("JavaScript connected and no errors.");

const questions = [
    {
        question: "1. What is the fundamental role of HTML in web development?",
        options: [
            "Defines page structure and content semantics",
            "Controls visual styling, colors, and layout",
            "Provides interactive behavior and event handling",
            "Manages server-side database connections"
        ],
        correctIndex: 0
    },
    {
        question: "2. Which CSS property is used to change the background color of an element?",
        options: [
            "color",
            "bgcolor",
            "background-color",
            "canvas-color"
        ],
        correctIndex: 2
    },
    {
        question: "3. Which keyword is used to declare a block-scoped variable in modern JavaScript?",
        options: [
            "var",
            "let",
            "dim",
            "def"
        ],
        correctIndex: 1
    },
    {
        question: "4. What does DOM stand for in client-side JavaScript?",
        options: [
            "Digital Object Marker",
            "Data Output Mechanism",
            "Document Object Model",
            "Direct Operational Module"
        ],
        correctIndex: 2
    },
    {
        question: "5. What is the primary purpose of JavaScript in front-end development?",
        options: [
            "Structuring headings and paragraphs",
            "Adding dynamic behaviour and responding to user actions",
            "Rendering vector graphics natively",
            "Compiling bytecode for the CPU"
        ],
        correctIndex: 1
    }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

// DOM Elements
const quizContainer = document.getElementById("quizContainer");
const resultsContainer = document.getElementById("resultsContainer");
const questionCounter = document.getElementById("questionCounter");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const finalScoreEl = document.getElementById("finalScore");
const scoreFeedbackEl = document.getElementById("scoreFeedback");
const restartBtn = document.getElementById("restartBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeLabel = document.getElementById("themeLabel");

function loadQuestion(index) {
    const q = questions[index];
    questionCounter.textContent = `Question ${index + 1} of ${questions.length}`;
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";
    
    // Update progress bar
    progressBar.style.width = `${((index) / questions.length) * 100}%`;

    q.options.forEach((optText, optIdx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option-btn";
        btn.textContent = optText;

        if (userAnswers[index] === optIdx) {
            btn.classList.add("selected");
        }

        btn.addEventListener("click", () => selectOption(index, optIdx));
        optionsContainer.appendChild(btn);
    });

    // Disable Next button until an answer is selected
    nextBtn.disabled = userAnswers[index] === null;
    nextBtn.textContent = index === questions.length - 1 ? "Submit & View Score" : "Next Question";
}

function selectOption(qIndex, selectedOptionIndex) {
    // M4: Click same correct answer twice counts once (storing by question index prevents double-counting)
    userAnswers[qIndex] = selectedOptionIndex;

    const allButtons = optionsContainer.querySelectorAll(".option-btn");
    allButtons.forEach((btn, idx) => {
        btn.classList.toggle("selected", idx === selectedOptionIndex);
    });

    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
    // M5: After question 4, final score not shown. Only shown after answering Q5.
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
});

function calculateScore() {
    let score = 0;
    questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctIndex) {
            score++;
        }
    });
    return score;
}

function showResults() {
    const score = calculateScore();
    progressBar.style.width = "100%";
    quizContainer.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
    finalScoreEl.textContent = score;

    if (score === 5) {
        scoreFeedbackEl.textContent = "Outstanding! Perfect 5/5 score.";
    } else if (score >= 3) {
        scoreFeedbackEl.textContent = "Good job! You passed the assessment.";
    } else {
        scoreFeedbackEl.textContent = "Keep practicing! Review the concepts and try again.";
    }
}

function restartQuiz() {
    // M6: Score resets to 0 and answers clear
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    resultsContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion(0);
}

restartBtn.addEventListener("click", restartQuiz);

// Theme toggle
themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", nextTheme);
    themeLabel.textContent = nextTheme === "dark" ? "Light Mode" : "Dark Mode";
});

// Initialize on page load (M6: reload page always starts with score 0 at Q1)
loadQuestion(0);
