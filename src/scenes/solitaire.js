import { Scene } from "phaser";
import { RandomCard } from "../entities/randomCard";
import { Button } from '../mixins/button';
import { deck, randomCardIndex } from '../mixins/deck';

class Solitaire extends Scene{
    /**
     * Phaser scene of the card game solitaire
     */
    constructor(){
        super('solitaire');
        this.playerCardsXY = [300, 400, 390, 400];
        this.dealerCardsXY = [300, 100, 390, 100];
        this.newCardXcoords = [390];
        this.newDealerXcoord= [390];
        this.temporaryCards = [];
        this.playerTotal = 0;
        this.dealerTotal = 0;
        this.round_over  = false;

    };

    create = () => {
        // Card groups
        this.cards = this.add.group({classType: RandomCard})
        this.playerCardList = this.cards.getChildren()

        this.dealerCards = this.add.group({classType: RandomCard});
        this.dealerCardList = this.dealerCards.getChildren()

        // Player cards 
        this.cards.add(new RandomCard(this, this.playerCardsXY[0], this.playerCardsXY[1]));
        this.cards.add(new RandomCard(this, this.playerCardsXY[2], this.playerCardsXY[3]));
        this.playerTotal = this.playerCardList[0].getData('value') + this.playerCardList[1].getData('value');

        // Dealer cards
        this.dealerCards.add(new RandomCard(this, this.dealerCardsXY[0], this.dealerCardsXY[1]));
        this.dealerCards.add(new RandomCard(this, this.dealerCardsXY[2], this.dealerCardsXY[3]));
        this.dealerTotal = this.dealerCardList[0].getData('value') + this.dealerCardList[1].getData('value');

        // give player another card
        // need to add logic for ace
        this.Hit = new Button(this, 100, 350, 'Hit', () => {
            let tmpIndex = randomCardIndex();
            let tmpCard = this.add.image(this.newCardXcoords[this.newCardXcoords.length -1] + 20, 400, deck[tmpIndex][0]).setScale(0.8);
            this.newCardXcoords.push(this.newCardXcoords[this.newCardXcoords.length - 1] + 20);
            this.playerTotal += deck[tmpIndex][1];
            this.temporaryCards.push(tmpCard);

            if(this.playerTotal > 21) this.round_over = true
        });

        // Dealer takes turn
        this.Stand = new Button(this, 100, 410, 'Stand', () => {
            this.round_over = true;
        });

        console.log(this.playerTotal)
    };


    update = () => {
        if(this.playerTotal > 21){
            this.Hit.disableInteractive();
            this.Hit.tint = 0.5;
        }
        if(this.round_over){
            // Dealer takes turn
            while (this.dealerTotal < 17){
                let tempIndex = randomCardIndex()
                let tempCard  = this.add.image(this.newDealerXcoord[this.newDealerXcoord.length -1] + 20, 100, deck[tempIndex][0]).setScale(0.8);
                this.newDealerXcoord.push(this.newDealerXcoord[this.newDealerXcoord.length - 1] + 20);
                this.temporaryCards.push(tempCard)
                this.dealerTotal += deck[tempIndex][1]
            };
            
            this.Hit.setInteractive();
            if(this.playerTotal == 21) console.log("Blackjack")
            else if (this.playerTotal > 21 && this.dealerTotal > 21 ) console.log("It's a draw")
            else if (this.playerTotal > 21) console.log("You lose")
            else if (this.dealerTotal > 21) console.log("You win")
            else if (this.playerTotal > this.dealerTotal) console.log("You win")
            else console.log("You lose")
        }

        if(this.reset){
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
