import { Scene } from "phaser";
import { RandomCard } from "../entities/randomCard";
import { Button } from '../mixins/button';

class Blackjack extends Scene{
    /**
     * Phaser scene of the card game solitaire
     */
    constructor(){
        super('blackjack');
        this.playerCardsXY = [300, 400, 390, 400];
        this.dealerCardsXY = [300, 100, 390, 100];
        this.newCardXcoords = [390];
        this.newDealerX     = [390];
        this.temporaryCards = [];
        this.playerTotal = 0;
        this.dealerTotal = 0;
        this.round_over  = false;
    };

    create = () => {
        // X Y coordinates for game results
        this.X = this.cameras.main.centerX;
        this.Y = this.cameras.main.centerY;
        this.gameResult = this.gameResult = this.add.text(this.X, this.Y, "",{ font: '32px times' });
        this.gameResult.setVisible(false).setOrigin(0.5);

        // Card groups
        this.cards = this.add.group({classType: RandomCard});
        this.dealerCards = this.add.group({classType: RandomCard});

        // list of group children (cards)
        this.playerCardList = this.cards.getChildren();
        this.dealerCardList = this.dealerCards.getChildren();

        // Player cards 
        this.cards.add(new RandomCard(this, this.playerCardsXY[0], this.playerCardsXY[1]));
        this.cards.add(new RandomCard(this, this.playerCardsXY[2], this.playerCardsXY[3]));
        this.playerTotal = this.playerCardList[0].getData('value') + this.playerCardList[1].getData('value');

        // Dealer cards
        this.dealerCards.add(new RandomCard(this, this.dealerCardsXY[0], this.dealerCardsXY[1]));
        this.dealerCards.add(new RandomCard(this, this.dealerCardsXY[2], this.dealerCardsXY[3]));
        this.dealerTotal = this.dealerCardList[0].getData('value') + this.dealerCardList[1].getData('value');

        if(this.playerTotal >= 21) this.round_over = true;
        
        // give player another card
        // need to add logic for ace
        this.Hit = new Button(this, 100, 350, 'Hit', () => {
            if(this.playerTotal >= 21) this.round_over = true;
            else{
                // each new cards has an X offset of +20 so the previous cards number can be visible
                // add offset to the last card in the current hand
                this.cards.add(new RandomCard(this, this.newCardXcoords[this.newCardXcoords.length - 1] + 20, this.playerCardsXY[1]));
                this.newCardXcoords.push(this.newCardXcoords[this.newCardXcoords.length - 1] + 20);
                this.playerTotal += this.playerCardList[this.playerCardList.length -1].getData('value');
                if(this.playerTotal >= 21) this.round_over = true;
            };
        });

        // Player ends turn
        this.Stand = new Button(this, 100, 410, 'Stand', () => {
            this.round_over = true;
        });
        
        // Play again button - for some reason extra cards not resetting
        this.playAgain = new Button(this, 100, 290, 'Reset', () => {

            // reset all values to those of the start of the game
            this.gameResult.setVisible(false);
            this.newCardXcoords = [390];
            this.newDealerX     = [390];
            this.temporaryCards = [];
            this.playerTotal = 0;
            this.dealerTotal = 0;
            this.round_over  = false;

            // remove all cards (children) from the group - empty and clear the group
            this.cards.clear(true);
            this.dealerCards.clear(true);

            this.playerCardList = this.cards.getChildren();
            this.dealerCardList = this.dealerCards.getChildren();

            // Give player 2 new cards
            this.cards.add(new RandomCard(this, this.playerCardsXY[0], this.playerCardsXY[1]));
            this.cards.add(new RandomCard(this, this.playerCardsXY[2], this.playerCardsXY[3]));
            this.playerTotal = this.playerCardList[0].getData('value') + this.playerCardList[1].getData('value');

            // Give dealer 2 new cards
            this.dealerCards.add(new RandomCard(this, this.dealerCardsXY[0], this.dealerCardsXY[1]));
            this.dealerCards.add(new RandomCard(this, this.dealerCardsXY[2], this.dealerCardsXY[3]));
            this.dealerTotal = this.dealerCardList[0].getData('value') + this.dealerCardList[1].getData('value');

        });
    };


    update = () => {
        if(this.round_over){
            // dealer takes turn
            while (this.dealerTotal < 17){
                let newX = this.newDealerX[ this.newDealerX.length -1 ] + 20;
                this.dealerCards.add(new RandomCard(this, newX, this.dealerCardsXY[1]), true);
                this.newDealerX.push(newX);
                this.dealerTotal += this.dealerCardList[this.dealerCardList.length - 1].getData('value');
            };

            if( this.dealerTotal == this.playerTotal ){
                this.gameResult.setText("It's a draw!").setVisible(true);
            }
            else if ( this.playerTotal == 21 ){
                this.gameResult.setText("21, you win!").setVisible(true);
            }
            else if ( this.dealerTotal == 21 ){
                this.gameResult.setText("Dealer has 21, you lose!").setVisible(true);
            }
            else if ( this.playerTotal > 21 && this.dealerTotal > 21 ){
                this.gameResult.setText("All players bust!").setVisible(true);
            }
            else if ( this.playerTotal > 21 && this.dealerTotal <= 21 ){
                this.gameResult.setText("You lose!").setVisible(true);
            }
            else if ( this.playerTotal <= 21 && this.dealerTotal > 21 ){
                this.gameResult.setText("You win").setVisible(true);
            }
            else if ( this.playerTotal > this.dealerTotal ){
                this.gameResult.setText("You win!").setVisible(true);
            }
            else{
                this.gameResult.setText("You lose!").setVisible(true);
            }
        }
    }
};

export default Blackjack;
