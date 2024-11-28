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

/***/ "./client/constants/api-constants.js":
/*!*******************************************!*\
  !*** ./client/constants/api-constants.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   API_RESPONSE: () => (/* binding */ API_RESPONSE)\n/* harmony export */ });\n\nconst API_RESPONSE = {\n    SUCCESS: \"success\",\n    FAILURE: \"failure\"\n}\n\n\n\n//# sourceURL=webpack://essentialmend/./client/constants/api-constants.js?");

/***/ }),

/***/ "./client/services.js":
/*!****************************!*\
  !*** ./client/services.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common-utils */ \"./client/utils/common-utils.js\");\n/* harmony import */ var _collector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collector */ \"./client/collector.js\");\n/* harmony import */ var _constants_api_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants/api-constants */ \"./client/constants/api-constants.js\");\n/* harmony import */ var _utils_config_holder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/config-holder */ \"./client/utils/config-holder.js\");\n\n\n\n\n\n\nclass ProfessionalCollector extends _collector__WEBPACK_IMPORTED_MODULE_1__.Collector {\n    constructor () {\n        super({\n            module: \"services\",\n            index: \"uid\"\n        })\n    }\n\n    markAsRequested (uid) {\n        const professional = this.get(uid);\n        if (professional) {\n            professional.requestPending = true;\n        }\n    }\n}\n\nconst professionalCollector = new ProfessionalCollector();\nprofessionalCollector.add(...(window.professionals || []));\nwindow.professionalCollector = professionalCollector;\n\nconst serviceItems = () => (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.a$)(\".service-item\");\nconst serviceInfoModalBody = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#service-info-modal-body\");\nconst serviceReviewBody = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#service-review-body\");\nconst serviceSearchInput = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#service-search-input\");\nconst searchNotFoundText = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#search-not-found-text\");\nconst serviceRequestButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#service-request-btn\");\nconst serviceInfoModalCloseButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#service-info-modal-close-btn\");\n\nlet currentProfessional;\n\n\nconst handleServiceSearch = (event) => {\n    const searchValue = event?.currentTarget?.value?.toLowerCase();\n    if (searchValue && professionalCollector.getAll().length > 0) {\n        let matchingCount = 0;\n        serviceItems()?.forEach((serviceItem) => {\n            if (serviceItem?.dataset?.value?.toLowerCase()?.includes?.(searchValue)) {\n                serviceItem?.classList?.remove(\"d-none\");\n                matchingCount += 1;\n            } else {\n                serviceItem?.classList?.add(\"d-none\");\n            }\n        })\n        console.log(matchingCount)\n        if (matchingCount === 0) {\n            searchNotFoundText?.classList?.remove(\"d-none\");\n        } else {\n            searchNotFoundText?.classList?.add(\"d-none\");\n        }\n    } else {\n        serviceItems()?.forEach((serviceItem) => serviceItem?.classList?.remove?.(\"d-none\"));\n        searchNotFoundText?.classList?.add(\"d-none\");\n    }\n}\n\n\nconst handleItemInfo = (event) => {\n    currentProfessional = professionalCollector.get(event?.currentTarget?.dataset?.uid);\n    if (currentProfessional) {\n        (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.setHTML)(serviceInfoModalBody, `\n            <p class=\"m-0\"><span class=\"fw-bold\">Name: </span>${currentProfessional?.name}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Email: </span>${currentProfessional?.email}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Role: </span>${currentProfessional?.role}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Status: </span>${currentProfessional?.status}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Location: </span>${currentProfessional?.location}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Pincode: </span>${currentProfessional?.pincode}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Service: </span>${currentProfessional?.service?.name}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Description: </span>${currentProfessional?.description}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Price: </span>${currentProfessional?.price} Rs</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Duration: </span>${currentProfessional?.duration} Hrs</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Rating: </span>${currentProfessional?.rating}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Experience: </span>${currentProfessional?.experience} Years</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Created At: </span>${new Date(Number(currentProfessional?.createdAt))}</p>\n            <hr class=\"mt-2 mb-2\" />\n            <p class=\"m-0\"><span class=\"fw-bold\">Request Status: </span>${currentProfessional?.professionalRequest?.status}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Request Status Info: </span>${currentProfessional?.professionalRequest?.statusInfo}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Requested At: </span>${new Date(Number(currentProfessional?.professionalRequest?.createdAt))}</p>\n            <p class=\"m-0\"><span class=\"fw-bold\">Request Closed At: </span>${currentProfessional?.professionalRequest?.closedAt ? new Date(Number(currentProfessional?.professionalRequest?.closedAt)) : \"-\"}</p>\n        `);\n        if (currentProfessional.reviews) {\n            const reviewsHtml = currentProfessional.reviews.reduce((_reviewHtml, review) => {\n                _reviewHtml += `\n                    <div class=\"d-flex gap-4 border rounded p-2\">\n                        <div class=\"fs-1 align-self-center\">\n                            <i class=\"bi bi-chat-square-text-fill\"></i>\n                        </div>\n                        <div class=\"d-flex flex-column\">\n                            <p class=\"m-0 fw-bold\">${review.reviewerName} | ${review.reviewerEmail} | ${review.type}</p>\n                            <p class=\"m-0 small\">${new Date(Number(review.createdAt))?.toLocaleString()}</p>\n                            <p class=\"m-0\">${review.review}</p>\n                            <p class=\"m-0\"><span class=\"fw-bold\">Rating: </span>${review.rating}</p>\n                        </div>\n                    </div>\n                `\n                return _reviewHtml;\n            }, '');\n            (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.setHTML)(serviceReviewBody, reviewsHtml);\n        } else {\n            (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.setHTML)(serviceReviewBody, \n                `No reviews for this professional by any users yet!`\n            );\n        }\n\n        if (currentProfessional.requestPending) {\n            (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.setHTML)(serviceRequestButton, \"Service Requested\");\n            serviceRequestButton?.setAttribute?.(\"disabled\", true);\n        } else {\n            (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.setHTML)(serviceRequestButton, \"Request Service\");\n            serviceRequestButton?.removeAttribute(\"disabled\");\n        }\n    }\n}\n\nconst handleRequestService = () => {\n    const cid = _utils_config_holder__WEBPACK_IMPORTED_MODULE_3__[\"default\"].uid;\n    const pid = currentProfessional.uid;\n    const sid = currentProfessional.service.sid;\n    if (cid && pid && sid) {\n        const body = new FormData();\n        body.append(\"mode\", \"request\");\n        body.append(\"pid\", pid);\n        body.append(\"sid\", sid);\n        body.append(\"cid\", cid);\n\n        fetch(\"/api/servicerequest\", {\n            method: \"POST\",\n            body\n        })\n        .then((response) => response.json())\n        .then((response) => {\n            (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.showInfoMsg)(response.data.message, response.result);\n            if (response.result === _constants_api_constants__WEBPACK_IMPORTED_MODULE_2__.API_RESPONSE.SUCCESS) {\n                professionalCollector.markAsRequested(currentProfessional.uid);\n                (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.setHTML)(serviceRequestButton, \"Service Requested\");\n                serviceRequestButton?.setAttribute?.(\"disabled\", true);\n                serviceInfoModalCloseButton?.click();\n            }\n        }).catch((error) => {\n            (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.showInfoMsg)(\"Error occured in requesting the service, Try again\", \"danger\");\n        })\n    }\n}\n\nconst listenEvents = () => {\n    serviceItems()?.forEach((serviceItem) => {\n        serviceItem?.addEventListener(\"click\", handleItemInfo);\n        serviceSearchInput?.addEventListener(\"input\", handleServiceSearch);\n    });\n    serviceRequestButton?.addEventListener(\"click\", handleRequestService);\n}\n\nlistenEvents();\n\n//# sourceURL=webpack://essentialmend/./client/services.js?");

/***/ }),

/***/ "./client/utils/common-utils.js":
/*!**************************************!*\
  !*** ./client/utils/common-utils.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   $: () => (/* binding */ $),\n/* harmony export */   a$: () => (/* binding */ a$),\n/* harmony export */   ap$: () => (/* binding */ ap$),\n/* harmony export */   c$: () => (/* binding */ c$),\n/* harmony export */   r$: () => (/* binding */ r$),\n/* harmony export */   rm$: () => (/* binding */ rm$),\n/* harmony export */   setHTML: () => (/* binding */ setHTML),\n/* harmony export */   showInfoMsg: () => (/* binding */ showInfoMsg)\n/* harmony export */ });\nconst BOOTSTRAP_ELEMENT_CLASSNAMES_MAP = {\n    button: [\"btn\"],\n    input: [\"form-control\"],\n    select: [\"form-select\"],\n};\n\n\nfunction extend(obj, addObj) {\n    return {\n        ...obj,\n        ...addObj\n    }\n}\n\nfunction setHTML (element, htmlString) {\n    element?.setHTMLUnsafe?.(htmlString);\n}\n\nfunction $(selector) {\n    return document.querySelector(selector);\n}\n\nfunction a$(selector) {\n    return document.querySelectorAll(selector);\n}\n\nfunction c$(_element, opts = {}, extraOpts = {}) {\n    if (!_element) return;\n\n    extraOpts = extend(extraOpts, {\n        applyBootstrap: true\n    });\n\n    const { classNames = [], attrs = {} } = opts;\n    if (extraOpts.applyBootstrap) {\n        classNames.push(...(BOOTSTRAP_ELEMENT_CLASSNAMES_MAP[_element] || []))\n    }\n\n    const element = document.createElement(_element);\n    element.classList.add(...classNames);\n\n    Object.keys(attrs).forEach((attr) => {\n        element.setAttribute(attr, attrs[attr]);\n    })\n\n    if (opts.content) {\n        element.textContent = opts.content;\n    }\n\n    return element;\n}\n\nfunction ap$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    nodes.forEach((node) => {\n        element.appendChild(node);\n    })\n}\n\nfunction r$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    element.replaceChildren();\n    nodes.forEach((node) => {\n        element.appendChild(node);\n    })\n}\n\nfunction rm$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    nodes.forEach((node) => {\n        if (element?.contains?.(node)) {\n            element?.removeChild?.(node);\n        }\n    });\n}\n\nfunction showInfoMsg(msg, type, opts = {}) {\n    if (type === \"failure\") type = \"danger\";\n\n    const msgElement = c$(\"div\", {\n        classNames: [\"info-msg-container\", \"alert\", `alert-${type}`],\n        attrs: {}\n    });\n\n    msgElement.textContent = msg;\n\n    document.body.appendChild(msgElement);\n\n    setTimeout(() => {\n        document.body.removeChild(msgElement);\n        if (opts.reloadOnTimeout) {\n            window.location.reload();\n        }\n    }, 3000);\n    if (opts.forceReload) {\n        window.location.reload();\n    }\n}\n\n\n\n//# sourceURL=webpack://essentialmend/./client/utils/common-utils.js?");

/***/ }),

/***/ "./client/utils/config-holder.js":
/*!***************************************!*\
  !*** ./client/utils/config-holder.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nclass ConfigHolder {\n\n    static config = window.__config__;\n\n    static get userInfo() {\n        return this.config.userInfo || {}\n    }\n\n    static set userInfo(_userInfo) {\n        this.config.userInfo = _userInfo;\n    }\n\n    static get professionalInfo() {\n        return this.config.professionalInfo || {}\n    }\n\n    static get service() {\n        return this.config.service || {}\n    }\n\n    static get uid() {\n        return this.userInfo.uid;\n    }\n\n    static get email() {\n        return this.userInfo.email;\n    }\n\n    static get role() {\n        return this.userInfo.role\n    }\n\n    static get isAuthorized() {\n        return Boolean(config.authorized)\n    }\n\n    static get isUser() {\n        return Boolean(this.role === \"user\")\n    }\n\n    static get isProfessional() {\n        return Boolean(this.role === \"professional\")\n    }\n\n    static get isAdmin() {\n        return Boolean(this.role === \"admin\")\n    }\n\n}\n\nwindow.ConfigHolder = ConfigHolder;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfigHolder);\n\n//# sourceURL=webpack://essentialmend/./client/utils/config-holder.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/services.js");
/******/ 	
/******/ })()
;