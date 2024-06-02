
let quizzdb = {
  "allgemeine Fragen": [
    { a: "Wie viele Kontinente gibt es auf der Erde?", l: ["7", "5", "6", "8"] },
    { a: "Welches ist das größte Land der Welt?", l: ["Russland", "Kanada", "China", "USA"] },
    { a: "Wer malte die Mona Lisa?", l: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"] },
    { a: "Welches Element hat das chemische Symbol O?", l: ["Sauerstoff", "Gold", "Silber", "Wasserstoff"] },
  ],
  "Mathematik": [
    { a: "3 * 3", l: ["9", "6", "3", "12"] },
    { a: "16 / 4", l: ["4", "3", "2", "5"] },
    { a: "2^3", l: ["8", "6", "4", "9"] },
    { a: "√49", l: ["7", "6", "8", "9"] },
    { a: "7 * 6", l: ["42", "36", "48", "40"] },
    { a: "81 / 9", l: ["9", "8", "7", "10"] },
    { a: "4^2", l: ["16", "8", "12", "20"] },
    { a: "√64", l: ["8", "6", "7", "9"] },
    { a: "24 / 3", l: ["8", "7", "9", "6"] },
    { a: "2^4", l: ["16", "8", "12", "14"] },
    { a: "6 * 5", l: ["30", "25", "35", "40"] },
    { a: "10 / 2", l: ["5", "4", "6", "3"] }
  ],
  "Internettechnologien": [
    { a: "Welche Protokolle sind zuständig für die Übertragung von Webseiten?", l: ["HTTP", "FTP","SMTP","SSH"] },   /*HTTP ist richtig*/ 
    { a: "Wofür wird CSS verwendet?", l: ["Styling von Webseiten", "Erstellung interaktiver Elemente", "Server-seitiges Scripting", "Datenbankverwaltung"] },
    { a: "Welche Rolle hat JavaScript?", l: ["Hinzufügen von Interaktivität zu Webseiten", "Styling von Webseiten", "Datenbankverwaltung", "Server-seitiges Scripting"] },
    { a: "Welche Sprache ist für die Webprogrammierung zuständig?", l: ["Java-Script","R","C#","Java"] },
  ],
  "Noten": [
    { a: "Wie viele Tasten hat ein Standard-Klavier?", l: ["88", "76", "64", "100"] },  /*Antwort: 88*/
    { a: "Was ist ein C-Dur Akkord?", l: ["C-E-G", "A-C-E", "D-F#-A", "F-A-C"] },    /*Antwort: C-E-G*/
    { a: "Was ist eine Umkehrung eines Akkords?", l: ["Eine andere Anordnung der Töne des Akkords", "Die gleiche Anordnung von Tönen in verschiedenen Oktaven", "Ein vollständig neuer Akkord", "Ein Akkord, der nicht in der Tonleiter vorhanden ist"] },  /*Eine andere Anordnung der Töne des Akkords*/
    { a: "Welche Note ist in der dritten Oktave?", l: ["C", "A", "F", "G"] },   /*Antwort:C*/
  ],
};

let startbtn = document.getElementById("startbtn");
let nextbtn = document.getElementById("nextbtn");
let currentQuestionIndex = 0;
let score = 0;
const startdiv = document.getElementById("start");
let qusetionsdiv = document.getElementById("qusetions");
let qusetiontext = document.getElementById("qusetiontext");
let scoreDisplay = document.querySelector(".score");
document.addEventListener("DOMContentLoaded", function () {
  var categoryList = document.getElementById("category");
  var listItems = categoryList.getElementsByTagName("li");
  let starth1 = document.querySelector("#start h1");
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener("click", function () {
      // Remove 'active' class from all list items
      for (var j = 0; j < listItems.length; j++) {
        listItems[j].classList.remove("active");
      }

      // Add 'active' class to the clicked list item
      this.classList.add("active");
      starth1.innerHTML = this.innerHTML;
      startbtn.style.display = "block";
      qusetionsdiv.style.display = "none";
      if (this.innerHTML === "Externel Aufgabe laden") {
        loadExternalQuestions();
      }
    });
  }
});

startbtn.addEventListener("click", startquizz);
nextbtn.addEventListener("click", nextQuestion);

function startquizz() {
  qusetionsdiv.style.display = "block";
  startdiv.style.display = "none";
  loadQuestions();
  showQuestion(currentQuestionIndex);
}

function loadQuestions() {
  let categoryQuestions = quizzdb[document.querySelector("#start h1").innerHTML];
  quizzdb[document.querySelector("#start h1").innerHTML] = shuffle(categoryQuestions);
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function showQuestion(index) {
  const currentQuestion = quizzdb[document.querySelector("#start h1").innerHTML][index];
  document.getElementById("qusetiontext").innerHTML = currentQuestion.a;
  let seq = index + 1 ;
  document.getElementById("legend").innerHTML = "Frage " + seq;
  let prog = (index / quizzdb[document.querySelector("#start h1").innerHTML].length) * 100;
  document.getElementById("progress").style.width = prog  + "%";
  document.getElementById("progress").innerHTML = Math.round(prog) + "%";

  let optionsList = document.getElementById('options');
  optionsList.innerHTML = '';

  for (let i = 0; i < currentQuestion.l.length; i++) {
    let option = document.createElement('li');
    option.innerHTML = '<input type="radio" name="answer" value="' + currentQuestion.l[i] + '">' + currentQuestion.l[i];
    optionsList.appendChild(option);
  }
}



function nextQuestion() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  
  if (selectedAnswer) {
    // Check the selected answer and update the score if necessary
    let userAnswer = selectedAnswer.value;
    let currentQuestion = quizzdb[document.querySelector("#start h1").innerHTML][currentQuestionIndex];
    let correctAnswer = currentQuestion.l[0]; // Assuming the correct answer is always the first one

    if (userAnswer === correctAnswer) {
      score++;
    }
    scoreDisplay.textContent = "erreichte Punkte: " + score + " von " + quizzdb[document.querySelector("#start h1").innerHTML].length;

    // Move to the next question
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < quizzdb[document.querySelector("#start h1").innerHTML].length) {
      showQuestion(currentQuestionIndex);
    } else {
      // Display the final score or a completion message
      qusetiontext.innerHTML = 'Quiz Completed!';
      document.getElementById("progress").style.width =  "100%";
      document.getElementById("progress").innerHTML =  "100%";

      scoreDisplay.textContent = "Score: " + score + " out of " + quizzdb[document.querySelector("#start h1").innerHTML].length;

      document.getElementById('options').innerHTML = '';
      nextbtn.style.display = 'none';
    }
  } else {
    alert('Übung macht den Meister, bitte geben Sie eine Antwort, bevor Sie auf die Nächste Frage gehen.');
  }
}


