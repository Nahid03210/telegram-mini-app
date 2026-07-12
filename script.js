const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;
const startParam = tg.initDataUnsafe.start_param || null;

const BOT_USERNAME = "makemonerryonline_bot";
const APP_SHORT_NAME = "okay";

const referralLink =
`https://t.me/${BOT_USERNAME}/${APP_SHORT_NAME}?startapp=${user.id}`;

window.addEventListener("load", async () => {

    while (!window.firebaseReady) {
        await new Promise(resolve => setTimeout(resolve,100));
    }

    if(!user){
        alert("Telegram User Not Found");
        return;
    }

    await saveUser();

    await loadUser();

    setupNavigation();

    setupReferral();
    await setupDailyBonus();
async function saveUser() {

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
            referredBy: startParam || null,
            lastBonus: 0,
            createdAt: Date.now()
        });

        if (startParam && startParam != user.id) {

            const refRef = window.doc(window.db, "users", String(startParam));
            const refSnap = await window.getDoc(refRef);

            if (refSnap.exists()) {

                const refData = refSnap.data();

                await window.updateDoc(refRef, {
                    referral: (refData.referral || 0) + 1,
                    balance: (refData.balance || 0) + 10
                });

            }
        }
    }
}

async function loadUser() {

    const userRef = window.doc(window.db, "users", String(user.id));
    const userSnap = await window.getDoc(userRef);

    if (!userSnap.exists()) return;

    const data = userSnap.data();

    document.getElementById("userName").innerText =
        data.first_name + (data.last_name ? " " + data.last_name : "");

    document.getElementById("profileName").innerText =
        data.first_name + (data.last_name ? " " + data.last_name : "");

    document.getElementById("userId").innerText = data.id;

    document.getElementById("balance").innerText = data.balance;

    document.getElementById("walletBalance").innerText = data.balance;
function setupNavigation() {

    const pages = {
        homeBtn: "homePage",
        taskBtn: "taskPage",
        referBtn: "referPage",
        walletBtn: "walletPage",
        profileBtn: "profilePage"
    };

    document.querySelectorAll(".nav-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            document.querySelectorAll(".page").forEach(page => {
                page.style.display = "none";
            });

            document.getElementById(pages[btn.id]).style.display = "block";

            document.querySelectorAll(".nav-btn").forEach(b => {
                b.classList.remove("active");
            });

            btn.classList.add("active");

        });

    });

}

function setupReferral() {

    document.getElementById("referralLink").value = referralLink;

    document.getElementById("copyReferral").addEventListener("click", async () => {

        await navigator.clipboard.writeText(referralLink);

        if (window.Telegram?.WebApp?.showAlert) {
            Telegram.WebApp.showAlert("Referral Link Copied!");
        } else {
            alert("Referral Link Copied!");
        }

    });
const BONUS_AMOUNT = 10;
const BONUS_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

async function setupDailyBonus() {

    const btn = document.getElementById("claimBonusBtn");
    const status = document.getElementById("bonusStatus");

    const userRef = window.doc(window.db, "users", String(user.id));

    async function refreshBonus() {

        const snap = await window.getDoc(userRef);

        if (!snap.exists()) return;

        const data = snap.data();

        const now = Date.now();

        const remaining = BONUS_COOLDOWN - (now - (data.lastBonus || 0));

        if (remaining <= 0) {

            btn.disabled = false;
            btn.innerText = "🎁 Claim Daily Bonus";
            status.innerText = "Bonus Available";

        } else {

            btn.disabled = true;

            const h = Math.floor(remaining / 3600000);
            const m = Math.floor((remaining % 3600000) / 60000);
            const s = Math.floor((remaining % 60000) / 1000);

            status.innerText = `Next Bonus: ${h}h ${m}m ${s}s`;

        }

    }

    btn.onclick = async () => {

        const snap = await window.getDoc(userRef);
        const data = snap.data();

        const now = Date.now();

        if (now - (data.lastBonus || 0) < BONUS_COOLDOWN)
            return;

        await window.updateDoc(userRef, {

            balance: (data.balance || 0) + BONUS_AMOUNT,

            lastBonus: now

        });

        await loadUser();

        refreshBonus();

    };

    refreshBonus();

    setInterval(refreshBonus,1000);

}
}
}
});
