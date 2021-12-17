import { Scene } from "phaser";
import { Button } from "../mixins/button";


const FONT  = {font: "6em Courier", fill: "white"};

class Menu extends Scene {
    constructor(){
        super('menu');
    };

    create = () => {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        const Text = this.add.text(centerX, 50, "Games")
        .setOrigin(0.5)
        .setStyle(FONT);

        this.blackjack = this.add.image(centerX - 200, centerY, '21');
        this.tictactoe = this.add.image(centerX + 200, centerY, 'xo');

        this.blackjack.setInteractive({useHandCursor:true}).on('pointerdown', () => {
            this.scene.start('blackjack');
        });

        this.tictactoe.setInteractive({useHandCursor:true}).on('pointerdown', () => {
            this.scene.start('tictactoe');
        });

    }


}

export default Menu;