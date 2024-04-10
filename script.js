// Array to hold the numbers
let numbers = [1, 2, 3, 4, 5, 6];
let currentPlayer = 1;
let player1Choices = [];
let player2Choices = [];

// Function to shuffle the numbers array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to initialize the cards with shuffled numbers
function initializeCards() {
    shuffle(numbers);
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const front = card.querySelector('.front');
        const back = card.querySelector('.back');
        front.style.transform = "rotateY(0deg)";
        back.style.transform = "rotateY(180deg)";
        front.textContent = "?"; // Initial state before reveal
        back.textContent = numbers[index];
        card.classList.remove('revealed', 'p1'); // Reset card classes
        card.style.backgroundColor = ""; // Reset card color
    });
    currentPlayer = 1; // Reset to player 1's turn
    player1Choices = [];
    player2Choices = [];
    updateTurnInfo();
}

// Function to reveal the number on card click
function revealNumber(event) {
    const card = event.target.closest('.card');
    if (!card.classList.contains('revealed')) {
        card.classList.add('revealed');
        const front = card.querySelector('.front');
        const back = card.querySelector('.back');
        front.style.transform = "rotateY(180deg)";
        back.style.transform = "rotateY(0deg)";
        const number = numbers[parseInt(card.id.slice(-1)) - 1];
        if (currentPlayer === 1) {
            player1Choices.push(number);
            card.classList.add('p1'); // Mark as player 1's card
        } else {
            player2Choices.push(number);
        }
        currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch player
        updateTurnInfo();
    }
}

// Function to update turn information display
function updateTurnInfo() {
    document.getElementById('turnInfo').textContent = `Player ${currentPlayer}'s turn`;
    document.getElementById('player1Choices').textContent = `Player 1: ${player1Choices.join(', ')}`;
    document.getElementById('player2Choices').textContent = `Player 2: ${player2Choices.join(', ')}`;
}

// Event listener for card clicks
document.querySelectorAll('.front').forEach(card => {
    card.addEventListener('click', revealNumber);
});

// Event listener for reset button click
document.getElementById('resetBtn').addEventListener('click', initializeCards);

// Initialize cards on page load
initializeCards();
