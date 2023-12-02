/*----- constants -----*/
const IDENTIFIERS = {
    '0': 'white',
    'X': 'X',
    'O': 'O'
};

/*----- state variables -----*/
let turn;
let board;
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector('#message');
const cells = document.querySelectorAll('.cell');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleClick);

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

function handleClick(evt) {
    const cell = evt.target;
    const col = cell.parentNode.cellIndex;
    const row = cell.parentNode.parentNode.rowIndex - 1;
    if (board[row][col] || winner) {
        return
    };
    board[row][col] = turn;
    turn *= -1;
    checkForWin();
    render();
}
