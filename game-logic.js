/*jshint esversion: 6 */
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let count = cards.length;
let firstCard, secondCard;

function flipCard() {
  
  if (lockBoard) { return; }
  if (this === firstCard) { return; }

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  isMatch ? disableCards() : unflipCards(); //jshint ignore: line
}

function disableCards() {
  count -= 2;

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  releaseBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    releaseBoard();
  }, 1000);
}

function releaseBoard() {
  hasFlippedCard =  lockBoard = false;
  firstCard = secondCard = null;

  if (count === 0) {
    setTimeout(() => {
      resetGame();
    }, 2000);
  }
}

function startGame(card) {
  const ramdomPos = Math.floor(Math.random() * cards.length); 
  card.style.order = ramdomPos;
  card.addEventListener('click', flipCard);
}

function resetGame() {
  count = cards.length;
  cards.forEach(card => {
    card.classList.remove('flip');
    startGame(card);
  });
}
 
cards.forEach(card => {
  startGame(card);
});
