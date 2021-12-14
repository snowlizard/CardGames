import Phaser from 'phaser';

const BannerFont = { "font": "8em courier"};
const scoreFont  = { "font": "6em courier"};

class TicTacToe extends Phaser.Scene{
    constructor(){
        super('tictactoe');
        this.board;
        this.score = 0;
        this.gameOver = false;
        this.turn = 'x';
    };

    create = () => {
        // center of the screen
        this.centerX = this.cameras.main.centerX;
        this.centerY = this.cameras.main.centerY;

        // coordinates for x/o on screen
        this.rowsX = [
            this.centerX - 300,
            this.centerX,
            this.centerX + 300
        ];

        this.columnsY = [
            this.centerY - 300,
            this.centerY,
            this.centerY + 300
        ];

        // title and score
        this.banner = this.add.text(this.centerX, 50, "Tic Tac Toe",
                                    BannerFont).setOrigin(0.5);
        this.board = this.add.image(this.centerX, this.centerY, 'board');
        this.scoreLabel = this.add.text( 75, 150,
                                        `Score: ${this.score}`, scoreFont);

        // add invisible rectangles for x/o's
        this.tiles = this.add.group();
        this.rowsX.forEach( x => {
            this.columnsY.forEach( y => {
                this.new = this.tiles.create(x, y, 'tile');
                this.new.setData('value', '');
            });
        });

        // set all children to interactive
        this.tiles.getChildren().map( child => {
            child.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                if(this.turn == 'x'){
                    if(child.getData('value') == ''){
                        child.setTexture("X");
                        this.turn = 'o';
                    };
                };
            });
        });
    };

    update = () => {
        // ai's turn
        if(this.turn == 'o'){
            let done = false;
            while(!done){
                let random = Math.floor(Math.random() * (this.tiles.getChildren().length -1));
                let child = this.tiles.getChildren()
                child = this.tiles.getChildren()[random];
                console.log(child, random);
                if(child.getData('value') === '' && child.getData('value') != 'x'){
                    child.setData('value', 'o');
                    child.setTexture('O');
                    this.turn = 'x';
                    done = true;
                }
            }
        }
    }
}

export default TicTacToe;