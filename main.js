import Card from './card.js';
import Game from './game.js';
import Deck from './deck.js';
import Player from './player.js';

let game;

window.onload = function () {
    game = new Game();

    document.getElementById('new-game-button').addEventListener('click', startGame);
    document.getElementById('hit-button').addEventListener('click', playerHit);
    document.getElementById('stand-button').addEventListener('click', dealerPlay);
};

function startGame() {
    game.startNewGame();
    updateUI();
}

function playerHit() {
    game.playerHit();
    updateUI();
    if (game.gameOver) {
        displatEndMessage();
    }
}

function dealerPlay() {
    game.dealerPlay();
    updateUI();
    if (game.gameOver) {
        displayEndMessage();
    }
}

function updateUI() {
    updateScores();
    updateHands();
}

function updateScores() {
    document.getElementById('player-score').textContent = game.player.score;
    document.getElementById('dealer-score').textContent = game.dealer.score;
}

function updateHands() {
    updateHand(game.player.hand, 'player-hand');
    updateHand(game.dealer.hand, 'dealer-hand');

    playerHandElement.innerHTML = '';
    dealerHandElement.innerHTML = '';

    game.player.hand.forEach(card => {
        const cardElement = document.createElement('img');
        cardElement.src = card.imagePath;
        playerHandElement.appendChild(createCardElement(card));
    });

    game.dealer.hand.forEach(card => {
        const cardElement = document.createElement('img');
        if (index === 0 && !game.gameOver) {
            cardElement.src = '${game.deck.cardStylePath}/BOC.jpg';
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