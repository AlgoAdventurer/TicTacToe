const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");

let currentPlayer;
let running = false;
let human;
let ai;
let Player1;
let Player2;

function settings() {
    if (document.querySelector("#x").checked) {
        human = "X";
        //console.log("X");
    } else if (document.querySelector("#o").checked) {
        human = "O";
        //console.log("O");
    }

    if (document.querySelector("#human_human").checked) {
        against = "human_human";
        Player1 = "X";
        Player2 = "O";
        currentPlayer = Player1;
        //console.log("human_human");
    } else if (document.querySelector("#human_ai").checked) {
        against = "human_ai";
        if (human == "X") {
            ai = "O";
            currentPlayer = human;
        } else {
            ai = "X";
            currentPlayer = ai;
            bestMove();
            checkWinner();
        }
        //console.log(ai);
        //console.log("human_ai");
    } else if (document.querySelector("#ai_ai").checked) {
        against = "ai_ai";
        Player1 = "X";
        Player2 = "O";
        currentPlayer = Player1;
        //console.log("ai_ai");
        bestMove();
        checkWinner();
    }
}

function ifai() {
    if (running) {
        if (against == "human_human") {
            return;
        } else if (against == "human_ai" && currentPlayer == ai) {
            bestMove();
            checkWinner();
        } else if (against == "ai_ai") {
            bestMove();
            checkWinner();
        }
    }
}

let options = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

initializeGame();

function initializeGame() {
    settings();
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer} ist dran`;
    running = true;
}

function equals3(a, b, c) {
    return a == b && b == c && a != "";
}

function cellClicked() {
    const cellIndexX = this.getAttribute("cellIndexX");
    const cellIndexY = this.getAttribute("cellIndexY");

    if (options[cellIndexX][cellIndexY] != "" || !running) {
        return;
    }

    updateCell(this, cellIndexX, cellIndexY);
    checkWinner();
}

function updateCell(cell, indexX, indexY) {
    options[indexX][indexY] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    if (against == "human_human") {
        currentPlayer = (currentPlayer == Player1) ? Player2 : Player1;
        statusText.textContent = `${currentPlayer} ist dran`;
    } else if (against == "human_ai") {
        currentPlayer = (currentPlayer == human) ? ai : human;
        statusText.textContent = `${currentPlayer} ist dran`;
    } else if (against == "ai_ai") {
        currentPlayer = (currentPlayer == Player1) ? Player2 : Player1;
        statusText.textContent = `${currentPlayer} ist dran`;
    }
}

function checkWinner() {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(options[i][0], options[i][1], options[i][2])) {
            winner = options[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(options[0][i], options[1][i], options[2][i])) {
            winner = options[0][i];
        }
    }

    // Diagonal
    if (equals3(options[0][0], options[1][1], options[2][2])) {
        winner = options[0][0];
    }
    if (equals3(options[2][0], options[1][1], options[0][2])) {
        winner = options[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (options[i][j] == '') {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0) {
        statusText.textContent = `Unentschieden!`;
        running = false;
    } else if (winner != null) {
        statusText.textContent = `${winner} hat gewonnen!`;
        running = false;
    } else {
        changePlayer()
    }
    ifai();
}

function restartGame() {
    options = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    statusText.textContent = `${currentPlayer} ist dran`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    settings();
}
