import Phaser from 'phaser';
import { Button } from '../mixins/button';

const BannerFont = { "font": "8em courier"};
const scoreFont  = { "font": "6em courier"};
const roundEnd   = { "font": "10em courier"};

class TicTacToe extends Phaser.Scene{
    constructor(){
        super('tictactoe');
        this.board;
        this.score = 0;
        this.gameOver = false;
        this.turn = 'x';
        this.roundResults;
    };

    create = () => {
        // center of the screen
        this.centerX = this.cameras.main.centerX;
        this.centerY = this.cameras.main.centerY;

        this.toMenu = new Button(this, this.centerX - 600, this.centerY - 550, "Menu", () => {
            this.scene.start('menu');
        })

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
        this.roundResults = this.add.text(this.centerX, this.centerY, "", roundEnd).setOrigin(0.5);

        // add invisible rectangles for x/o's
        this.tiles = this.add.group();
        let i = 0;
        this.rowsX.forEach( x => {
            this.columnsY.forEach( y => {
                this.new = this.tiles.create(x, y, 'tile');
                this.new.setData({'value': ''});
            });
        });

        // set all children to interactive
        this.tiles.getChildren().map( child => {
            child.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                if(this.turn == 'x'){
                    if(child.getData('value') == ''){
                        child.setData('value', 'x');
                        child.setActive(false);
                        child.setTexture("X");
                        this.turn = 'o';
                    };
                if(this.check_won('x')) console.log("you won player!")
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
                let child = this.tiles.getChildren()[random];
                if(child.getData('value') === '' && child.getData('value') != 'x'){
                    child.setData('value', 'o');
                    child.setActive(false);
                    child.setTexture('O');
                    this.turn = 'x';
                    done = true;
                }
                else if(this.tiles.countActive(true) == 0){
                    done = true;
                    this.gameOver = true;
                }
            };
            if(this.check_won('o')) console.log("o wins")
        };
    
        if(this.gameOver){
            let timer = this.time.delayedCall(2500,
                () => {
                    this.gameOver = false;
                    this.tiles.getChildren().map( child => {
                        child.setData('value', '');
                        child.setActive(true);
                        child.setTexture('tile');
                        this.turn = 'x';
                        this.roundResults.setText("");
                    });
                });
        }

    }

    check_won = (token) => {
        let positions = this.tiles.getChildren();

        for(let i = 0; i < 9; i += 3){
            console.log(i, i+1, i+2)
            if (positions[i].getData('value') == token &&
                positions[i+1].getData('value') == token &&
                positions[i+2].getData('value') == token){
                return true;
            }

            else if (positions[0].getData('value') == token &&
                     positions[4].getData('value') == token &&
                     positions[8].getData('value') == token){
                    return true;
            }
            else if (positions[6].getData('value') == token &&
                     positions[4].getData('value') == token &&
                     positions[2].getData('value') == token){
                    return true;
            }
            else return false;
        }

    }
}

export default TicTacToe;