(function() {
  function buildQuizSEQ() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<input type="radio" name="questionSEQ${questionNumber}" id="questionSEQ${questionNumber}${letter}" value="${letter}">
           <label for="questionSEQ${questionNumber}${letter}">${currentQuestion.answers[letter]}</label><br>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="gq">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answersSEQ"> ${answers.join("")} </div></div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".gq");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=questionSEQ${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    if(myQuestions.length === numCorrect) {
        resultsContainer.innerHTML = `Vous avez r??ussi les ${myQuestions.length} questions (${(numCorrect/myQuestions.length)*100}%).<br><em>UN SANS FAUTE !</em> <img src="https://media.giphy.com/media/3oEjI5VtIhHvK37WYo/giphy.gif" class="image main" alt="F??licitations !"/>`;
    }
    else if(0 === numCorrect)   {
      resultsContainer.innerHTML = `Vous n'avez r??ussi aucune des ${myQuestions.length} questions (${(numCorrect/myQuestions.length)*100}%).<br><em>UNE R??VISION S'IMPOSE</em> ! <img src="https://media.giphy.com/media/3h5pe45FM9qUM/giphy.gif" class="image main" alt="Rolling eyes."/>`;
    }
    else {
      resultsContainer.innerHTML = `Vous avez r??ussi ${numCorrect} question(s) sur ${myQuestions.length} (${(numCorrect/myQuestions.length)*100}%).<br>`;
    }
  }

  const quizContainer = document.getElementById("quizSEQ");
  const resultsContainer = document.getElementById("resultsSEQ");
  const submitButton = document.getElementById("submitSEQ");
  const myQuestions = [
    {
      question: "Un diagramme de s??quence c'est...",
      answers: {
        a: "un chapitre du cours de COO.",
        b: "un court extrait d'un film sur TF1.",
        c: "pour mettre en avant les interactions entre objets.",
        d: "pour mettre en avant l'architecture syt??me."
      },
      correctAnswer: "c"
    },
    {
      question: "Quelle est la d??nomination pour un cadre d'int??raction de <u>condition</u> ?",
      answers: {
        a: "Alt",
        b: "Loop",
        c: "Ref"
      },
      correctAnswer: "a"
    },
    {
      question: "O?? positionne-t-on l'acteur principal ?",
      answers: {
        a: "En haut",
        b: "En bas",
        c: "?? gauche",
        d: "?? droite",
        e: "Ces soir??es l?? !"
      },
      correctAnswer: "c"
    },
    {
      question: "Quelle est la d??nomination pour un cadre d'int??raction de <u>r??p??tition</u> ?",
      answers: {
        a: "Alt",
        b: "Loop",
        c: "Ref"
      },
      correctAnswer: "b"
    },
    {
      question: "Comment repr??sentons-nous un message de r??ponse ?",
      answers: {
        a: "Par une fl??che ?? sens inverse en pointillets",
        b: "Par une fl??che pleine ?? sens inverse",
        c: "Par une double fl??che ?? sens inverse",
        d: "Par une fl??che du m??me sens en pointillets",
        e: "Par une fl??che pleine du m??me sens",
        f: "Par une double fl??che du m??me sens"
      },
      correctAnswer: "a"
    }
  ];

  // display quiz right away
  buildQuizSEQ();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
