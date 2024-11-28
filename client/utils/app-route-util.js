
import { showInfoMsg } from "./common-utils";

function redirect(href) {
    if (!href) return;

    window.location.href = href;
}

function openInNewTab(href) {
    if (!href) return;

    window.open(href, '_blank', 'noopener noreferrer');
}

const handleLogout = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    showInfoMsg("Account Logout Successful", "info")

    setTimeout(() => {
        redirect("/");
    }, 3000);
}

export { redirect, openInNewTab, handleLogout };