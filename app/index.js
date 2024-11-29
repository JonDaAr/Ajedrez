const d = document;
const root = d.getElementById('root');
let selectedPiece = null;
const moveHistory = [];
const historyContainer = d.getElementById("move-history");//contenedor del hostorial

const checkCoord = (row, col) => (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1);

class Piece {
    constructor(type, color,row,col){
        this.type = type;
        this.color = color;
        this.row = row;
        this.col = col;
        this.image = `/assets/pieces-style1/${type}_${color}.svg`;
    }

    move(row,col){
        this.row = row;
        this.col = col;
    }

    isValidMovement(targetRow, targetCol){
        throw new Error("isValidMovement debe ser implementado por la subclase");
    }
}

class Pawn extends Piece{
    constructor(color,row,col){
        super('pawn',color,row,col);
    }

    isValidMovement(targetRow, targetCol) {
        const direction = this.color === 'white' ? -1 : 1;
        const startRow = this.color === 'white' ? 6 : 1;
    
        // Movimiento hacia adelante
        if (this.col === targetCol) {
            if (
                targetRow === this.row + direction &&
                !game.board[targetRow][targetCol]
            ) {
                return true;
            }
            if (
                this.row === startRow &&
                targetRow === this.row + 2 * direction &&
                !game.board[this.row + direction][targetCol] &&
                !game.board[targetRow][targetCol]
            ) {
                return true;
            }
        }
    
        // Movimiento de captura en diagonal
        if (
            Math.abs(this.col - targetCol) === 1 &&
            targetRow === this.row + direction &&
            game.board[targetRow][targetCol] &&
            game.board[targetRow][targetCol].color !== this.color
        ) {
            return true;
        }
    
        return false;
    }
isValidMovement(targetRow, targetCol) {
    const direction = this.color === 'white' ? -1 : 1;
    const startRow = this.color === 'white' ? 6 : 1;

    // Movimiento hacia adelante
    if (this.col === targetCol) {
        if (
            targetRow === this.row + direction &&
            !game.board[targetRow][targetCol]
        ) {
            return true;
        }
        if (
            this.row === startRow &&
            targetRow === this.row + 2 * direction &&
            !game.board[this.row + direction][targetCol] &&
            !game.board[targetRow][targetCol]
        ) {
            return true;
        }
    }

    // Movimiento de captura en diagonal
    if (
        Math.abs(this.col - targetCol) === 1 &&
        targetRow === this.row + direction &&
        game.board[targetRow][targetCol] &&
        game.board[targetRow][targetCol].color !== this.color
    ) {
        return true;
    }

    return false;
}
    
}

class Rook extends Piece{
    constructor(color,row,col){
        super('rook',color,row,col);
    }

    isValidMovement(targetRow, targetCol) {
        if (this.row !== targetRow && this.col !== targetCol) {
            return false; // Debe moverse en línea recta
        }
    
        // Verificar si hay piezas bloqueando el camino
        const rowStep = targetRow > this.row ? 1 : targetRow < this.row ? -1 : 0;
        const colStep = targetCol > this.col ? 1 : targetCol < this.col ? -1 : 0;
    
        let currentRow = this.row + rowStep;
        let currentCol = this.col + colStep;
    
        while (currentRow !== targetRow || currentCol !== targetCol) {
            if (game.board[currentRow][currentCol] !== null) {
                return false; // Hay una pieza bloqueando
            }
            currentRow += rowStep;
            currentCol += colStep;
        }
    
        // Permitir el movimiento si no hay bloqueos
        return !game.isSameColor(targetRow, targetCol, this.color);
    }
    
}

class Knight extends Piece{
    constructor(color,row,col){
        super('knight',color,row,col);
    }

    isValidMovement(targetRow, targetCol){
        //como moverlo D:
        const rowDiff = Math.abs(this.row - targetRow);
        const colDiff = Math.abs(this.col - targetCol);
        if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
            // Verificar que la casilla final no tenga una pieza aliada
            return !game.isSameColor(targetRow, targetCol, this.color);
        }
        return false;
    }
}

class Bishop extends Piece{
    constructor(color,row,col){
        super('bishop',color,row,col);
    }

    isValidMovement(targetRow, targetCol){
        //como moverlo D:
        const rowDiff = Math.abs(targetRow - this.row);
        const colDiff = Math.abs(targetCol - this.col);
    
        if (rowDiff === colDiff) {
            const rowStep = targetRow > this.row ? 1 : targetRow < this.row ? -1 : 0;
            const colStep = targetCol > this.col ? 1 : targetCol < this.col ? -1 : 0;
    
            let currentRow = this.row + rowStep;
            let currentCol = this.col + colStep;
    
            // Verificar todas las casillas intermedias
            while (currentRow !== targetRow || currentCol !== targetCol) {
                if (game.board[currentRow][currentCol]) return false;
                currentRow += rowStep;
                currentCol += colStep;
            }
    
            // Verificar que la casilla final no tenga una pieza aliada
            return !game.isSameColor(targetRow, targetCol, this.color);
        }
        return false;
    }
}

class Queen extends Piece{
    constructor(color,row,col){
        super('queen',color,row,col);
    }

    isValidMovement(targetRow, targetCol){
        //como moverlo D:
        const rowDiff = Math.abs(targetRow - this.row);
        const colDiff = Math.abs(targetCol - this.col);

        if (this.row === targetRow || this.col === targetCol || rowDiff === colDiff) {
            const rowStep = targetRow > this.row ? 1 : targetRow < this.row ? -1 : 0;
            const colStep = targetCol > this.col ? 1 : targetCol < this.col ? -1 : 0;
    
            let currentRow = this.row + rowStep;
            let currentCol = this.col + colStep;
    
            // Verificar todas las casillas intermedias
            while (currentRow !== targetRow || currentCol !== targetCol) {
                if (game.board[currentRow][currentCol]) return false;
                currentRow += rowStep;
                currentCol += colStep;
            }
    
            // Verificar que la casilla final no tenga una pieza aliada
            return !game.isSameColor(targetRow, targetCol, this.color);
        }
        return false;
    }
}
class King extends Piece{
    constructor(color,row,col){
        super('king',color,row,col);
    }

    isValidMovement(targetRow, targetCol){
        //como moverlo D:
        const rowDiff = Math.abs(this.row - targetRow);
        const colDiff = Math.abs(this.col - targetCol);
        if ((rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0)) {
            return !game.isSameColor(targetRow, targetCol, this.color);
        }
        return false;
    }
}

function movePiece(targetRow, targetCol) {
    const piece = game.selectedPiece;

    if (piece && piece.isValidMovement(targetRow, targetCol)) {
        const startRow = piece.row;
        const startCol = piece.col;

        // Mover la pieza
        game.board[startRow][startCol] = null;
        game.board[targetRow][targetCol] = piece;

        // Actualizar la posición de la pieza
        piece.row = targetRow;
        piece.col = targetCol;

        // Registrar el movimiento
        moveHistory.push({
            piece: piece.type,
            color: piece.color,
            from: `${startRow},${startCol}`,
            to: `${targetRow},${targetCol}`,
        });

        // Mostrar el historial actualizado
        updateMoveHistory();

        // Deseleccionar la pieza y cambiar el turno
        game.selectedPiece = null;
        switchTurn();
    } else {
        console.log("Movimiento no válido.");
    }
}

class Board {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.board = [];
        this.pieces = [];
    }

    // Creacion del Tablero
    getBoard() {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.cols; j++) {
                row.push(null);
            }
            this.board.push(row);
        }
    }

    // agregar una pieza al tablero
    addPiece(piece) {
        this.pieces.push(piece);
        this.board[piece.row][piece.col] = piece;
    }

    // Metodo para mover piezas
    movePiece(piece, targetRow, targetCol) {
        if (piece.isValidMovement(targetRow, targetCol)) {
            this.board[piece.row][piece.col] = null;
            piece.move(targetRow, targetCol);
            this.board[targetRow][targetCol] = piece;
            this.updateBoard();
        } else {
            console.log("Movimiento inválido");
        }
    }

highlightValidMoves(piece) {
        this.clearHighlight(); // Limpiar los destacados previos
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (
                    piece.isValidMovement(row, col) &&
                    !this.isSameColor(row, col, piece.color)
                ) {
                    const cellElement = root.querySelector(
                        `.cell[data-row="${row}"][data-col="${col}"]`
                    );
                    if (cellElement) {
                        cellElement.classList.add("highlight");
                    }
                }
            }
        }
}

    clearHighlight(){
        const highlightedCells = root.querySelectorAll(".highlight");
        highlightedCells.forEach(cell => cell.classList.remove("highlight"));
    }

    handleCellClick(row, col) {
        const clickedPiece = this.board[row][col];
    
        if (selectedPiece) {
            // Intentar mover la pieza seleccionada
            if (this.board[row][col] === null || this.board[row][col]?.color !== selectedPiece.color) {
                this.movePiece(selectedPiece, row, col);
            }
            this.clearHighlight(); // Limpiar las casillas destacadas
            selectedPiece = null; // Deseleccionar la pieza
        } else if (clickedPiece) {
            // Seleccionar una nueva pieza
            selectedPiece = clickedPiece;
            console.log(
                `Seleccionaste la pieza: ${clickedPiece.type} en la posición (${clickedPiece.row}, ${clickedPiece.col})`
            );
            this.highlightValidMoves(selectedPiece); // Resaltar movimientos válidos
        }
    }

    isSameColor(row, col, color) {
        const piece = this.board[row][col];
        return piece && piece.color === color;
    }

    updateBoard() {
        root.innerHTML = '';
        this.createBoard(root);
    }

    // parte visual con letras y números
    createBoard(element) {
        const tablero = d.createElement('div');
        tablero.setAttribute("class", "tablero");
        tablero.style.display = 'grid';
        tablero.style.gridTemplateColumns = `repeat(${this.cols + 1}, 1fr)`;
        tablero.style.gridTemplateRows = `repeat(${this.rows + 1}, 1fr)`;
    
        
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        
    
        this.board.forEach((row, i) => {
            // Número en el borde izquierdo
            const numberElementLeft = d.createElement('div');
            numberElementLeft.className += "reglasV ";
            numberElementLeft.innerText = 8 - i; 
            numberElementLeft.style.background = 'white';
            numberElementLeft.style.display = 'flex';
            numberElementLeft.style.justifyContent = 'center';
            numberElementLeft.style.alignItems = 'center';
            numberElementLeft.style.width = '60px'; 
            numberElementLeft.style.height = '60px';
            tablero.appendChild(numberElementLeft);
    
            // Crear las celdas del tablero
            row.forEach((cell, j) => {
                const cellElement = d.createElement('div');
                cellElement.className = "cell";
                cellElement.dataset.row = i;
                cellElement.dataset.col = j; 
                cellElement.style.display = 'flex';
                cellElement.style.alignItems = 'center';
                cellElement.style.width = '60px';
                cellElement.style.height = '60px';
                cellElement.style.backgroundColor = (i + j) % 2 === 0 ? '#a5682a' : '#F8DE7E';
                if (cell) {
                    const imgElement = d.createElement('img');
                    imgElement.src = cell.image;
                    imgElement.style.width = '100%';
                    imgElement.style.height = '80%';
                    cellElement.appendChild(imgElement);
                }
                cellElement.addEventListener('click', () => this.handleCellClick(i, j));
                tablero.appendChild(cellElement);
                
            });

        });
    
        // Letras en la parte inferior

        const cubeElement = d.createElement('div')
        cubeElement.style.background = 'white';
        tablero.appendChild(cubeElement);
        letters.forEach(letter => {
            const letterElement = d.createElement('div');
            letterElement.className += "reglasH ";
            letterElement.innerText = letter;
            letterElement.style.background = 'white';
            letterElement.style.display = 'flex';
            letterElement.style.justifyContent = 'center';
            letterElement.style.alignItems = 'center';
            letterElement.style.height = '60px';
            tablero.appendChild(letterElement);
        });

        element.appendChild(tablero);
    }
    
}
// Historial 
function updateMoveHistory() {
    historyContainer.innerHTML = ""; // Limpiar contenido previo

    moveHistory.forEach((move, index) => {
        const moveEntry = d.createElement("div");
        moveEntry.className = "move-entry";
        moveEntry.textContent = `${index + 1}. ${move.color} ${move.piece} de (${move.from}) a (${move.to})`;
        historyContainer.appendChild(moveEntry);
    });
}
function formatPosition(row, col) {
    const columns = "abcdefgh";
    return `${columns[col]}${8 - row}`; // Convertir fila/columna a notación
}

// Limpiar codigo
function clearMoveHistory() {
    moveHistory.length = 0; // Vaciar el array
    updateMoveHistory();    // Actualizar la interfaz
}

// creo la pieza //
const createPieces = () => {
    const pieces = [
        new Rook('white', 7, 0), new Rook('white', 7, 7),
        new Knight('white', 7, 1), new Knight('white', 7, 6),
        new Bishop('white', 7, 2), new Bishop('white', 7, 5),
        new King('white', 7, 4), new Queen('white', 7, 3),
        new Pawn('white', 6, 0), new Pawn('white', 6, 1),
        new Pawn('white', 6, 2), new Pawn('white', 6, 3),
        new Pawn('white', 6, 4), new Pawn('white', 6, 5),
        new Pawn('white', 6, 6), new Pawn('white', 6, 7),
        new Rook('black', 0, 0), new Rook('black', 0, 7),
        new Knight('black', 0, 1), new Knight('black', 0, 6),
        new Bishop('black', 0, 2), new Bishop('black', 0, 5),
        new King('black', 0, 4), new Queen('black', 0, 3),
        new Pawn('black', 1, 0), new Pawn('black', 1, 1),
        new Pawn('black', 1, 2), new Pawn('black', 1, 3),
        new Pawn('black', 1, 4), new Pawn('black', 1, 5),
        new Pawn('black', 1, 6), new Pawn('black', 1, 7)
    ];
    pieces.forEach(piece => game.addPiece(piece));
};


const game = new Board(8, 8);
game.getBoard();
createPieces();

console.log(root);
game.createBoard(root);

//funcion que cambia las piece
function changePieceStyle(style){
    game.pieces.forEach(piece => {
        piece.image = `/assets/pieces-${style}/${piece.type}_${piece.color}.svg`;
    });
    root.innerHTML = '';
    game.createBoard(root)
}

const piecesSelectStyle = document.getElementById('pieceStyle');
piecesSelectStyle.addEventListener('change' , (e) => {
    const selectStyle = e.target.value;
    changePieceStyle(selectStyle);
});

const selectElement = document.getElementById('pieceStyle');

// Agrandar al hacer clic
selectElement.addEventListener('focus', function () {
  selectElement.classList.add('expanded');
  selectElement.classList.remove('shrinking');
});

// Volver al tamaño normal cuando pierde el foco
selectElement.addEventListener('blur', function () {
  selectElement.classList.remove('expanded');
  selectElement.classList.add('shrinking');
});

