// selectors
const message = document.querySelector(".message");
const playText = document.querySelector("textarea");
const button = document.querySelector(".btn");
const typeThis = document.querySelector("h5");

//  words for challenge
const wording = [
  "Do you like Javascript as much as i do?",
  "This is a simple game you can Play",
  "i Love Programming",
  "i can create what ever i want",
];
// listen to start button
button.addEventListener("click", starting);

// place holders for store Time
let startTime, endTime;

// start
function starting() {
  if (this.innerText == "Start") {
    // enable text area
    playText.disabled = false;
    // focus on text area
    playText.focus();
    // run the  start logic
    playGame();
  } else if (this.innerText == "Done") {
    // disable text area
    playText.disabled = true;
    // change button text to Start
    button.innerText = "Start";
    // run the end  logic
    endPlay();
  }
}

// starting logic
function playGame() {
  // chose a random word
  const random = Math.floor(Math.random() * wording.length);
  // show message
  message.innerText = `${wording[random]}`;
  // store time after player hit start button
  let date = new Date();
  startTime = date.getTime();
  // change button text to done
  button.innerText = "Done";
  // update type this text
  typeThis.innerText = "Type this:";
}

// ending logic
function endPlay() {
  // store time after player hit Done button
  let date = new Date();
  endTime = date.getTime();
  // total time
  let totalTime = (endTime - startTime) / 1000;
  // player words
  let string = playText.value;
  // count player words
  let wordCount = wordCounter(string);
  // count typing speed per minutes
  let speed = Math.round((wordCount / totalTime) * 60);
  // show the player the speed
  let finalMessage = `
  ${compare(message.innerText,string)}
  Your Type Speed is  ${speed} Words Per Minutes.
  `;

  if (string !== message.innerText) {
    // show the error
    finalMessage = `
    ${compare(message.innerText,string)}
  Error, Type all words`;
  }
  // remove type this
  typeThis.innerText = " ";
  // show the message
  message.innerText = finalMessage;
}

// words counter
function wordCounter(stringWords) {
  // count words by space
  let response = stringWords.split(" ").length;
  return response;
}

// compare words
function compare(str1, str2) {
  let words1 = str1.split(" ");
  let words2 = str2.split(" ");
  let count = 0;
  words1.forEach((item, index) => {
    if (item == words2[index]) {
      count++;
    }
  });

  return `
  You Typed ${count} of ${words1.length} words
  `
}
