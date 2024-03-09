let timer;
let timeLeft = 1500; // Initial time: 25 minutes (25 * 60 seconds)
const initialTime = timeLeft;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

// Get reference to the Focus and Break buttons
const focusButton = document.getElementById('focusButton');
const breakButton = document.getElementById('breakButton');
const longBreakButton = document.getElementById('longBreakButton');

// Get references to the settings icon and the settings bar
const settingsIcon = document.getElementById('settingsIcon');
const settingsBar = document.getElementById('settingsBar');

// Event listener for the settings icon to toggle the settings bar visibility
settingsIcon.addEventListener('click', function() {
    toggleSettingsBar();
});

// Function to toggle the visibility of the settings bar
function toggleSettingsBar() {
    if (settingsBar.style.display === 'none') {
        settingsBar.style.display = 'block';
    } else {
        settingsBar.style.display = 'none';
    }
}

// Event listener for the Focus button
focusButton.addEventListener('click', function() {
    setTimer(25 * 60); // Set timer to 25 minutes (25 * 60 seconds)
});

// Event listener for the Short Break button
breakButton.addEventListener('click', function() {
    setTimer(5 * 60); // Set timer to 5 minutes (5 * 60 seconds)
});

// Event listener for the Long Break button
longBreakButton.addEventListener('click', function() {
    setTimer(15 * 60); // Set timer to 15 minutes (15 * 60 seconds)
});

// Function to set the timer
function setTimer(durationInSeconds) {
    clearInterval(timer); // Stop any running timer
    timeLeft = durationInSeconds; // Set timeLeft to the specified duration
    updateTimer(); // Update the timer display
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function updateTimer() {
    if (timeLeft === 0) {
        clearInterval(timer);
        if (breakButton.classList.contains('active')) {
            timerDisplay.textContent = "Get back to work"; // Message for break time up
        } else {
            timerDisplay.textContent = "Time is up! Take a break."; // Original message
        }
        return;
    }
    timerDisplay.textContent = formatTime(timeLeft);
    timeLeft--;
}

startButton.addEventListener('click', function() {
    if (startButton.textContent === 'Start') {
        startButton.textContent = 'Pause';
        timer = setInterval(updateTimer, 1000);
    } else {
        startButton.textContent = 'Start';
        clearInterval(timer);
    }
});

resetButton.addEventListener('click', function() {
    clearInterval(timer);
    startButton.textContent = 'Start';
    timeLeft = initialTime;
    updateTimer();
});

updateTimer(); // Initialize timer display
