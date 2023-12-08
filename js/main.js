/*----- constants -----*/
const IDENTIFIERS = {
    '0': '',
    '1': 'X',
    '-1': 'O'
};

/*----- state variables -----*/
let turn;
let board;
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const boardEl = [...document.querySelectorAll('#board > div')];


/*----- event listeners -----*/
document.querySelector('#board').addEventListener('click', handleDrop);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
    turn = 1;
    board = [
        [0, 0, 0], // col 0
        [0, 0, 0], // col 1
        [0, 0, 0]  // col 2
    ];
    winner = null;
    render();
}

function handleDrop(evt) {
    const cellId = evt.target.id;
    const [colIdx, rowIdx] = cellId.substring(1).split('r').map(Number);
    
    if (board[colIdx][rowIdx] !== 0 || winner) {
        return;
    }
    
    board[colIdx][rowIdx] = turn;
    turn *= -1;
    render();
}

//check for winner 


function render() {
    renderBoard();
    renderMessage();
    renderControls();
}

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(rowVal, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.innerHTML = IDENTIFIERS[rowVal];
        });
    })
}

function renderMessage() {
    if (winner === 'T') {
        messageEl.innerHTML = "It's a TIE!!";

    } else if (winner) {
        messageEl.innerHTML = `${IDENTIFIERS[winner].toUpperCase()} Wins!`;
    } else {
        messageEl.innerHTML = `${IDENTIFIERS[turn].toUpperCase()}'s Turn`;
    }
}

function renderControls() {
    // hide the play again button until the game is over
    playAgainBtn.style.display = winner ? 'block' : 'none';
    
    // disable the board until the game is over
    boardEl.forEach(function(cellEl) {
        cellEl.style.pointerEvents = winner ? 'none' : 'auto';
    })  

}

    



