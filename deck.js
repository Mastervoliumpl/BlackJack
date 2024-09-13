class Deck {
    constructor(cardStylePath) {
        this.cardStylePath = cardStylePath;
        this.cards = this.createDeck();
        this.shuffleDeck();
    }

    createDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
        let deck = [];
        for (let suit of suits) {
            for (let value of values) {
                let numericValue = this.getNumericValue(value);
                const imagePath = `${this.cardStylePath}${suit[0]}${value[0]}.jpg`;
                deck.push(new Card(suit, value, numericValue, imagePath));
            }
        }
        return deck;
    }

    getNumericValue(value) {
        if (value === 'Ace') return 11;
        if (value === 'Jack' || value === 'Queen' || value === 'King') return 10;
        return parseInt(value);
    }

    // Fisher–Yates shuffle
    shuffleDeck() {
        console.log('shuffling deck');
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    drawCard() {
        return this.cards.pop();
    }
}