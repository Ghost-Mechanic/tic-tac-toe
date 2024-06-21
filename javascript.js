// this function prints out the board in the console
function printBoard(gameBoard) {
    console.log(`${gameBoard[0]}|${gameBoard[1]}|${gameBoard[2]}`);
    console.log(`${gameBoard[3]}|${gameBoard[4]}|${gameBoard[5]}`);
    console.log(`${gameBoard[6]}|${gameBoard[7]}|${gameBoard[8]}`);
}

// this IIFE creates a gameboard with the functions of creating a new board,
// accessing the current board, making a play, and checking if there is a win or a tie
const gameBoard = (function () {
    let board = [];

    const createBoard = () => {
        board = [
            "-", "-", "-",
            "-", "-", "-",
            "-", "-", "-"
        ];
    }

    const getBoard = () => board;

    const makePlay = (index, player) => {
        board[index] = player;
    }

    // check all 8 combinations to win tic tac toe, return true for a win
    const checkWin = () => 
        board[0] != "-" && board[0] == board[1] && board[1] == board[2] ||
        board[0] != "-" && board[0] == board[3] && board[3] == board[6] ||
        board[0] != "-" && board[0] == board[4] && board[4] == board[8] ||
        board[1] != "-" && board[1] == board[4] && board[4] == board[7] ||
        board[2] != "-" && board[2] == board[5] && board[5] == board[8] ||
        board[3] != "-" && board[3] == board[4] && board[4] == board[5] ||
        board[6] != "-" && board[6] == board[7] && board[7] == board[8] ||
        board[6] != "-" && board[6] == board[4] && board[4] == board[2];
    
    // check if there is a tie by checking if the board is full
    const checkTie = () => {
        for (let i = 0; i < board.length; ++i) {
            if (board[i] != "O" || board[i] != "X") {
                return false;
            }  
        }

        return true;
    }

    return {createBoard, getBoard, makePlay, checkWin, checkTie};
})();

// this factory function creates a player object given their name and piece
function createPlayer(name, piece) {
    return {name, piece};
}

const X = createPlayer("Player 1", "X");
const O = createPlayer("Player 2", "O");

gameBoard.createBoard();

// decide starting player at random
let currPlayer = Math.floor(Math.random() * 2);

console.log(currPlayer);

let userChoice = 0;

// this while loop plays the game, and runs as long as the game has not been won
while (!gameBoard.checkWin() && !gameBoard.checkTie()) {
    // alternate players with an if statement 
    if (currPlayer % 2 == 0) {
        console.log("It is X's turn");
    }
    else {
        console.log("It is O's turn");
    }

    if (currPlayer % 2 == 0) {
        gameBoard.makePlay(userChoice, X.piece);
    }
    else {
        gameBoard.makePlay(userChoice, O.piece); 
    }

    printBoard(gameBoard.getBoard());

    if (gameBoard.checkWin()) {
        if (currPlayer % 2 == 0) {
            console.log(`${X.name} has won!`);
            break;
        }
        else {
            console.log(`${O.name} has won!`);
            break;
        }
    }
    else if (gameBoard.checkTie()) {
        console.log("It was a tie!");
        break;
    }

    // increment currPlayer to alternate between players
    ++currPlayer;

    // increment user choice for testing, player 2 always wins
    ++userChoice;
}



