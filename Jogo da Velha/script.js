let board, currentPlayer, gameActive;

function startGame() {
    board = Array(9).fill(null);
    currentPlayer = document.getElementById("symbol").value;
    gameActive = true;
    document.getElementById("status").innerText ="";
    document.querySelectorAll('td').forEach(td=>td.innerText);
}

function makeMove(index) {
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    document.querySelectorAll('td')[index].innerText = currentPlayer;

    if (checkWinner()) {
        document.getElementById("status").innerText;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X';
    }
}

function checkWinner() {
    const winningCombinations = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}