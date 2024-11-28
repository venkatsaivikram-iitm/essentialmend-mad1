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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Collector: () => (/* binding */ Collector)\n/* harmony export */ });\nclass Collector {\n    constructor(opts = {}) {\n        this.module = opts.module;\n        this._models = [];\n        this.index = opts.index || \"id\";\n    }\n\n    get models() {\n        return this._models;\n    }\n\n    set models(models) {\n        this._models = models;\n    }\n\n    get (index) {\n        return this.models.find((model) => model[this.index] === index);\n    }\n\n    getAll () {\n        return this.models;\n    }\n\n    add (...models) {\n        if (models.length) {\n            this.models.push(...models);\n        }\n    }\n\n    remove (index) {\n        this.models.splice(this.models.findIndex((model) => model[this.index] === index), 1);\n    }\n}\n\n\n\n//# sourceURL=webpack://essentialmend/./client/collector.js?");

/***/ }),

/***/ "./client/professional-requests.js":
/*!*****************************************!*\
  !*** ./client/professional-requests.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common-utils */ \"./client/utils/common-utils.js\");\n/* harmony import */ var _collector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collector */ \"./client/collector.js\");\n\n\n\n\n\nclass ProfessionalCollector extends _collector__WEBPACK_IMPORTED_MODULE_1__.Collector {\n    constructor () {\n        super({\n            module: \"professional\",\n            index: \"uid\"\n        })\n    }\n}\n\nconst professionalCollector = new ProfessionalCollector();\nprofessionalCollector.add(...(window.professionals || []));\nwindow.professionalCollector = professionalCollector;\n\n\nconst professionalItems = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.a$)(\".professional-item\");\nconst professionalDeleteModalButtons = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.a$)(\".professional-delete-modal-btn\");\nconst professionalInfoModalBody = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#professional-info-modal-body\");\nconst professionalDeleteModalBody = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#professional-delete-modal-body\");\n\n\nlet currentProfessional;\n\n\nconst handleItemInfo = (event) => {\n    currentProfessional = professionalCollector.get(event?.currentTarget?.dataset?.uid);\n    (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.setHTML)(professionalInfoModalBody, `\n        <p class=\"m-0\"><span class=\"fw-bold\">Name: </span>${currentProfessional?.name}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Email: </span>${currentProfessional?.email}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Role: </span>${currentProfessional?.role}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Status: </span>${currentProfessional?.status}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Location: </span>${currentProfessional?.location}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Pincode: </span>${currentProfessional?.pincode}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Service: </span>${currentProfessional?.service?.name}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Description: </span>${currentProfessional?.description}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Price: </span>${currentProfessional?.price} Rs</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Duration: </span>${currentProfessional?.duration} Hrs</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Rating: </span>${currentProfessional?.rating}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Experience: </span>${currentProfessional?.experience} Years</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Created At: </span>${new Date(Number(currentProfessional?.createdAt))}</p>\n        <br />\n        <p class=\"m-0\"><span class=\"fw-bold\">Request Status: </span>${currentProfessional?.professionalRequest?.status}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Request Status Info: </span>${currentProfessional?.professionalRequest?.statusInfo}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Requested At: </span>${new Date(Number(currentProfessional?.professionalRequest?.createdAt))}</p>\n        <p class=\"m-0\"><span class=\"fw-bold\">Request Closed At: </span>${currentProfessional?.professionalRequest?.closedAt ? new Date(Number(currentProfessional?.professionalRequest?.closedAt)) : \"-\"}</p>\n    `);\n}\n\nconst handleItemSelect = (event) => {\n    currentProfessional = professionalCollector.get(event?.currentTarget?.dataset?.uid);\n    const action = event?.currentTarget?.dataset?.action;\n    if (action === \"delete\") {\n        (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.setHTML)(professionalDeleteModalBody, `\n            <p class=\"m-0\">Are you sure to <span class=\"fw-bold text-danger\">DELETE</span> <span class=\"fw-bold\">${currentProfessional?.name} (${currentProfessional?.email})</span> permanently? Click <span class=\"fw-bold\">Delete</span> to delete permanently or <span class=\"fw-bold\">Block</span> to block the professional (you can unblock later).<p>\n        `);\n    }\n}\n\n\nconst listenEvents = () => {\n    professionalItems?.forEach((professionalItem) => professionalItem?.addEventListener?.(\"click\", handleItemInfo));\n    professionalDeleteModalButtons?.forEach((professionalDeleteModalButton) => professionalDeleteModalButton?.addEventListener?.(\"click\", handleItemSelect));\n}\n\nlistenEvents();\n\n//# sourceURL=webpack://essentialmend/./client/professional-requests.js?");

/***/ }),

/***/ "./client/utils/common-utils.js":
/*!**************************************!*\
  !*** ./client/utils/common-utils.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   $: () => (/* binding */ $),\n/* harmony export */   a$: () => (/* binding */ a$),\n/* harmony export */   ap$: () => (/* binding */ ap$),\n/* harmony export */   c$: () => (/* binding */ c$),\n/* harmony export */   r$: () => (/* binding */ r$),\n/* harmony export */   rm$: () => (/* binding */ rm$),\n/* harmony export */   setHTML: () => (/* binding */ setHTML),\n/* harmony export */   showInfoMsg: () => (/* binding */ showInfoMsg)\n/* harmony export */ });\nconst BOOTSTRAP_ELEMENT_CLASSNAMES_MAP = {\n    button: [\"btn\"],\n    input: [\"form-control\"],\n    select: [\"form-select\"],\n};\n\n\nfunction extend(obj, addObj) {\n    return {\n        ...obj,\n        ...addObj\n    }\n}\n\nfunction setHTML (element, htmlString) {\n    element?.setHTMLUnsafe?.(htmlString);\n}\n\nfunction $(selector) {\n    return document.querySelector(selector);\n}\n\nfunction a$(selector) {\n    return document.querySelectorAll(selector);\n}\n\nfunction c$(_element, opts = {}, extraOpts = {}) {\n    if (!_element) return;\n\n    extraOpts = extend(extraOpts, {\n        applyBootstrap: true\n    });\n\n    const { classNames = [], attrs = {} } = opts;\n    if (extraOpts.applyBootstrap) {\n        classNames.push(...(BOOTSTRAP_ELEMENT_CLASSNAMES_MAP[_element] || []))\n    }\n\n    const element = document.createElement(_element);\n    element.classList.add(...classNames);\n\n    Object.keys(attrs).forEach((attr) => {\n        element.setAttribute(attr, attrs[attr]);\n    })\n\n    if (opts.content) {\n        element.textContent = opts.content;\n    }\n\n    return element;\n}\n\nfunction ap$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    nodes.forEach((node) => {\n        element.appendChild(node);\n    })\n}\n\nfunction r$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    element.replaceChildren();\n    nodes.forEach((node) => {\n        element.appendChild(node);\n    })\n}\n\nfunction rm$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    nodes.forEach((node) => {\n        if (element?.contains?.(node)) {\n            element?.removeChild?.(node);\n        }\n    });\n}\n\nfunction showInfoMsg(msg, type, opts = {}) {\n    if (type === \"failure\") type = \"danger\";\n\n    const msgElement = c$(\"div\", {\n        classNames: [\"info-msg-container\", \"alert\", `alert-${type}`],\n        attrs: {}\n    });\n\n    msgElement.textContent = msg;\n\n    document.body.appendChild(msgElement);\n\n    setTimeout(() => {\n        document.body.removeChild(msgElement);\n        if (opts.reloadOnTimeout) {\n            window.location.reload();\n        }\n    }, 3000);\n    if (opts.forceReload) {\n        window.location.reload();\n    }\n}\n\n\n\n//# sourceURL=webpack://essentialmend/./client/utils/common-utils.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/professional-requests.js");
/******/ 	
/******/ })()
;