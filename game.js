const toastLive = document.getElementById('liveToast');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);

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
        let resultMessage = '';

        if (this.player.bust) {
            resultMessage = 'Player Busts! Dealer Wins!';
        } else if (this.dealer.bust) {
            resultMessage = 'Dealer Busts! Player Wins!';
        } else if (this.player.score > this.dealer.score) {
            resultMessage = 'Player Wins!';
        } else if (this.dealer.score > this.player.score) {
            resultMessage = 'Dealer Wins!';
        } else {
            resultMessage = 'It\'s a Tie!';
        }

        return resultMessage;  // Return the result to be displayed in main.js
    }
}