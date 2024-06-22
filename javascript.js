// this function prints out the board in the console
function printBoard(gameBoard) {
    console.log(`${gameBoard[0]}|${gameBoard[1]}|${gameBoard[2]}`);
    console.log(`${gameBoard[3]}|${gameBoard[4]}|${gameBoard[5]}`);
    console.log(`${gameBoard[6]}|${gameBoard[7]}|${gameBoard[8]}`);
}

// this factory function creates a player object given their name and piece
function createPlayer(name, piece) {
    return {name, piece};
}

// this function returns an object to handle changes to the DOM
function handleDOM(box, player, gameBoard) {
    const turnDisplay = document.querySelector(".player");
    const endDisplay = document.querySelector(".game-over");

    // change the display above the board telling the player who's turn it is
    const changeTurnDisplay = () => {
        if (turnDisplay.textContent == `${playerOne.name}'s (X)`) {
            turnDisplay.textContent = `${playerTwo.name}'s (O)`;
        }
        else if (turnDisplay.textContent == `${playerTwo.name}'s (O)`) {
            turnDisplay.textContent = `${playerOne.name}'s (X)`;
        }
    }

    const changeBoxPiece = () => {
        box.textContent = player.piece;
    }

    // change ending display based on winning player and conditions,
    // whether or not the game was won or tied
    const gameEnding = () => {
        if (gameBoard.checkWin()) {
            endDisplay.textContent = `${player.name} has won!`;
            disableBoxes();
        }
        else if (gameBoard.checkTie()) {
            endDisplay.textContent = "It's a tie!";
        }
    }

    return {changeTurnDisplay, changeBoxPiece, gameEnding};
}

// this function handles the click of each box in the board, changing the DOM and array
function handleBoxClick(e) {
    const box = e.currentTarget;
    let userChoice = box.dataset.index;

    // make the play with the correct piece based on who's turn it is
    if (currPlayer % 2 == 0) {
        gameBoard.makePlay(userChoice, playerOne.piece);
    }
    else {
        gameBoard.makePlay(userChoice, playerTwo.piece); 
    }

    let DOM;

    // pass in parameters properly depending on current player
    if (currPlayer % 2 == 0) {
        DOM = handleDOM(box, playerOne, gameBoard);
    }
    else {
        DOM = handleDOM(box, playerTwo, gameBoard);
    }

    // call DOM functions to update board
    DOM.changeBoxPiece();
    DOM.gameEnding();
    DOM.changeTurnDisplay();

    // increment currPlayer to alternate between players
    ++currPlayer;

    box.removeEventListener("click", handleBoxClick);
}

// this function disables the box clicks for when the game is over
function disableBoxes() {
    boxes.forEach((box) => {
        box.removeEventListener("click", handleBoxClick);
    });
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
            if (board[i] != "O" && board[i] != "X") {
                return false;
            }  
        }

        return true;
    }

    return {createBoard, getBoard, makePlay, checkWin, checkTie};
})();

function startGame(playerOneName, playerTwoName) {
    playerOne = createPlayer(playerOneName, "X");
    playerTwo = createPlayer(playerTwoName, "O");

    document.querySelector(".turn").style.display = "block";

    const turnDisplay = document.querySelector(".player");
    const boxes = document.querySelectorAll(".box");

    // initialize textContent on the turnDisplay element to player 1
    turnDisplay.textContent = `${playerOneName}'s (X)`;

    // initialize currPlayer to 0, which is player 1
    currPlayer = 0;

    gameBoard.createBoard();

    boxes.forEach((box) => {
        box.addEventListener("click", handleBoxClick);
    });
}

// initialize global variables for player objects and currPlayer tracker
let playerOne;
let playerTwo;
let currPlayer;

document.querySelector(".turn").style.display = "none";

// initialize variables for elements for the player names dialog
const submitNames = document.querySelector("#names-submit");
const namesDialog = document.querySelector(".player-names");

// initialize global variable for the boxes class
const boxes = document.querySelectorAll(".box");

let playerOneNameField = document.querySelector("#player-one");
let playerTwoNameField = document.querySelector("#player-two");

// make dialog form work by submitting with a button to create player names
submitNames.addEventListener("click", (event) => {
    event.preventDefault();

    let playerOneName = playerOneNameField.value;
    let playerTwoName = playerTwoNameField.value;
    namesDialog.close();

    startGame(playerOneName, playerTwoName);
});


