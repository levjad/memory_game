class MemoryGame {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.cards = Array.from(this.container.querySelectorAll('.memory-card'));

    this.FLIP_DURATION = 1000;
    this.RESET_DURATION = 2000;

    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.firstCard = null;
    this.secondCard = null;
    this.unmatchedCount = this.cards.length;

    this.init();
  }

  init() {
    this.shuffle();
    this.container.addEventListener('click', (e) => this.handleCardClick(e));
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      this.container.appendChild(this.cards[j]);
    }
  }

  handleCardClick(e) {
    const card = e.target.closest('.memory-card');

    if (!card || this.lockBoard || card === this.firstCard || card.classList.contains('flip')) {
      return;
    }

    card.classList.add('flip');

    if (!this.hasFlippedCard) {
      this.hasFlippedCard = true;
      this.firstCard = card;
      return;
    }

    this.secondCard = card;
    this.checkForMatch();
  }

  checkForMatch() {
    if (this.firstCard.dataset.card === this.secondCard.dataset.card) {
      this.disableCards();
    } else {
      this.unflipCards();
    }
  }

  disableCards() {
    this.unmatchedCount -= 2;
    this.resetRound();

    if (this.unmatchedCount === 0) {
      setTimeout(() => this.resetGame(), this.RESET_DURATION);
    }
  }

  unflipCards() {
    this.lockBoard = true;

    setTimeout(() => {
      this.firstCard.classList.remove('flip');
      this.secondCard.classList.remove('flip');
      this.resetRound();
    }, this.FLIP_DURATION);
  }

  resetRound() {
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.firstCard = null;
    this.secondCard = null;
  }

  resetGame() {
    this.lockBoard = true;
    this.unmatchedCount = this.cards.length;

    this.cards.forEach(card => card.classList.remove('flip'));

    setTimeout(() => {
      this.shuffle();
      this.resetRound();
    }, this.FLIP_DURATION);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MemoryGame('.memory-board');
});