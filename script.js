'use strict';
// Selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');

const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  btnRoll.style.cursor = 'pointer';
  btnHold.style.cursor = 'pointer';
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Genereate a random dice roll
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    // console.log(diceNum);

    // 2. Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNum}.png`;

    // 3. Check for rolled 1: if true,
    if (diceNum !== 1) {
      // Add diceNum to current score
      currentScore += diceNum;
      // current0.textContent = currentScore; // CHANGE LATER
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      playing = false;
      dice.classList.add('hidden');
      btnRoll.style.cursor = 'not-allowed';
      btnHold.style.cursor = 'not-allowed';
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
