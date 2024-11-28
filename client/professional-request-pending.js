import { $ } from "./utils/common-utils";
import { handleLogout } from "./utils/app-route-util";


const logoutButton = $("#logout-btn");


const listenEvents = () => {
    logoutButton?.addEventListener?.("click", handleLogout);
};


listenEvents();