// Te// Telegram Mini App

const tg = window.Telegram.WebApp;

tg.expand();

const user = tg.initDataUnsafe?.user;

if (user) {
    document.getElementById("username").innerHTML =
        `👋 Welcome, ${user.first_name}`;
} else {
    document.getElementById("username").innerHTML =
        "Open inside Telegram";
}

// Demo Data (Backend পরে যুক্ত হবে)
let balance = 0.00;
let totalEarn = 0.00;
let referrals = 0;

document.getElementById("balance").innerText = balance.toFixed(2);
document.getElementById("earn").innerText = "৳" + totalEarn.toFixed(2);
document.getElementById("referral").innerText = referrals;

function watchAds(){
    window.location.href="pages/ads.html";
}


function dailyBonus() {
    alert("🎁 Daily Bonus feature is coming soon.");
}

function referralPage() {
    alert("👥 Referral page is under development.");
}

function withdrawPage() {
    alert("💸 Withdraw page is under development.");
}

function leaderboardPage() {
    alert("🏆 Leaderboard will be available soon.");
}

function historyPage() {
    alert("📜 History page is under development.");
}

function supportPage() {
    window.open("https://t.me/makemoneyyourrhome", "_blank");
}

function profilePage() {
    if (!user) {
        alert("User information not found.");
        return;
    }

    alert(
`👤 Name: ${user.first_name}
🆔 ID: ${user.id}
🌐 Username: @${user.username || "Not Set"}

💰 Balance: ৳${balance.toFixed(2)}
👥 Referrals: ${referrals}`
    );
}legram Mini App
function verifyJoin() {
    // বর্তমানে শুধু UI
    // VPS যোগ করার পরে এখানে Telegram API দিয়ে
    // চ্যানেল সদস্য কিনা যাচাই করা হবে।

    document.getElementById("joinScreen").style.display = "none";
}
