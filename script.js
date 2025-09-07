let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;
let winner = null;
let winningLine = null;

const statusEl = document.getElementById("status");
const boardEl = document.getElementById("board");
const cells = Array.from(boardEl.querySelectorAll(".cell"));
const restartBtn = document.getElementById("restart");

const LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function findWinningLine(symbol) {
  for (const [a,b,c] of LINES) {
    if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
      return [a,b,c];
    }
  }
  return null;
}

function render() {
  cells.forEach((cell) => {
    const idx = Number(cell.dataset.index);
    const val = board[idx];
    cell.textContent = val ? val : "";
    cell.classList.remove("win");
    if (Array.isArray(winningLine) && winningLine.includes(idx)) {
      cell.classList.add("win");
    }
  });

  if (gameOver) {
    statusEl.textContent = winner ? `Ha vinto ${winner}!` : "Pareggio!";
  } else {
    statusEl.textContent = `Tocca a ${currentPlayer}`;
  }
}

function handleMove(index) {
  if (gameOver) return;
  if (board[index] !== null) return;

  board[index] = currentPlayer;

  const line = findWinningLine(currentPlayer);
  if (line) {
    gameOver = true;
    winner = currentPlayer;
    winningLine = line;
    return render();
  }

  const isDraw = board.every(cell => cell !== null);
  if (isDraw) {
    gameOver = true;
    winner = null;
    winningLine = null;
    return render();
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  render();
}

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const idx = Number(e.currentTarget.dataset.index);
    handleMove(idx);
  });
});

restartBtn.addEventListener("click", () => {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  winner = null;
  winningLine = null;
  render();
});

render();
