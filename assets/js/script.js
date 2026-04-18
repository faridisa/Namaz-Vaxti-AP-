const PRAYERS = [
 {key : 'Fajr', az: 'Sübh'},
    {key : 'Sunrise', az: 'Gün Çixma'},
    {key : 'Dhuhr', az: 'Zöhr'},
    {key : 'Asr', az: 'Əsr'},
    {key : 'Maghrib', az: 'Məğrib'},
    {key : 'Isha', az: 'İşa'},
]

function switchTab(tab) {
    document.getElementById('dailyBtn').classList.toggle('active', tab === 'daily')
    document.getElementById('monthlyBtn').classList.toggle('active', tab === 'monthly')
    document.getElementById('dailyView').classList.toggle('active', tab === 'daily')
    document.getElementById('monthlyView').classList.toggle('active', tab === 'monthly')
}

const today = new Date();
const daySelect = document.getElementById('daySelect');

for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    if (i === today.getDate()) {
        option.selected = true;
    }
    daySelect.appendChild(option);
}

document.getElementById('monthSelectD').value = today.getMonth() + 1;

function cleanTime(t){
    return t ? t.split(' ')[0] : '--:--';
}

const day = document.getElementById('daySelect').value;
const month = document.getElementById('monthSelectD').value;
const year = document.getElementById('yearSelectD').value;

const API = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=51.508515&longitude=-0.1254872&method=2`;

