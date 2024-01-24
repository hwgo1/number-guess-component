const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumbersRef = document.getElementById("guessed-nums");
const restartBtn = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkBtn = document.getElementById("check-btn");

let answer, noOfGuesses, guessedNumbersArr;
const maxAttempts = 5;

const play = () => {
  const userGuess = guessInput.value;
  if (userGuess < 0 || userGuess > 100 || isNaN(userGuess) || userGuess == 0) {
    hint.classList.add("error");
    hint.innerHTML = "Digite um número válido!";
    return;
  }

  guessedNumbersArr.push(userGuess);
  noOfGuesses += 1;
  if (userGuess != answer) {
    if (userGuess < answer) {
      hint.innerHTML = "Muito baixo. Chute um número maior!";
    } else {
      hint.innerHTML = "Muito Alto! Chute um número menor.";
    }
    noOfGuessesRef.innerHTML = `<span>Número de tentativas: </span>${noOfGuesses}`;
    guessedNumbersRef.innerHTML = `<span>Números chutados: </span>${guessedNumbersArr.join(
      ", "
    )}`;
    hint.classList.remove("error");
    setTimeout(() => {
      hint.classList.add("error");
    }, 10);

    if (noOfGuesses >= maxAttempts) {
      hint.innerHTML = `Você perdeu :(<br>O número correto era: <span>${answer}</span><br>Boa sorte na próxima tentativa!`;
      hint.classList.add("error");
      game.style.display = "none";
      restartBtn.style.display = "block";
    } else {
    }
  } else {
    hint.innerHTML = `Parabéns! Você acertou!<br>O número era: <span>${answer}</span><br>Você acertou em <span>${noOfGuesses}</span> tentativa(s)`;
    hint.classList.add("success");
    game.style.display = "none";
    restartBtn.style.display = "block";
    
  }
};

const init = () => {
  answer = Math.floor(Math.random() * 100) + 1;
  console.log(answer);
  noOfGuesses = 0;
  guessedNumbersArr = [];
  noOfGuessesRef.innerHTML = "Número de tentativas: 0";
  guessedNumbersRef.innerHTML = "Números chutados: N/A";
  guessInput.value = "";
  hint.classList.remove("success", "error");
};

guessInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    play();
  }
});

restartBtn.addEventListener("click", () => {
  game.style.display = "grid";
  restartBtn.style.display = "none";
  hint.innerHTML = "";
  hint.classList.remove("success");
  init();
});

window.addEventListener("load", init);

checkBtn.addEventListener("click", play);
