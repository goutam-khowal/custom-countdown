// ===== DOM ELEMENTS =====
const form = document.getElementById("form");
const dateTime = document.getElementById("dateTime");
const eventNameInput = document.getElementById("eventName");
const countdownContainer = document.getElementById("countdown-container");
const activeEventTitle = document.getElementById("activeEventTitle");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let countdownInterval;

// ===== 1. INITIAL LOAD CHECK =====
// Check if there is a saved countdown when the page loads
window.addEventListener("load", () => {
  const savedDate = localStorage.getItem("countdownDate");
  const savedName = localStorage.getItem("countdownName");

  if (savedDate) {
    // If a date exists, skip the form and start the timer
    activeEventTitle.innerText = savedName || "The Big Day";
    form.classList.add("hidden");
    countdownContainer.classList.remove("hidden");
    startCountdown(savedDate);
  }
});

// ===== EVENT LISTENERS =====

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameValue = eventNameInput.value.trim();
  const dateValue = dateTime.value;
  const targetTime = new Date(dateValue).getTime();
  const currentTime = new Date().getTime();

  if (!dateValue || targetTime < currentTime) {
    alert("Please select a future date and time.");
    return;
  }

  // ===== 2. SAVE TO LOCALSTORAGE =====
  localStorage.setItem("countdownDate", dateValue);
  localStorage.setItem("countdownName", nameValue);

  activeEventTitle.innerText = nameValue ? nameValue : "The Big Day";
  form.classList.add("hidden");
  countdownContainer.classList.remove("hidden");

  startCountdown(dateValue);
});

// ===== CORE LOGIC =====

function startCountdown(targetDateValue) {
  const targetDate = new Date(targetDateValue).getTime();
  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      // Clear storage once the event is finished
      localStorage.removeItem("countdownDate");
      localStorage.removeItem("countdownName");
      activeEventTitle.innerText = "The Time has Arrived!";
      updateDisplay(0, 0, 0, 0);
      return;
    }

    const d = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const h = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const m = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((timeDifference % (1000 * 60)) / 1000);

    updateDisplay(d, h, m, s);
  }, 1000);
}

function updateDisplay(d, h, m, s) {
  daysEl.innerText = d;
  hoursEl.innerText = h;
  minutesEl.innerText = m;
  secondsEl.innerText = s;
}

// ===== 3. UTILITY FUNCTIONS (UPDATED) =====

function resetCountdown() {
  clearInterval(countdownInterval);

  // ===== CLEAR LOCALSTORAGE =====
  localStorage.removeItem("countdownDate");
  localStorage.removeItem("countdownName");

  form.classList.remove("hidden");
  countdownContainer.classList.add("hidden");

  dateTime.value = "";
  eventNameInput.value = "";
  updateDisplay(0, 0, 0, 0);
}
