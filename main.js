let deck = [];
let cardStylePath = '';
let gameOver = false;
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let playerBust = false;
let dealerBust = false;

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
        dealerPlay()
    }
}

function stand() {
    if (playerTurn && !gameOver) {
        playerTurn = false;
        console.log('player stand, turn:', playerTurn);
        updateScores();
        updateHands();
        dealerPlay();
    }
}

function dealerPlay() {
    updateScores();
    updateHands();
    console.log('dealer play, score:', dealerScore);
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        dealerScore = calculateScore(dealerHand);
    }
    if (dealerScore > 21) {
        dealerBust = true;
        endGame();
    }
    updateScores();
    updateHands();
    playerTurn = true;
}

function endGame() {
    console.log('game over');
    updateScores();
    updateHands();
    gameOver = true;
    
}

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {

            card = { 
                cardSuit:suit,
                cardValue:value,
                cardName: `${value} of ${suit}`,
                cardImage: `${cardStylePath}${suit[0]}${value[0]}.jpg`
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
        let value = card.cardValue;
        if (value === 'Jack' || value === 'Queen' || value === 'King') {
            score += 10;
        } else if (value === 'Ace') {
            aces++;
            score += 11;
        } else {
            score += parseInt(value);
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
    document.getElementById('dealer-score').textContent = dealerScore;
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

    dealerHand.forEach(card => {
        let cardElement = document.createElement('img');
        cardElement.src = card.cardImage;;
        dealerHandElement.appendChild(cardElement);
    });
}