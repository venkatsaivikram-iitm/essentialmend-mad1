/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/collection.js":
/*!******************************!*\
  !*** ./client/collection.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common-utils */ \"./client/utils/common-utils.js\");\n/* harmony import */ var _utils_app_route_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/app-route-util */ \"./client/utils/app-route-util.js\");\n/* harmony import */ var _collector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collector */ \"./client/collector.js\");\n/* harmony import */ var _constants_api_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants/api-constants */ \"./client/constants/api-constants.js\");\n/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants/constants */ \"./client/constants/constants.js\");\n\n\n\n\n\n\n\nclass BooksCollector extends _collector__WEBPACK_IMPORTED_MODULE_2__.Collector {\n    constructor (module) {\n        super(module);\n        this.grantedBooks = [];\n        this.requestedBooks = [];\n        this.wishlist = [];\n    }\n\n    get models() {\n        return [...this.grantedBooks, ...this.requestedBooks, ...this.wishlist]\n    }\n\n    markAsRequested(FID) {\n        const book = this.models.find((book) => book.file_id === FID);\n        if (book) {\n            book.isRequested = true;\n            book.request_status = _constants_constants__WEBPACK_IMPORTED_MODULE_4__.REQUEST_STATUS.PENDING;\n        }\n    }\n\n    addReview(FID, review) {\n        this.models[this.models.findIndex((_model) => _model.file_id === FID)]?.reviews.push(review);\n    }\n}\nconst booksCollector = new BooksCollector(\"collection\");\nwindow.booksCollector = booksCollector;\nbooksCollector.add(...(window.collection?.granted_books || []), ...(window.collection?.requested_books || []), ...(window.collection?.wishlist || []));\nbooksCollector.grantedBooks.push(...(window.collection?.granted_books || []));\nbooksCollector.requestedBooks.push(...(window.collection?.requested_books || []));\nbooksCollector.wishlist.push(...(window.collection?.wishlist || []));\n\nlet currentSelectedBookID;\n\nconst bookSearchInputElement = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#book-search-input\");\nconst bookItems = () => (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.a$)(\".collection-book-item\");\nconst bookInfoButtons = () => (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.a$)(\".book-info-btn\");\n\nconst grantedBooksWrapper = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#granted-books-wrapper\");\nconst requestedBooksWrapper = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#requested-books-wrapper\");\nconst wishlistWrapper = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#wishlist-wrapper\");\n\nconst infoModalBody = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#info-modal-body\");\nconst bookReadButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#book-read-btn\");\nconst bookReviewButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#book-review-btn\");\nconst bookReturnButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#book-return-btn\");\nconst reviewModalcontentElement = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#review-modal-body-content\");\n\nconst infoModalCloseButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#info-modal-close-btn\");\nconst reviewModalCloseButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#review-modal-close-btn\");\nconst bookReviewSubmitButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#book-review-submit-btn\");\n\nconst bookReviewContent = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#book-review-content\");\n\n\nconst updateView = (search) => {\n    let grantedBookItemsHTML = '',\n        requestedBookItemsHTML = '',\n        wishlistItemsHTML = '';\n    let books = booksCollector.getAll();\n    if (search) {\n        books = books.filter((book) => book.file_name.toLowerCase().includes(search.toLowerCase()));\n    }\n    books.forEach((book) => {\n        const bookItemHTML = `\n            <div class=\"collection-book-item\" data-fid=${book.file_id} data-bs-toggle=\"modal\" data-bs-target=\"#info-modal\">\n                <div class=\"book-item-icon-wrapper\">\n                    <i class=\"bi bi-book-half book-item-icon\"></i> \n                        <button type=\"button\" class=\"btn book-info-btn\" data-fid=${book.file_id} data-bs-toggle=\"modal\" data-bs-target=\"#info-modal\" >\n                            <i class=\"bi bi-info-circle\"></i>\n                        </button>\n                </div>\n                <hr style=\"width:100%;margin:0;border-color:black\" />\n                <div class=\"book-item-info-wrapper\">\n                    <h4>${book.file_name}</h4>\n                    <p>${book.uploaded_on_str}</p>\n                </div>\n            </div>\n        `;\n        if (book.request_status === _constants_constants__WEBPACK_IMPORTED_MODULE_4__.REQUEST_STATUS.GRANTED) {\n            grantedBookItemsHTML += bookItemHTML;\n        } else if (book.request_status === _constants_constants__WEBPACK_IMPORTED_MODULE_4__.REQUEST_STATUS.PENDING) {\n            requestedBookItemsHTML += bookItemHTML;\n        } else {\n            wishlistItemsHTML += bookItemHTML;\n        }\n    });\n\n    if (!grantedBookItemsHTML) {\n        grantedBookItemsHTML = search ? \"No granted books matching the search\" : \"<p>No granted books in your collection</p>\"\n    }\n    if (!requestedBookItemsHTML) {\n        requestedBookItemsHTML = search ? \"No requested books matching the search\" : \"<p>No books have been requested at the moment</p>\"\n    }\n    if (!wishlistItemsHTML) {\n        wishlistItemsHTML = search ? \"No books in wishlist matching the search\" : \"<p>No books in your wishlist</p>\"\n    }\n\n    grantedBooksWrapper.innerHTML = '<h3>Granted Books</h3>' + grantedBookItemsHTML;\n    requestedBooksWrapper.innerHTML = '<h3>Requested Books</h3>' + requestedBookItemsHTML;\n    wishlistWrapper.innerHTML = '<h3>WishList</h3>' + wishlistItemsHTML;\n\n    listenEvents();\n};\n\n\nconst handleBookSearch = (event) => {\n    updateView(event.target.value || '');\n}\n\nconst handleReadBook = (event) => {\n    if (booksCollector.get(currentSelectedBookID)) {\n        (0,_utils_app_route_util__WEBPACK_IMPORTED_MODULE_1__.openInNewTab)(`/view/${currentSelectedBookID}`);\n    }\n}\n\nconst handleRequestBook = () => {\n    if (!currentSelectedBookID) return;\n\n    const book = booksCollector.get(currentSelectedBookID);\n    if (!book?.isRequested) {\n        const body = new FormData();\n        body.append(\"FID\", currentSelectedBookID);\n    \n        fetch(\"/api/request\", {\n            method: \"POST\",\n            body\n        }).then(response => response.json()).then(data => {\n            if (data.result === _constants_api_constants__WEBPACK_IMPORTED_MODULE_3__.API_RESPONSE.SUCCESS) {\n                booksCollector.markAsRequested(data.data.request.file_id);\n                let _book = booksCollector.wishlist.splice(booksCollector.wishlist.findIndex((__book) => __book.file_id === data.data.request.file_id), 1);\n                _book = {\n                    ..._book[0],\n                    ...data.data.request\n                }\n                booksCollector.requestedBooks.push(_book)\n                updateView();\n                infoModalCloseButton.click();\n                (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.showInfoMsg)(data.data.message, data.result);\n            }\n        });\n    }\n};\n\nconst handleInfoCallback = (event) => {\n    bookReviewContent.value = \"\";\n    currentSelectedBookID = event.currentTarget.dataset.fid;\n    const book = booksCollector.get(currentSelectedBookID);\n    infoModalBody.innerHTML = `\n        <div class=\"d-flex gap-2 align-items-center\">\n            <div class=\"flex-grow-1\">\n                <h6>Book name : ${book.file_name}</h6>\n                <p class=\"m-0\">Book size : ${Math.ceil(book.file_size / 1024 / 1024)} mb</p>\n                <p class=\"m-0\">Uploaded on : ${book.uploaded_on_str}</p>\n            </div>\n            <div>\n                <i class=\"bi bi-book-half book-item-icon\"></i>\n            </div>\n        </div>\n        <hr />\n        <h5>Reviews:</h5>\n        ${\n        book.reviews?.length ? `\n            <ul class=\"book-review-list\">\n                ${book.reviews.map((review) => (`\n                    <li class=\"book-review-item\">\n                        <div>\n                            <b>${review.username}</b>\n                            |\n                            <b>${review.fullname}</b>\n                            |\n                            <b>${review.email}</b>\n                        </div>\n                        <div>\n                            <p class=\"mt-1 mb-1\">${review.review}</p>\n                            <p class=\"text-end\" style=\"font-size:0.75rem\">${review.reviewed_on_str}</p>\n                        </div>\n                    </li>\n                    <hr />\n                `)).join(\"\")}\n            </ul>\n        ` : `<p>No reviews for the book yet!</p>`\n        }\n    `;\n    if (book.request_status === _constants_constants__WEBPACK_IMPORTED_MODULE_4__.REQUEST_STATUS.PENDING) {\n        bookReturnButton.classList.add(\"disabled\");\n        bookReturnButton.children[1].textContent = \"Access Requested\";\n        bookReadButton.style.display = \"none\";\n    } else if (book.request_status === _constants_constants__WEBPACK_IMPORTED_MODULE_4__.REQUEST_STATUS.GRANTED) {\n        bookReturnButton.classList.remove(\"disabled\");\n        bookReturnButton.children[1].textContent = \"Return Book\";\n        bookReadButton.style.display = \"inline-block\";\n    } else {\n        bookReturnButton.classList.remove(\"disabled\");\n        bookReturnButton.children[1].textContent = \"Request Access\";\n        bookReadButton.style.display = \"none\";\n    }\n    event.stopPropagation();\n};\n\nconst reviewOpenCallback = () => {\n    infoModalCloseButton.click();\n    reviewModalcontentElement.innerHTML = `Write a review for <b>${booksCollector.get(currentSelectedBookID)?.file_name}</b>`;\n}\n\nconst handleBookReviewSubmit = () => {\n    if (!bookReviewContent.value) {\n        (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.showInfoMsg)(\"Review cannot be empty\", \"danger\");\n        return;\n    }\n    const body = new FormData();\n    body.append(\"FID\", currentSelectedBookID);\n    body.append(\"review\", bookReviewContent.value)\n    fetch(\"/api/review\", {\n        method: \"POST\",\n        body\n    }).then(response => response.json()).then(data => {\n        if (data.result === _constants_api_constants__WEBPACK_IMPORTED_MODULE_3__.API_RESPONSE.SUCCESS && data?.data?.review) {\n            booksCollector.addReview(data.data.review.file_id, data.data.review);\n        }\n        (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.showInfoMsg)(data.data.message, data.result);\n        reviewModalCloseButton.click();\n    })\n    bookReviewContent.value = \"\";\n}\n\nfunction unlistenEvents() {\n    bookSearchInputElement.removeEventListener(\"input\", handleBookSearch);\n    bookItems().forEach((bookItem) => bookItem.removeEventListener(\"click\", handleInfoCallback));\n    bookInfoButtons().forEach((button) => button.removeEventListener(\"click\", handleInfoCallback));\n    bookReadButton.removeEventListener(\"click\", handleReadBook);\n    bookReviewButton.removeEventListener(\"click\", reviewOpenCallback);\n    bookReviewSubmitButton.removeEventListener(\"click\", handleBookReviewSubmit);\n    bookReturnButton.removeEventListener(\"click\", handleRequestBook);\n}\n\nfunction listenEvents() {\n    unlistenEvents();\n    bookSearchInputElement.addEventListener(\"input\", handleBookSearch);\n    bookItems().forEach((bookItem) => bookItem.addEventListener(\"click\", handleInfoCallback));\n    bookInfoButtons().forEach((button) => button.addEventListener(\"click\", handleInfoCallback));\n    bookReadButton.addEventListener(\"click\", handleReadBook);\n    bookReviewButton.addEventListener(\"click\", reviewOpenCallback);\n    bookReviewSubmitButton.addEventListener(\"click\", handleBookReviewSubmit);\n    bookReturnButton.addEventListener(\"click\", handleRequestBook);\n}\n\nlistenEvents();\n\n\n//# sourceURL=webpack://bookshelf/./client/collection.js?");

/***/ }),

/***/ "./client/collector.js":
/*!*****************************!*\
  !*** ./client/collector.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Collector: () => (/* binding */ Collector)\n/* harmony export */ });\nclass Collector {\n    constructor(module) {\n        this.module = module;\n        this._models = []\n    }\n\n    get models() {\n        return this._models;\n    }\n\n    set models(models) {\n        this._models = models;\n    }\n\n    get (id) {\n        return this.models.find((model) => model.file_id === id);\n    }\n\n    getAll () {\n        return this.models;\n    }\n\n    add (...models) {\n        if (models.length) {\n            this.models.push(...models);\n        }\n    }\n\n    remove (id) {\n        this.models.splice(this.models.findIndex((model) => model.file_id === id), 1);\n    }\n}\n\n\n\n//# sourceURL=webpack://bookshelf/./client/collector.js?");

/***/ }),

/***/ "./client/constants/api-constants.js":
/*!*******************************************!*\
  !*** ./client/constants/api-constants.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   API_RESPONSE: () => (/* binding */ API_RESPONSE)\n/* harmony export */ });\n\nconst API_RESPONSE = {\n    SUCCESS: \"success\",\n    FAILURE: \"failure\"\n}\n\n\n\n//# sourceURL=webpack://bookshelf/./client/constants/api-constants.js?");

/***/ }),

/***/ "./client/constants/constants.js":
/*!***************************************!*\
  !*** ./client/constants/constants.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   REQUEST_STATUS: () => (/* binding */ REQUEST_STATUS)\n/* harmony export */ });\nconst REQUEST_STATUS = {\n    PENDING: \"pending\",\n    GRANTED: \"granted\"\n};\n\n\n\n\n//# sourceURL=webpack://bookshelf/./client/constants/constants.js?");

/***/ }),

/***/ "./client/utils/app-route-util.js":
/*!****************************************!*\
  !*** ./client/utils/app-route-util.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   openInNewTab: () => (/* binding */ openInNewTab),\n/* harmony export */   redirect: () => (/* binding */ redirect)\n/* harmony export */ });\n\nfunction redirect(href) {\n    if (!href) return;\n\n    window.location.href = href;\n}\n\nfunction openInNewTab(href) {\n    if (!href) return;\n\n    window.open(href, '_blank', 'noopener noreferrer');\n}\n\n\n\n//# sourceURL=webpack://bookshelf/./client/utils/app-route-util.js?");

/***/ }),

/***/ "./client/utils/common-utils.js":
/*!**************************************!*\
  !*** ./client/utils/common-utils.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   $: () => (/* binding */ $),\n/* harmony export */   a$: () => (/* binding */ a$),\n/* harmony export */   ap$: () => (/* binding */ ap$),\n/* harmony export */   c$: () => (/* binding */ c$),\n/* harmony export */   r$: () => (/* binding */ r$),\n/* harmony export */   rm$: () => (/* binding */ rm$),\n/* harmony export */   showInfoMsg: () => (/* binding */ showInfoMsg)\n/* harmony export */ });\nconst BOOTSTRAP_ELEMENT_CLASSNAMES_MAP = {\n    button: [\"btn\"],\n    input: [\"form-control\"],\n    select: [\"form-select\"],\n};\n\n\nfunction extend(obj, addObj) {\n    return {\n        ...obj,\n        ...addObj\n    }\n}\n\nfunction $(selector) {\n    return document.querySelector(selector);\n}\n\nfunction a$(selector) {\n    return document.querySelectorAll(selector);\n}\n\nfunction c$(_element, opts = {}, extraOpts = {}) {\n    if (!_element) return;\n\n    extraOpts = extend(extraOpts, {\n        applyBootstrap: true\n    });\n\n    const { classNames = [], attrs = {} } = opts;\n    if (extraOpts.applyBootstrap) {\n        classNames.push(...(BOOTSTRAP_ELEMENT_CLASSNAMES_MAP[_element] || []))\n    }\n\n    const element = document.createElement(_element);\n    element.classList.add(...classNames);\n\n    Object.keys(attrs).forEach((attr) => {\n        element.setAttribute(attr, attrs[attr]);\n    })\n\n    if (opts.content) {\n        element.textContent = opts.content;\n    }\n\n    return element;\n}\n\nfunction ap$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    nodes.forEach((node) => {\n        element.appendChild(node);\n    })\n}\n\nfunction r$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    element.replaceChildren();\n    nodes.forEach((node) => {\n        element.appendChild(node);\n    })\n}\n\nfunction rm$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    nodes.forEach((node) => {\n        if (element?.contains?.(node)) {\n            element?.removeChild?.(node);\n        }\n    });\n}\n\nfunction showInfoMsg(msg, type) {\n    if (type === \"failure\") type = \"danger\";\n\n    const msgElement = c$(\"div\", {\n        classNames: [\"info-msg-container\", \"alert\", `alert-${type}`],\n        attrs: {}\n    });\n\n    msgElement.textContent = msg;\n\n    document.body.appendChild(msgElement);\n\n    setTimeout(() => {\n        document.body.removeChild(msgElement);\n    }, 3000)\n}\n\n\n\n//# sourceURL=webpack://bookshelf/./client/utils/common-utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/collection.js");
/******/ 	
/******/ })()
;