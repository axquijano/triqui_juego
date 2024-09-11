export const checkWinner = (boardCheck, index, boardConfig) => {
    const numRows = boardConfig.numCasillas; // Número de casillas por fila
    const numFillas = boardConfig.numFichaGanadoras; // Fichas consecutivas necesarias para ganar
    const turn = boardCheck[index]; // Ficha del jugador actual
    
    const winnerRow = checkRowsWinner(boardCheck, index, numRows, numFillas, turn);
    const winnerColumn = checkColumnsWinner(boardCheck, index, numRows, numFillas, turn);
    const winnerDiagonal = checkDiagonalWinner(boardCheck, index, numRows, numFillas, turn);
    const winnerDiagonalInvertida = checkDiagonalInvertidaWinner(boardCheck, index, numRows, numFillas, turn);

    console.log(winnerRow, winnerColumn, winnerDiagonal, winnerDiagonalInvertida);
    return winnerRow || winnerColumn || winnerDiagonal || winnerDiagonalInvertida;
};

export const checkRowsWinner = (boardCheck, index, numRows, numFillas, turn) => {
    if (turn === null || turn === undefined) {
        return false;  // No hay ficha en la casilla actual
    }

    // Determinar el inicio de la fila en la que está el índice
    const filaInicio = Math.trunc(index / numRows) * numRows;
    const filaFin = filaInicio + numRows;  // Limita el rango de la fila actual

    let contador = 0;  // Contador de fichas consecutivas

    // Iterar sobre la fila para verificar si hay una secuencia ganadora
    for (let i = filaInicio; i < filaFin; i++) {
        if (boardCheck[i] === turn) {
            contador++;
            if (contador === numFillas) {
                return turn;  // Se ha encontrado una secuencia ganadora
            }
        } else {
            contador = 0;  // Reiniciar el contador si se rompe la secuencia
        }
    }
    return false;  // No se encontró una secuencia ganadora en la fila
};

const checkColumnsWinner = (boardCheck, index, numRows, numFillas, turn) => {
    

    if (turn === null || turn === undefined) {
        return false;  // No hay ficha en la casilla actual
    }

    // Determinar el índice inicial de la columna
    const columnaInicio = index % numRows;  // La posición inicial de la columna en la que está el índice
    const columnaFin = columnaInicio + (numRows * (numRows - 1));  // Último índice de la columna

    let contador = 0;  // Contador de fichas consecutivas

    // Iterar sobre la columna (saltando por cada fila)
    for (let i = columnaInicio; i <= columnaFin; i += numRows) {
        if (boardCheck[i] === turn) {
            contador++;
            if (contador === numFillas) {
                return turn;  // Se ha encontrado una secuencia ganadora
            }
        } else {
            contador = 0;  // Reiniciar el contador si la secuencia se interrumpe
        }
    }

    return false;  // No se encontró una secuencia ganadora en la columna
};

const checkDiagonalInvertidaWinner = (boardCheck, index, numRows, numFillas, turn) => {
    // Validar entrada
    if (!boardCheck || index < 0 || index >= boardCheck.length || numRows <= 0 || numFillas <= 0) {
        return false; // Entrada inválida
    }

    const row = Math.trunc(index / numRows);  // Fila actual del índice
    const column = index % numRows;  // Columna actual del índice

    // Determinar el punto de partida de la diagonal invertida (abajo-izquierda a arriba-derecha)
    let currentRow = row + column >= numRows ? numRows - 1 : row + column;
    let currentColumn = row + column >= numRows ? row + column - numRows + 1 : 0;

    let contador = 0;

    // Recorrer la diagonal invertida
    while (currentRow >= 0 && currentColumn < numRows) {
        const currentIndex = (currentRow * numRows) + currentColumn;

        if (boardCheck[currentIndex] === turn) {
            contador++;
            if (contador === numFillas) {
                return turn; // Se ha encontrado una secuencia ganadora
            }
        } else {
            contador = 0;  // Reiniciar contador si se rompe la secuencia
        }

        // Avanzar por la diagonal invertida
        currentRow--;
        currentColumn++;
    }

    return false;  // No se encontró una secuencia ganadora
};

const checkDiagonalWinner = (boardCheck, index, numRows, numFillas, turn) => {
    // Validar entrada
    if (!boardCheck || index < 0 || index >= boardCheck.length || numRows <= 0 || numFillas <= 0) {
        return false; // Entrada inválida
    }

    const row = Math.trunc(index / numRows);  // Fila actual del índice
    const column = index % numRows;  // Columna actual del índice

    // Determinar el punto de partida de la diagonal principal
    let currentRow = row >= column ? row - column : 0;  // Ajustar la fila inicial
    let currentColumn = row >= column ? 0 : column - row;  // Ajustar la columna inicial

    let contador = 0;

    // Recorrer la diagonal principal
    while (currentRow < numRows && currentColumn < numRows) {
        const currentIndex = (currentRow * numRows) + currentColumn;

        if (boardCheck[currentIndex] === turn) {
            contador++;
            if (contador === numFillas) {
                return turn; // Se ha encontrado una secuencia ganadora
            }
        } else {
            contador = 0;  // Reiniciar contador si se rompe la secuencia
        }

        // Avanzar por la diagonal
        currentRow++;
        currentColumn++;
    }

    return false;  // No se encontró una secuencia ganadora
};

export const checkEndGame = (newBoard) => {
    return newBoard.every((currentValue) => currentValue != null);
};


