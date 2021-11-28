import Phaser from "phaser";
import { deck, randomCardIndex } from "../mixins/deck";


export class RandomCard extends Phaser.GameObjects.Image{
    constructor(scene, x, y){
        super(scene, x, y);

        this.scene = scene;
        this.setX = x;
        this.setY = y;
        this.setScale(1.5);
        this.scene.add.existing(this);
        this.index = randomCardIndex();
        this.setTexture(deck[this.index][0]);
        this.setData('value', deck[this.index][1]);
    };
}