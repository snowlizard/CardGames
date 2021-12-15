import { Scene } from "phaser";
import { RandomCard } from "../entities/randomCard";
import { Button } from '../mixins/button';

class Blackjack extends Scene{
    /**
     * Phaser scene of the card game solitaire
     * this.x/y +- number are for offsetting game items
     * from the center of the screen
     */
    constructor(){
        super('blackjack');
        this.temporaryCards = [];
        this.playerTotal = 0;
        this.dealerTotal = 0;
        this.round_over  = false;
    };

    create = () => {
        this.X = this.cameras.main.centerX;
        this.Y = this.cameras.main.centerY;

        // load dealer image
        this.dealer = this.add.image(this.X - 350, this.Y - 300, 'dealer');

        this.playerCardsXY = [this.X - 20, this.Y + 200, this.X + 140, this.Y + 200];
        this.dealerCardsXY = [this.X - 20, this.Y - 200, this.X + 140, this.Y - 200];
        this.newCardXcoords = [this.X + 140];
        this.newDealerX     = [this.X + 140];

        this.gameResult = this.gameResult = this.add.text(this.X + 30, this.Y, "",{ font: '32px times' });
        this.gameResult.setVisible(false).setOrigin(0.5);

        // Labels
        this.add.text(this.X, this.Y + 320, 'Player Cards', {font:'18px times'});
        this.add.text(this.X, this.Y - 330, 'Dealer Cards', {font:'18px times'});

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
        this.Hit = new Button(this, this.X - 250, this.Y, 'Hit', () => {
            if(this.playerTotal >= 21) this.round_over = true;
            else{
                // each new cards has an X offset of +20 so the previous cards number can be visible
                // add offset to the last card in the current hand
                this.cards.add(new RandomCard(this, this.newCardXcoords[this.newCardXcoords.length - 1] + 40, this.playerCardsXY[1]));
                this.newCardXcoords.push(this.newCardXcoords[this.newCardXcoords.length - 1] + 30);
                this.playerTotal += this.playerCardList[this.playerCardList.length -1].getData('value');
                if( this.playerTotal > 21){
                    this.playerCardList.forEach( card => {
                        if(card.getData('value') == 11){
                            this.playerTotal -= 10
                            console.log(this.playerTotal)
                        }
                    });
                }
                if(this.playerTotal >= 21) this.round_over = true;
            };
        });

        // Player ends turn
        this.Stand = new Button(this, this.X - 250, this.Y + 65, 'Stand', () => {
            this.round_over = true;
        });
        
        // Play again button - for some reason extra cards not resetting
        this.playAgain = new Button(this, this.X - 250, this.Y -65, 'Reset', () => {

            // reset all values to those of the start of the game
            this.gameResult.setVisible(false);
            this.newCardXcoords = [this.X + 140];
            this.newDealerX     = [this.X + 140];
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
                let newX = this.newDealerX[ this.newDealerX.length -1 ] + 40;
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
