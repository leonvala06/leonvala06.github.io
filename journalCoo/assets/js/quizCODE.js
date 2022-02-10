(function() {
  function buildQuizCODE() {
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
          `<input type="radio" name="questionCODE${questionNumber}" id="questionCODE${questionNumber}${letter}" value="${letter}">
           <label for="questionCODE${questionNumber}${letter}">${currentQuestion.answers[letter]}</label><br>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="gq">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answersCODE"> ${answers.join("")} </div></div>`
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
      const selector = `input[name=questionCODE${questionNumber}]:checked`;
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
        resultsContainer.innerHTML = `Vous avez réussi les ${myQuestions.length} questions (${(numCorrect/myQuestions.length)*100}%).<br><em>UN SANS FAUTE !</em> <img src="https://media.giphy.com/media/3oEjI5VtIhHvK37WYo/giphy.gif" class="image main" alt="Félicitations !"/>`;
    }
    else if(0 === numCorrect)   {
      resultsContainer.innerHTML = `Vous n'avez réussi aucune des ${myQuestions.length} questions (${(numCorrect/myQuestions.length)*100}%).<br><em>UNE RÉVISION S'IMPOSE</em> ! <img src="https://media.giphy.com/media/3h5pe45FM9qUM/giphy.gif" class="image main" alt="Rolling eyes."/>`;
    }
    else {
      resultsContainer.innerHTML = `Vous avez réussi ${numCorrect} question(s) sur ${myQuestions.length} (${(numCorrect/myQuestions.length)*100}%).<br>`;
    }
  }

  const quizContainer = document.getElementById("quizCODE");
  const resultsContainer = document.getElementById("resultsCODE");
  const submitButton = document.getElementById("submitCODE");
  const myQuestions = [
    {
      question: "Java c'est...",
      answers: {
        a: "un langage de programmation orienté objet.",
        b: "un argot anglais pour dire café.",
        c: "une question piège, c'est les deux."
      },
      correctAnswer: "c"
    },
    {
      question: "Par quel mot clé se représente l'héritage en Java ?",
      answers: {
        a: "<code>implements</code>",
        b: "<code>extends</code>",
        c: "<code>inherits</code>"
      },
      correctAnswer: "b"
    },
    {
      question: "Doit-on conventionnelement passer de la modélisation au code ?",
      answers: {
        a: "Oui",
        b: "Non, l'inverse"
      },
      correctAnswer: "a"
    },
    {
      question: "Par quoi modélisons nous une relation simple entre deux classes en Java ?",
      answers: {
        a: "<code>visibility Classe nomObjet</code>",
        b: "<code>visibility nomObjet Classe</code>",
        c: "<code>ClasseFille extends ClasseParent</code>"
      },
      correctAnswer: "a"
    },
    {
      question: "Quelle visibilité n'existe pas ?",
      answers: {
        a: "<code>default</code>",
        b: "<code>private</code>",
        c: "<code>public</code>",
        d: "<code>protected</code>",
        e: "<code>full</code>"
      },
      correctAnswer: "e"
    }
  ];

  // display quiz right away
  buildQuizCODE();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
