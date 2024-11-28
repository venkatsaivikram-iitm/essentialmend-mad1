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

/***/ "./client/account.js":
/*!***************************!*\
  !*** ./client/account.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common-utils */ \"./client/utils/common-utils.js\");\n/* harmony import */ var _utils_app_route_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/app-route-util */ \"./client/utils/app-route-util.js\");\n/* harmony import */ var _utils_config_holder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/config-holder */ \"./client/utils/config-holder.js\");\n/* harmony import */ var _constants_api_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants/api-constants */ \"./client/constants/api-constants.js\");\n\n\n\n\n\nconst accountLogoutButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#account-logout-btn\");\nconst accountUpdateButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#account-info-edit-btn\");\nconst editAccountInfoButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#edit-account-info-btn\");\nconst accountEditModalCloseButton = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#account-info-edit-modal-close-btn\");\nconst inputFields = document.querySelectorAll(\"input\");\n\nconst checkForChanges = () => {\n    let hasChanges = false;\n    inputFields.forEach(input => {\n        const fieldName = input.name;\n        if (input.value !== _utils_config_holder__WEBPACK_IMPORTED_MODULE_2__[\"default\"].userInfo[fieldName]) {\n            hasChanges = true;\n        }\n    });\n    accountUpdateButton.disabled = !hasChanges;\n};\n\nconst populateInputFields = () => {\n    inputFields.forEach(input => {\n        input.value = _utils_config_holder__WEBPACK_IMPORTED_MODULE_2__[\"default\"].userInfo[input.name] || _utils_config_holder__WEBPACK_IMPORTED_MODULE_2__[\"default\"].professionalInfo[input.name] || _utils_config_holder__WEBPACK_IMPORTED_MODULE_2__[\"default\"].service[input.name] || \"\";\n    });\n};\n\nconst handleUpdateAccountInfo = () => {\n    const formData = new FormData();\n    inputFields.forEach(input => {\n        formData.append(input.name, input.value);\n    });\n\n    fetch('/api/updateaccountinfo', {\n        method: 'POST',\n        body: formData\n    })\n    .then(response => response.json())\n    .then((response) => {\n        (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.showInfoMsg)(response.data.message, response.result);\n        if (response.result === _constants_api_constants__WEBPACK_IMPORTED_MODULE_3__.API_RESPONSE.SUCCESS) {\n            inputFields.forEach(input => {\n                if (input.dataset.type === \"professional\") {\n                    _utils_config_holder__WEBPACK_IMPORTED_MODULE_2__[\"default\"].professionalInfo[input.name] = input.value;\n                } else {\n                    _utils_config_holder__WEBPACK_IMPORTED_MODULE_2__[\"default\"].userInfo[input.name] = input.value;\n                }\n                (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(`#display-${input.name}`).textContent = input.value;\n            });\n            accountEditModalCloseButton.click();\n        }\n    })\n    .catch(() => {\n        (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.showInfoMsg)(\"Failed to update user information.\");\n    });\n};\n\nconst listenEvents = () => {\n    accountLogoutButton?.addEventListener(\"click\", _utils_app_route_util__WEBPACK_IMPORTED_MODULE_1__.handleLogout);\n    accountUpdateButton?.addEventListener(\"click\", handleUpdateAccountInfo);\n    editAccountInfoButton?.addEventListener(\"click\", populateInputFields);\n    inputFields.forEach(input => {\n        input.addEventListener(\"input\", checkForChanges);\n    });\n};\n\nlistenEvents();\n\n//# sourceURL=webpack://essentialmend/./client/account.js?");

/***/ }),

/***/ "./client/constants/api-constants.js":
/*!*******************************************!*\
  !*** ./client/constants/api-constants.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   API_RESPONSE: () => (/* binding */ API_RESPONSE)\n/* harmony export */ });\n\nconst API_RESPONSE = {\n    SUCCESS: \"success\",\n    FAILURE: \"failure\"\n}\n\n\n\n//# sourceURL=webpack://essentialmend/./client/constants/api-constants.js?");

/***/ }),

/***/ "./client/utils/app-route-util.js":
/*!****************************************!*\
  !*** ./client/utils/app-route-util.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleLogout: () => (/* binding */ handleLogout),\n/* harmony export */   openInNewTab: () => (/* binding */ openInNewTab),\n/* harmony export */   redirect: () => (/* binding */ redirect)\n/* harmony export */ });\n/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common-utils */ \"./client/utils/common-utils.js\");\n\n\n\nfunction redirect(href) {\n    if (!href) return;\n\n    window.location.href = href;\n}\n\nfunction openInNewTab(href) {\n    if (!href) return;\n\n    window.open(href, '_blank', 'noopener noreferrer');\n}\n\nconst handleLogout = () => {\n    const cookies = document.cookie.split(\";\");\n    for (let cookie of cookies) {\n        const cookieName = cookie.split(\"=\")[0].trim();\n        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;\n    }\n\n    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.showInfoMsg)(\"Account Logout Successful\", \"info\")\n\n    setTimeout(() => {\n        redirect(\"/\");\n    }, 3000);\n}\n\n\n\n//# sourceURL=webpack://essentialmend/./client/utils/app-route-util.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/account.js");
/******/ 	
/******/ })()
;