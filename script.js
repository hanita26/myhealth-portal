// Show only selected section
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}

// Store and display entries
let entries = [];

document.getElementById("journalForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const mood = document.getElementById("mood").value;
  const notes = document.getElementById("notes").value;

  const symptoms = [];
  document.querySelectorAll(".checkbox-group input[type='checkbox']").forEach((box) => {
    if (box.checked) symptoms.push(box.value);
  });

  const entry = {
    date,
    mood,
    symptoms: symptoms.join(", "),
    notes: notes || "—"
  };

  entries.unshift(entry);
  updateDashboard();
  updateHistory();
  updateTips(mood);

  this.reset();
  showSection('history');
});

// Update Dashboard
function updateDashboard() {
  document.getElementById("entryCount").textContent = entries.length;
}

// Update History Log
function updateHistory() {
  const list = document.getElementById("entryList");
  list.innerHTML = "";

  entries.forEach(entry => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>Date:</strong> ${entry.date}<br>
      <strong>Mood:</strong> ${entry.mood}<br>
      <strong>Symptoms:</strong> ${entry.symptoms}<br>
      <strong>Notes:</strong> ${entry.notes}
    `;
    list.appendChild(div);
  });
}

// Show Health Tips
function updateTips(mood) {
  const tipsBox = document.getElementById("tipsBox");
  let tip = "Take care of your body and mind.";

  switch (mood.toLowerCase()) {
    case "happy":
      tip = "Keep it up! Share your joy with someone today.";
      break;
    case "sad":
      tip = "Try some light exercise or talk to a friend.";
      break;
    case "stressed":
      tip = "Deep breathing and 10-minute walks can work wonders.";
      break;
    case "energetic":
      tip = "Channel that energy into something productive!";
      break;
    case "tired":
      tip = "Stay hydrated and rest. Prioritize sleep tonight.";
      break;
  }

  tipsBox.innerHTML = `<p>💡 <strong>Tip for ${mood} mood:</strong> ${tip}</p>`;
}

// Theme switcher
document.getElementById("themeSelector").addEventListener("change", function () {
  const theme = this.value;
  document.body.className = theme === "dark" ? "dark" : "";
});

// Show default section
showSection("dashboard");
