const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const newGameButton = document.getElementById('new-game');
const twoPlayerButton = document.getElementById('two-player');
const onePlayerButton = document.getElementById('one-player');

//A játéktábla felállása, alaphelyzete
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

//a lehetséges nyerési kombinációk felállítása
const checkWinner = () => {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  //Két játékos játszik egymás ellen
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      gameStatus.textContent = `${board[a]} játékos nyert!`;
      return;
    }
  }

  // Ha a játék eredménye döntetlen
  if (!board.includes('')) {
    gameOver = true;
    gameStatus.textContent = 'A játék döntetlen.';
  }
};

//A számítógép játszik a játékos ellen
const computerMove = () => {
  const emptyCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
  const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomMove] = 'O';
  cells[randomMove].textContent = 'O';
  cells[randomMove].classList.add('o');
  checkWinner();
  currentPlayer = 'X';
};

const handleCellClick = (event) => {
  if (gameOver) return;

  const index = event.target.dataset.index;
  if (board[index] !== '') return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(currentPlayer.toLowerCase());
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (currentPlayer === 'O' && onePlayerButton.disabled) {
    setTimeout(computerMove, 500);
  }
};

//Új játék indítása
const startNewGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  gameStatus.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
};

newGameButton.addEventListener('click', startNewGame);

twoPlayerButton.addEventListener('click', () => {
  onePlayerButton.disabled = false;
  twoPlayerButton.disabled = true;
  setTimeout(startNewGame, 10);
});

onePlayerButton.addEventListener('click', () => {
  onePlayerButton.disabled = true;
  twoPlayerButton.disabled = false;
  setTimeout(startNewGame, 10);
});

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});