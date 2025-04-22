/* To do 
1- save score to local storage
2- choose level from select box
3- words for each level
4- press enter to submit
5- 3 upcoming words only and in order
6- add sounds for win and lose
*/

//array of words
const words = [
  "jump",
  "fast",
  "blue",
  "code",
  "type",
  "game",
  "quiz",
  "road",
  "frog",
  "lamp",
  "keyboard",
  "monitor",
  "browser",
  "window",
  "button",
  "capture",
  "picture",
  "playing",
  "scroll",
  "loading",
  "awkward",
  "rhythm",
  "zombie",
  "jazzman",
  "subtle",
  "pythonic",
  "glimpse",
  "vortex",
  "phantom",
  "whisper",
];

//setting levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

//default level
let defaultLevelName = "Hard"; //change level from here
let defaultLevelSeconds = lvls[defaultLevelName];

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

//setting level name + seconds + score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

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
  timeLeftSpan.innerHTML = defaultLevelSeconds;
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
