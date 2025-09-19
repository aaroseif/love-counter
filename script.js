const startInput = document.getElementById("startInput");
const saveBtn = document.getElementById("saveBtn");
const nowBtn = document.getElementById("nowBtn");
const clearBtn = document.getElementById("clearBtn");
const currentStart = document.getElementById("currentStart");

// Placeholder, replaced by envsubst at container startup
const defaultStart = new Date("${START_DATE}");

let startDate = localStorage.getItem("love_start") ? new Date(localStorage.getItem("love_start")) : defaultStart;

if (startDate) {
  startInput.value = toInputLocal(startDate);
  currentStart.textContent = "Since: " + startDate.toLocaleString();
}

saveBtn.onclick = () => {
  if (!startInput.value) return;
  startDate = new Date(startInput.value);
  localStorage.setItem("love_start", startDate.toISOString());
  currentStart.textContent = "Start: " + startDate.toLocaleString();
};

nowBtn.onclick = () => {
  const now = new Date();
  startDate = now;
  startInput.value = toInputLocal(now);
  localStorage.setItem("love_start", now.toISOString());
  currentStart.textContent = "Start: " + now.toLocaleString();
};

clearBtn.onclick = () => {
  localStorage.removeItem("love_start");
  startDate = defaultStart;
  startInput.value = toInputLocal(defaultStart);
  currentStart.textContent = "Start: " + defaultStart.toLocaleString();
};

function updateCounter() {
  if (!startDate) return;
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById("seconds").textContent = seconds;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("hours").textContent = hours;
  document.getElementById("days").textContent = days;
  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;

  if (days === 0 && months % 1 === 0 && seconds === 0 && minutes === 0 && hours === 0) {
    launchConfetti();
  }

  if (Math.random() < 0.05) {
    spawnHeart();
  }
}
setInterval(updateCounter, 1000);

function toInputLocal(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    date.getFullYear() +
    "-" + pad(date.getMonth() + 1) +
    "-" + pad(date.getDate()) +
    "T" + pad(date.getHours()) + ":" + pad(date.getMinutes())
  );
}

function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = Array.from({ length: 100 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 50,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    tilt: Math.random() * 10 - 10
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c) => {
      ctx.beginPath();
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.r, c.r);
      ctx.fill();
    });
    update();
    requestAnimationFrame(draw);
  }

  function update() {
    confetti.forEach((c) => {
      c.y += Math.cos(c.d) + 2 + c.r / 2;
      c.x += Math.sin(c.d);
      if (c.y > canvas.height) c.y = -10;
    });
  }

  draw();
  setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 5000);
}

function spawnHeart() {
  const container = document.getElementById("heart-container");
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.bottom = "0px";
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}