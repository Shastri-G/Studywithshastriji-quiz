 var questions = [
      {
        question: "Question 1: What is the capital of France?",
        answers: ["Paris", "Madrid", "Berlin", "Rome"],
        correctAnswer: "Paris"
      },
      {
        question: "Question 2: Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
      },
      {
        question: "Question 3: What is the largest ocean in the world?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
      }
      // Add more questions here...
    ];

    var currentQuestionIndex = 0;
    var score = 0;
    var timeLeft = 50;
    var timerInterval;

    var quizContainer = document.getElementById("quiz-container");
    var questionContainer = document.getElementById("question-container");
    var timerElement = document.getElementById("timer");
    var questionElement = document.getElementById("question");
    var answerOptionElements = document.getElementsByClassName("answer-option");
    var resultContainer = document.getElementById("result-container");
    var scoreCardElement = document.getElementById("score-card");
    var correctAnswersElement = document.getElementById("correct-answers");
    var correctAnswersListElement = document.getElementById("correct-answers-list");

    function startQuiz() {
      quizContainer.style.display = "none";
      questionContainer.style.display = "block";
      showQuestion();
      startTimer();
    }

    function showQuestion() {
      var currentQuestion = questions[currentQuestionIndex];
      questionElement.textContent = currentQuestion.question;

      for (var i = 0; i < answerOptionElements.length; i++) {
        answerOptionElements[i].textContent = currentQuestion.answers[i];
        answerOptionElements[i].classList.remove("correct-answer", "wrong-answer");
        answerOptionElements[i].onclick = checkAnswer;
      }
    }

    function checkAnswer(event) {
      var selectedOption = event.target;
      var selectedAnswer = selectedOption.textContent;
      var currentQuestion = questions[currentQuestionIndex];

      if (selectedAnswer === currentQuestion.correctAnswer) {
        selectedOption.classList.add("correct-answer");
        score++;
      } else {
        selectedOption.classList.add("wrong-answer");
      }

      disableOptions();

      if (currentQuestionIndex === questions.length - 1) {
        clearInterval(timerInterval);
        showResult();
      } else {
        currentQuestionIndex++;
        setTimeout(showQuestion, 1000);
        timeLeft = 50;
        startTimer();
      }
    }

    function disableOptions() {
      for (var i = 0; i < answerOptionElements.length; i++) {
        answerOptionElements[i].onclick = null;
      }
    }

    function startTimer() {
      timerElement.textContent = "Time: " + timeLeft + "s";
      timerInterval = setInterval(function() {
        timeLeft--;
        timerElement.textContent = "Time: " + timeLeft + "s";

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          disableOptions();
          showResult();
        }
      }, 1000);
    }

    function showResult() {
      questionContainer.style.display = "none";
      resultContainer.style.display = "block";

      var percentage = (score / questions.length) * 100;
      scoreCardElement.textContent = "Score: " + score + "/" + questions.length + " (" + percentage + "%)";

      if (score === questions.length) {
        correctAnswersElement.style.display = "none";
      } else {
        correctAnswersElement.style.display = "block";
        for (var i = 0; i < questions.length; i++) {
          var correctAnswer = questions[i].correctAnswer;
          var li = document.createElement("li");
          li.textContent = questions[i].question + " Answer: " + correctAnswer;
          correctAnswersListElement.appendChild(li);
        }
      }
    }

    quizContainer.addEventListener("click", startQuiz);