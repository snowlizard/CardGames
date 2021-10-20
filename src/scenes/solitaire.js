import { Scene } from "phaser";

class Solitaire extends Scene{
    constructor(){
        super('solitaire');
    };

    create = () => {
        this.add.image(100, 100, '2-spades');
    };
};

export default Solitaire;