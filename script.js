// Telegram Mini App

const tg = window.Telegram.WebApp;

tg.expand();

let user = tg.initDataUnsafe?.user;

if (user) {
    document.getElementById("username").innerHTML =
        `👋 Welcome, ${user.first_name}`;
} else {
    document.getElementById("username").innerHTML =
        "⚠️ Please open this app inside Telegram.";
}

// Demo Data (Backend এ পরে যুক্ত হবে)
let balance = 0;
let referrals = 0;

document.getElementById("balance").innerText = balance.toFixed(2);
document.getElementById("referral").innerText = referrals;

function watchAds() {
    alert("🚧 Watch Ads feature is coming in the next update.");
}

function referralPage() {
    alert("👥 Referral page will be added.");
}

function withdrawPage() {
    alert("💸 Withdraw page will be added.");
}

function leaderboardPage() {
    alert("🏆 Leaderboard will be added.");
}

function historyPage() {
    alert("📜 History page will be added.");
}

function profilePage() {
    if (user) {
        alert(
`👤 Name: ${user.first_name}
🆔 Telegram ID: ${user.id}
🌐 Username: @${user.username || "Not Set"}`
        );
    } else {
        alert("User information not found.");
    }
}
function goHome(){
    location.reload();
}
window.addEventListener("load", () => {
    setTimeout(() => {
        const splash = document.getElementById("splash");
        if (splash) {
            splash.style.display = "none";
        }
    }, 2000);
});
