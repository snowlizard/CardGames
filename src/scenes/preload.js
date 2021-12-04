import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor(){
        super('preload');
    };

    preload = () => {
        // Buttons
        this.load.image('button', 'assets/sprites/blue_button04.png');
        this.load.image('button_hover', 'assets/sprites/blue_button05.png');

        // Tic Tac Toe Assets
        this.load.image('X', 'assets/sprites/X.png');
        this.load.image('O', 'assets/sprites/O.png');
        this.load.image('board', 'assets/sprites/board.png');

        // Cards clubs
        this.load.image('2-clubs', 'assets/cards/2-clubs.png');
        this.load.image('3-clubs', 'assets/cards/3-clubs.png');
        this.load.image('4-clubs', 'assets/cards/4-clubs.png');
        this.load.image('5-clubs', 'assets/cards/5-clubs.png');
        this.load.image('6-clubs', 'assets/cards/6-clubs.png');
        this.load.image('7-clubs', 'assets/cards/7-clubs.png');
        this.load.image('8-clubs', 'assets/cards/8-clubs.png');
        this.load.image('9-clubs', 'assets/cards/9-clubs.png');
        this.load.image('10-clubs', 'assets/cards/10-clubs.png');
        this.load.image('A-clubs', 'assets/cards/A-clubs.png');
        this.load.image('J-clubs', 'assets/cards/J-clubs.png');
        this.load.image('Q-clubs', 'assets/cards/Q-clubs.png');
        this.load.image('K-clubs', 'assets/cards/K-clubs.png');

        // Cards diamonds
        this.load.image('2-diamonds', 'assets/cards/2-diamonds.png');
        this.load.image('3-diamonds', 'assets/cards/3-diamonds.png');
        this.load.image('4-diamonds', 'assets/cards/4-diamonds.png');
        this.load.image('5-diamonds', 'assets/cards/5-diamonds.png');
        this.load.image('6-diamonds', 'assets/cards/6-diamonds.png');
        this.load.image('7-diamonds', 'assets/cards/7-diamonds.png');
        this.load.image('8-diamonds', 'assets/cards/8-diamonds.png');
        this.load.image('9-diamonds', 'assets/cards/9-diamonds.png');
        this.load.image('10-diamonds', 'assets/cards/10-diamonds.png');
        this.load.image('A-diamonds', 'assets/cards/A-diamonds.png');
        this.load.image('J-diamonds', 'assets/cards/J-diamonds.png');
        this.load.image('Q-diamonds', 'assets/cards/Q-diamonds.png');
        this.load.image('K-diamonds', 'assets/cards/K-diamonds.png');

        // Cards Hearts
        this.load.image('2-hearts', 'assets/cards/2-hearts.png');
        this.load.image('3-hearts', 'assets/cards/3-hearts.png');
        this.load.image('4-hearts', 'assets/cards/4-hearts.png');
        this.load.image('5-hearts', 'assets/cards/5-hearts.png');
        this.load.image('6-hearts', 'assets/cards/6-hearts.png');
        this.load.image('7-hearts', 'assets/cards/7-hearts.png');
        this.load.image('8-hearts', 'assets/cards/8-hearts.png');
        this.load.image('9-hearts', 'assets/cards/9-hearts.png');
        this.load.image('10-hearts', 'assets/cards/10-hearts.png');
        this.load.image('A-hearts', 'assets/cards/A-hearts.png');
        this.load.image('J-hearts', 'assets/cards/J-hearts.png');
        this.load.image('Q-hearts', 'assets/cards/Q-hearts.png');
        this.load.image('K-hearts', 'assets/cards/K-hearts.png');

        // Cards Spades
        this.load.image('2-spades', 'assets/cards/2-spades.png');
        this.load.image('3-spades', 'assets/cards/3-spades.png');
        this.load.image('4-spades', 'assets/cards/4-spades.png');
        this.load.image('5-spades', 'assets/cards/5-spades.png');
        this.load.image('6-spades', 'assets/cards/6-spades.png');
        this.load.image('7-spades', 'assets/cards/7-spades.png');
        this.load.image('8-spades', 'assets/cards/8-spades.png');
        this.load.image('9-spades', 'assets/cards/9-spades.png');
        this.load.image('10-spades', 'assets/cards/10-spades.png');
        this.load.image('A-spades', 'assets/cards/A-spades.png');
        this.load.image('J-spades', 'assets/cards/J-spades.png');
        this.load.image('Q-spades', 'assets/cards/Q-spades.png');
        this.load.image('K-spades', 'assets/cards/K-spades.png');
    };

    create = () => {
        this.scene.start('tictactoe');
    }
}

export default Preload;