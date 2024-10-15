const transformations = [
    {
        description: "Shift the function \\(f(x) = |x|\\) left by 3 units.",
        correctAnswer: "\\(f(x) = |x + 3|\\)",
        options: [
            "\\(f(x) = |x - 3|\\)",
            "\\(f(x) = |x + 3|\\)",
            "\\(f(x) = |x| - 3\\)",
            "\\(f(x) = -|x|\\)",
            "\\(f(x) = 3|x|\\)"
        ]
    },
    {
        description: "Reflect the function \\(f(x) = x^2\\) over the x-axis.",
        correctAnswer: "\\(f(x) = -x^2\\)",
        options: [
            "\\(f(x) = -x^2\\)",
            "\\(f(x) = x^2 + 1\\)",
            "\\(f(x) = (x - 1)^2\\)",
            "\\(f(x) = (x + 2)^2\\)",
            "\\(f(x) = x^2 - 2\\)"
        ]
    },
    {
        description: "Stretch the function \\(f(x) = \\sqrt{x}\\) vertically by a factor of 2.",
        correctAnswer: "\\(f(x) = 2\\sqrt{x}\\)",
        options: [
            "\\(f(x) = \\sqrt{x} + 2\\)",
            "\\(f(x) = 2\\sqrt{x}\\)",
            "\\(f(x) = \\sqrt{x - 2}\\)",
            "\\(f(x) = \\sqrt{x} - 2\\)",
            "\\(f(x) = \\sqrt{x + 2}\\)"
        ]
    },
    {
        description: "Shift the function \\(f(x) = \\sqrt[3]{x}\\) up by 4 units.",
        correctAnswer: "\\(f(x) = \\sqrt[3]{x} + 4\\)",
        options: [
            "\\(f(x) = \\sqrt[3]{x} - 4\\)",
            "\\(f(x) = \\sqrt[3]{x - 4}\\)",
            "\\(f(x) = 4\\sqrt[3]{x}\\)",
            "\\(f(x) = \\sqrt[3]{x} + 4\\)",
            "\\(f(x) = -\\sqrt[3]{x}\\)"
        ]
    },
    {
        description: "Reflect the function \\(f(x) = x^3\\) over the y-axis.",
        correctAnswer: "\\(f(x) = (-x)^3\\)",
        options: [
            "\\(f(x) = -x^3\\)",
            "\\(f(x) = (-x)^3\\)",
            "\\(f(x) = x^3 + 1\\)",
            "\\(f(x) = (x + 3)^3\\)",
            "\\(f(x) = x^3 - 3\\)"
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;

function loadQuestion() {
    const question = transformations[currentQuestionIndex];
    
    document.getElementById('transformation-description').innerHTML = question.description;
    
    const answerOptions = document.getElementById('answer-options');
    answerOptions.innerHTML = '';
    
    question.options.forEach((option) => {
        const li = document.createElement('li');
        li.innerHTML = option;
        li.onclick = () => checkAnswer(option);
        answerOptions.appendChild(li);
    });
    
    document.getElementById('feedback').innerHTML = '';
    
    // Render MathJax after the HTML is loaded
    MathJax.typesetPromise();
}

function checkAnswer(selectedOption) {
    const correctAnswer = transformations[currentQuestionIndex].correctAnswer;
    let points = 0;
    
    if (selectedOption === correctAnswer) {
        points = 20;
        document.getElementById('feedback').innerText = 'Correct! Well done.';
        document.getElementById('feedback').style.color = 'green';
    } else {
        points = -5;
        document.getElementById('feedback').innerText = 'Incorrect. Try again.';
        document.getElementById('feedback').style.color = 'red';
    }
    
    totalScore += points;
    updateScoreSheet(correctAnswer, points, totalScore);
    
    // Re-render MathJax in case of new content
    MathJax.typesetPromise();
}

function updateScoreSheet(correctAnswer, points, runningTotal) {
    const scoreSheet = document.getElementById('score-sheet').querySelector('tbody');
    
    const row = document.createElement('tr');
    const correctAnswerCell = document.createElement('td');
    const pointsCell = document.createElement('td');
    const totalScoreCell = document.createElement('td');
    
    correctAnswerCell.innerHTML = correctAnswer;
    pointsCell.innerText = points;
    totalScoreCell.innerText = runningTotal;
    
    row.appendChild(correctAnswerCell);
    row.appendChild(pointsCell);
    row.appendChild(totalScoreCell);
    
    scoreSheet.appendChild(row);
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % transformations.length;
    loadQuestion();
});

// Load the first question when the page loads
window.onload = loadQuestion;
