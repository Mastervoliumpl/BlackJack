let game;
let cardStylePath = 'CircuitWhiteCards/'; // Default card style

const toastLive = document.getElementById('liveToast');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);

window.onload = function () {
    game = new Game();
};

function startNewGame() {
    game = new Game(cardStylePath);  // Pass cardStylePath when starting
    game.startNewGame();
    updateUI();
}

function playerHit() {
    game.playerHit();
    updateUI();
    if (game.gameOver) {
        displayEndMessage();
    }
}

function playerStand() {
    game.dealerPlay();
    updateUI();
    if (game.gameOver) {
        displayEndMessage();
    }
}

function chooseCardStyle() {
    cardStylePath = document.getElementById('card-style').value; // Update cardStylePath
    game = new Game(cardStylePath);  // Update the deck with the new style
}

function createCardElement(card) {
    const cardElement = document.createElement('img');
    cardElement.src = card.imagePath;
    return cardElement;
}

function updateUI() {
    const playerHandElement = document.getElementById('player-hand');
    const dealerHandElement = document.getElementById('dealer-hand');

    document.getElementById('player-score').textContent = game.player.score;
    // Only show the full dealer score if the game is over
    if (game.gameOver) {
        document.getElementById('dealer-score').textContent = game.dealer.score;
    } else {
        // Only show the value of the second dealer card (hide the first card's value)
        const visibleDealerCardValue = game.dealer.hand[1].numericValue;
        document.getElementById('dealer-score').textContent = visibleDealerCardValue;
    }

    // Clear previous cards
    playerHandElement.innerHTML = '';
    dealerHandElement.innerHTML = '';

    // Render player cards
    game.player.hand.forEach(card => {
        playerHandElement.appendChild(createCardElement(card));
    });

    // Render dealer cards
    game.dealer.hand.forEach((card, index) => {
        const cardElement = document.createElement('img');

        // Hide the first card of the dealer
        if (index === 0 && !game.gameOver) {
            cardElement.src = `${game.deck.cardStylePath}BOC.jpg`;
        } else {
            cardElement.src = card.imagePath;  // Show card image
        }

        dealerHandElement.appendChild(cardElement);
    });
}

function displayEndMessage() {
    const message = game.endGame(); // Get the result message from the game logic
    document.getElementById('toast-body').textContent = message;
    toastBootstrap.show();
}