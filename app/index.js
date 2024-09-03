const d = document;
const root = d.getElementById('root');

const checkCoord = (row, col) => (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1);

class Piece {
    constructor(type, color){
        this.type = type;
        this.color = color;
        this.image = `/assets/pieces-style1/${type}_${color}.svg`;
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
    addPiece(piece, row, col){
        this.pieces.push({piece, row, col});
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
                const callElement = d.createElement('div');
                callElement.style.display = 'flex';
                callElement.style.alignItems = 'center';
                callElement.style.width = '70px';
                callElement.style.height = '70px';
                if(cell === "dark") {
                    callElement.style.backgroundColor = '#a5682a';
                } else{
                    callElement.style.backgroundColor = '#F8DE7E';
                }

                const piece = this.pieces.find(p => p.row === i && p.col === j);
                    if (piece) {
                        const imgElement = d.createElement('img');
                        imgElement.src = piece.piece.image;
                        imgElement.style.width = '100%';
                        imgElement.style.height = '80%';
                        callElement.appendChild(imgElement);
                    }
                tablero.appendChild(callElement);
            });
        });

        element.appendChild(tablero);
    }
}

// creo la pieza //
// averiguar otro metodo este ocupa muchas lineas //
const whiterook1 = new Piece('rook', 'white');
const whiterook2 = new Piece('rook', 'white');
const whiteknight1 = new Piece ('knight', 'white');
const whiteknight2 = new Piece ('knight', 'white');
const whitebishop1 = new Piece ('bishop', 'white');
const whitebishop2= new Piece ('bishop', 'white');
const whiteking = new Piece('king','white');
const whitequeen = new Piece('queen','white');
const whitepawn1 = new Piece('Pawn','white');
const whitepawn2 = new Piece('Pawn','white');
const whitepawn3 = new Piece('Pawn','white');
const whitepawn4 = new Piece('Pawn','white');
const whitepawn5 = new Piece('Pawn','white');
const whitepawn6 = new Piece('Pawn','white');
const whitepawn7 = new Piece('Pawn','white');
const whitepawn8 = new Piece('Pawn','white');

const blackrook1 = new Piece('rook', 'black');
const blackrook2 = new Piece('rook', 'black');
const blackknight1 = new Piece ('knight', 'black');
const blackknight2 = new Piece ('knight', 'black');
const blackbishop1 = new Piece ('bishop', 'black');
const blackbishop2= new Piece ('bishop', 'black');
const blackking = new Piece('king','black');
const blackqueen = new Piece('queen','black');
const blackpawn1 = new Piece('Pawn','black');
const blackpawn2 = new Piece('Pawn','black');
const blackpawn3 = new Piece('Pawn','black');
const blackpawn4 = new Piece('Pawn','black');
const blackpawn5 = new Piece('Pawn','black');
const blackpawn6 = new Piece('Pawn','black');
const blackpawn7 = new Piece('Pawn','black');
const blackpawn8 = new Piece('Pawn','black');


const game = new Board(8, 8);
game.getBoard();
// agrega una pieza en el tablero
game.addPiece(blackrook1,7,0);
game.addPiece(blackrook1,7,7);
game.addPiece(blackknight1,7,1);
game.addPiece(blackknight2,7,6);
game.addPiece(blackbishop1,7,2);
game.addPiece(blackbishop1,7,5);
game.addPiece(blackking,7,3);
game.addPiece(blackqueen,7,4);
game.addPiece(blackpawn1,6,0);
game.addPiece(blackpawn1,6,1);
game.addPiece(blackpawn1,6,2);
game.addPiece(blackpawn1,6,3);
game.addPiece(blackpawn1,6,4);
game.addPiece(blackpawn1,6,5);
game.addPiece(blackpawn1,6,6);
game.addPiece(blackpawn1,6,7);

game.addPiece(whiterook1,0,0);
game.addPiece(whiterook1,0,7);
game.addPiece(whiteknight1,0,1);
game.addPiece(whiteknight2,0,6);
game.addPiece(whitebishop1,0,2);
game.addPiece(whitebishop1,0,5);
game.addPiece(whiteking,0,3);
game.addPiece(whitequeen,0,4);
game.addPiece(whitepawn1,1,0);
game.addPiece(whitepawn1,1,1);
game.addPiece(whitepawn1,1,2);
game.addPiece(whitepawn1,1,3);
game.addPiece(whitepawn1,1,4);
game.addPiece(whitepawn1,1,5);
game.addPiece(whitepawn1,1,6);
game.addPiece(whitepawn1,1,7);

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


