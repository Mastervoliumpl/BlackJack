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
    updateUI();
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
    document.getElementById('dealer-score').textContent = game.dealer.score;

    // clears previous cards
    playerHandElement.innerHTML = '';
    dealerHandElement.innerHTML = '';

    game.player.hand.forEach(card => {
        playerHandElement.appendChild(createCardElement(card));
    });

    game.dealer.hand.forEach((card, index) => {
        const cardElement = document.createElement('img');
        if (index === 0 && !game.gameOver) {
            cardElement.src = `${cardStylePath}/BOC.jpg`;  // Hide the dealer's first card
        } else {
            cardElement.src = card.imagePath;
        }
        dealerHandElement.appendChild(createCardElement(card));
    });
}

function displayEndMessage() {
    const message = game.endGame(); // Get the result message from the game logic
    document.getElementById('toast-body').textContent = message;
    toastBootstrap.show();
}