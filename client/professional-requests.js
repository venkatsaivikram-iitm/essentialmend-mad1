import { $, a$, setHTML } from "./utils/common-utils";
import { Collector } from "./collector";



class ProfessionalCollector extends Collector {
    constructor () {
        super({
            module: "professional",
            index: "uid"
        })
    }
}

const professionalCollector = new ProfessionalCollector();
professionalCollector.add(...(window.professionals || []));
window.professionalCollector = professionalCollector;


const professionalItems = a$(".professional-item");
const professionalDeleteModalButtons = a$(".professional-delete-modal-btn");
const professionalInfoModalBody = $("#professional-info-modal-body");
const professionalDeleteModalBody = $("#professional-delete-modal-body");


let currentProfessional;


const handleItemInfo = (event) => {
    currentProfessional = professionalCollector.get(event?.currentTarget?.dataset?.uid);
    setHTML(professionalInfoModalBody, `
        <p class="m-0"><span class="fw-bold">Name: </span>${currentProfessional?.name}</p>
        <p class="m-0"><span class="fw-bold">Email: </span>${currentProfessional?.email}</p>
        <p class="m-0"><span class="fw-bold">Role: </span>${currentProfessional?.role}</p>
        <p class="m-0"><span class="fw-bold">Status: </span>${currentProfessional?.status}</p>
        <p class="m-0"><span class="fw-bold">Location: </span>${currentProfessional?.location}</p>
        <p class="m-0"><span class="fw-bold">Pincode: </span>${currentProfessional?.pincode}</p>
        <p class="m-0"><span class="fw-bold">Service: </span>${currentProfessional?.service?.name}</p>
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
}

const handleItemSelect = (event) => {
    currentProfessional = professionalCollector.get(event?.currentTarget?.dataset?.uid);
    const action = event?.currentTarget?.dataset?.action;
    if (action === "delete") {
        setHTML(professionalDeleteModalBody, `
            <p class="m-0">Are you sure to <span class="fw-bold text-danger">DELETE</span> <span class="fw-bold">${currentProfessional?.name} (${currentProfessional?.email})</span> permanently? Click <span class="fw-bold">Delete</span> to delete permanently or <span class="fw-bold">Block</span> to block the professional (you can unblock later).<p>
        `);
    }
}


const listenEvents = () => {
    professionalItems?.forEach((professionalItem) => professionalItem?.addEventListener?.("click", handleItemInfo));
    professionalDeleteModalButtons?.forEach((professionalDeleteModalButton) => professionalDeleteModalButton?.addEventListener?.("click", handleItemSelect));
}

listenEvents();