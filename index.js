const randomNumber = Math.floor(Math.random() * 90 + 10);
document.getElementById("randomNumber").innerHTML = "The number is ...";

const enterEvent = document.getElementById("number-only");

enterEvent.addEventListener("keydown", function (event) {
  //? Checking to see if the pressed key is Enter, key code is 13 for Enter
  if (event.key == "Enter") {
    event.preventDefault();
    checkGuessedNumber();
  }
});

const hint = document.getElementById("hint");
const overlay = document.getElementById("overlay");
const resultMessage = document.getElementById("resultMessage");
const displayNumber = document.getElementById("displayNumber");
const wrongNumbersDisplay = document.getElementById("wrongNumbersDisplay");
const againButton = document.getElementById("againButton");

const wrongGuessedNumbers = [];
let result = "lose";

function checkGuessedNumber() {
  const guessNumber = enterEvent.value;

  enterEvent.addEventListener("input", function () {
    enterEvent.style.borderColor = "#000";
  });

  //* Checking if the guessed number is two-digit number or not
  if (/^[1-9]\d$/.test(guessNumber)) {
    const userGuessedNumber = parseInt(guessNumber, 10);

    if (userGuessedNumber === randomNumber) {
      result = "win";
      endGame();
    } else if (wrongGuessedNumbers.includes(userGuessedNumber)) {
      hint.innerHTML = "The number is already guessed!!";
      userGuess.value = "";
      return;
    } else if (userGuessedNumber > randomNumber) {
      hint.innerHTML = "The number is lower👇";
    } else if (userGuessedNumber < randomNumber) {
      hint.innerHTML = "The number is higher👆";
    }

    wrongGuessedNumbers.push(userGuessedNumber);

    console.log("Wrong Guessed Numbers:", wrongGuessedNumbers);

    wrongNumbersDisplay.innerHTML = wrongGuessedNumbers.join(", ");

    enterEvent.value = "";

    if (wrongGuessedNumbers.length == 8) {
      if (userGuessedNumber === randomNumber) {
        result = "win";
        endGame();
        return;
      }
      endGame();
    }
  } else {
    enterEvent.style.borderColor = "tomato";

    enterEvent.classList.add("shake");

    hint.innerHTML = "Enter a valid two-digit number!!🙄";

    enterEvent.value = "";

    setTimeout(function () {
      enterEvent.classList.remove("shake");
    }, 200);
  }

  enterEvent.addEventListener("input", function () {
    hint.innerHTML = "";
  });
}

function endGame() {
  overlay.classList.remove("hidden");
  if (result == "win") {
    resultMessage.innerHTML =
      "🎉🎉Congratulations!!!🎉🎉 <br> You've guessed the right number!";
    againButton.innerHTML = "New Game";
  } else {
    resultMessage.innerHTML = "😔Oh no!!!😔 <br> Sorry you lost...";
    againButton.innerHTML = "Try Again";
  }

  document.getElementById("randomNumber").innerHTML =
    "The number is " + randomNumber + ".";

  displayNumber.innerHTML = "The number was " + randomNumber + ".";

  againButton.addEventListener("click", function () {
    window.location.reload();
  });
}

console.log(randomNumber);
