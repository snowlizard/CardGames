import Phaser, { Game } from 'phaser';
import Menu from './scenes/menu';
import Preload from './scenes/preload';
import Blackjack from './scenes/blackjack';
import TicTacToe from './scenes/tictactoe';


const width = window.innerWidth * window.devicePixelRatio;
const height = window.innerHeight * window.devicePixelRatio;

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
        mode: Phaser.Scale.RESIZE,
        width,
        height
    },
    scene: [
        Preload,
        TicTacToe,
        Blackjack,
        Menu
    ]
};

const game = new Game(config); 