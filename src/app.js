import Phaser, { Game } from 'phaser';
import Menu from './scenes/menu';
import Preload from './scenes/preload';
import Solitaire from './scenes/solitaire';

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
        Preload,
        Solitaire,
        Menu
    ]
};

const game = new Game(config); 