import { $, showInfoMsg } from "./utils/common-utils";
import { handleLogout } from "./utils/app-route-util";
import ConfigHolder from "./utils/config-holder";
import { API_RESPONSE } from "./constants/api-constants";

const accountLogoutButton = $("#account-logout-btn");
const accountUpdateButton = $("#account-info-edit-btn");
const editAccountInfoButton = $("#edit-account-info-btn");
const accountEditModalCloseButton = $("#account-info-edit-modal-close-btn");
const inputFields = document.querySelectorAll("input");

const checkForChanges = () => {
    let hasChanges = false;
    inputFields.forEach(input => {
        const fieldName = input.name;
        if (input.value !== ConfigHolder.userInfo[fieldName]) {
            hasChanges = true;
        }
    });
    accountUpdateButton.disabled = !hasChanges;
};

const populateInputFields = () => {
    inputFields.forEach(input => {
        input.value = ConfigHolder.userInfo[input.name] || ConfigHolder.professionalInfo[input.name] || ConfigHolder.service[input.name] || "";
    });
};

const handleUpdateAccountInfo = () => {
    const formData = new FormData();
    inputFields.forEach(input => {
        formData.append(input.name, input.value);
    });

    fetch('/api/updateaccountinfo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then((response) => {
        showInfoMsg(response.data.message, response.result);
        if (response.result === API_RESPONSE.SUCCESS) {
            inputFields.forEach(input => {
                if (input.dataset.type === "professional") {
                    ConfigHolder.professionalInfo[input.name] = input.value;
                } else {
                    ConfigHolder.userInfo[input.name] = input.value;
                }
                $(`#display-${input.name}`).textContent = input.value;
            });
            accountEditModalCloseButton.click();
        }
    })
    .catch(() => {
        showInfoMsg("Failed to update user information.");
    });
};

const listenEvents = () => {
    accountLogoutButton?.addEventListener("click", handleLogout);
    accountUpdateButton?.addEventListener("click", handleUpdateAccountInfo);
    editAccountInfoButton?.addEventListener("click", populateInputFields);
    inputFields.forEach(input => {
        input.addEventListener("input", checkForChanges);
    });
};

listenEvents();