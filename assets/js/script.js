  var containerQuestionEl = document.getElementById("question-container");
      var containerStartEl = document.getElementById("starter-container");
      var containerEndEl = document.getElementById("end-container")
      var containerScoreEl = document.getElementById("score-banner")
      var formInitials = document.getElementById("initials-form")
      var containerHighScoresEl = document.getElementById("high-score-container")
      var ViewHighScoreEl = document.getElementById("high-scores")
      var listHighScoreEl = document.getElementById("high-score-list")
      var correctEl = document.getElementById("correct")
      var wrongEl = document.getElementById("wrong")
      var btnStartEl = document.querySelector("#start-game");
      var btnGoBackEl = document.querySelector("#go-back")
      var btnClearScoresEl = document.querySelector("#clear-high-scores")
      var questionEl = document.getElementById("question")
      var answerbuttonsEl = document.getElementById("answer-buttons")
      var timerEl = document.querySelector("#timer");
      var score = 0;
      var timeleft;
      var gameover
      timerEl.innerText = 0;
      var HighScores = [];

      var arrayShuffledQuestions
      var QuestionIndex = 0

      var questions = [
        { q: 'Coding is performed at?.', 
          a: 'C. Both Front and Back End', 
          choices: [{choice: 'A. Front End'}, {choice: 'B. Back End'}, {choice: 'C. Both Front and Back End'}, {choice: 'D. None of the above'}]
        },
        { q: 'There are how many coding languages?', 
          a: 'D. More than 3', 
          choices: [{choice: 'A. 1'}, {choice: 'B. 2'}, {choice: 'C. 3'}, {choice: 'D. More than 3'}]
        },
        { q: '_______ is the process of finding errors and fixing them within a program.', 
          a: 'A. Debugging', 
          choices: [{choice: 'A. Debugging'}, {choice: 'B. Compiling'}, {choice: 'C. Scanning'}, {choice: 'D. None of the above'}]
        },
        { q: 'In python can you make your own library?', 
          a: 'A. Yes', 
          choices: [{choice: 'A. Yes'}, {choice: 'B. No'}, {choice: 'C. Yes with restrictions'}, {choice: 'D. Not Sure'}]
        },
        { q: 'C++ is _______ type of programming language?', 
          a: 'D. Functional', 
          choices: [{choice: 'A. Microsoft'}, {choice: 'B. Object Oriented'}, {choice: 'C. Bit level language'}, {choice: 'D. Functional'}]
        },
      ];
      
        var renderStartPage = function () {
        containerHighScoresEl.classList.add("hide")
        containerHighScoresEl.classList.remove("show")
        containerStartEl.classList.remove("hide")
        containerStartEl.classList.add("show")
        containerScoreEl.removeChild(containerScoreEl.lastChild)
        QuestionIndex = 0
        gameover = ""
        timerEl.textContent = 0 
        score = 0

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide")
        }
        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
        }
    }

    var setTime = function () {
        timeleft = 45;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
    }

    var startGame = function() {
        containerStartEl.classList.add('hide');
        containerStartEl.classList.remove('show');
        containerQuestionEl.classList.remove('hide');
        containerQuestionEl.classList.add('show');
        arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
        setTime()
        setQuestion()
      }
    
    var setQuestion = function() {
        resetAnswers()
        displayQuestion(arrayShuffledQuestions[QuestionIndex])
    }
    var resetAnswers = function() {
        while (answerbuttonsEl.firstChild) {
            answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
        };
    };

    var displayQuestion = function(index) {
        questionEl.innerText = index.q
        for (var i = 0; i < index.choices.length; i++) {
            var answerbutton = document.createElement('button')
            answerbutton.innerText = index.choices[i].choice
            answerbutton.classList.add('btn')
            answerbutton.classList.add('answerbtn')
            answerbutton.addEventListener("click", answerCheck)
            answerbuttonsEl.appendChild(answerbutton)
            }
        };

    var answerCorrect = function() {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
            wrongEl.classList.remove("banner")
            wrongEl.classList.add("hide")
            }
        }  

    var answerWrong = function() {
        if (wrongEl.className = "hide") {
            wrongEl.classList.remove("hide")
            wrongEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }

    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = score + 20
            }

            else {
              answerWrong()
              score = score - 20;
          };

          QuestionIndex++
            if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               gameover = "true";
               showScore();
                }
    }

    var showScore = function () {
        containerQuestionEl.classList.add("hide");
        containerEndEl.classList.remove("hide");
        containerEndEl.classList.add("show");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " + score + "!");
        containerScoreEl.appendChild(scoreDisplay);
    }       
    
    var createHighScore = function(event) { 
        event.preventDefault() 
        var initials = document.querySelector("#initials").value;

      formInitials.reset();

      var HighScore = {
      initials: initials,
      score: score
      } 

      HighScores.push(HighScore);
      HighScores.sort((a, b) => {return b.score-a.score});

    while (listHighScoreEl.firstChild) {
       listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }

    for (var i = 0; i < HighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);
    }

      saveHighScore();
      displayHighScores();

    }

    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
            
    }

    var loadHighScore = function () {
        var LoadedHighScores = localStorage.getItem("HighScores")
            if (!LoadedHighScores) {
            return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);
        LoadedHighScores.sort((a, b) => {return b.score-a.score})
 

        for (var i = 0; i < LoadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li");
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl);

            HighScores.push(LoadedHighScores[i]);
            
        }
    }  

    var displayHighScores = function() {

        containerHighScoresEl.classList.remove("hide");
        containerHighScoresEl.classList.add("show");
        gameover = "true"

        if (containerEndEl.className = "show") {
            containerEndEl.classList.remove("show");
            containerEndEl.classList.add("hide");
            }
        if (containerStartEl.className = "show") {
            containerStartEl.classList.remove("show");
            containerStartEl.classList.add("hide");
            }
            
        if (containerQuestionEl.className = "show") {
            containerQuestionEl.classList.remove("show");
            containerQuestionEl.classList.add("hide");
            }

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }

        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
            }
        
    }
    var clearScores = function () {
        HighScores = [];

        while (listHighScoreEl.firstChild) {
            listHighScoreEl.removeChild(listHighScoreEl.firstChild);
        }

        localStorage.clear(HighScores);

    } 

    loadHighScore()
        
      btnStartEl.addEventListener("click", startGame)
      formInitials.addEventListener("submit", createHighScore)
      ViewHighScoreEl.addEventListener("click", displayHighScores)
      btnGoBackEl.addEventListener("click", renderStartPage)
      btnClearScoresEl.addEventListener("click", clearScores)