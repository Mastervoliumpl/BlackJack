class Game {
    constructor() {
        this.deck = new Deck(`CircuitWhiteCards/`); // creates a new deck with default card style
        this.player = new Player();
        this.dealer = new Player();
        this.gameOver = false;
    }

    startNewGame() {
        this.player = new Player();
        this.dealer = new Player();
        this.deck = new Deck(cardStylePath);
        this.dealInitialCards();
    }

    dealInitialCards() {
        for (let i = 0; i < 2; i++) {
            this.player.addCard(this.deck.drawCard());
            this.dealer.addCard(this.deck.drawCard());
        }
    }

    playerHit() {
        if (!this.gameOver) {
            this.player.addCard(this.deck.drawCard());
            if (this.player.bust) this.endGame();
        }
    }

    dealerPlay() {
        while (this.dealer.score < 17) {
            this.dealer.addCard(this.deck.drawCard());
        }
        this.endGame();
    }

    endGame() {
        this.gameOver = true;
        if (this.player.bust) {
            console.log('Player Busts! Dealer Wins!');
        } else if (this.dealer.bust) {
            console.log('Dealer Busts! Player Wins!');
        } else if (this.player.score > this.dealer.score) {
            console.log('Player Wins!');
        } else if (this.dealer.score > this.player.score) {
            console.log('Dealer Wins!');
        } else if (this.dealer.score === this.player.score) {
            console.log('It\'s a Tie!');
        }
    }
}