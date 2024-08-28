const d = document;
const root = d.getElementById('root');
const img = "agregar piezas";

const checkCoord = (row, col) => (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1);

class Board {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.board = [];
    }

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
    createBoard(element){
        const tablero = d.createElement('div');
        tablero.setAttribute("class", "tablero");
        tablero.style.display = 'grid';
        tablero.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        tablero.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
        
        this.board.forEach((row,i) => {
            row.forEach((cell, j) => {
                const callElement = d.createElement('div');
                callElement.style.width = '100px';
                callElement.style.height = '100px';
                if(cell === "dark") {
                    callElement.style.backgroundColor = 'hsl(30, 50%, 30%)';
                } else{
                    callElement.style.backgroundColor = 'hsl(30, 50%, 60%)';
                }
                tablero.appendChild(callElement);
            });
        });

        element.appendChild(tablero);
    }
}

const game = new Board(8, 8);
game.getBoard();
console.log(root);
game.createBoard(root);