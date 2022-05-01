"use strict";

// Selecting the elements

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");

const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// starting condition
score0El.textContent = Number(0);
score1El.textContent = Number(0);
diceEl.classList.add("hidden");

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// switch player

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling functionality

btnRoll.addEventListener("click", () => {
  if (playing) {
    // generate a random dice roll

    let rng = Math.floor(Math.random() * 6 + 1);

    // display dice

    diceEl.classList.remove("hidden");
    diceEl.setAttribute("src", `./images/dice-${rng}.png`);

    // check for rolled 1: if true then switch to other player

    if (rng !== 1) {
      //   add number to current score
      currentScore += rng;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   switch player
      switchPlayer();
    }
  }
});

//  hold functionality

btnHold.addEventListener("click", () => {
  if (playing) {
    console.log("working");
    // add current score to active player's score
    score[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    // check if score is >=100
    if (score[activePlayer] >= 100) {
      playing = false;
      // finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEl.classList.add("hidden");
    } else {
      //  else switch player
      switchPlayer();
    }
  }
});
