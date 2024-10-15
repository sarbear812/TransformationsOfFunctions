const questions = {
    easy: [
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
        }
    ],
    medium: [
        {
            description: "Shift the function \\(f(x) = |x|\\) left by 3 units and up by 2 units.",
            correctAnswer: "\\(f(x) = |x + 3| + 2\\)",
            options: [
                "\\(f(x) = |x + 3| - 2\\)",
                "\\(f(x) = |x - 3| + 2\\)",
                "\\(f(x) = |x + 3| + 2\\)",
                "\\(f(x) = |x| + 2\\)",
                "\\(f(x) = |x - 3| - 2\\)"
            ]
        },
        {
            description: "Reflect the function \\(f(x) = x^2\\) over the x-axis and shift it right by 4 units.",
            correctAnswer: "\\(f(x) = -(x - 4)^2\\)",
            options: [
                "\\(f(x) = -(x + 4)^2\\)",
                "\\(f(x) = (x - 4)^2\\)",
                "\\(f(x) = -(x - 4)^2\\)",
                "\\(f(x) = (x + 4)^2\\)",
                "\\(f(x) = -x^2 + 4\\)"
            ]
        }
    ],
    hard: [
        {
            description: "Stretch the function \\(f(x) = \\sqrt{x}\\) vertically by a factor of 3 and shift it left by 2 units.",
            correctAnswer: "\\(f(x) = 3\\sqrt{x + 2}\\)",
            options: [
                "\\(f(x) = \\sqrt{3x + 2}\\)",
                "\\(f(x) = 3\\sqrt{x + 2}\\)",
                "\\(f(x) = \\sqrt{3(x + 2)}\\)",
                "\\(f(x) = 3\\sqrt{x - 2}\\)",
                "\\(f(x) = \\sqrt{x + 2} + 3\\)"
            ]
        },
        {
            description: "Shift the function \\(f(x) = \\sqrt[3]{x}\\) down by 3 units and reflect it over the x-axis.",
            correctAnswer: "\\(f(x) = -\\sqrt[3]{x} - 3\\)",
            options: [
                "\\(f(x) = -\\sqrt[3]{x} - 3\\)",
                "\\(f(x) = \\sqrt[3]{x} - 3\\)",
                "\\(f(x) = -\\sqrt[3]{x} + 3\\)",
                "\\(f(x) = \\sqrt[3]{x} + 3\\)",
                "\\(f(x) = -\\sqrt[3]{x + 3}\\)"
            ]
        }
    ]
};

let totalScore = 0;
let currentQuestionIndex = 0;
let shuffledQuestions = [];
let questionAnswered = false;
let scoreRows = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    shuffledQuestions = [...questions.easy, ...questions.medium, ...questions.hard];
    shuffleArray(shuffledQuestions);
    loadQuestion();
}

function loadQuestion() {
    const question = shuffledQuestions[currentQuestionIndex];
    
    document.getElementById('transformation-description').innerHTML = question.description;
    const answerOptions = document.getElementById('answer-options');
    answerOptions.innerHTML = '';
    questionAnswered = false;

    question.options.forEach((option) => {
        const li = document.createElement('li');
        li.innerHTML = option;
        li.onclick = () => {
            if (!questionAnswered) checkAnswer(option, li);
        };
        answerOptions.appendChild(li);
    });

    document.getElementById('feedback').innerHTML = '';
    MathJax.typesetPromise();
}

function checkAnswer(selectedOption, selectedElement) {
    const correctAnswer = shuffledQuestions[currentQuestionIndex].correctAnswer;
    let points = 0;

    if (selectedOption === correctAnswer) {
        points = 20;
        selectedElement.style.backgroundColor = 'green';
        document.getElementById('feedback').innerText = 'Correct!';
    } else {
        points = -5;
        selectedElement.style.backgroundColor = 'red';
        document.getElementById('feedback').innerText = 'Incorrect.';
    }

    totalScore += points;
    questionAnswered = true;

    const answerOptions = document.querySelectorAll('#answer-options li');
    answerOptions.forEach(option => option.style.pointerEvents = 'none');

    updateScoreSheet(correctAnswer, points, totalScore);
    MathJax.typesetPromise();
}

function updateScoreSheet(correctAnswer, points, runningTotal) {
    const scoreSheet = document.getElementById('score-sheet').querySelector('tbody');
    
    if (scoreRows < 11) {
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
        scoreRows++;
    } else {
        const totalRow = document.createElement('tr');
        const totalCell = document.createElement('td');
        totalCell.colSpan = 2;
        totalCell.innerText = "Total Score:";
        
        const finalTotalCell = document.createElement('td');
        finalTotalCell.innerText = runningTotal;

        totalRow.appendChild(totalCell);
        totalRow.appendChild(finalTotalCell);
        
        scoreSheet.appendChild(totalRow);
        
        // Reset the score sheet for next set of rows
        scoreRows = 0;
        // Clear existing rows
        while (scoreSheet.firstChild) {
            scoreSheet.removeChild(scoreSheet.firstChild);
        }
        
        // Append the new total row after clearing
        scoreSheet.appendChild(totalRow);
        
        // Continue adding rows after clearing
        updateScoreSheet(correctAnswer, points, runningTotal);
    }
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % shuffledQuestions.length;
    loadQuestion();
});

window.onload = startQuiz;

