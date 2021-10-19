import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor(){
        super('preload');
    };

    preload = () => {
        // Buttons
        this.load.image('button', 'assets/sprites/blue_button04.png');
        this.load.image('button_hover', 'assets/sprites/blue_button05.png')
    };

    create = () => {
        this.scene.start('menu');
    }
}

export default Preload;