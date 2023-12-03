var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];

var tiempoTranscurrido = 0;
var intervalo;


window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //Inicio del cronometro al poner la primera ficha
    iniciarCronometro();

    //coordenadas ficha 
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    
    r = currColumns[c]; 

    if (r < 0) { 
        return;
    }

    board[r][c] = currPlayer; 
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; 
    currColumns[c] = r; 

    checkWinner();
}

function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    if (gameOver) {
        detenerCronometro(); //Parar el crono
    }
}

function iniciarCronometro() {
    // Iniciar el intervalo solo si aún no se ha iniciado
    if (!intervalo) {
        intervalo = setInterval(actualizarCronometro, 1000); // Actualizar cada segundo
    }
}

function detenerCronometro() {
    clearInterval(intervalo);
    intervalo = null; // Reiniciar intervalo para otra partida
}

function actualizarCronometro() {
    tiempoTranscurrido += 1;
    document.getElementById("cronometro").innerText = `Tiempo: ${tiempoTranscurrido} segundos`;
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = `Fin de la partida, duración: ${tiempoTranscurrido} segundos. ¡Ganan las fichas rojas!`;

    } else {
        winner.innerText = `Fin de la partida, duración: ${tiempoTranscurrido} segundos. ¡Ganan las fichas amarillas!`;

    }
    detenerCronometro(); // Parar crono cuando alguien gana
    gameOver = true;
}

function reiniciarJuego() {
    detenerCronometro(); 
    tiempoTranscurrido = 0; // Reiniciar tiempo
    document.getElementById("cronometro").innerText = "Tiempo: 0 segundos"; // Actualizar el tiempo
    gameOver = false; // Restablecer el estado del juego
    // Limpiar el contenido del elemento que contiene el tablero
    var boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";
    // Volver a inicializar el juego
    setGame();
    document.getElementById("winner").innerText = ""; // Limpiar el mensaje de ganador
}





