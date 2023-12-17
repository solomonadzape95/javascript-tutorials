'use strict';

let message = document.getElementById('message');
let secretNumber = Math.trunc(Math.random() * 20) + 1;
const checkBtn = document.getElementById('check');
const againBtn = document.getElementById('again');
let guesses;
let score = document.getElementById('score');

let highscore = document.getElementById('highscore');
let scoreVal = 0;
highscore.textContent = scoreVal;
guesses = 20;
score.textContent = guesses;
// document.querySelector(".number").textContent = '?';
checkBtn.addEventListener('click', () => {
  const guess = parseInt(document.getElementById('guess').value);
  if (guesses === 0) {
    message.textContent = '🏁 You Have No More Guesses!';
  } else {
    if (!guess) {
      message.textContent = '⛔ No Number!';
    } else if (guess === secretNumber) {
      message.textContent = '🎉 Correct Number!';
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('input').style.backgroundColor = '#60b347';
      score.textContent = guesses;
      guesses >= highscore.textContent
        ? (highscore.textContent = guesses)
        : (highscore.textContent = highscore.textContent);
    } else if (guess !== secretNumber) {
      message.textContent =
        guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';
      document.querySelector('body').style.backgroundColor = 'black';
      document.querySelector('input').style.backgroundColor = 'black';
      guesses -= 1;
      score.textContent = guesses;
    }
  }
});

againBtn.addEventListener('click', () => {
  guesses = 20;
  score.textContent = guesses;
  // highscore.textContent = scoreVal;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  // document.querySelector(".number").textContent = secretNumber;
  message.textContent = 'Start Guessing ...';
  document.getElementById('guess').value = '';
  document.querySelector('body').style.backgroundColor = 'black';
  document.querySelector('input').style.backgroundColor = 'black';
});
