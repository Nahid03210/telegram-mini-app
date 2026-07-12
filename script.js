setTimeout(() => {
    alert("Firebase Ready: " + window.firebaseReady);
}, 2000);
console.log("script.js loaded");
let tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


// Telegram User
let user = tg.initDataUnsafe.user;

if(user){
    document.getElementById("username").innerHTML =
    "Welcome, " + user.first_name;
}
else{
    document.getElementById("username").innerHTML =
    "Welcome Guest";
}


// Join Verify
function verifyJoin(){

    alert("Verification system will be connected with Telegram Bot.");

}


// Pages

function watchAds(){
    window.location.href="pages/ads.html";
}


function referralPage(){
    window.location.href="pages/referral.html";
}


function withdrawPage(){
    window.location.href="pages/withdraw.html";
}


function leaderboardPage(){
    window.location.href="pages/leaderboard.html";
}


function historyPage(){
    window.location.href="pages/history.html";
}


function profilePage(){
    window.location.href="pages/profile.html";
}


// Daily Bonus

function dailyBonus(){

    let reward = 1;

    let balance =
    localStorage.getItem("balance") || 0;


    balance = Number(balance)+reward;


    localStorage.setItem("balance",balance);


    document.getElementById("balance").innerHTML =
    balance.toFixed(2);


    alert("🎁 Daily Bonus Added ৳1");

}


// Support

function supportPage(){

    window.open(
    "https://t.me/makemoneyyourrhome",
    "_blank"
    );

}


// Load Balance

let savedBalance =
localStorage.getItem("balance") || 0;


document.getElementById("balance").innerHTML =
Number(savedBalance).toFixed(2);
// Save User to Firebase

async function saveUser() {

    if (!user) return;

    const userRef = window.doc(window.db, "users", String(user.id));

    const userSnap = await window.getDoc(userRef);

    if (!userSnap.exists()) {

        await window.setDoc(userRef, {

            id: user.id,
            name: user.first_name,
            username: user.username || "",
            balance: 0,
            referral: 0,
            totalEarn: 0,
            createdAt: new Date().toISOString()

        });

        console.log("New user saved.");

    } else {

        console.log("User already exists.");

    }

}

setTimeout(() => {

    saveUser();

}, 1000);
const tg = window.Telegram.WebApp;
tg.ready();

const user = tg.initDataUnsafe.user;const startParam = tg.initDataUnsafe.start_param || null;

console.log("Start Param:", startParam);

if (!user) {
    alert("Telegram user not found!");
} else {
    saveUser(user);loadUser(user.id);const BOT_USERNAME = "@makemonerryonline_bot";

const referralLink =
    `https://t.me/${BOT_USERNAME}/app?startapp=${user.id}`;

console.log(referralLink);
}

async function saveUser(user) {
    while (!window.firebaseReady) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    const userRef = window.doc(window.db, "users", String(user.id));
    const userSnap = await window.getDoc(userRef);

    if (!userSnap.exists()) {
        await window.setDoc(userRef, {
            id: user.id,
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            username: user.username || "",
            balance: 0,
            referral: 0,
            createdAt: Date.now()
        });

        console.log("New user created");
    } else {
        console.log("User already exists");
    }
}
async function loadUser(userId) {
    const userRef = window.doc(window.db, "users", String(userId));
    const userSnap = await window.getDoc(userRef);

    if (userSnap.exists()) {
        const data = userSnap.data();

        document.getElementById("userName").innerText =
            data.first_name + (data.last_name ? " " + data.last_name : "");

        document.getElementById("userId").innerText = data.id;
        document.getElementById("balance").innerText = data.balance;
    }document.getElementById("referralLink").value = referralLink;

document.getElementById("copyReferral").onclick = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral Link Copied");
    const BOT_USERNAME = "makemonerryonline_bot";
const APP_SHORT_NAME = "okay";

const referralLink =
    `https://t.me/${BOT_USERNAME}/${APP_SHORT_NAME}?startapp=${user.id}`;
};
    
}
const pages = {
    homeBtn: "homePage",
    taskBtn: "taskPage",
    referBtn: "referPage",
    walletBtn: "walletPage",
    profileBtn: "profilePage"
};

document.querySelectorAll(".nav-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        // সব Page লুকাও
        document.querySelectorAll(".page").forEach(page => {
            page.style.display = "none";
        });

        // যে Button-এ ক্লিক হয়েছে সেই Page দেখাও
        document.getElementById(pages[btn.id]).style.display = "block";

        // Active Button পরিবর্তন করো
        document.querySelectorAll(".nav-btn").forEach(b => {
            b.classList.remove("active");
        });

        btn.classList.add("active");

    });

});
    }
});
