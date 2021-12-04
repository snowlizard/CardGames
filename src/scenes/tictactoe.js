import Phaser from 'phaser';

class TicTacToe extends Phaser.Scene{
    constructor(){
        super('tictactoe');
        this.board;
        this.score;
        this.gameOver;
    };

    create = () => {
        // center of the screen
        this.centerX = this.cameras.main.centerX;
        this.centerY = this.cameras.main.centerY;
        
        this.banner = this.add.text(this.centerX, 50, "Tic Tac Toe",
                                    {"font": "8em times"}).setOrigin(0.5);
        this.board = this.add.image(this.centerX, this.centerY, 'board');
        this.scoreLabel = this.add.text( 75, 150,
                                        "Score: ", {"font": "6em times"});
        
    };
}

export default TicTacToe;