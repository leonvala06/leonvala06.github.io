(function() {
  function buildQuizCLASSE() {
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
          `<input type="radio" name="questionCLASSE${questionNumber}" id="questionCLASSE${questionNumber}${letter}" value="${letter}">
           <label for="questionCLASSE${questionNumber}${letter}">${currentQuestion.answers[letter]}</label><br>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="gq">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answersCLASSE"> ${answers.join("")} </div></div>`
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
      const selector = `input[name=questionCLASSE${questionNumber}]:checked`;
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

  const quizContainer = document.getElementById("quizCLASSE");
  const resultsContainer = document.getElementById("resultsCLASSE");
  const submitButton = document.getElementById("submitCLASSE");
  const myQuestions = [
    {
      question: "Quelle est la bonne repr??sentation d'une op??ration ?",
      answers: {
        a: "operation()",
        b: "operation",
        c: "1. operation"
      },
      correctAnswer: "a"
    },
    {
      question: "Quelle est cette association ? <img src='images/classes/generalisation.png' class'image main'>",
      answers: {
        a: "Une aggregation",
        b: "Une composition",
        c: "Une g??n??ralisation",
      },
      correctAnswer: "c"
    },
    {
      question: "Combien d'Ordinateur(s) peut poss??der une Personne ? <img src='images/classes/possede.png' class'image main'>",
      answers: {
        a: "1",
        b: "*",
      },
      correctAnswer: "b"
    },
    {
      question: "?? combien de Personne(s) peut appartenir un Ordinateur ? <img src='images/classes/possede.png' class'image main'>",
      answers: {
        a: "1",
        b: "*",
      },
      correctAnswer: "a"
    },
    {
      question: "Parmi les repr??sentations d'attributs ci-dessous, laquelle est correcte ?",
      answers: {
        a: "+ String : attribut1",
        b: "- attribut2()",
        c: "- attribut3(String)",
        d: "+ attribut4 : String"
      },
      correctAnswer: "d"
    },
    {
      question: "Quelle est cette association ? <img src='images/classes/agreg.png' class'image main'>",
      answers: {
        a: "Une aggregation",
        b: "Une composition",
        c: "Une g??n??ralisation",
      },
      correctAnswer: "a"
    },
    {
      question: "Quelle est cette association ? <img src='images/classes/compo.png' class'image main'>",
      answers: {
        a: "Une aggregation",
        b: "Une composition",
        c: "Une g??n??ralisation",
      },
      correctAnswer: "b"
    }
  ];

  // display quiz right away
  buildQuizCLASSE();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
