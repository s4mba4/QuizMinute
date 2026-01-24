let questions = [];
let allQuestions = []
let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;
let activeCategory = "";
let shuffledOptions = {}; // Store shuffled options for each question

const menuScreen = document.getElementById('menu-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const categoryDisplay = document.getElementById('category-display');
const questionCounter = document.getElementById('question-counter');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const feedbackMessage = document.getElementById('feedback-message');
const scoreDisplay = document.getElementById('score-display');
const scoreMessage = document.getElementById('score-message');
const summaryQuestion = document.getElementById('summary-questions');


async function initApp() {
    allQuestions = await loadQuestions();
    questions = [...allQuestions];
}

// Function to shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to get shuffled options for a question
function getShuffledOptions(question) {
    const options = ['A', 'B', 'C', 'D'];
    const shuffled = shuffleArray(options);
    return shuffled;
}

document.addEventListener('DOMContentLoaded', initApp);

function handleCategoryClick(category) {
    if (category === 'Streak') {
        startStreakQuiz();
    } 
    else if (category == 'Infinite'){
        startInfinitQuiz();
    }
    else {
        startCategoryQuizz(category);
    }
}

function startCategoryQuizz(category){
    activeCategory = category;
    categoryDisplay.textContent = category;
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    console.log(category);
    questions = allQuestions.filter(item => item.tag === category);
    questions = [...questions].sort(() => 0.5 - Math.random()).splice(0, 10);
    console.log(allQuestions);
    switchScreen(menuScreen, quizScreen);
    
    displayQuestion();
}

function startInfinitQuiz() {
    activeCategory = 'Infinit';
    categoryDisplay.textContent = 'Infinit Mode';
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    
    questions = [...allQuestions].sort(() => 0.5 - Math.random());

    switchScreen(menuScreen, quizScreen);
    
    displayQuestion();
}

function startStreakQuiz() {
    console.log("newquiz")
    activeCategory = 'Streak';
    categoryDisplay.textContent = 'Streak Mode';
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    
    questions = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
        
    switchScreen(menuScreen, quizScreen);
    
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    questionCounter.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
    progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;

    questionText.textContent = currentQuestion.question;
    
    // Get shuffled options for this question
    const shuffled = getShuffledOptions(currentQuestion);
    shuffledOptions[currentQuestionIndex] = shuffled;
    
    for (let i = 0; i < 4; i++) {
        const displayLetter = ['A', 'B', 'C', 'D'][i]; // Position visuelle
        const originalLetter = shuffled[i]; // Lettre originale dans le JSON
        const optionButton = document.getElementById(`option-${displayLetter}`);
        const optionText = document.getElementById(`option-${displayLetter}-text`);
        const optionIcon = document.getElementById(`option-${displayLetter}-icon`);
        
        optionButton.className = 'option-button';
        optionButton.dataset.originalAnswer = originalLetter; // Store the original letter
        optionIcon.innerHTML = '';
        
        optionText.textContent = currentQuestion[originalLetter];
    }
    
    feedbackMessage.classList.add('hidden');
    feedbackMessage.textContent = '';
}

function handleAnswerSelect(answer) {
    if (selectedAnswer !== null) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const optionButton = document.getElementById(`option-${answer}`);
    const originalAnswer = optionButton.dataset.originalAnswer; // Get the original letter
    
    selectedAnswer = answer;
    const isCorrect = originalAnswer === currentQuestion.answer;
    const optionIcon = document.getElementById(`option-${answer}-icon`);
    
    optionButton.classList.add('selected');
    
    if (isCorrect) {
        optionButton.classList.add('correct');
        optionIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#58CC02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
        score++;
    } else {
        optionButton.classList.add('incorrect');
        optionIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4B4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
        
        feedbackMessage.classList.remove('hidden');
        feedbackMessage.textContent = `La bonne réponse est: ${currentQuestion[currentQuestion.answer]}`;
    }
    
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            selectedAnswer = null;
            displayQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    scoreDisplay.textContent = `${score}/${questions.length}`;
    
    if (score === questions.length) {
        scoreMessage.textContent = "Parfait bravo ! ";
    } else if (score >= questions.length / 2) {
        scoreMessage.textContent = "Bien joué continue comme ça !";
    } else {
        scoreMessage.textContent = "Aie aie aie, c'est pas encore ça hein";
    }
    
    // Clear previous results
    summaryQuestion.innerHTML = '';
    
    for (let i in questions){
        var card = document.createElement("div");
        card.id= i;  
        card.className = "question";
        summaryQuestion.appendChild(card);

        var infoschamps = document.createElement("h3");
        infoschamps.id = i;  
        infoschamps.className = "question";
        infoschamps.innerHTML = questions[i]["question"];
        card.appendChild(infoschamps);

        var rep = document.createElement("div");
        rep.id = i+"rep";  
        rep.innerHTML = questions[i][questions[i]["answer"]];
        rep.style.fontStyle = "italic"
        rep.style.padding =  '10px'
        card.appendChild(rep);
    }

    switchScreen(quizScreen, resultsScreen);
}

function returnToMenu() {
    // Clear summary questions when returning to menu
    summaryQuestion.innerHTML = '';
    switchScreen(document.querySelector('.screen.active'), menuScreen);
}

function switchScreen(fromScreen, toScreen) {
    fromScreen.classList.remove('active');
    
    setTimeout(() => {
        toScreen.classList.add('active');
    }, 300);
}