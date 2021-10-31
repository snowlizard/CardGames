import { Scene } from "phaser";
import { Button } from '../mixins/button';
import { deck, randomCardIndex } from '../mixins/deck';

class Solitaire extends Scene{
    constructor(){
        super('solitaire');
        this.playerCards = { 'card1': [300, 400], 'card2': [390, 400]};
        this.dealerCards = { 'card1': [300, 100], 'card2': [390, 100]};
        this.newCardXcoords = [390];
        this.playerTotal = 0;
        this.dealerTotal = 0;
    };

    create = () => {
        // Player cards 
        this.playerIndex1 = randomCardIndex();
        this.playerIndex2 = randomCardIndex();
        this.playerCard1 = this.add.image(this.playerCards.card1[0], this.playerCards.card1[1], deck[this.playerIndex1][0]).setScale(0.8);
        this.playerCard2 = this.add.image(this.playerCards.card2[0], this.playerCards.card2[1], deck[this.playerIndex2][0]).setScale(0.8);
        this.playerTotal = deck[this.playerIndex1][1] + deck[this.playerIndex2][1];

        // Dealer cards
        this.dealerIndex1 = randomCardIndex();
        this.dealerIndex2 = randomCardIndex();
        this.add.image(this.dealerCards.card1[0], this.dealerCards.card1[1],deck[this.dealerIndex1][0]).setScale(0.8);
        this.add.image(this.dealerCards.card2[0], this.dealerCards.card2[1],deck[this.dealerIndex2][0]).setScale(0.8);

        this.HIT = new Button(this, 100, 350, 'Hit', () => {
            let tmpIndex = randomCardIndex();
            this.add.image(this.newCardXcoords[this.newCardXcoords.length -1] + 20, 400, deck[tmpIndex][0]).setScale(0.8);
            this.newCardXcoords.push(this.newCardXcoords[this.newCardXcoords.length - 1] + 20);
            this.playerTotal += deck[tmpIndex][1];
            console.log(this.newCardXcoords, this.playerTotal);
        });

        console.log(this.playerTotal)
    };


    update = () => {

    }
};

export default Solitaire;


/*
this.playerIndex1 = randomCardIndex();
this.playerIndex2 = randomCardIndex();
this.playerCard1.setTexture(deck[this.playerIndex1][0]);
this.playerCard2.setTexture(deck[this.playerIndex2][0]);
*/