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

/***/ "./client/collector.js":
/*!*****************************!*\
  !*** ./client/collector.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Collector: () => (/* binding */ Collector)\n/* harmony export */ });\nclass Collector {\n    constructor(module) {\n        this.module = module;\n        this._models = []\n    }\n\n    get models() {\n        return this._models;\n    }\n\n    set models(models) {\n        this._models = models;\n    }\n\n    get (id) {\n        return this.models.find((model) => model.file_id === id);\n    }\n\n    getAll () {\n        return this.models;\n    }\n\n    add (...models) {\n        if (models.length) {\n            this.models.push(...models);\n        }\n    }\n\n    remove (id) {\n        this.models.splice(this.models.findIndex((model) => model.file_id === id), 1);\n    }\n}\n\n\n\n//# sourceURL=webpack://bookshelf/./client/collector.js?");

/***/ }),

/***/ "./client/library.js":
/*!***************************!*\
  !*** ./client/library.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common-utils */ \"./client/utils/common-utils.js\");\n/* harmony import */ var _utils_app_route_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/app-route-util */ \"./client/utils/app-route-util.js\");\n/* harmony import */ var _collector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collector */ \"./client/collector.js\");\n\n\n\n\n\nclass LibraryCollector extends _collector__WEBPACK_IMPORTED_MODULE_2__.Collector {\n    constructor (module) {\n        super(module);\n    }\n}\nconst libraryCollector = new LibraryCollector(\"library\");\nwindow.libraryCollector = libraryCollector;\nlibraryCollector.add(...(window.library || []));\n\nlet currentSelectedBookID;\n\nconst uploadButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#upload-btn\");\nconst uploadFileInput = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#upload-file-input\");\nconst uploadModalCloseButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#upload-modal-close-btn\");\nconst deleteModalCloseButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#delete-modal-close-btn\");\nconst bookItems = () => (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.a$)(\".library-book-item\");\nconst bookDeleteButtons = () => (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.a$)(\".book-delete-btn\");\nconst deleteButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#delete-btn\");\nconst libraryBooksWrapperElement = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#library-books-wrapper\");\nconst deleteModalBody = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#delete-modal-body\");\n\n\nconst addElementToView = (book) => {\n    libraryBooksWrapperElement.innerHTML += `\n        <div class=\"library-book-item\" data-fid=${book.file_id}>\n            <div class=\"book-item-icon-wrapper\">\n                <i class=\"bi bi-book-half book-item-icon\"></i>\n                <button type=\"button\" class=\"btn book-delete-btn btn-danger\" data-fid=${book.file_id} data-bs-toggle=\"modal\" data-bs-target=\"#delete-modal\" >\n                    <i class=\"bi bi-trash3-fill\"></i>\n                </button>\n            </div>\n            <hr style=\"width:100%;margin:0;border-color:black\" />\n            <div class=\"book-item-info-wrapper\">\n                <h4>${book.file_name}</h4>\n                <p>${book.uploaded_on_str}</p>\n            </div>\n        </div>\n    `;\n\n    listenEvents();\n};\n\nconst handleUploadBooks = () => {\n    const uploadFile = uploadFileInput.files?.[0];\n    if (!uploadFile) {\n        (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.showInfoMsg)(\"No files selected to upload\", \"danger\");\n        return;\n    }\n\n    const body = new FormData();\n    body.append(\"files\", uploadFile);\n\n    fetch(\"/api/library\", {\n        method: \"POST\",\n        body\n    }).then(response => response.json()).then(data => {\n        libraryCollector.add(data.data.file);\n        addElementToView(data.data.file);\n        uploadModalCloseButton.click();\n        (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.showInfoMsg)(data.data.message, data.result);\n    });\n}\n\n\nconst handleOpenBook = (event) => {\n    currentSelectedBookID = event.currentTarget.dataset.fid;\n    const currentSelectedBookModel = libraryCollector.get(currentSelectedBookID);\n    if (!currentSelectedBookModel) {\n        return;\n    }\n    (0,_utils_app_route_util__WEBPACK_IMPORTED_MODULE_1__.openInNewTab)(`/view/${currentSelectedBookID}`)\n};\n\nconst handleDeleteBook = () => {\n    if (!currentSelectedBookID) return;\n\n    const body = new FormData();\n    body.append(\"FID\", currentSelectedBookID);\n\n    fetch(\"/api/library\", {\n        method: \"DELETE\",\n        body\n    }).then(response => response.json()).then(data => {\n        libraryCollector.remove(data.data.file_id);\n        libraryBooksWrapperElement.replaceChildren(...[...(bookItems() || [])].filter((bookItem) => bookItem.dataset.fid !== data.data.file_id));\n        deleteModalCloseButton.click();\n        (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.showInfoMsg)(data.data.message, data.result);\n    });\n};\n\nconst handleDeleteCallback = (event) => {\n    currentSelectedBookID = event.currentTarget.dataset.fid;\n    deleteModalBody.innerHTML = `<p>On performing the action, the book <b>${libraryCollector.get(currentSelectedBookID)?.file_name}</b> will be deleted. Click Detele to proceed.</p>`\n    event.stopPropagation();\n};\n\nconst handleDeleteModalClose = () => {\n    currentSelectedBookID = undefined;\n}\n\nfunction unlistenEvents() {\n    uploadButton.removeEventListener(\"click\", handleUploadBooks);\n    bookItems().forEach((bookItem) => bookItem.removeEventListener(\"click\", handleOpenBook));\n    bookDeleteButtons().forEach((button) => button.removeEventListener(\"click\", handleDeleteCallback));\n    deleteButton.removeEventListener(\"click\", handleDeleteBook);\n    deleteModalCloseButton.removeEventListener(\"click\", handleDeleteModalClose);\n}\n\nfunction listenEvents() {\n    unlistenEvents();\n    uploadButton.addEventListener(\"click\", handleUploadBooks);\n    bookItems().forEach((bookItem) => bookItem.addEventListener(\"click\", handleOpenBook));\n    bookDeleteButtons().forEach((button) => button.addEventListener(\"click\", handleDeleteCallback));\n    deleteButton.addEventListener(\"click\", handleDeleteBook)\n    deleteModalCloseButton.addEventListener(\"click\", handleDeleteModalClose);\n}\n\nlistenEvents();\n\n\n//# sourceURL=webpack://bookshelf/./client/library.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/library.js");
/******/ 	
/******/ })()
;