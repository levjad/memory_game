class MemoryGame {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.cards = Array.from(this.container.querySelectorAll('.memory-card'));

    // Konfiguration
    this.FLIP_DURATION = 1000;
    this.RESET_DURATION = 2000;

    // State
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
      this.container.appendChild(this.cards[j]); // Verschiebt das Element im DOM
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
    const isMatch = this.firstCard.dataset.card === this.secondCard.dataset.card;
    isMatch ? this.disableCards() : this.unflipCards();
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
    this.unmatchedCount = this.cards.length;
    this.cards.forEach(card => card.classList.remove('flip'));

    setTimeout(() => {
      this.shuffle();
      this.resetRound();
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MemoryGame('.memory-game');
});