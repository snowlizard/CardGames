import Phaser, { Game } from 'phaser';
import Menu from './scenes/menu';
import Preload from './scenes/preload';
import Blackjack from './scenes/blackjack';

const canvas = document.getElementById('app');
const config = {
    type: Phaser.WEBGL,
    width: 680,
    height: 480,
    canvas,
    backgroundColor:"#228B22",
    physics: {
        default: 'arcade'
    },
    scene: [
        Preload,
        Blackjack,
        Menu
    ]
};

const game = new Game(config); 