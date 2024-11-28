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

/***/ "./client/utils/common-utils.js":
/*!**************************************!*\
  !*** ./client/utils/common-utils.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   $: () => (/* binding */ $),\n/* harmony export */   a$: () => (/* binding */ a$),\n/* harmony export */   ap$: () => (/* binding */ ap$),\n/* harmony export */   c$: () => (/* binding */ c$),\n/* harmony export */   r$: () => (/* binding */ r$),\n/* harmony export */   rm$: () => (/* binding */ rm$),\n/* harmony export */   showInfoMsg: () => (/* binding */ showInfoMsg)\n/* harmony export */ });\nconst BOOTSTRAP_ELEMENT_CLASSNAMES_MAP = {\n    button: [\"btn\"],\n    input: [\"form-control\"],\n    select: [\"form-select\"],\n};\n\n\nfunction extend(obj, addObj) {\n    return {\n        ...obj,\n        ...addObj\n    }\n}\n\nfunction $(selector) {\n    return document.querySelector(selector);\n}\n\nfunction a$(selector) {\n    return document.querySelectorAll(selector);\n}\n\nfunction c$(_element, opts = {}, extraOpts = {}) {\n    if (!_element) return;\n\n    extraOpts = extend(extraOpts, {\n        applyBootstrap: true\n    });\n\n    const { classNames = [], attrs = {} } = opts;\n    if (extraOpts.applyBootstrap) {\n        classNames.push(...(BOOTSTRAP_ELEMENT_CLASSNAMES_MAP[_element] || []))\n    }\n\n    const element = document.createElement(_element);\n    element.classList.add(...classNames);\n\n    Object.keys(attrs).forEach((attr) => {\n        element.setAttribute(attr, attrs[attr]);\n    })\n\n    if (opts.content) {\n        element.textContent = opts.content;\n    }\n\n    return element;\n}\n\nfunction ap$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    nodes.forEach((node) => {\n        element.appendChild(node);\n    })\n}\n\nfunction r$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    element.replaceChildren();\n    nodes.forEach((node) => {\n        element.appendChild(node);\n    })\n}\n\nfunction rm$(element, nodes = []) {\n    if (!element.nodeName) {\n        return;\n    }\n\n    nodes.forEach((node) => {\n        if (element?.contains?.(node)) {\n            element?.removeChild?.(node);\n        }\n    });\n}\n\nfunction showInfoMsg(msg, type) {\n    if (type === \"failure\") type = \"danger\";\n\n    const msgElement = c$(\"div\", {\n        classNames: [\"info-msg-container\", \"alert\", `alert-${type}`],\n        attrs: {}\n    });\n\n    msgElement.textContent = msg;\n\n    document.body.appendChild(msgElement);\n\n    setTimeout(() => {\n        document.body.removeChild(msgElement);\n    }, 3000)\n}\n\n\n\n//# sourceURL=webpack://bookshelf/./client/utils/common-utils.js?");

/***/ }),

/***/ "./client/view.js":
/*!************************!*\
  !*** ./client/view.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common-utils */ \"./client/utils/common-utils.js\");\n\n\nconst bookViewerElement = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#book-viewer\");\nbookViewerElement.style.width = \"100%\";\nbookViewerElement.style.height = \"100%\";\n\nconst byteCharacters = atob(window.book.file_data);\nconst byteArrays = [];\n\nfor (let offset = 0; offset < byteCharacters.length; offset += 512) {\n    const slice = byteCharacters.slice(offset, offset + 512);\n\n    const byteNumbers = new Array(slice.length);\n    for (let i = 0; i < slice.length; i++) {\n    byteNumbers[i] = slice.charCodeAt(i);\n    }\n\n    const byteArray = new Uint8Array(byteNumbers);\n    byteArrays.push(byteArray);\n}\n\nconst blob = new Blob(byteArrays, {type: \"application/pdf\"});\nconst blobUrl = URL.createObjectURL(blob);\n\n(0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#book-loader\").style.display = \"none\";\n\nbookViewerElement.src = blobUrl;\n\n\n//# sourceURL=webpack://bookshelf/./client/view.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/view.js");
/******/ 	
/******/ })()
;