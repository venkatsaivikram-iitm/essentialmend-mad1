import { $, a$, showInfoMsg } from "./utils/common-utils";
import { Collector } from "./collector";
import { API_RESPONSE } from "./constants/api-constants";
import { REQUEST_STATUS } from "./constants/constants";


class ExploreCollector extends Collector {
    constructor (module) {
        super(module);
    }

    markAsRequested(FID) {
        const book = this.models.find((book) => book.file_id === FID);
        if (book) {
            book.isRequested = true;
            book.request_status = REQUEST_STATUS.PENDING;
        }
    }
}
const exploreCollector = new ExploreCollector("explore");
window.exploreCollector = exploreCollector;
exploreCollector.add(...(window.library || []));

let currentSelectedBookID;

const bookSearchInputElement = $("#book-search-input");
const requestModalCloseButton = $("#request-modal-close-btn");
const bookItems = () => a$(".explore-book-item");
const bookAddButtons = () => a$(".book-add-btn");
const requestButton = $("#request-btn");
const exploreBooksWrapperElement = $("#explore-books-wrapper");
const addModalBody = $("#add-modal-body");


const updateView = (search) => {
    let bookItemsHTML = '';
    let books = exploreCollector.getAll();
    if (search) {
        books = books.filter((book) => book.file_name.toLowerCase().includes(search.toLowerCase()));
    }
    books.forEach((book) => {
        bookItemsHTML += `
            <div class="explore-book-item" data-fid=${book.file_id} data-bs-toggle="modal" data-bs-target="#add-modal">
                <div class="book-item-icon-wrapper">
                    <i class="bi bi-book-half book-item-icon"></i>
                    ${
                        book.isRequested ? "" : `
                            <button type="button" class="btn book-add-btn btn-success" data-fid=${book.file_id} data-bs-toggle="modal" data-bs-target="#add-modal" >
                                <i class="bi bi-bookmark-plus-fill"></i>
                            </button>
                        `
                    }
                </div>
                <hr style="width:100%;margin:0;border-color:black" />
                <div class="book-item-info-wrapper">
                    <h4>${book.file_name}</h4>
                    <p>${book.uploaded_on_str}</p>
                </div>
            </div>
        `;
    });

    if (!bookItemsHTML) {
        bookItemsHTML = "<p>No books found for your search.. Try searching for a different one.</p>"
    }

    exploreBooksWrapperElement.innerHTML = bookItemsHTML;
    listenEvents();
};


const handleBookSearch = (event) => {
    updateView(event.target.value || '');
}

const handleRequestBook = () => {
    if (!currentSelectedBookID) return;

    const body = new FormData();
    body.append("FID", currentSelectedBookID);

    fetch("/api/request", {
        method: "POST",
        body
    }).then(response => response.json()).then(data => {
        if (data.result === API_RESPONSE.SUCCESS) {
            exploreCollector.markAsRequested(data.data.request.file_id);
            updateView();
            requestModalCloseButton.click();
            showInfoMsg(data.data.message, data.result);
        }
    });
};

const handleAddCallback = (event) => {
    currentSelectedBookID = event.currentTarget.dataset.fid;
    const book = exploreCollector.get(currentSelectedBookID);
    addModalBody.innerHTML = `
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-grow-1">
                <h6>Book name : ${book.file_name}</h6>
                <p class="m-0">Book size : ${Math.ceil(book.file_size / 1024 / 1024)} mb</p>
                <p class="m-0">Uploaded on : ${book.uploaded_on_str}</p>
            </div>
            <div>
                <i class="bi bi-book-half book-item-icon"></i>
            </div>
        </div>
        <hr />
        <h6>Reviews:</h6>
        ${
            book.reviews ? 'reviews' : `<p>No reviews for the book yet</p>`
        }
    `;
    if (book.isRequested) {
        requestButton.classList.add("disabled");
        requestButton.textContent = "Access Requested";
    } else {
        requestButton.classList.remove("disabled");
        requestButton.textContent = "Request Access";
    }
    event.stopPropagation();
};

function unlistenEvents() {
    bookSearchInputElement.removeEventListener("input", handleBookSearch);
    bookItems().forEach((bookItem) => bookItem.removeEventListener("click", handleAddCallback));
    bookAddButtons().forEach((button) => button.removeEventListener("click", handleAddCallback));
    requestButton.removeEventListener("click", handleRequestBook)
}

function listenEvents() {
    unlistenEvents();
    bookSearchInputElement.addEventListener("input", handleBookSearch);
    bookItems().forEach((bookItem) => bookItem.addEventListener("click", handleAddCallback));
    bookAddButtons().forEach((button) => button.addEventListener("click", handleAddCallback));
    requestButton.addEventListener("click", handleRequestBook)
}

listenEvents();
