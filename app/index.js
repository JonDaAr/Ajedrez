const d = document;
const root = d.getElementById('root');
let selectedPiece = null;

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

    isValidMovement(targetRow, targetCol){
        //como moverlo :_
        const direction = this.color === 'white' ? -1 : 1;
        return this.row + direction === targetRow || this.col + direction === targetCol;
    }
}

class Rook extends Piece{
    constructor(color,row,col){
        super('rook',color,row,col);
    }

    isValidMovement(targetRow, targetCol){
        //como moverlo :_
        return this.row === targetRow || this.col === targetCol;
    }
}

class Knight extends Piece{
    constructor(color,row,col){
        super('knight',color,row,col);
    }

    isValidMovement(targetRow, targetCol){
        //como moverlo :_
        return this.row === targetRow || this.col === targetCol;
    }
}

class Queen extends Piece{
    constructor(color,row,col){
        super('queen',color,row,col);
    }

    isValidMovement(targetRow, targetCol){
        //como moverlo :_
        return this.row === targetRow || this.col === targetCol;
    }
}
class King extends Piece{
    constructor(color,row,col){
        super('king',color,row,col);
    }

    isValidMovement(targetRow, targetCol){
        //como moverlo :_
        return this.row === targetRow || this.col === targetCol;
    }
}
class Bishop extends Piece{
    constructor(color,row,col){
        super('bishop',color,row,col);
    }

    isValidMovement(targetRow, targetCol){
        //como moverlo :_
        return this.row === targetRow || this.col === targetCol;
    }
}

class Board {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.board = [];
        this.pieces = [];
    }
// Creacion del Tablero //
    getBoard() {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.cols; j++) {
                row.push(null);
            }
            this.board.push(row);
        }
    }
    // agrego una pieza al tablero
    addPiece(piece){
        this.pieces.push(piece);
        this.board[piece.row][piece.col] = piece;
    }

// Metodo para mover piezas
movePiece(piece, targetRow,targetCol){
    if(piece.isValidMovement(targetRow,targetCol)){
        this.board[piece.row][piece.col] = null;
        piece.move(targetRow,targetCol);
        this.board[targetRow][targetCol] = piece;
        this.updateBoard();
    }else {
        console.log("Movimiento invalido");
    }
}

updateBoard(){
    root.innerHTML = '';
    this.createBoard(root);
}



// creacion del atablero y sus piezas //
// parte visual//
    createBoard(element){
        const tablero = d.createElement('div');
        tablero.setAttribute("class", "tablero");
        tablero.style.display = 'grid';
        tablero.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        tablero.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
        
        this.board.forEach((row,i) => {
            row.forEach((cell, j) => {
                const cellElement = d.createElement('div');
                cellElement.style.display = 'flex';
                cellElement.style.alignItems = 'center';
                cellElement.style.width = '74px';
                cellElement.style.height = '74px';
                cellElement.style.backgroundColor = (i + j) % 2 === 0 ? '#a5682a' : '#F8DE7E';
                
                cellElement.addEventListener('click', () => {
                    if (selectedPiece) {
                        this.movePiece(selectedPiece, i, j);
                        selectedPiece = null;
                    } else if (this.board[i][j]) {
                        selectedPiece = this.board[i][j];
                    }
                });

                    if (cell) {
                        const imgElement = d.createElement('img');
                        imgElement.src = cell.image;
                        imgElement.style.width = '100%';
                        imgElement.style.height = '80%';
                        cellElement.appendChild(imgElement);
                    }
                tablero.appendChild(cellElement);
            });
        });

        element.appendChild(tablero);
    }
}

// creo la pieza //
// averiguar otro metodo este ocupa muchas lineas //
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


