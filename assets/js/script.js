const PRAYERS = [
  { key: "Fajr", az: "Sübh" },
  { key: "Sunrise", az: "Gün Çixma" },
  { key: "Dhuhr", az: "Zöhr" },
  { key: "Asr", az: "Əsr" },
  { key: "Maghrib", az: "Məğrib" },
  { key: "Isha", az: "İşa" },
];

function switchTab(tab) {
  document.getElementById("dailyBtn").classList.toggle("active", tab === "daily");
  document.getElementById("monthlyBtn").classList.toggle("active", tab === "monthly");
  document.getElementById("dailyView").classList.toggle("active", tab === "daily");
  document.getElementById("monthlyView").classList.toggle("active", tab === "monthly");
}

const today = new Date();
const daySelect = document.getElementById("daySelect");

for (let i = 1; i <= 31; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  if (i === today.getDate()) option.selected = true;
  daySelect.appendChild(option);
}

document.getElementById("monthSelectD").value = today.getMonth() + 1;

function cleanTime(t) {
  return t ? t.split(" ")[0] : "--:--";
}

function loadDaily() {
  const day   = document.getElementById("daySelect").value;
  const month = document.getElementById("monthSelectD").value;
  const year  = document.getElementById("yearSelectD").value;

  const API = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=51.508515&longitude=-0.1254872&method=2`;

  document.getElementById("prayerCards").innerHTML = PRAYERS.map(() => '<div class="skeleton"></div>').join("");
  document.getElementById("todayDate").textContent = "Yüklənir...";

  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      const dayData = data.data[parseInt(day) - 1];
      if (!dayData) return;
      const timings = dayData.timings;
      document.getElementById("todayDate").textContent = dayData.date.readable;
      document.getElementById("prayerCards").innerHTML = PRAYERS.map((p) => `
        <div class="prayer-card">
          <div class="prayer-name">${p.az}</div>
          <div class="prayer-time">${cleanTime(timings[p.key])}</div>
        </div>
      `).join("");
    })
    .catch(() => {
      document.getElementById("todayDate").textContent = "Xəta baş verdi";
      document.getElementById("prayerCards").innerHTML = '<p class="error">API-yə qoşulmaq mümkün olmadı.</p>';
    });
}

function loadMonthly() {
  const month = document.getElementById("monthSelectM").value;
  const year  = document.getElementById("yearSelectM").value;

  const API = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=51.508515&longitude=-0.1254872&method=2`;

  document.getElementById("monthlyBody").innerHTML = '<tr><td colspan="7" style="padding:1.5rem;text-align:center;color:#777">Yüklənir...</td></tr>';

  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      const rows = data.data.map((d) => {
        const t = d.timings;
        return `<tr>
          <td>${d.date.gregorian.day}</td>
          <td>${cleanTime(t.Fajr)}</td>
          <td>${cleanTime(t.Sunrise)}</td>
          <td>${cleanTime(t.Dhuhr)}</td>
          <td>${cleanTime(t.Asr)}</td>
          <td>${cleanTime(t.Maghrib)}</td>
          <td>${cleanTime(t.Isha)}</td>
        </tr>`;
      }).join("");
      document.getElementById("monthlyBody").innerHTML = rows;
    })
    .catch(() => {
      document.getElementById("monthlyBody").innerHTML = '<tr><td colspan="7" style="padding:1.5rem;text-align:center;color:#c0392b">Xəta baş verdi</td></tr>';
    });
}

loadDaily();