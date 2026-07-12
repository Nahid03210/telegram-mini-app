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

});
