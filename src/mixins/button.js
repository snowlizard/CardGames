import Phaser from 'phaser';

export class Button extends Phaser.GameObjects.Sprite {
    /**
     * Phaser GameObjects Sprite
     * @param {Phaser.Scene} scene - The current phaser scene [Phaser.Scene]
     * @param {integer} x - X position for button
     * @param {integer} y - Y position for button
     * @param {string} text - Text to be displayed on button
     * @param {Function} callback - A function to be called when there is a click even
     */
    constructor(scene, x, y, text, callback ){
        super(scene, x, y, text);
        // Button Text
        this.setTexture('button')
        this.text = text
        scene.add.existing(this)

        this.txt = this.scene.add.text(0,0, this.text, {font: '4em Ariel', fill: 'white'}).setOrigin(0.5);
        this.txt.setX( this.getCenter().x)
            .setY( this.getCenter().y)
            .setScrollFactor(0,0);

        //Button Event
        this.setInteractive({useHandCursor: true})
            .on('pointerover', () => { this.setTexture('button_hover')
            this.txt.setStyle({fill:'blue'}) })
            .on('pointerout', () => { this.setTexture('button')
            this.txt.setStyle({fill:'white'}) })
            .on('pointerdown', () => { callback() })

    }

}