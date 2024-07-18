let minimaxboard;

let numberToWord = {
    0: "zero",
    1: "one",
    2: "two",
    10: "ten",
    11: "eleven",
    12: "twelf",
    20: "twenty",
    21: "twentyone",
    22: "twentytwo"
}

function bestMove() {
    let bestScore = -Infinity;
    minimaxboard = options;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (minimaxboard[i][j] == "") {

                minimaxboard[i][j] = currentPlayer;

                let score = minimax(minimaxboard, 0, false);
                minimaxboard[i][j] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }

    options[move.i][move.j] = currentPlayer;

    idnumber = move.i * 10 + move.j;
    idnumber = numberToWord[idnumber];
    idnumber = "#" + idnumber;

    celltoupdate = document.querySelector(idnumber);
    celltoupdate.textContent = currentPlayer;
}

function checkminimaxwinnerofminimax(isMaximizing) {
    let minimaxwinner = null;
    let iswon = false;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(minimaxboard[i][0], minimaxboard[i][1], minimaxboard[i][2])) {
            iswon = true;
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(minimaxboard[0][i], minimaxboard[1][i], minimaxboard[2][i])) {
            iswon = true;
        }
    }

    // Diagonal
    if (equals3(minimaxboard[0][0], minimaxboard[1][1], minimaxboard[2][2])) {
        iswon = true;
    }
    if (equals3(minimaxboard[2][0], minimaxboard[1][1], minimaxboard[0][2])) {
        iswon = true;
    }

    if (iswon) {

        if (isMaximizing) {
            minimaxwinner = -10;
        } else {
            minimaxwinner = 10;
        }
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (minimaxboard[i][j] == '') {
                openSpots++;
            }
        }
    }

    if (minimaxwinner == null && openSpots == 0) {
        minimaxwinner = 0;
    }

    return minimaxwinner;


}

function minimax(minimaxboard, depth, isMaximizing) {

    let result = checkminimaxwinnerofminimax(isMaximizing);

    if (result !== null) {
        return result;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (minimaxboard[i][j] == "") {

                    minimaxboard[i][j] = currentPlayer;

                    let score = minimax(minimaxboard, depth + 1, false);

                    minimaxboard[i][j] = "";
                    bestScore = Math.max(score, bestScore);

                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if (minimaxboard[i][j] == '') {

                    if (against == "human_ai") {
                        minimaxboard[i][j] = human;
                    } else if (against == "ai_ai") {
                        if (currentPlayer == Player1) {
                            minimaxboard[i][j] = Player2;
                        } else {
                            minimaxboard[i][j] = Player1;
                        }
                    }

                    let score = minimax(minimaxboard, depth + 1, true);
                    minimaxboard[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}