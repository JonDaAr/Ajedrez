const d = document;
const root = d.getElementById('root');

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
        throw new error()
    }
}

class Pawn extends Piece{
    constructor(color,row,col){
        super('pawn',color,row,col);
    }

    isValidMovement(targetRow, targetCol){
        //como moverlo :_
        return this.row === targetRow || this.col === targetCol;
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

class knight extends Piece{
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
                if((i+j)%2 === 0){
                    checkCoord(i, j) ? row.push("dark") : row.push(null);
                } else{
                    checkCoord(i, j) ? row.push("white") : row.push(null);
                }
            }
            this.board.push(row);
        }
    }
    // agrego una pieza al tablero
    addPiece(piece){
        this.pieces.push(piece);
    }

// Metodo para mover piezas
movePiece(piece, targetRow,targetCol){
    if(piece.isValidMovement(targetRow,targetCol)){
        piece.move(targetRow,targetCol);
    }else {
        console.log("Movimiento invalido");
    }
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
                if(cell === "dark") {
                    cellElement.style.backgroundColor = '#a5682a';
                } else{
                    cellElement.style.backgroundColor = '#F8DE7E';
                }

                const piece = this.pieces.find(p => p.row === i && p.col === j);
                    if (piece) {
                        const imgElement = d.createElement('img');
                        imgElement.src = piece.image;
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
const whiterook1 = new Rook('white',7,0);
const whiterook2 = new Rook('white',7,7);
const whiteknight1 = new knight ('white',7,1);
const whiteknight2 = new knight ('white',7,6);
const whitebishop1 = new Bishop ('white',7,2);
const whitebishop2 = new Bishop ('white',7,5);
const whiteking = new King('white',7,3);
const whitequeen = new Piece('white',7,4);
const whitepawn1 = new Pawn('white',6,1);
const whitepawn2 = new Pawn('white',6,2);
const whitepawn3 = new Pawn('white',6,3);
const whitepawn4 = new Pawn('white',6,4);
const whitepawn5 = new Pawn('white',6,5);
const whitepawn6 = new Pawn('white',6,6);
const whitepawn7 = new Pawn('white',6,7);
const whitepawn8 = new Pawn('white',6,0);

const blackrook1 = new Piece('rook', 'black');
const blackrook2 = new Piece('rook', 'black');
const blackknight1 = new Piece ('knight', 'black');
const blackknight2 = new Piece ('knight', 'black');
const blackbishop1 = new Piece ('bishop', 'black');
const blackbishop2= new Piece ('bishop', 'black');
const blackking = new Piece('king','black');
const blackqueen = new Piece('queen','black');
const blackpawn1 = new Piece('pawn','black');
const blackpawn2 = new Piece('Pawn','black');
const blackpawn3 = new Piece('Pawn','black');
const blackpawn4 = new Piece('Pawn','black');
const blackpawn5 = new Piece('Pawn','black');
const blackpawn6 = new Piece('Pawn','black');
const blackpawn7 = new Piece('Pawn','black');
const blackpawn8 = new Piece('Pawn','black');


const game = new Board(8, 8);
game.getBoard();

game.addPiece(whitepawn1);
game.addPiece(whitepawn2);
game.addPiece(whitepawn3);
game.addPiece(whitepawn4);
game.addPiece(whitepawn5);
game.addPiece(whitepawn6);
game.addPiece(whitepawn7);
game.addPiece(whitepawn8);
game.addPiece(whitebishop1);
game.addPiece(whitebishop2);
game.addPiece(whiteknight1);
game.addPiece(whiteknight2);
game.addPiece(whiterook1);
game.addPiece(whiterook2);
game.addPiece(whiteking);
game.addPiece(whitequeen);

console.log(root);
game.createBoard(root);

//funcion que cambia las piece
function changePieceStyle(style){
    game.pieces.forEach(piece => {
        piece.piece.image = `/assets/pieces-${style}/${piece.piece.type}_${piece.piece.color}.svg`;
    });
    root.innerHTML = '';
    game.createBoard(root)
}

const piecesSelectStyle = document.getElementById('pieceStyle');
piecesSelectStyle.addEventListener('change' , (e) => {
    const selectStyle = e.target.value;
    changePieceStyle(selectStyle);
});


