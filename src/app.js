import Phaser, { Game } from 'phaser';
import Menu from './scenes/menu';
import Preload from './scenes/preload';
import Blackjack from './scenes/blackjack';


const width = window.innerWidth * window.devicePixelRatio;
const height = 800;

const canvas = document.getElementById('app');
const config = {
    type: Phaser.WEBGL,
    width,
    height,
    canvas,
    backgroundColor:"#228B22",
    physics: {
        default: 'arcade'
    },
    scale: {
        zoom: 2,
        mode: Phaser.Scale.FIT,
        width,
        height
    },
    scene: [
        Preload,
        Blackjack,
        Menu
    ]
};

const game = new Game(config); 