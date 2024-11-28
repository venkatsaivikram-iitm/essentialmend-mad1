import { a$, $, setHTML, showInfoMsg } from "./utils/common-utils";
import { Collector } from "./collector";
import { API_RESPONSE } from "./constants/api-constants";
import ConfigHolder from "./utils/config-holder";


class ServiceRequestsCollector extends Collector {
    constructor () {
        super({
            module: "serviceRequests",
            index: "reqid"
        })
    }

    // markAsRequested (uid) {
    //     const professional = this.get(uid);
    //     if (professional) {
    //         professional.requestPending = true;
    //     }
    // }
}

const serviceRequestsCollector = new ServiceRequestsCollector();
serviceRequestsCollector.add(...(window.serviceRequests || []));
window.serviceRequestsCollector = serviceRequestsCollector;

let currentServiceRequest;

const serviceRequestItems = () => a$(".service-request-item");
const serviceRequestAcceptButtons = () => a$(".service-request-accept-btn");
const serviceRequestCancelButtons = () => a$(".service-request-cancel-btn");
const serviceRequestReviewButtons = () => a$(".service-request-review-btn");

const serviceRequestAcceptButton = $("#service-request-accept-btn");
const serviceRequestCancelButton = $("#service-request-cancel-btn");
const serviceRequestReviewButton = $("#service-request-review-btn");

const serviceRequestInfoModalBody = $("#service-request-info-modal-body");
const serviceRequestAcceptModalBody = $("#service-request-accept-modal-body");
const serviceRequestCancelModalBody = $("#service-request-cancel-modal-body");
const serviceRequestReviewModalBody = $("#service-request-review-modal-body");

const serviceRequestReviewText = $("#service-request-review-text");
const serviceRequestReviewRating = $("#service-request-review-rating");



const handleServiceRequestInfo = (event) => {
    currentServiceRequest = serviceRequestsCollector.get(event?.currentTarget?.dataset?.reqid);
    let html = '';
    if (ConfigHolder.isUser) {
        html = `
            <p class="m-0"><span class="fw-bold">Service Request: </span>${currentServiceRequest?.serviceInfo?.name}</p>
            <p class="m-0"><span class="fw-bold">Request Status: </span>${currentServiceRequest?.status}</p>
            <p class="m-0"><span class="fw-bold">Request Status Info: </span>${currentServiceRequest?.statusInfo}</p>
            <p class="m-0"><span class="fw-bold">Requested At: </span>${new Date(Number(currentServiceRequest?.createdAt))}</p>
            <p class="m-0"><span class="fw-bold">Request Closed At: </span>${currentServiceRequest?.closedAt ? new Date(Number(currentServiceRequest?.closedAt)) : "-"}</p>
            <hr class="mt-2 mb-2" />
            <p class="m-0 fw-bold">Professional Info:</p>
            <p class="m-0"><span class="fw-bold">Name: </span>${currentServiceRequest?.professionalInfo?.name}</p>
            <p class="m-0"><span class="fw-bold">Email: </span>${currentServiceRequest?.professionalInfo?.email}</p>
            <p class="m-0"><span class="fw-bold">Role: </span>${currentServiceRequest?.professionalInfo?.role}</p>
            <p class="m-0"><span class="fw-bold">Status: </span>${currentServiceRequest?.professionalInfo?.status}</p>
            <p class="m-0"><span class="fw-bold">Location: </span>${currentServiceRequest?.professionalInfo?.location}</p>
            <p class="m-0"><span class="fw-bold">Pincode: </span>${currentServiceRequest?.professionalInfo?.pincode}</p>
            <p class="m-0"><span class="fw-bold">Description: </span>${currentServiceRequest?.professionalInfo?.description}</p>
            <p class="m-0"><span class="fw-bold">Price: </span>${currentServiceRequest?.professionalInfo?.price} Rs</p>
            <p class="m-0"><span class="fw-bold">Duration: </span>${currentServiceRequest?.professionalInfo?.duration} Hrs</p>
            <p class="m-0"><span class="fw-bold">Rating: </span>${currentServiceRequest?.professionalInfo?.rating}</p>
            <p class="m-0"><span class="fw-bold">Experience: </span>${currentServiceRequest?.professionalInfo?.experience} Years</p>
            <p class="m-0"><span class="fw-bold">Created At: </span>${new Date(Number(currentServiceRequest?.professionalInfo?.createdAt))}</p>
        `;
    } else if (ConfigHolder.isProfessional) {
        html = `
            <p class="m-0"><span class="fw-bold">Service Request: </span>${currentServiceRequest?.serviceInfo?.name}</p>
            <p class="m-0"><span class="fw-bold">Request Status: </span>${currentServiceRequest?.status}</p>
            <p class="m-0"><span class="fw-bold">Request Status Info: </span>${currentServiceRequest?.statusInfo}</p>
            <p class="m-0"><span class="fw-bold">Requested At: </span>${new Date(Number(currentServiceRequest?.createdAt))}</p>
            <p class="m-0"><span class="fw-bold">Request Closed At: </span>${currentServiceRequest?.closedAt ? new Date(Number(currentServiceRequest?.closedAt)) : "-"}</p>
            <hr class="mt-2 mb-2" />
            <p class="m-0 fw-bold">User Info:</p>
            <p class="m-0"><span class="fw-bold">Name: </span>${currentServiceRequest?.userInfo?.name}</p>
            <p class="m-0"><span class="fw-bold">Email: </span>${currentServiceRequest?.userInfo?.email}</p>
            <p class="m-0"><span class="fw-bold">Role: </span>${currentServiceRequest?.userInfo?.role}</p>
            <p class="m-0"><span class="fw-bold">Status: </span>${currentServiceRequest?.userInfo?.status}</p>
            <p class="m-0"><span class="fw-bold">Location: </span>${currentServiceRequest?.userInfo?.location}</p>
            <p class="m-0"><span class="fw-bold">Pincode: </span>${currentServiceRequest?.userInfo?.pincode}</p>
            <p class="m-0"><span class="fw-bold">Created At: </span>${new Date(Number(currentServiceRequest?.userInfo?.createdAt))}</p>
        `;
    } else if (ConfigHolder.isAdmin) {
        html = `
            <p class="m-0"><span class="fw-bold">Service Request: </span>${currentServiceRequest?.serviceInfo?.name}</p>
            <p class="m-0"><span class="fw-bold">Request Status: </span>${currentServiceRequest?.status}</p>
            <p class="m-0"><span class="fw-bold">Request Status Info: </span>${currentServiceRequest?.statusInfo}</p>
            <p class="m-0"><span class="fw-bold">Requested At: </span>${new Date(Number(currentServiceRequest?.createdAt))}</p>
            <p class="m-0"><span class="fw-bold">Request Closed At: </span>${currentServiceRequest?.closedAt ? new Date(Number(currentServiceRequest?.closedAt)) : "-"}</p>
            <hr class="mt-2 mb-2" />
            <p class="m-0 fw-bold">Professional Info:</p>
            <p class="m-0"><span class="fw-bold">Name: </span>${currentServiceRequest?.professionalInfo?.name}</p>
            <p class="m-0"><span class="fw-bold">Email: </span>${currentServiceRequest?.professionalInfo?.email}</p>
            <p class="m-0"><span class="fw-bold">Role: </span>${currentServiceRequest?.professionalInfo?.role}</p>
            <p class="m-0"><span class="fw-bold">Status: </span>${currentServiceRequest?.professionalInfo?.status}</p>
            <p class="m-0"><span class="fw-bold">Location: </span>${currentServiceRequest?.professionalInfo?.location}</p>
            <p class="m-0"><span class="fw-bold">Pincode: </span>${currentServiceRequest?.professionalInfo?.pincode}</p>
            <p class="m-0"><span class="fw-bold">Description: </span>${currentServiceRequest?.professionalInfo?.description}</p>
            <p class="m-0"><span class="fw-bold">Price: </span>${currentServiceRequest?.professionalInfo?.price} Rs</p>
            <p class="m-0"><span class="fw-bold">Duration: </span>${currentServiceRequest?.professionalInfo?.duration} Hrs</p>
            <p class="m-0"><span class="fw-bold">Rating: </span>${currentServiceRequest?.professionalInfo?.rating}</p>
            <p class="m-0"><span class="fw-bold">Experience: </span>${currentServiceRequest?.professionalInfo?.experience} Years</p>
            <p class="m-0"><span class="fw-bold">Created At: </span>${new Date(Number(currentServiceRequest?.professionalInfo?.createdAt))}</p>
            <hr class="mt-2 mb-2" />
            <p class="m-0 fw-bold">User Info:</p>
            <p class="m-0"><span class="fw-bold">Name: </span>${currentServiceRequest?.userInfo?.name}</p>
            <p class="m-0"><span class="fw-bold">Email: </span>${currentServiceRequest?.userInfo?.email}</p>
            <p class="m-0"><span class="fw-bold">Role: </span>${currentServiceRequest?.userInfo?.role}</p>
            <p class="m-0"><span class="fw-bold">Status: </span>${currentServiceRequest?.userInfo?.status}</p>
            <p class="m-0"><span class="fw-bold">Location: </span>${currentServiceRequest?.userInfo?.location}</p>
            <p class="m-0"><span class="fw-bold">Pincode: </span>${currentServiceRequest?.userInfo?.pincode}</p>
            <p class="m-0"><span class="fw-bold">Created At: </span>${new Date(Number(currentServiceRequest?.userInfo?.createdAt))}</p>
        `;
    }

    if (currentServiceRequest.reviews) {
        const _reviewsHtml = currentServiceRequest.reviews.reduce((_reviewHtml, review) => {
            _reviewHtml += `
                <div class="d-flex gap-4 border rounded p-2">
                    <div class="fs-1 align-self-center">
                        <i class="bi bi-chat-square-text-fill"></i>
                    </div>
                    <div class="d-flex flex-column">
                        <p class="m-0 fw-bold">${review.reviewerName}(${review.reviewerEmail}) --> ${review.revieweeName}(${review.revieweeEmail}) | ${review.type}</p>
                        <p class="m-0 small">${new Date(Number(review.createdAt))?.toLocaleString()}</p>
                        <p class="m-0">${review.review}</p>
                        <p class="m-0"><span class="fw-bold">Rating: </span>${review.rating}</p>
                    </div>
                </div>
            `
            return _reviewHtml;
        }, '');
        html += `
            <hr class="mt-2 mb-2" />
            <p class="m-0 fw-bold">Reviews:</p>
            <div class="d-flex flex-column gap-1">
                ${_reviewsHtml}
            </div>
        `;
    }

    setHTML(serviceRequestInfoModalBody, html);
}

const handleServiceRequestAcceptInfo = (event) => {
    currentServiceRequest = serviceRequestsCollector.get(event?.currentTarget?.dataset?.reqid);
    if (currentServiceRequest) {
        setHTML(serviceRequestAcceptModalBody, `
            <p class="m-0">Are you sure to <span class="fw-bold text-success">${ConfigHolder.isProfessional ? "ACCEPT" : "COMPLETE"}</span> the service request? Click <span class="fw-bold text-success">Confirm</span> to proceed.<p>
        `);
    }
}

const handleServiceRequestCancelInfo = (event) => {
    currentServiceRequest = serviceRequestsCollector.get(event?.currentTarget?.dataset?.reqid);
    if (currentServiceRequest) {
        setHTML(serviceRequestCancelModalBody, `
            <p class="m-0">Are you sure to <span class="fw-bold text-danger">CANCEL</span> the service request? Click <span class="fw-bold text-danger">Cancel</span> to proceed.<p>
        `);
    }
}

const handleServiceRequestReviewInfo = (event) => {
    currentServiceRequest = serviceRequestsCollector.get(event?.currentTarget?.dataset?.reqid);
    if (currentServiceRequest) {
        const revieweeInfo = currentServiceRequest.professionalInfo.uid === ConfigHolder.uid ? currentServiceRequest.userInfo : currentServiceRequest.professionalInfo;
        let html = `<p class="mt-2">Add a service comment about the ${ConfigHolder.isProfessional ? "user" : "professional"} - <span class="fw-bold"> ${revieweeInfo.name} (${revieweeInfo.email})</span></p>`;
        if (currentServiceRequest.reviews) {
            const _reviewsHtml = currentServiceRequest.reviews.reduce((_reviewHtml, review) => {
                _reviewHtml += `
                    <div class="d-flex gap-4 border rounded p-2">
                        <div class="fs-1 align-self-center">
                            <i class="bi bi-chat-square-text-fill"></i>
                        </div>
                        <div class="d-flex flex-column">
                            <p class="m-0 fw-bold">${review.reviewerName}(${review.reviewerEmail}) --> ${review.revieweeName}(${review.revieweeEmail}) | ${review.type}</p>
                            <p class="m-0 small">${new Date(Number(review.createdAt))?.toLocaleString()}</p>
                            <p class="m-0">${review.review}</p>
                            <p class="m-0"><span class="fw-bold">Rating: </span>${review.rating}</p>
                        </div>
                    </div>
                `
                return _reviewHtml;
            }, '');
            html += `<div class="d-flex flex-column gap-1">${_reviewsHtml}</div>`
        };
        setHTML(serviceRequestReviewModalBody, html);
    }
}

const handleServiceRequestAccept = () => {
    if (currentServiceRequest) {
        const cid = currentServiceRequest.cid;
        const pid = currentServiceRequest.pid;
        const sid = currentServiceRequest.sid;
        const reqid = currentServiceRequest.reqid;
        if (cid && pid && sid && reqid) {
            const body = new FormData();
            body.append("mode", ConfigHolder.isProfessional ? "accept" : "complete");
            body.append("pid", pid);
            body.append("sid", sid);
            body.append("cid", cid);
            body.append("reqid", reqid)

            fetch("/api/servicerequest", {
                method: "POST",
                body
            })
            .then((response) => response.json())
            .then((response) => {
                showInfoMsg(response.data.message, response.result, {reloadOnTimeout: response.result === API_RESPONSE.SUCCESS});
                // if (response.result === API_RESPONSE.SUCCESS) {
                    // professionalCollector.markAsRequested(currentProfessional.uid);
                    // serviceRequestInfoModalCloseBtn?.click();
                // }
            }).catch((error) => {
                showInfoMsg("Error occured in accepting the service, Try again", "danger");
            })
        }
    }
}


const handleServiceRequestCancel = () => {
    if (currentServiceRequest) {
        const cid = currentServiceRequest.cid;
        const pid = currentServiceRequest.pid;
        const sid = currentServiceRequest.sid;
        const reqid = currentServiceRequest.reqid;
        if (cid && pid && sid && reqid) {
            const body = new FormData();
            body.append("mode", "cancel");
            body.append("pid", pid);
            body.append("sid", sid);
            body.append("cid", cid);
            body.append("reqid", reqid)

            fetch("/api/servicerequest", {
                method: "POST",
                body
            })
            .then((response) => response.json())
            .then((response) => {
                showInfoMsg(response.data.message, response.result, {reloadOnTimeout: response.result === API_RESPONSE.SUCCESS});
                if (response.result === API_RESPONSE.SUCCESS) {
                    // professionalCollector.markAsRequested(currentProfessional.uid);
                    // serviceRequestInfoModalCloseBtn?.click();
                }
            }).catch((error) => {
                showInfoMsg("Error occured in cancelling the service, Try again", "danger");
            })
        }
    }
}

const handleServiceRequestReview = () => {
    if (currentServiceRequest) {
        const reviewerUid = ConfigHolder.uid;
        const revieweeUid = [currentServiceRequest.pid, currentServiceRequest.cid].filter((i) => i !== reviewerUid).at(0);
        const reviewText = serviceRequestReviewText?.value;
        const reviewRating = serviceRequestReviewRating?.value ? String(serviceRequestReviewRating?.value) : '';
        const reqid = currentServiceRequest.reqid;
        if (reviewerUid && revieweeUid && reviewText && reviewRating && reqid) {
            const body = new FormData();
            body.append("reviewType", "review"); // TODO: handle review type
            body.append("reviewerUid", reviewerUid);
            body.append("revieweeUid", revieweeUid);
            body.append("reviewText", reviewText);
            body.append("reviewRating", reviewRating);
            body.append("reqid", reqid);

            fetch("/api/review", {
                method: "POST",
                body
            })
            .then((response) => response.json())
            .then((response) => {
                showInfoMsg(response.data.message, response.result, {reloadOnTimeout: response.result === API_RESPONSE.SUCCESS});
                // if (response.result === API_RESPONSE.SUCCESS) {
                    // professionalCollector.markAsRequested(currentProfessional.uid);
                    // serviceRequestInfoModalCloseBtn?.click();
                // }
            }).catch((error) => {
                showInfoMsg("Error occured in reviewing the service, Try again", "danger");
            })
        }
    }
}



const listenEvents = () => {
    serviceRequestItems()?.forEach?.((serviceRequest) => serviceRequest?.addEventListener("click", handleServiceRequestInfo));
    serviceRequestAcceptButtons()?.forEach?.((acceptButton) => acceptButton?.addEventListener("click", handleServiceRequestAcceptInfo));
    serviceRequestCancelButtons()?.forEach?.((cancelButton) => cancelButton?.addEventListener("click", handleServiceRequestCancelInfo));
    serviceRequestReviewButtons()?.forEach?.((reviewButton) => reviewButton?.addEventListener("click", handleServiceRequestReviewInfo));

    serviceRequestAcceptButton?.addEventListener("click", handleServiceRequestAccept);
    serviceRequestCancelButton?.addEventListener("click", handleServiceRequestCancel);
    serviceRequestReviewButton?.addEventListener("click", handleServiceRequestReview);
}

listenEvents();