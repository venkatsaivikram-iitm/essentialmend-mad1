import { Collector } from "./collector";
import { $, a$, setHTML } from "./utils/common-utils";
import { showInfoMsg } from "./utils/common-utils";
import { API_RESPONSE } from "./constants/api-constants"

class ServiceCollector extends Collector {
    constructor () {
        super({
            module: "service",
            index: "sid"
        })
    }
}

class ProfessionalCollector extends Collector {
    constructor () {
        super({
            module: "professional",
            index: "uid"
        })
    }
}

class UserCollector extends Collector {
    constructor () {
        super({
            module: "user",
            index: "uid"
        })
    }
}

const serviceCollector = new ServiceCollector();
const professionalCollector = new ProfessionalCollector();
const userCollector = new UserCollector();

serviceCollector.add(...(window.services || []));
professionalCollector.add(...(window.professionals || []));
userCollector.add(...(window.users || []));

window.serviceCollector = serviceCollector;
window.professionalCollector = professionalCollector;
window.userCollector = userCollector;


const serviceSearchInput = $("#service-search-input");
const professionalSearchInput = $("#professional-search-input");
const userSearchInput = $("#user-search-input");

const serviceItems = () => a$(".service-item");
const professionalItems = () => a$(".professional-item");
const userItems = () => a$(".user-item");

const serviceEditModalButtons = () => a$(".service-edit-modal-btn");
const professionalReviewButtons = () => a$(".professional-review-btn");

const serviceDeleteModalButtons = () => a$(".service-delete-modal-btn");
const professionalDeleteModalButtons = () => a$(".professional-delete-modal-btn");
const userDeleteModalButtons = () => a$(".user-delete-modal-btn");

const serviceInfoModalBody = $("#service-info-modal-body");
const serviceAddModalBody = $("#service-add-modal-body");
const serviceEditModalBody = $("#service-edit-modal-body");
const serviceDeleteModalBody = $("#service-delete-modal-body");

const professionalInfoModalBody = $("#professional-info-modal-body");
const professionalReviewModalBody = $("#professional-review-modal-body");
const professionalDeleteModalBody = $("#professional-delete-modal-body");

const userInfoModalBody = $("#user-info-modal-body");
const userDeleteModalBody = $("#user-delete-modal-body");

const serviceInfoModalCloseButton = $("#service-info-modal-close-btn");
const serviceAddModalCloseButton = $("#service-add-modal-close-btn");
const serviceEditModalCloseButton = $("#service-edit-modal-close-btn");
const serviceDeleteModalCloseButton = $("#service-delete-modal-close-btn");

const addServiceButton = $("#add-service-btn");

const serviceAddButton = $("#service-add-btn");
const serviceEditButton = $("#service-edit-btn");
const serviceDeleteButton = $("#service-delete-btn");

const professionalDeleteButton = $("#professional-delete-btn");
const userDeleteButton = $("#user-delete-btn");

const professionalBlockButton = $("#professional-block-btn");
const userBlockButton = $("#user-block-btn");

const professionalApproveButton = $("#professional-approve-btn");
const professionalDeclineButton = $("#professional-decline-btn");

let currentService, currentProfessional, currentUser;


const handleItemSearch = (event) => {
    const searchValue = event?.currentTarget?.value;
    const type = event.currentTarget.dataset.type;
    const items = type === "service" ? serviceItems() : (type === "professional" ? professionalItems() : (type === "user" ? userItems() : []));
    if (searchValue) {
        items?.forEach((serviceItem) => {
            if (serviceItem?.dataset?.value?.toLowerCase()?.startsWith?.(searchValue) || serviceItem?.dataset?.value?.toLowerCase()?.includes?.(searchValue)) {
                serviceItem?.classList?.remove("d-none");
            } else {
                serviceItem?.classList?.add("d-none");
            }
        })
    } else {
        items?.forEach((serviceItem) => serviceItem?.classList?.remove?.("d-none"));
    }
}


const handleItemSelect = (event) => {
    event?.stopPropagation();
    const type = event?.currentTarget?.dataset?.type;
    const action = event?.currentTarget?.dataset?.action;
    if (type === "service") {
        currentService = serviceCollector.get(event?.currentTarget?.dataset?.sid);
        if (action === "delete") {
            setHTML(serviceDeleteModalBody, `
                <p class="m-0">Are you sure to <span class="fw-bold text-danger">DELETE</span> <span class="fw-bold">${currentService?.name}</span> service permanently? Click <span class="fw-bold">Delete</span> to delete permanently.<p>
            `);
        } else if (action === "edit") {
            setHTML(serviceEditModalBody, `
                <p class="m-0">Edit and click <span class="fw-bold">Update</span> to update <span class="fw-bold">${currentService?.name}</span> serivce.<p>
            `);
        } else if (action === "add") {
        }
    } else if (type === "professional") {
        currentProfessional = professionalCollector.get(event?.currentTarget?.dataset?.uid);
        if (action === "delete") {
            setHTML(professionalDeleteModalBody, `
                <p class="m-0">Are you sure to <span class="fw-bold text-danger">DELETE</span> <span class="fw-bold">${currentProfessional?.name} (${currentProfessional?.email})</span> permanently? Click <span class="fw-bold">Delete</span> to delete permanently or <span class="fw-bold">Block</span> to block the professional (you can unblock later).<p>
            `);
            professionalBlockButton.textContent = currentProfessional.status === 'blocked' ? 'Unblock' : 'Block';
        } else if (action === "review") {
            setHTML(professionalReviewModalBody, `
                <p class="m-0"><span class="fw-bold">Current Status: </span>${currentProfessional?.professionalRequest?.status}</p>
                <p class="m-0"><span class="fw-bold">Requested At: </span>${new Date(Number(currentProfessional?.professionalRequest?.createdAt))}</p><br />
                <p class="m-0">Review <span class="fw-bold">${currentProfessional?.name} (${currentProfessional?.email})</span> and click <span class="fw-bold text-success">Approve</span> to approve the professional or <span class="fw-bold text-danger">Decline</span> to decline the request.<p>
            `);
        }
    } else if (type === "user") {
        currentUser = userCollector.get(event?.currentTarget?.dataset?.uid);
        if (action === "delete") {
            setHTML(userDeleteModalBody, `
                <p class="m-0">Are you sure to <span class="fw-bold text-danger">DELETE</span> <span class="fw-bold">${currentUser?.name} (${currentUser?.email})</span> permanently? Click <span class="fw-bold">Delete</span> to proceed.<p>
            `);
            userBlockButton.textContent = currentUser.status === 'blocked' ? 'Unblock' : 'Block';
        }
    }
}

const handleItemInfo = () => {
    const type = event?.currentTarget?.dataset?.type;
    const action = event?.currentTarget?.dataset?.action;
    if (action !== "info") {
        return;
    }
    if (type === "service") {
        currentService = serviceCollector.get(event?.currentTarget?.dataset?.sid);
        setHTML(serviceInfoModalBody, `
            <p class="m-0"><span class="fw-bold">Name: </span>${currentService?.name}</p>
            <p class="m-0"><span class="fw-bold">Description: </span>${currentService?.description}</p>
            <p class="m-0"><span class="fw-bold">Base Price: </span>${currentService?.price} Rs</p>
        `);
    } else if (type === "professional") {
        currentProfessional = professionalCollector.get(event?.currentTarget?.dataset?.uid);
        setHTML(professionalInfoModalBody, `
            <p class="m-0"><span class="fw-bold">Name: </span>${currentProfessional?.name}</p>
            <p class="m-0"><span class="fw-bold">Email: </span>${currentProfessional?.email}</p>
            <p class="m-0"><span class="fw-bold">Role: </span>${currentProfessional?.role}</p>
            <p class="m-0"><span class="fw-bold">Status: </span>${currentProfessional?.status}</p>
            <p class="m-0"><span class="fw-bold">Location: </span>${currentProfessional?.location}</p>
            <p class="m-0"><span class="fw-bold">Pincode: </span>${currentProfessional?.pincode}</p>
            <p class="m-0"><span class="fw-bold">Service: </span>${currentProfessional?.service?.name || "Service unavailable"}</p>
            <p class="m-0"><span class="fw-bold">Description: </span>${currentProfessional?.description}</p>
            <p class="m-0"><span class="fw-bold">Price: </span>${currentProfessional?.price} Rs</p>
            <p class="m-0"><span class="fw-bold">Duration: </span>${currentProfessional?.duration} Hrs</p>
            <p class="m-0"><span class="fw-bold">Rating: </span>${currentProfessional?.rating}</p>
            <p class="m-0"><span class="fw-bold">Experience: </span>${currentProfessional?.experience} Years</p>
            <p class="m-0"><span class="fw-bold">Created At: </span>${new Date(Number(currentProfessional?.createdAt))}</p>
            <br />
            <p class="m-0"><span class="fw-bold">Request Status: </span>${currentProfessional?.professionalRequest?.status}</p>
            <p class="m-0"><span class="fw-bold">Request Status Info: </span>${currentProfessional?.professionalRequest?.statusInfo}</p>
            <p class="m-0"><span class="fw-bold">Requested At: </span>${new Date(Number(currentProfessional?.professionalRequest?.createdAt))}</p>
            <p class="m-0"><span class="fw-bold">Request Closed At: </span>${currentProfessional?.professionalRequest?.closedAt ? new Date(Number(currentProfessional?.professionalRequest?.closedAt)) : "-"}</p>
        `);
    } else if (type === "user") {
        currentUser = userCollector.get(event?.currentTarget?.dataset?.uid);
        setHTML(userInfoModalBody, `
            <p class="m-0"><span class="fw-bold">Name: </span>${currentUser?.name}</p>
            <p class="m-0"><span class="fw-bold">Email: </span>${currentUser?.email}</p>
            <p class="m-0"><span class="fw-bold">Role: </span>${currentUser?.role}</p>
            <p class="m-0"><span class="fw-bold">Status: </span>${currentUser?.status}</p>
            <p class="m-0"><span class="fw-bold">Location: </span>${currentUser?.location}</p>
            <p class="m-0"><span class="fw-bold">Pincode: </span>${currentUser?.pincode}</p>
            <p class="m-0"><span class="fw-bold">Created At: </span>${new Date(Number(currentUser?.createdAt))}</p>
        `);
    }
}

const handleAddService = (event) => {
    event.stopPropagation();
    const name = $("#service-name")?.value;
    const description = $("#service-description")?.value;
    const price = $("#service-price")?.value;

    if (!name || !description || !price) {
        showInfoMsg("All fields are required", API_RESPONSE.FAILURE);
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);

    fetch('/api/services', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(response => {
        showInfoMsg(response.data.message, response.result, {reloadOnTimeout: response.result === API_RESPONSE.SUCCESS});
    })
    .catch(error => showInfoMsg("Service add failed", API_RESPONSE.FAILURE));
}

const handleEditService = (event) => {
    event.stopPropogation();
    console.log("edit service")
}

const handleDeleteService = (event) => {
    event.stopPropagation();
    const formData = new FormData();
    formData.append('sid', currentService.sid);

    fetch('/api/services', {
        method: 'DELETE',
        body: formData
    })
    .then(response => response.json())
    .then(response => {
        showInfoMsg(response.data.message, response.result, {reloadOnTimeout: response.result === API_RESPONSE.SUCCESS});
    })
    .catch(error => showInfoMsg("Service delete failed", API_RESPONSE.FAILURE));
}

const handleDeleteProfessional = (event) => {
    event.stopPropagation();
    const formData = new FormData();
    formData.append('uid', currentProfessional.uid);
    formData.append('mode', 'delete');

    fetch('/api/user', {
        method: 'DELETE',
        body: formData
    })
    .then(response => response.json())
    .then(response => {
        showInfoMsg(response.data.message, response.result, {reloadOnTimeout: response.result === API_RESPONSE.SUCCESS});
    })
    .catch(error => showInfoMsg("Professional delete failed", API_RESPONSE.FAILURE));
}

const handleDeleteUser = (event) => {
    event.stopPropagation();
    const formData = new FormData();
    formData.append('uid', currentUser.uid);
    formData.append('mode', 'delete');

    fetch('/api/user', {
        method: 'DELETE',
        body: formData
    })
    .then(response => response.json())
    .then(response => {
        showInfoMsg(response.data.message, response.result, {reloadOnTimeout: response.result === API_RESPONSE.SUCCESS});
    })
    .catch(error => showInfoMsg("User delete failed", API_RESPONSE.FAILURE));
}

const handleProfessionalBlock = (event) => {
    event.stopPropagation();
    const formData = new FormData();
    formData.append('uid', currentProfessional.uid);
    formData.append('mode', currentProfessional.status === 'blocked' ? 'unblock' : 'block');

    fetch('/api/user', {
        method: 'DELETE',
        body: formData
    })
    .then(response => response.json())
    .then(response => {
        showInfoMsg(response.data.message, response.result, {reloadOnTimeout: response.result === API_RESPONSE.SUCCESS});
    })
    .catch(error => showInfoMsg("Professional block/unblock failed", API_RESPONSE.FAILURE));
}

const handleUserBlock = (event) => {
    event.stopPropagation();
    const formData = new FormData();
    formData.append('uid', currentUser.uid);
    formData.append('mode', currentUser.status === 'blocked' ? 'unblock' : 'block');

    fetch('/api/user', {
        method: 'DELETE',
        body: formData
    })
    .then(response => response.json())
    .then(response => {
        showInfoMsg(response.data.message, response.result, {reloadOnTimeout: response.result === API_RESPONSE.SUCCESS});
    })
    .catch(error => showInfoMsg("User block/unblock failed", API_RESPONSE.FAILURE));
}

const handleProfessionalRequest = (event) => {
    event.stopPropagation();
    const mode = event.currentTarget.id === "professional-approve-btn" ? "approve" : "decline";
    const formData = new FormData();
    formData.append('uid', currentProfessional.uid);
    formData.append('mode', mode);

    fetch('/api/professionalrequest', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(response => {
        showInfoMsg(response.data.message, response.result, {reloadOnTimeout: response.result === API_RESPONSE.SUCCESS});
    })
    .catch(error => showInfoMsg(`Professional request ${mode} failed`, API_RESPONSE.FAILURE));
}

function listenEvents() {
    serviceItems().forEach((serviceItem) => serviceItem?.addEventListener?.("click", handleItemInfo));
    professionalItems().forEach((professionalItem) => professionalItem?.addEventListener?.("click", handleItemInfo));
    userItems().forEach((userItem) => userItem?.addEventListener?.("click", handleItemInfo));

    serviceEditModalButtons().forEach((btn) => btn?.addEventListener("click", handleItemSelect));
    serviceDeleteModalButtons().forEach((btn) => btn?.addEventListener("click", handleItemSelect));
    professionalReviewButtons().forEach((btn) => btn?.addEventListener("click", handleItemSelect));
    professionalDeleteModalButtons().forEach((btn) => btn?.addEventListener("click", handleItemSelect));
    userDeleteModalButtons().forEach((btn) => btn?.addEventListener("click", handleItemSelect));
    addServiceButton?.addEventListener?.("click", handleItemSelect);

    serviceAddButton?.addEventListener?.("click", handleAddService);
    serviceEditButton?.addEventListener?.("click", handleEditService);
    serviceDeleteButton?.addEventListener?.("click", handleDeleteService);
    professionalDeleteButton?.addEventListener?.("click", handleDeleteProfessional);
    userDeleteButton?.addEventListener?.("click", handleDeleteUser);

    professionalBlockButton?.addEventListener?.("click", handleProfessionalBlock);
    userBlockButton?.addEventListener?.("click", handleUserBlock);

    professionalApproveButton?.addEventListener?.("click", handleProfessionalRequest);
    professionalDeclineButton?.addEventListener?.("click", handleProfessionalRequest);

    serviceSearchInput?.addEventListener("input", handleItemSearch);
    professionalSearchInput?.addEventListener("input", handleItemSearch);
    userSearchInput?.addEventListener("input", handleItemSearch);
}

listenEvents();