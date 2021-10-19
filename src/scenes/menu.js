import { Scene } from "phaser";
import { Button } from "../mixins/button";


class Menu extends Scene {
    constructor(){
        super('menu');
    };

    create = () => {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const Text = this.add.text(centerX, centerY - 25, "Solitaire")
        .setOrigin(0.5)
        .setStyle({
            font:'6em Times',
            fill: 'white'
        });

        const Start = new Button(this, centerX, centerY + 35, "Start", () => {

        })
    }


}

export default Menu;