// Telegram
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// User
const user = tg.initDataUnsafe.user;
const startParam = tg.initDataUnsafe.start_param || null;

// Bot Info
const BOT_USERNAME = "makemonerryonline_bot";
const APP_SHORT_NAME = "okay";

// Referral Link
const referralLink =
`https://t.me/${BOT_USERNAME}/${APP_SHORT_NAME}?startapp=${user.id}`;

// App Start
window.addEventListener("load", startApp);

async function startApp(){

    while(!window.firebaseReady){
        await new Promise(r=>setTimeout(r,100));
    }

    if(!user){
        alert("Telegram User Not Found");
        return;
    }

  await saveUser();

await loadUser();

setupNavigation();

setupReferral();

setupDailyBonus();
}
// =========================
// Save User
// =========================
async function saveUser(){

    const userRef = window.doc(window.db, "users", String(user.id));
    const userSnap = await window.getDoc(userRef);

    if(userSnap.exists()) return;

    await window.setDoc(userRef,{
        id: user.id,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        username: user.username || "",
        balance: 0,
        referral: 0,
        referredBy: startParam || "",
        lastBonus: 0,
        createdAt: Date.now()
    // Referral Bonus
    if(startParam && startParam != user.id){

        const refRef = window.doc(window.db, "users", String(startParam));
        const refSnap = await window.getDoc(refRef);

        if(refSnap.exists()){

            const refData = refSnap.data();

            await window.updateDoc(refRef,{
                referral:(refData.referral || 0)+1,
                balance:(refData.balance || 0)+10
            });


// =========================
// Load User
// =========================
async function loadUser(){

    const userRef = window.doc(window.db,"users",String(user.id));
    const userSnap = await window.getDoc(userRef);

    if(!userSnap.exists()) return;

    const data = userSnap.data();

    document.getElementById("userName").innerText =
        `${data.first_name} ${data.last_name || ""}`;

    document.getElementById("profileName").innerText =
        `${data.first_name} ${data.last_name || ""}`;

    document.getElementById("userId").innerText = data.id;

    document.getElementById("balance").innerText = data.balance;

    document.getElementById("walletBalance").innerText = data.balance;

}
// =========================
// Navigation
// =========================

function setupNavigation(){

    const pages = {
        homeBtn:"homePage",
        taskBtn:"taskPage",
        referBtn:"referPage",
        walletBtn:"walletPage",
        profileBtn:"profilePage"
    };

    document.querySelectorAll(".nav-btn").forEach(btn=>{

        btn.addEventListener("click",()=>{

            document.querySelectorAll(".page").forEach(page=>{
                page.style.display="none";
            });

            document.getElementById(pages[btn.id]).style.display="block";

            document.querySelectorAll(".nav-btn").forEach(b=>{
                b.classList.remove("active");
            });

            btn.classList.add("active");

   
// =========================
// Referral
// =========================

function setupReferral(){

    const input = document.getElementById("referralLink");
    const btn = document.getElementById("copyReferral");

    input.value = referralLink;

    btn.onclick = async ()=>{

        await navigator.clipboard.writeText(referralLink);

        if(window.Telegram.WebApp.showAlert){
            Telegram.WebApp.showAlert("Referral Link Copied");
        }else{
            alert("Referral Link Copied");
        }

    };

}
// =========================
// Daily Bonus
// =========================

const BONUS_AMOUNT = 10;
const BONUS_TIME = 24 * 60 * 60 * 1000;

function setupDailyBonus() {

    const btn = document.getElementById("claimBonusBtn");
    const status = document.getElementById("bonusStatus");

    updateBonus();

    btn.onclick = claimBonus;

    setInterval(updateBonus, 1000);

    async function updateBonus() {

        const userRef = window.doc(window.db, "users", String(user.id));
        const snap = await window.getDoc(userRef);

        if (!snap.exists()) return;

        const data = snap.data();

        const left = BONUS_TIME - (Date.now() - (data.lastBonus || 0));

        if (left <= 0) {

            btn.disabled = false;
            btn.innerText = "🎁 Claim Daily Bonus";
            status.innerText = "Bonus Available";

        } else {

            btn.disabled = true;

            const h = Math.floor(left / 3600000);
            const m = Math.floor((left % 3600000) / 60000);
            const s = Math.floor((left % 60000) / 1000);

            status.innerText =
                `Next Bonus : ${h}h ${m}m ${s}s`;

        }

    }

    async function claimBonus() {

        const userRef = window.doc(window.db, "users", String(user.id));
        const snap = await window.getDoc(userRef);

        const data = snap.data();

        if (Date.now() - (data.lastBonus || 0) < BONUS_TIME)
            return;

        await window.updateDoc(userRef, {

            balance: (data.balance || 0) + BONUS_AMOUNT,

            lastBonus: Date.now()

        });

        await loadUser();

        updateBonus();

        Telegram.WebApp.showAlert("🎉 Daily Bonus Claimed!");

    }

}
