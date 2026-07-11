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
