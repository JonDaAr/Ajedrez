const d =document;
const root = d.getElementById('root');
const img = "agregar piezas";

class Board {
    board = [];
    constructor(cols, rows){
        this.cols = cols;
        this.rows = rows;
    }
    getBoard(){
        for(let i=0; i< this.rows; i++){
            for(let j=0; j< this.cols; j++){
                switch(true){
                case i< 3: {
                    if(i%2===0 && j%2===0 || i%2===1 && j%2===1){
                        this.board.push = "dark"};
                        
                }
                case (i>4): {
                    if(i%2===0 && j%2===0 || i%2===1 && j%2===1){
                        this.board.push = "white"};
                        break;
                        
                }
                default: this.board.push(null); 
            }
        }
    }
}
}