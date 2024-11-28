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

/***/ "./client/index.js":
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_config_holder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/config-holder */ \"./client/utils/config-holder.js\");\n\n\n_utils_config_holder__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config = window.__config__;\n\n//# sourceURL=webpack://essentialmend/./client/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/index.js");
/******/ 	
/******/ })()
;