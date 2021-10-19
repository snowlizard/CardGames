import { Scene } from "phaser";


class Menu extends Scene {
    constructor(){
        super('menu');
    };

    create = () => {
        const Text = this.add.text(100, 100, "Hello Phaser");
    }


}

export default Menu;