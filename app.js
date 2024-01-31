// DOM elements
const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumbersRef = document.getElementById("guessed-nums");
const restartBtn = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkBtn = document.getElementById("check-btn");

// Game variables
let answer, noOfGuesses, guessedNumbersArr;
const maxAttempts = 5;

// Function to handle the game logic
const play = () => {
  // Get user input
  const userGuess = guessInput.value;

  // Validate user input
  if (userGuess < 0 || userGuess > 100 || isNaN(userGuess) || userGuess == 0) {
    hint.classList.add("error");
    hint.innerHTML = "Digite um número válido!";
    return;
  }

  // Check if the user has already guessed the number
  if (guessedNumbersArr.includes(userGuess)) {
    hint.classList.add("error");
    hint.innerHTML = "Você já digitou esse número!";
    return;
  }

  // Record the user's guess
  guessedNumbersArr.push(userGuess);
  noOfGuesses += 1;

  // Check if the guess is correct
  if (userGuess != answer) {
    // Provide hints based on the comparison
    if (userGuess < answer) {
      hint.innerHTML = "Muito baixo. Chute um número maior!";
    } else {
      hint.innerHTML = "Muito Alto! Chute um número menor.";
    }

    // Update the displayed information
    noOfGuessesRef.innerHTML = `<span>Número de tentativas: </span>${noOfGuesses}`;
    guessedNumbersRef.innerHTML = `<span>Números chutados: </span>${guessedNumbersArr.join(", ")}`;

    // Apply animation to the hint element
    hint.classList.remove("error");
    setTimeout(() => {
      hint.classList.add("error");
    }, 10);

    // Check if the maximum number of attempts is reached
    if (noOfGuesses >= maxAttempts) {
      hint.innerHTML = `Você perdeu :(<br>O número correto era: <span>${answer}</span><br>Boa sorte na próxima tentativa!`;
      hint.classList.add("error");
      game.style.display = "none";
      restartBtn.style.display = "block";
    }
  } else {
    // User guessed correctly
    hint.innerHTML = `Parabéns! Você acertou!<br>O número era: <span>${answer}</span><br>Você acertou em <span>${noOfGuesses}</span> tentativa(s)`;
    hint.classList.add("success");
    game.style.display = "none";
    restartBtn.style.display = "block";
  }
};

// Initialization function
const init = () => {
  // Generate a random answer and initialize variables
  answer = Math.floor(Math.random() * 100) + 1;
  console.log(answer); // Log the answer (for debugging purposes)
  noOfGuesses = 0;
  guessedNumbersArr = [];

  // Reset displayed information
  noOfGuessesRef.innerHTML = "Número de tentativas: 0";
  guessedNumbersRef.innerHTML = "Números chutados: N/A";
  guessInput.value = "";
  hint.classList.remove("success", "error");
};

// Event listeners
guessInput.addEventListener("keydown", (event) => {
  // Trigger play function on 'Enter' key press
  if (event.keyCode === 13) {
    event.preventDefault();
    play();
  }
});

restartBtn.addEventListener("click", () => {
  // Show game, hide restart button, reset hint, and initialize the game
  game.style.display = "grid";
  restartBtn.style.display = "none";
  hint.innerHTML = "";
  hint.classList.remove("success");
  init();
});

window.addEventListener("load", init); // Initialize the game on page load

checkBtn.addEventListener("click", play); // Trigger play function on button click
