import { a$, $, setHTML, showInfoMsg } from "./utils/common-utils";
import { Collector } from "./collector";
import { API_RESPONSE } from "./constants/api-constants";
import ConfigHolder from "./utils/config-holder";


class ProfessionalCollector extends Collector {
    constructor () {
        super({
            module: "services",
            index: "uid"
        })
    }

    markAsRequested (uid) {
        const professional = this.get(uid);
        if (professional) {
            professional.requestPending = true;
        }
    }
}

const professionalCollector = new ProfessionalCollector();
professionalCollector.add(...(window.professionals || []));
window.professionalCollector = professionalCollector;

const serviceItems = () => a$(".service-item");
const serviceInfoModalBody = $("#service-info-modal-body");
const serviceReviewBody = $("#service-review-body");
const serviceSearchInput = $("#service-search-input");
const searchNotFoundText = $("#search-not-found-text");
const serviceRequestButton = $("#service-request-btn");
const serviceInfoModalCloseButton = $("#service-info-modal-close-btn");

let currentProfessional;


const handleServiceSearch = (event) => {
    const searchValue = event?.currentTarget?.value?.toLowerCase();
    if (searchValue && professionalCollector.getAll().length > 0) {
        let matchingCount = 0;
        serviceItems()?.forEach((serviceItem) => {
            if (serviceItem?.dataset?.value?.toLowerCase()?.includes?.(searchValue)) {
                serviceItem?.classList?.remove("d-none");
                matchingCount += 1;
            } else {
                serviceItem?.classList?.add("d-none");
            }
        })
        console.log(matchingCount)
        if (matchingCount === 0) {
            searchNotFoundText?.classList?.remove("d-none");
        } else {
            searchNotFoundText?.classList?.add("d-none");
        }
    } else {
        serviceItems()?.forEach((serviceItem) => serviceItem?.classList?.remove?.("d-none"));
        searchNotFoundText?.classList?.add("d-none");
    }
}


const handleItemInfo = (event) => {
    currentProfessional = professionalCollector.get(event?.currentTarget?.dataset?.uid);
    if (currentProfessional) {
        setHTML(serviceInfoModalBody, `
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
            <hr class="mt-2 mb-2" />
            <p class="m-0"><span class="fw-bold">Request Status: </span>${currentProfessional?.professionalRequest?.status}</p>
            <p class="m-0"><span class="fw-bold">Request Status Info: </span>${currentProfessional?.professionalRequest?.statusInfo}</p>
            <p class="m-0"><span class="fw-bold">Requested At: </span>${new Date(Number(currentProfessional?.professionalRequest?.createdAt))}</p>
            <p class="m-0"><span class="fw-bold">Request Closed At: </span>${currentProfessional?.professionalRequest?.closedAt ? new Date(Number(currentProfessional?.professionalRequest?.closedAt)) : "-"}</p>
        `);
        if (currentProfessional.reviews) {
            const reviewsHtml = currentProfessional.reviews.reduce((_reviewHtml, review) => {
                _reviewHtml += `
                    <div class="d-flex gap-4 border rounded p-2">
                        <div class="fs-1 align-self-center">
                            <i class="bi bi-chat-square-text-fill"></i>
                        </div>
                        <div class="d-flex flex-column">
                            <p class="m-0 fw-bold">${review.reviewerName} | ${review.reviewerEmail} | ${review.type}</p>
                            <p class="m-0 small">${new Date(Number(review.createdAt))?.toLocaleString()}</p>
                            <p class="m-0">${review.review}</p>
                            <p class="m-0"><span class="fw-bold">Rating: </span>${review.rating}</p>
                        </div>
                    </div>
                `
                return _reviewHtml;
            }, '');
            setHTML(serviceReviewBody, reviewsHtml);
        } else {
            setHTML(serviceReviewBody, 
                `No reviews for this professional by any users yet!`
            );
        }

        if (currentProfessional.requestPending) {
            setHTML(serviceRequestButton, "Service Requested");
            serviceRequestButton?.setAttribute?.("disabled", true);
        } else {
            setHTML(serviceRequestButton, "Request Service");
            serviceRequestButton?.removeAttribute("disabled");
        }
    }
}

const handleRequestService = () => {
    const cid = ConfigHolder.uid;
    const pid = currentProfessional.uid;
    const sid = currentProfessional.service.sid;
    if (cid && pid && sid) {
        const body = new FormData();
        body.append("mode", "request");
        body.append("pid", pid);
        body.append("sid", sid);
        body.append("cid", cid);

        fetch("/api/servicerequest", {
            method: "POST",
            body
        })
        .then((response) => response.json())
        .then((response) => {
            showInfoMsg(response.data.message, response.result);
            if (response.result === API_RESPONSE.SUCCESS) {
                professionalCollector.markAsRequested(currentProfessional.uid);
                setHTML(serviceRequestButton, "Service Requested");
                serviceRequestButton?.setAttribute?.("disabled", true);
                serviceInfoModalCloseButton?.click();
            }
        }).catch((error) => {
            showInfoMsg("Error occured in requesting the service, Try again", "danger");
        })
    }
}

const listenEvents = () => {
    serviceItems()?.forEach((serviceItem) => {
        serviceItem?.addEventListener("click", handleItemInfo);
        serviceSearchInput?.addEventListener("input", handleServiceSearch);
    });
    serviceRequestButton?.addEventListener("click", handleRequestService);
}

listenEvents();