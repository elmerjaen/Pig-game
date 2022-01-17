'use strict';

//Selecting elements
const body = document.querySelector('body');
const main = document.querySelector('main');
const current = document.querySelector('.current');

// the class for the querySelect always need the dot
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const nameP1 = document.getElementById('name--0');
const nameP2 = document.getElementById('name--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Adding the hidden class to hide the dice
  diceEl.classList.add('hidden');
  nameP1.textContent = 'Player 1';
  nameP2.textContent = 'Player 2';

  main.classList.remove('winner--main');

  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');

  player0El.classList.remove('hidden');
  player1El.classList.remove('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceRoll = Math.floor(Math.random() * (7 - 1) + 1); // generate random dice roll

    // Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      // Add the dice to current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;

      body.classList.add('winner--body');
      main.classList.add('winner--main');
      current.classList.add('winner--current');

      document.getElementById(`name--${activePlayer}`).textContent = `🏆 Player ${activePlayer + 1} Wins 🏆`;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer === 1 ? 0 : 1}`).classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
