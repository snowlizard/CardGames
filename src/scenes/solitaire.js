import { Scene } from "phaser";
import { Button } from '../mixins/button';
import { deck, randomCardIndex } from '../mixins/deck';

class Solitaire extends Scene{
    /**
     * Phaser scene of the card game solitaire
     */
    constructor(){
        super('solitaire');
        this.playerCards = { 'card1': [300, 400], 'card2': [390, 400]};
        this.dealerCards = { 'card1': [300, 100], 'card2': [390, 100]};
        this.newCardXcoords = [390];
        this.newDealerXcoord= [390];
        this.temporaryCards = [];
        this.playerTotal = 0;
        this.dealerTotal = 0;
        this.round_over  = false;
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
        this.dealerCard1 = this.add.image(this.dealerCards.card1[0], this.dealerCards.card1[1],deck[this.dealerIndex1][0]).setScale(0.8);
        this.dealerCard2 = this.add.image(this.dealerCards.card2[0], this.dealerCards.card2[1],deck[this.dealerIndex2][0]).setScale(0.8);
        this.dealerTotal = deck[this.dealerIndex1][1] + deck[this.dealerIndex2][1];

        // give player another card
        this.Hit = new Button(this, 100, 350, 'Hit', () => {
            let tmpIndex = randomCardIndex();
            let tmpCard = this.add.image(this.newCardXcoords[this.newCardXcoords.length -1] + 20, 400, deck[tmpIndex][0]).setScale(0.8);
            this.newCardXcoords.push(this.newCardXcoords[this.newCardXcoords.length - 1] + 20);
            this.playerTotal += deck[tmpIndex][1];
            this.temporaryCards.push(tmpCard);
        });

        // Dealer takes turn
        this.Stand = new Button(this, 100, 410, 'Stand', () => {
            if (this.dealerTotal >= 17 ){
                this.round_over = true;
            }else{
                while (this.dealerTotal < 17){
                    let tempIndex = randomCardIndex()
                    let tempCard  = this.add.image(this.newDealerXcoord[this.newDealerXcoord.length -1] + 20, 100, deck[tempIndex][0]).setScale(0.8);
                    this.newDealerXcoord.push(this.newDealerXcoord[this.newDealerXcoord.length - 1] + 20);
                    this.temporaryCards.push(tempCard)
                    this.dealerTotal += deck[tempIndex][1]
                };
                this.round_over = true;
            }

        });

        console.log(this.playerTotal)
    };


    update = () => {
        if(this.playerTotal > 21){
            this.Hit.disableInteractive();
            this.Hit.tint = 0.5;
        }
        if(this.round_over){
            this.Hit.setInteractive();
            if(this.playerTotal == 21) console.log("Blackjack")
            else if (this.playerTotal > 21 && this.dealerTotal > 21 ) console.log("It's a draw")
            else if (this.playerTotal > 21) console.log("You lose")
            else if (this.dealerTotal > 21) console.log("You win")
            else if (this.playerTotal > this.dealerTotal) console.log("You win")
            else console.log("You lose")
            this.temporaryCards.forEach( card => {
                card.destroy()
            });

            // Reset Everything
            this.newCardXcoords = [390];
            this.newDealerXcoord= [390];
            this.temporaryCards = [];
            this.playerTotal = 0;
            this.dealerTotal = 0;
            this.round_over  = false;
            
            this.playerCard1.destroy()
            this.playerCard2.destroy()
            this.dealerCard1.destroy()
            this.dealerCard2.destroy()

            this.playerIndex1 = randomCardIndex();
            this.playerIndex2 = randomCardIndex();
            this.playerCard1 = this.add.image(this.playerCards.card1[0], this.playerCards.card1[1], deck[this.playerIndex1][0]).setScale(0.8);
            this.playerCard2 = this.add.image(this.playerCards.card2[0], this.playerCards.card2[1], deck[this.playerIndex2][0]).setScale(0.8);
            this.playerTotal = deck[this.playerIndex1][1] + deck[this.playerIndex2][1];

            this.dealerIndex1 = randomCardIndex();
            this.dealerIndex2 = randomCardIndex();
            this.dealerCard1 = this.add.image(this.dealerCards.card1[0], this.dealerCards.card1[1],deck[this.dealerIndex1][0]).setScale(0.8);
            this.dealerCard2 = this.add.image(this.dealerCards.card2[0], this.dealerCards.card2[1],deck[this.dealerIndex2][0]).setScale(0.8);
            this.dealerTotal = deck[this.dealerIndex1][1] + deck[this.dealerIndex2][1];
        }
    }
};

export default Solitaire;


/*
this.playerIndex1 = randomCardIndex();
this.playerIndex2 = randomCardIndex();
this.playerCard1.setTexture(deck[this.playerIndex1][0]);
this.playerCard2.setTexture(deck[this.playerIndex2][0]);
*/