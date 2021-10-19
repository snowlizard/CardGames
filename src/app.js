import Phaser, { Game } from 'phaser';
import Menu from './scenes/menu';

const canvas = document.getElementById('app');
const config = {
    type: Phaser.WEBGL,
    width: 680,
    height: 480,
    canvas,
    physics: {
        default: 'arcade'
    },
    scene: [
        Menu
    ]
};

const game = new Game(config); 