const newBtn = document.querySelector('.new-game');
const hold = document.querySelector('.hold');
const rollDice = document.querySelector('.roll-dice');
let playerOneTotal = document.querySelector('.total-score-one');
let playerTwoTotal = document.querySelector('.total-score-two');
let playerOneCurrent = document.querySelector('.current-score-one');
let playerTwoCurrent = document.querySelector('.current-score-two');
const dice = document.querySelector('span');
const playerOne = document.querySelector('.player-1');
const playerTwo = document.querySelector('.player-2');
let activePlayer = playerOne;
let dieFace,
  running = false,
  intervalId;
const btns = document.querySelectorAll('.btn');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
});
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
window.addEventListener('keydown', event => {
  if (event.keyCode === 27) closeModal();
});

let winnerAnimation = () => {
  activePlayer.classList.toggle('winner');
};
let endFunc = function () {
  console.log('Okay~!!');

  dice.classList.add('hidden');
  intervalId = setInterval(winnerAnimation, 250);
  running = false;
  //   setTimeout(clearInterval(intervalId), 3000);
};
let holdFunc = () => {
  activePlayer === playerOne && running
    ? (playerOneTotal.textContent =
        Number(playerOneTotal.textContent) +
        Number(playerOneCurrent.textContent))
    : (playerTwoTotal.textContent =
        Number(playerTwoTotal.textContent) +
        Number(playerTwoCurrent.textContent));
  activePlayer === playerOne && running
    ? Number(playerOneTotal.textContent) >= 100
      ? endFunc()
      : changeActivePlayer()
    : Number(playerTwoTotal.textContent) >= 100
    ? endFunc()
    : changeActivePlayer();

  console.log(intervalId, 5);
};
let changeActivePlayer = () => {
  playerOneCurrent.textContent = 0;
  playerTwoCurrent.textContent = 0;
  setTimeout(activePlayer.classList.add('next-player'), 1000);
  activePlayer === playerOne && running
    ? (activePlayer = playerTwo)
    : (activePlayer = playerOne);
  activePlayer.classList.remove('next-player');
  console.log('Active Player Changed!!');
};
let createDice = () => {
  dieFace = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.textContent = dieFace;
};
let sumUp = () => {
  activePlayer === playerOne
    ? (playerOneCurrent.textContent =
        Number(playerOneCurrent.textContent) + dieFace)
    : (playerTwoCurrent.textContent =
        Number(playerTwoCurrent.textContent) + dieFace);
};
let checkDice = () => {
  dieFace === 1 ? changeActivePlayer() : sumUp();
};
let playGame = () => {
  createDice();
  checkDice();
  console.log(activePlayer);
};
rollDice.addEventListener('click', () => {
  running = true;
  playGame();
});
hold.addEventListener('click', () => {
  running ? holdFunc() : null;
});
newBtn.addEventListener('click', () => {
  activePlayer.classList.remove('winner');
  running = false;
  clearInterval(intervalId);
  activePlayer = playerOne;
  activePlayer.classList.remove('next-player');
  playerTwo.classList.add('next-player');
  playerOneCurrent.textContent = 0;
  playerTwoCurrent.textContent = 0;
  playerOneTotal.textContent = 0;
  playerTwoTotal.textContent = 0;
  dice.classList.add('hidden');
});
