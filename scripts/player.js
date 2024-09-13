export class Player {
    constructor() {
        this.hand = [];
        this.score = 0;
        this.bust = false;
    }

    addCard(card) {
        this.hand.push(card);
        this.calculateScore();
    }

    calculateScore() {
        let aces = 0;
        console.log('calculating score');
        this.score = this.hand.reduce((acc, card) => { // reduce method to sum the numeric value of each card in the hand, acc is the accumulator (Keeps accumulating the sum of the cards), card is the current card being iterated
            if (card.value === 'Ace') aces++;
            return acc + card.numericValue; // returns the sum of the accumulator and the numeric value of the current card
        }, 0); // 0 is the initial value of the accumulator

        while (this.score > 21 && aces > 0) {
            this.score -= 10;
            aces--;
        }

        this.bust = this.score > 21;
    }
}