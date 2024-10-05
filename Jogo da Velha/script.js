const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
const playerChoiceDiv = document.getElementById('playerChoice');
const chooseXButton = document.getElementById('chooseX');
const chooseOButton = document.getElementById('chooseO');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const scoreBoard = document.getElementById('scoreBoard');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);
let scoreX = 0;
let scoreO = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

// Função para definir o símbolo inicial do jogador
chooseXButton.addEventListener('click', () => startGame('X'));
chooseOButton.addEventListener('click', () => startGame('O'));

// Função para iniciar o jogo com o símbolo escolhido
function startGame(player) {
    currentPlayer = player;
    playerChoiceDiv.classList.add('hidden');
    board.classList.remove('hidden');
    scoreBoard.classList.remove('hidden');
    statusMessage.textContent = `É a vez de ${currentPlayer}`;
}

// Função para reiniciar o jogo
restartButton.addEventListener('click', resetGame);

function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    gameActive = true;
    restartButton.classList.add('hidden');
    statusMessage.textContent = `É a vez de ${currentPlayer}`;
}

// Função para verificar vitória ou empate
function checkWin() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusMessage.textContent = `${currentPlayer} venceu!`;
        updateScore();
        gameActive = false;
        restartButton.classList.remove('hidden');
        return;
    }

    if (!boardState.includes(null)) {
        statusMessage.textContent = 'Empate!';
        gameActive = false;
        restartButton.classList.remove('hidden');
    }
}

// Função para atualizar o placar
function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }
}

// Função para tratar clique nas células
cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = Array.from(cells).indexOf(e.target);
        if (boardState[index] || !gameActive) return;

        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        checkWin();

        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusMessage.textContent = `É a vez de ${currentPlayer}`;
        }
    });
});
