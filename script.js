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
    });

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

        }

    }

}

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
