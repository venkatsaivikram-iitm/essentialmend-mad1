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

/***/ "./client/reviews.js":
/*!***************************!*\
  !*** ./client/reviews.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common-utils */ \"./client/utils/common-utils.js\");\n\n\nlet reviews = [];\nconst reviewsSort = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)('#reviews-sort');\nconst userReviewsDiv = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)('#user-reviews');\nconst professionalReviewsDiv = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)('#professional-reviews');\nconst reviewsDiv = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)('#reviews');\n\nconst handleReviewSortChange = () => {\n    const sortValue = reviewsSort.value;\n    let sortedUserReviews = [];\n    let sortedProfessionalReviews = [];\n\n    if (Array.isArray(reviews)) {\n        sortedUserReviews = [...reviews];\n        if (sortValue !== 'default') {\n            sortedUserReviews.sort((a, b) => a.rating - b.rating);\n            sortedUserReviews = sortedUserReviews.filter(review => review.rating <= Number(sortValue));\n        }\n    } else {\n        sortedUserReviews = [...reviews.userReviews];\n        sortedProfessionalReviews = [...reviews.professionalReviews];\n        if (sortValue !== 'default') {\n            sortedUserReviews.sort((a, b) => a.rating - b.rating);\n            sortedUserReviews = sortedUserReviews.filter(review => review.rating <= Number(sortValue));\n            sortedProfessionalReviews.sort((a, b) => a.rating - b.rating);\n            sortedProfessionalReviews = sortedProfessionalReviews.filter(review => review.rating <= Number(sortValue));\n        }\n    }\n\n    updateReviewsDisplay(sortedUserReviews, sortedProfessionalReviews);\n};\n\nconst updateReviewsDisplay = (sortedUserReviews, sortedProfessionalReviews) => {\n    if (userReviewsDiv && professionalReviewsDiv) {\n        userReviewsDiv.innerHTML = '';\n        professionalReviewsDiv.innerHTML = '';\n\n        sortedUserReviews.forEach(review => {\n            userReviewsDiv.innerHTML += createReviewHtml(review);\n        });\n\n        sortedProfessionalReviews.forEach(review => {\n            professionalReviewsDiv.innerHTML += createReviewHtml(review);\n        });\n    } else if (reviewsDiv) {\n        reviewsDiv.innerHTML = '';\n        sortedUserReviews.forEach(review => {\n            reviewsDiv.innerHTML += createReviewHtml(review);\n        });\n    }\n};\n\nconst createReviewHtml = (review) => {\n    return `\n        <div class=\"d-flex gap-4 border rounded p-2\">\n            <div class=\"fs-1 align-self-center\">\n                <i class=\"bi bi-chat-square-text-fill\"></i>\n            </div>\n            <div class=\"d-flex flex-column\">\n                <p class=\"m-0 fw-bold\">${review.reviewerName}(${review.reviewerEmail}) --> ${review.revieweeName}(${review.revieweeEmail}) | ${review.type}</p>\n                <p class=\"m-0 small\">${new Date(Number(review.createdAt)).toLocaleString()}</p>\n                <p class=\"m-0\">${review.review}</p>\n                <p class=\"m-0\"><span class=\"fw-bold\">Rating: </span>${review.rating}</p>\n            </div>\n        </div>\n    `;\n};\n\nconst listenEvents = () => {\n    reviewsSort.addEventListener('change', handleReviewSortChange);\n};\n\nconst initData = () => {\n    reviews = window.reviews;\n};\n\ninitData();\nlistenEvents();\n\n//# sourceURL=webpack://essentialmend/./client/reviews.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/reviews.js");
/******/ 	
/******/ })()
;