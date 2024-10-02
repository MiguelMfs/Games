// Configurações do jogo
const numRows = 10;
const numCols = 10;
const numMines = 7; // Defina o número de minas
let mines = [];
let revealedCount = 0;
let wins = 0;
let losses = 0;

// Inicializando o jogo ao carregar a página
const gameBoard = document.getElementById('game');
const winsElement = document.getElementById('wins');
const lossesElement = document.getElementById('losses');

// Função para criar o tabuleiro de jogo
function createBoard() {
    gameBoard.innerHTML = '';
    revealedCount = 0;
    mines = placeMines();
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = row;
            square.dataset.col = col;
            square.addEventListener('click', handleClick);
            square.addEventListener('contextmenu', handleRightClick);
            gameBoard.appendChild(square);
        }
    }
}

// Função para posicionar minas aleatoriamente no tabuleiro
function placeMines() {
    let minePositions = [];
    while (minePositions.length < numMines) {
        const row = Math.floor(Math.random() * numRows);
        const col = Math.floor(Math.random() * numCols);
        const pos = `${row},${col}`;
        if (!minePositions.includes(pos)) {
            minePositions.push(pos);
        }
    }
    return minePositions;
}

// Função de tratamento ao clicar em um quadrado
function handleClick(e) {
    const square = e.target;
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);

    // Verifica se a célula é uma mina
    if (mines.includes(`${row},${col}`)) {
        square.classList.add('mine');
        losses++;
        lossesElement.textContent = losses;
        alert('Você perdeu! Reiniciando...');
        createBoard();
    } else {
        revealSquare(square, row, col);
        if (revealedCount === numRows * numCols - numMines) {
            wins++;
            winsElement.textContent = wins;
            alert('Você venceu! Reiniciando...');
            createBoard();
        }
    }
}

// Função para revelar um quadrado seguro e mostrar minas ao redor
function revealSquare(square, row, col) {
    if (!square.classList.contains('revealed') && !square.classList.contains('flagged')) {
        const minesAround = countMinesAround(row, col);
        square.classList.add('revealed');
        revealedCount++;

        // Define a cor de fundo com base no número de minas ao redor
        if (minesAround > 0) {
            square.textContent = minesAround;
            if (minesAround === 1) {
                square.style.backgroundColor = 'green'; // Uma mina ao redor
            } else if (minesAround === 2) {
                square.style.backgroundColor = 'yellow'; // Duas minas ao redor
            } else {
                square.style.backgroundColor = 'red'; // Três ou mais minas ao redor
            }
        } else {
            square.style.backgroundColor = '#fff'; // Sem minas ao redor
            // Se não houver minas ao redor, revela os vizinhos automaticamente
            revealAdjacentSquares(row, col);
        }
    }
}

// Função para contar o número de minas ao redor de um quadrado
function countMinesAround(row, col) {
    let mineCount = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                if (mines.includes(`${newRow},${newCol}`)) {
                    mineCount++;
                }
            }
        }
    }

    return mineCount;
}

// Função para revelar os quadrados adjacentes quando não há minas ao redor
function revealAdjacentSquares(row, col) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                const adjacentSquare = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
                if (!adjacentSquare.classList.contains('revealed')) {
                    revealSquare(adjacentSquare, newRow, newCol);
                }
            }
        }
    }
}

// Função para lidar com clique direito (marcar/desmarcar mina)
function handleRightClick(e) {
    e.preventDefault();
    const square = e.target;
    if (square.classList.contains('flagged')) {
        square.classList.remove('flagged');
    } else if (!square.classList.contains('revealed')) {
        square.classList.add('flagged');
    }
}

// Inicializa o tabuleiro
createBoard();
