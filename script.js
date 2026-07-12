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

}
}
});
