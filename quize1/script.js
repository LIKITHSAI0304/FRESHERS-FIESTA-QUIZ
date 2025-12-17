const questions = [
    {
        q: "What is 2 + 2?",
        options: ["1", "2", "3", "4"],
        answer: 3
    },
    {
        q: "Capital of India?",
        options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
        answer: 0
    },
    // ADD UP TO 30 QUESTIONS
];

let current = 0;
let score = 0;
let time = 30;
let selected = null;

let timer = setInterval(() => {
    document.getElementById("timer").innerText = "Time: " + time;
    time--;

    if (time < 0) {
        nextQuestion();
    }
}, 1000);

function loadQuestion() {
    time = 30;
    selected = null;

    let q = questions[current];
    document.getElementById("question").innerText = q.q;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => selected = i;
        optionsDiv.appendChild(btn);
    });
}

function nextQuestion() {
    if (selected === questions[current].answer) {
        score++;
    }

    current++;

    if (current >= questions.length) {
        finishQuiz();
        return;
    }

    loadQuestion();
}

function finishQuiz() {
    clearInterval(timer);

    let student = JSON.parse(localStorage.getItem("student"));
    let results = JSON.parse(localStorage.getItem("results")) || [];

    results.push({
        name: student.name,
        reg: student.reg,
        score: score
    });

    localStorage.setItem("results", JSON.stringify(results));
    alert("Quiz submitted successfully!");
    window.location.href = "index.html";
}

loadQuestion();
