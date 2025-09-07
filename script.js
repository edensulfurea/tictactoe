let board= [null,null,null,null,null,null,null,null,null];
let currentPlayer= "X";
let gameOver= false;
let winner= null;
let winningLine = null;

const statusEl = document.getElementById("status");
const boardEl = document.getElementById("board");
const cells = Array.from(boardEl.querySelectorAll(".cell"));
const restartBtn = document.getElementById("restart");



function render(){
    cells.forEach((cell)=>{
        const idx= Number(cell.dataset.index);
        const val= board[idx];

        cell.textContent = val? val: "";
        cell.classList.remove("win");

           if (Array.isArray(winningLine) && winningLine.includes(idx)) {
      cell.classList.add("win");
    }
  });

        if(gameOver){
            statusEl.textContent = winner? `Ha vinto ${winner}!` : 'Pareggio!';
        }else{
            statusEl.textContent = `Tocca a ${currentPlayer}`;
        }

    }
    render();


cells.forEach((cell)=>{
    cell.addEventListener('click', ()=>{
        const idx= Number(cell.dataset.index);
        console.log("Hai cliccato la cella:", idx);
    });
});



