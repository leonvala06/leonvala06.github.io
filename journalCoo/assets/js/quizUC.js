(function() {
  function buildQuizUC() {
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
          `<input type="radio" name="question${questionNumber}" id="question${questionNumber}${letter}" value="${letter}">
           <label for="question${questionNumber}${letter}">${currentQuestion.answers[letter]}</label><br>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="gq">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answersUC"> ${answers.join("")} </div></div>`
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
      const selector = `input[name=question${questionNumber}]:checked`;
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

  const quizContainer = document.getElementById("quizUC");
  const resultsContainer = document.getElementById("resultsUC");
  const submitButton = document.getElementById("submitUC");
  const myQuestions = [
    {
      question: "Comment se représente un acteur ?",
      answers: {
        a: "Par un bonhomme",
        b: "Par une boîte",
        c: "Par un arbre"
      },
      correctAnswer: "a"
    },
    {
      question: "Parmi la liste de relations ci-dessous, laquelle n'existe pas ?",
      answers: {
        a: "extend",
        b: "include",
        c: "import",
        d: "banalisation",
        e: "generalisation"
      },
      correctAnswer: "d"
    },
    {
      question: "Un cas d'utilisation est toujours à l'impératif.",
      answers: {
        a: "Vrai",
        b: "Faux",
        c: "La réponse c",
      },
      correctAnswer: "b"
    },
    {
      question: "Parmi la liste de flots ci-dessous, lequel n'existe pas ?",
      answers: {
        a: "Flot nominal",
        b: "Flot direct",
        c: "Flot alternatif",
        d : "Flot d'erreur"
      },
      correctAnswer: "b"
    }
  ];

  // display quiz right away
  buildQuizUC();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
