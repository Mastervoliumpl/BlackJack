let deck = [];
let cardStylePath = '';
let gameOver = false;
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let playerBust = false;
let dealerBust = false;
let playerStand = false;
let playerTurn = true;

const toastLive = document.getElementById('liveToast');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);

function chooseCardStyle() {
    let cardStyle = document.getElementById('card-style').value;
    cardStylePath = `${cardStyle}/`;
    console.log(cardStylePath);
}

function startNewGame() {
    resetGame();
    deck = createDeck();
    shuffleDeck(deck);
    for (let i = 0; i < 2; i++) { // iterates twice to deal two cards to each player 1 at a time
        dealerHand.push(deck.pop());
        playerHand.push(deck.pop());
    }
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
    playerTurn = true;
    gameOver = false;
    updateScores();
    updateHands();
}

function resetGame() {
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    playerBust = false;
    dealerBust = false;
    playerTurn = true;
    gameOver = false;
}

function hit() {
    updateScores();
    updateHands();
    if (playerTurn && !gameOver) {
        playerHand.push(deck.pop());
        playerScore = calculateScore(playerHand);
        if (playerScore > 21) {
            playerBust = true;
            endGame();
        }
        console.log('player hit, score:', playerScore);
        updateScores();
        updateHands();
    }
}

function stand() {
    if (playerTurn && !gameOver) {
        playerStand = true;
        playerTurn = false;
        console.log('player stand, turn:', playerTurn);
        updateScores();
        updateHands();
        dealerPlay();
    }
}

function dealerPlay() {
    console.log('dealer play, score:', dealerScore);
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        dealerScore = calculateScore(dealerHand);
    }
    if (dealerScore > 21) {
        dealerBust = true;
        endGame();
    } else if (dealerScore <= playerScore) {
        endGame();
    }
    updateScores();
    updateHands();
    playerStand = false;
    playerTurn = true;
}

function endGame() {
    console.log('game over');
    gameOver = true;
    updateScores();
    updateHands();
    if (playerBust) {
        document.getElementById('toast-body').textContent = 'Player Busts! Dealer Wins!';
        toastBootstrap.show();
    } else if (dealerBust) {
        document.getElementById('toast-body').textContent = 'Dealer Busts! Player Wins!';
        toastBootstrap.show();
    } else if (playerScore > dealerScore) {
        document.getElementById('toast-body').textContent = 'Player Wins!';
        toastBootstrap.show();
    } else if (dealerScore > playerScore) {
        document.getElementById('toast-body').textContent = 'Dealer Wins!';
        toastBootstrap.show();
    } else if (dealerscore === playerscore) {
        document.getElementById('toast-body').textContent = 'It\'s a Tie!';
        toastBootstrap.show();
    }
}

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            let NumericValue = 0;
            if (value === 'Jack' || value === 'Queen' || value === 'King') {
                NumericValue = 10;
            } else if (value === 'Ace') {
                NumericValue = 11;
            } else {
                NumericValue = parseInt(value);
            }
            card = {
                cardSuit: suit,
                cardValue: value,
                cardName: `${value} of ${suit}`,
                cardImage: `${cardStylePath}${suit[0]}${value[0]}.jpg`,
                cardStyle: `${cardStylePath}`,
                cardNumericValue: NumericValue
            }

            deck.push(card);
            console.log(card);
        }
    }
    console.log('created deck');
    return deck;
}

// Fisher–Yates shuffle
function shuffleDeck(deck) {
    console.log('shuffling deck');
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    console.log('calculating score');
    for (let card of hand) {
        score += card.cardNumericValue;
        if (card.cardValue === 'Ace') {
            aces++;
        }
    }
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    console.log('score:', score);
    updateScores();
    updateHands();
    return score;
}

function updateScores() {
    document.getElementById('player-score').textContent = playerScore;
    if (playerStand) {
        document.getElementById('dealer-score').textContent = dealerScore;
    } else {
        document.getElementById('dealer-score').textContent = dealerHand[1].cardNumericValue;
    }
}

function updateHands() {
    let playerHandElement = document.getElementById('player-hand');
    let dealerHandElement = document.getElementById('dealer-hand');

    playerHandElement.innerHTML = '';
    dealerHandElement.innerHTML = '';

    playerHand.forEach(card => {
        let cardElement = document.createElement('img');
        cardElement.src = card.cardImage;
        playerHandElement.appendChild(cardElement);
    });

    let cardAmmount = dealerHand.length;
    dealerHand.forEach((card, index) => {
        const cardElement = document.createElement('img');

        if (index === 0 && !playerStand) {
            cardElement.src = `${card.cardStyle}BOC.jpg`;
        } else {
            cardElement.src = card.cardImage;
        }

        dealerHandElement.appendChild(cardElement);
    });
}

class Card {
    constructor(suit, value, numericValue, imagePath) {
        this.suit = suit;
        this.value = value;
        this.numericValue = numericValue;
        this.imagePath = imagePath;
    }
}

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
        console.log('Getting Numeric Value');
        if (value === 'Ace') return 11;
        if (value === 'Jack' || value === 'Queen' || value === 'King') return 10;
        console.log('Numeric Value:', parseInt(value));
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

class Player {
    constructor() {
        this.hand = [];
        this.score = 0;
        this.bust = false;
    }

    calculateScore() {
        let score = 0;
        let aces = 0;
        console.log('calculating score');
        for (let card of this.hand) {
            score += card.numericValue;
            if (card.value === 'Ace') {
                aces++;
            }
        }
        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }
        console.log('score:', score);
        return score;
    }
}
