/* To do 
1- save score to local storage
2- choose level from select box
3- words for each level
4- press enter to submit
5- 3 upcoming words only and in order
6- add sounds for win and lose
*/

//array of words
const easyWords = [
  "cat",
  "dog",
  "sun",
  "run",
  "big",
  "red",
  "fun",
  "hat",
  "pen",
  "cup",
  "leg",
  "box",
  "toy",
  "key",
  "map",
  "zoo",
  "jam",
  "fox",
  "egg",
  "ant",
];
const normalWords = [
  "apple",
  "happy",
  "water",
  "house",
  "music",
  "table",
  "phone",
  "light",
  "paper",
  "plant",
  "smile",
  "clock",
  "bread",
  "river",
  "chair",
  "cloud",
  "grass",
  "pizza",
  "tiger",
  "watch",
];
const hardWords = [
  "xylophone",
  "algorithm",
  "quicksand",
  "phenomenon",
  "entrepreneur",
  "bureaucracy",
  "photosynthesis",
  "juxtaposition",
  "schizophrenia",
  "questionnaire",
  "cryptocurrency",
  "extraterrestrial",
  "incomprehensible",
  "metamorphosis",
  "procrastinate",
  "rendezvous",
  "silhouette",
  "treacherous",
  "ventilation",
  "whimsical",
];

// Game settings
const lvls = {
  Easy: 2,
  Normal: 3,
  Hard: 4,
};

const wordsByLevel = {
  Easy: [...easyWords],
  Normal: [...normalWords],
  Hard: [...hardWords],
};

//catch selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let selectDifficulty = document.getElementById("selectDifficulty");

// Current words array that will change based on selection
let words = [...wordsByLevel.Easy]; // Start with easy words

// When difficulty changes
selectDifficulty.addEventListener("change", function () {
  currentLevelName = this.value;
  currentLevelSeconds = lvls[currentLevelName];

  // Update the words array based on selection
  words = [...wordsByLevel[currentLevelName]];

  // Update displays
  lvlNameSpan.innerHTML = currentLevelName;
  secondsSpan.innerHTML = currentLevelSeconds;
  timeLeftSpan.innerHTML = currentLevelSeconds;

  // Reset game state
  finishMessage.innerHTML = "";
  input.value = "";
  scoreGot.innerHTML = "0";
  scoreTotal.innerHTML = words.length;
});

//disable paste
input.onpaste = function () {
  return false;
};

//start game
startButton.onclick = function () {
  //   this.remove();
  input.focus();
  //generate word function
  genWords();
};

function genWords() {
  //get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  //get word index
  let wordIndex = words.indexOf(randomWord);
  // remove word from array
  words.splice(wordIndex, 1);
  //show random word
  theWord.innerHTML = randomWord;
  //empty upcoming words
  upcomingWords.innerHTML = "";
  //generate words
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  //call start playing func
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = currentLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      //stop timer
      clearInterval(start);
      //compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        //empty input field
        input.value = "";
        //increase score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          //call gen word function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spantext = document.createTextNode("You win");
          span.appendChild(spantext);
          finishMessage.appendChild(span);
          //remove upcoming words box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
