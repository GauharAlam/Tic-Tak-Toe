let turn = "O";
let total_turn = 0;

const winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let tictactoe = new Array(9).fill("E");

function checkWinner() {
    for (let [index0, index1, index2] of winner) {
        if (
            tictactoe[index0] !== "E" &&
            tictactoe[index0] === tictactoe[index1] &&
            tictactoe[index1] === tictactoe[index2]
        ) {
            return 1;
        }
    }
    return 0;
}

function updatePlayerTurn() {
    const player1Img = document.querySelector(".player1");
    const player2Img = document.querySelector(".player2");

    if (turn === "O") {
        player1Img.classList.add("active");
        player2Img.classList.remove("active");
    } else {
        player2Img.classList.add("active");
        player1Img.classList.remove("active");
    }
}

const boardLogic = function (event) {
    if (tictactoe[event.target.id] === "E") {
        total_turn++;

        if (turn === "O") {
            event.target.innerHTML = "O";
            tictactoe[event.target.id] = "O";
            if (checkWinner()) {
                document.getElementById("winningMessage").innerHTML = "Winner is Player1";
                board.removeEventListener("click", boardLogic);
                return;
            }
            turn = "X";
        } else {
            event.target.innerHTML = "X";
            tictactoe[event.target.id] = "X";
            if (checkWinner()) {
                document.getElementById("winningMessage").innerHTML = "Winner is Player2";
                board.removeEventListener("click", boardLogic);
                return;
            }
            turn = "O";
        }
        updatePlayerTurn();
    }

    if (total_turn === 9) {
        document.getElementById("winningMessage").innerHTML = "Match is Draw";
    }
};

const board = document.querySelector(".board");

const restart = document.getElementById("restartButton");

restart.addEventListener("click", () => {
    turn = "O";
    const cell = document.getElementsByClassName("cell");
    Array.from(cell).forEach((element) => {
        element.innerHTML = "";
    });

    document.getElementById("winningMessage").innerHTML = "";
    total_turn = 0;

    tictactoe = new Array(9).fill("E");
    board.addEventListener("click", boardLogic);

    // Reset the player images
    document.querySelector(".player1").classList.add("active");
    document.querySelector(".player2").classList.remove("active");
});

board.addEventListener("click", boardLogic);
updatePlayerTurn();
