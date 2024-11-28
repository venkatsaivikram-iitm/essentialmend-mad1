import { $, a$, showInfoMsg } from "./utils/common-utils";
import { openInNewTab, redirect } from "./utils/app-route-util";
import { Collector } from "./collector";


class LibraryCollector extends Collector {
    constructor (module) {
        super(module);
    }
}
const libraryCollector = new LibraryCollector("library");
window.libraryCollector = libraryCollector;
libraryCollector.add(...(window.library || []));

let currentSelectedBookID;

const uploadButton = $("#upload-btn");
const uploadFileInput = $("#upload-file-input");
const uploadModalCloseButton = $("#upload-modal-close-btn");
const deleteModalCloseButton = $("#delete-modal-close-btn");
const bookItems = () => a$(".library-book-item");
const bookDeleteButtons = () => a$(".book-delete-btn");
const deleteButton = $("#delete-btn");
const libraryBooksWrapperElement = $("#library-books-wrapper");
const deleteModalBody = $("#delete-modal-body");


const addElementToView = (book) => {
    libraryBooksWrapperElement.innerHTML += `
        <div class="library-book-item" data-fid=${book.file_id}>
            <div class="book-item-icon-wrapper">
                <i class="bi bi-book-half book-item-icon"></i>
                <button type="button" class="btn book-delete-btn btn-danger" data-fid=${book.file_id} data-bs-toggle="modal" data-bs-target="#delete-modal" >
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </div>
            <hr style="width:100%;margin:0;border-color:black" />
            <div class="book-item-info-wrapper">
                <h4>${book.file_name}</h4>
                <p>${book.uploaded_on_str}</p>
            </div>
        </div>
    `;

    listenEvents();
};

const handleUploadBooks = () => {
    const uploadFile = uploadFileInput.files?.[0];
    if (!uploadFile) {
        showInfoMsg("No files selected to upload", "danger");
        return;
    }

    const body = new FormData();
    body.append("files", uploadFile);

    fetch("/api/library", {
        method: "POST",
        body
    }).then(response => response.json()).then(data => {
        libraryCollector.add(data.data.file);
        addElementToView(data.data.file);
        uploadModalCloseButton.click();
        showInfoMsg(data.data.message, data.result);
    });
}


const handleOpenBook = (event) => {
    currentSelectedBookID = event.currentTarget.dataset.fid;
    const currentSelectedBookModel = libraryCollector.get(currentSelectedBookID);
    if (!currentSelectedBookModel) {
        return;
    }
    openInNewTab(`/view/${currentSelectedBookID}`)
};

const handleDeleteBook = () => {
    if (!currentSelectedBookID) return;

    const body = new FormData();
    body.append("FID", currentSelectedBookID);

    fetch("/api/library", {
        method: "DELETE",
        body
    }).then(response => response.json()).then(data => {
        libraryCollector.remove(data.data.file_id);
        libraryBooksWrapperElement.replaceChildren(...[...(bookItems() || [])].filter((bookItem) => bookItem.dataset.fid !== data.data.file_id));
        deleteModalCloseButton.click();
        showInfoMsg(data.data.message, data.result);
    });
};

const handleDeleteCallback = (event) => {
    currentSelectedBookID = event.currentTarget.dataset.fid;
    deleteModalBody.innerHTML = `<p>On performing the action, the book <b>${libraryCollector.get(currentSelectedBookID)?.file_name}</b> will be deleted. Click Detele to proceed.</p>`
    event.stopPropagation();
};

const handleDeleteModalClose = () => {
    currentSelectedBookID = undefined;
}

function unlistenEvents() {
    uploadButton.removeEventListener("click", handleUploadBooks);
    bookItems().forEach((bookItem) => bookItem.removeEventListener("click", handleOpenBook));
    bookDeleteButtons().forEach((button) => button.removeEventListener("click", handleDeleteCallback));
    deleteButton.removeEventListener("click", handleDeleteBook);
    deleteModalCloseButton.removeEventListener("click", handleDeleteModalClose);
}

function listenEvents() {
    unlistenEvents();
    uploadButton.addEventListener("click", handleUploadBooks);
    bookItems().forEach((bookItem) => bookItem.addEventListener("click", handleOpenBook));
    bookDeleteButtons().forEach((button) => button.addEventListener("click", handleDeleteCallback));
    deleteButton.addEventListener("click", handleDeleteBook)
    deleteModalCloseButton.addEventListener("click", handleDeleteModalClose);
}

listenEvents();
