// ===== DOM ELEMENTS =====
const form = document.getElementById("form");
const dateTime = document.getElementById("dateTime");
const eventNameInput = document.getElementById("eventName");
const countdownContainer = document.getElementById("countdown-container");
const activeEventTitle = document.getElementById("activeEventTitle");

// Timer Display Elements
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// ===== GLOBAL VARIABLES =====
let countdownInterval;

// ===== EVENT LISTENERS =====

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const currentTime = new Date().getTime();
  // 1. Capture user input
  const nameValue = eventNameInput.value.trim();
  const dateValue = dateTime.value;

  // 2. Validation
  if (!dateTime.value || dateValue < currentTime) {
    alert("Please select a future date and time.");
    return;
  }

  // 3. UI Transition
  activeEventTitle.innerText = nameValue ? nameValue : "The Big Day";
  form.classList.add("hidden");
  countdownContainer.classList.remove("hidden");

  // 4. Start Countdown
  startCountdown(dateValue);
});

// ===== CORE LOGIC =====

function startCountdown(targetDateValue) {
  const targetDate = new Date(targetDateValue).getTime();

  // Clear any existing timer before starting a new one
  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeDifference = targetDate - now;

    // If the date has passed
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      activeEventTitle.innerText = "The Time has Arrived!";
      updateDisplay(0, 0, 0, 0);
      return;
    }

    // Time calculations
    const d = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const h = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const m = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the screen
    updateDisplay(d, h, m, s);
  }, 1000);
}

function updateDisplay(d, h, m, s) {
  daysEl.innerText = d;
  hoursEl.innerText = h;
  minutesEl.innerText = m;
  secondsEl.innerText = s;
}

// ===== UTILITY FUNCTIONS =====

function resetCountdown() {
  // Stop the timer
  clearInterval(countdownInterval);

  // Switch UI back to form
  form.classList.remove("hidden");
  countdownContainer.classList.add("hidden");

  // Clear inputs
  dateTime.value = "";
  eventNameInput.value = "";

  // Reset display numbers
  updateDisplay(0, 0, 0, 0);
}
