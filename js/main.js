/*----- constants -----*/
const playerPoints = {
    '1': 0
}

const cpuPoints = {
    '-1': 0
}

const IDENTIFIERS = {
    '0': '',
    '1': 'X',
    '-1': 'O'
};

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

/*----- state variables -----*/
let turn;
let board;
let winner;

/*----- cached elements  -----*/
const turnMessage = () => {
    return `${IDENTIFIERS[turn]}'s Turn`
}

const tieMessage = () => {
    return `It's a TIE! Break the deadlock!`
}

const winMessage = () => {
    return `${IDENTIFIERS[winner]} Wins!`
}

const displayScore = document.querySelector('#display-scores');
const messageEl = document.querySelector('h2');
const playAgainBtn = document.querySelector('button');
const boardEl = [...document.querySelectorAll('#board > div')];
const playerScores = () => {
    return `Player X: ${playerPoints['1']}<br>Player O: ${cpuPoints['-1']}`;
};
displayScore.innerHTML = playerScores();

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
    checkWinner();
    render();
}

function checkWinner() {
    for (let i = 0; i < winCombinations.length; i++) {
        let sum = 0;
        for (let j = 0; j < winCombinations[i].length; j++) {
            sum += board[winCombinations[i][j] % 3][Math.floor(winCombinations[i][j] / 3)];
        }
        if (sum === 3) {
            winner = 1;
            playerPoints['1']++;
            return;
        } else if (sum === -3) {
            winner = -1;
            cpuPoints['-1']++;
            return;
        }
    }
    if (board[0][0] !== 0 && board[0][1] !== 0 && board[0][2] !== 0 && board[1][0] !== 0 && board[1][1] !== 0 && board[1][2] !== 0 && board[2][0] !== 0 && board[2][1] !== 0 && board[2][2] !== 0) {
        winner = 'T';
    }
}

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
        messageEl.innerHTML = tieMessage();
    } else if (winner) {
        messageEl.innerHTML = winMessage();
        if (winner === '1') {
            // playerPoints['1']++;
            displayScore.innerHTML = playerScores();
        } else {
            // playerPoints['-1']++;
            displayScore.innerHTML = playerScores();
        }
    } else {
        messageEl.innerHTML = turnMessage();
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

function bestOfFive() {
    if (playerPoints['1'] === 3) {
        messageEl.innerHTML = `Player X Wins the Series ${playerPoints['1']} - ${cpuPoints['-1']}!`;
        playerPoints['1'] = 0;
        cpuPoints['-1'] = 0;
        displayScore.innerHTML = playerScores();
    } else if (cpuPoints['-1'] === 3) {
        messageEl.innerHTML = `Player O Wins the Series ${cpuPoints['-1']} - ${playerPoints['1']}!`;
        playerPoints['1'] = 0;
        cpuPoints['-1'] = 0;
        displayScore.innerHTML = playerScores();
    }
    restartGame();
    render();
}

function restartGame() {
    window.location.reload();
};
