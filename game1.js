const emojis = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍒', '🥝', '🍑'];
const cards = [...emojis, ...emojis]; // Duplicate for pairs
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  const shuffled = shuffle(cards);

  shuffled.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.textContent = '';
    card.addEventListener('click', handleFlip);
    gameBoard.appendChild(card);
  });
}

function handleFlip() {
  if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.textContent = this.dataset.symbol;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;
    if (matchedPairs === emojis.length) {
      document.getElementById('message').textContent = '🎉 You won! Great memory!';
    }
    resetFlip();
  } else {
    setTimeout(() => {
      firstCard.textContent = '';
      secondCard.textContent = '';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetFlip();
    }, 1000);
  }
}

function resetFlip() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();
