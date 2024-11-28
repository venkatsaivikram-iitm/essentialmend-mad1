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

/***/ "./client/dashboard.js":
/*!*****************************!*\
  !*** ./client/dashboard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common-utils */ \"./client/utils/common-utils.js\");\n/* harmony import */ var _utils_config_holder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/config-holder */ \"./client/utils/config-holder.js\");\n\n\n\n\nconst chart1 = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#chart1\");\nconst chart2 = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#chart2\");\nconst chart3 = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#chart3\");\nconst chart4 = (0,_utils_common_utils__WEBPACK_IMPORTED_MODULE_0__.$)(\"#chart4\");\n\n\n\nconst mountCharts = () => {\n    const chartData = {\n        chart1: {\n            labels: window.dashboardData.serviceRequests.map((r) => r[0]),\n            data: window.dashboardData.serviceRequests.map((r) => r[1]),\n        },\n        ...(_utils_config_holder__WEBPACK_IMPORTED_MODULE_1__[\"default\"].isAdmin ? {\n            chart2: {\n              labels: window.dashboardData.professionals.map((r) => r[0]),\n              data: window.dashboardData.professionals.map((r) => r[1]),\n            },\n            chart3: {\n              labels: window.dashboardData.professionalRatings.map((r) => r[0]),\n              data: window.dashboardData.professionalRatings.map((r) => r[1]),\n            },\n            chart4: {\n              labels: window.dashboardData.professionalReviews.map((r) => r[0]),\n              data: window.dashboardData.professionalReviews.map((r) => r[1]),\n            }\n          } : {\n            chart2: {\n              labels: window.dashboardData.reviews.map((r) => r[0]),\n              data: window.dashboardData.reviews.map((r) => r[1]),\n            }\n          }\n        )\n    }\n    \n    new Chart(chart1, {\n      type: 'bar',\n      data: {\n        labels: chartData.chart1.labels,\n        datasets: [{\n          label: 'Service Request Status',\n          data: chartData.chart1.data,\n          borderWidth: 1\n        }]\n      },\n      options: {\n        scales: {\n          y: {\n            beginAtZero: true\n          }\n        }\n      }\n    });\n\n    new Chart(chart2, {\n        type: 'bar',\n        data: {\n            labels: chartData.chart2.labels,\n            datasets: [{\n              label: _utils_config_holder__WEBPACK_IMPORTED_MODULE_1__[\"default\"].isAdmin ? 'Professional Status' : 'Reviews Rating',\n              data: chartData.chart2.data,\n              borderWidth: 1\n            }]\n        },\n        options: {\n          scales: {\n            y: {\n              beginAtZero: true\n            }\n          }\n        }\n      });\n\n      if (_utils_config_holder__WEBPACK_IMPORTED_MODULE_1__[\"default\"].isAdmin) {\n        new Chart(chart3, {\n          type: 'bar',\n          data: {\n              labels: chartData.chart3.labels,\n              datasets: [{\n                label: 'Professionals Rating',\n                data: chartData.chart3.data,\n                borderWidth: 1\n              }]\n          },\n          options: {\n            scales: {\n              y: {\n                beginAtZero: true\n              }\n            }\n          }\n        });\n        new Chart(chart4, {\n          type: 'bar',\n          data: {\n              labels: chartData.chart4.labels,\n              datasets: [{\n                label: 'Professionals Reviews',\n                data: chartData.chart4.data,\n                borderWidth: 1\n              }]\n          },\n          options: {\n            scales: {\n              y: {\n                beginAtZero: true\n              }\n            }\n          }\n        });\n      }\n};\n\nmountCharts()\n\n//# sourceURL=webpack://essentialmend/./client/dashboard.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/dashboard.js");
/******/ 	
/******/ })()
;