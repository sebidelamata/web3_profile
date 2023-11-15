"use strict";
(self["webpackChunkweb3_profile"] = self["webpackChunkweb3_profile"] || []).push([["main"],{

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");

__webpack_require__(/*! svg-url-loader!./HTML5_Badge.svg */ "./node_modules/svg-url-loader/index.js!./src/HTML5_Badge.svg");
__webpack_require__(/*! svg-url-loader!./CSS3_logo.svg */ "./node_modules/svg-url-loader/index.js!./src/CSS3_logo.svg");
__webpack_require__(/*! svg-url-loader!./javascript.svg */ "./node_modules/svg-url-loader/index.js!./src/javascript.svg");
__webpack_require__(/*! svg-url-loader!./webpack-icon.svg */ "./node_modules/svg-url-loader/index.js!./src/webpack-icon.svg");
__webpack_require__(/*! svg-url-loader!./jest-js-icon.svg */ "./node_modules/svg-url-loader/index.js!./src/jest-js-icon.svg");
__webpack_require__(/*! svg-url-loader!./React-icon.svg */ "./node_modules/svg-url-loader/index.js!./src/React-icon.svg");
__webpack_require__(/*! svg-url-loader!./nodejs-icon-svgrepo-com.svg */ "./node_modules/svg-url-loader/index.js!./src/nodejs-icon-svgrepo-com.svg");
__webpack_require__(/*! svg-url-loader!./Git_icon.svg */ "./node_modules/svg-url-loader/index.js!./src/Git_icon.svg");
__webpack_require__(/*! svg-url-loader!./mongodb-icon.svg */ "./node_modules/svg-url-loader/index.js!./src/mongodb-icon.svg");
__webpack_require__(/*! svg-url-loader!./solidity-svgrepo-com.svg */ "./node_modules/svg-url-loader/index.js!./src/solidity-svgrepo-com.svg");
__webpack_require__(/*! svg-url-loader!./truffle-seeklogo.com 2.svg */ "./node_modules/svg-url-loader/index.js!./src/truffle-seeklogo.com 2.svg");
__webpack_require__(/*! svg-url-loader!./hardhat-seeklogo.com.svg */ "./node_modules/svg-url-loader/index.js!./src/hardhat-seeklogo.com.svg");

// infinite scroller for tech stack icons
const scrollers = document.querySelectorAll('.scroller');
// only apply to users who dont have reduce motion turned on
const addAnimation = () => {
    scrollers.forEach((scroller) => {
        scroller.setAttribute('data-animated', true);

        const scrollerList = scroller.querySelector(".tech-stack-carousel-list");
        const scrollerContent = Array.from(scrollerList.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerList.appendChild(duplicatedItem);
        })
    });
}

if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    addAnimation();
}



/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/CSS3_logo.svg":
/*!******************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/CSS3_logo.svg ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/2351e5d5f8c958800982.svg";

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/Git_icon.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/Git_icon.svg ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/66385f130c6b9f0a6167.svg";

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/HTML5_Badge.svg":
/*!********************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/HTML5_Badge.svg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/efdf1e1cc116ad0099b9.svg";

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/React-icon.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/React-icon.svg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/88116e866ede179373d2.svg";

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/hardhat-seeklogo.com.svg":
/*!*****************************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/hardhat-seeklogo.com.svg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/85325b33a136f887a9b4.svg";

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/javascript.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/javascript.svg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/a5dedbc09e17f4d7df7b.svg";

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/jest-js-icon.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/jest-js-icon.svg ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/8a9a962113f16b05074f.svg";

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/mongodb-icon.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/mongodb-icon.svg ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/98bc50eed6ab9383f8b5.svg";

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/nodejs-icon-svgrepo-com.svg":
/*!********************************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/nodejs-icon-svgrepo-com.svg ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/233f60143d1cca421e37.svg";

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/solidity-svgrepo-com.svg":
/*!*****************************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/solidity-svgrepo-com.svg ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/e067d396340ecae5dcaf.svg";

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/truffle-seeklogo.com 2.svg":
/*!*******************************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/truffle-seeklogo.com 2.svg ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/e79ad277528913498475.svg";

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js!./src/webpack-icon.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/svg-url-loader/index.js!./src/webpack-icon.svg ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/1bdcce2bc7fdb479c9a5.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7O0FDQXFCO0FBQ3JCLG1CQUFPLENBQUMsc0dBQWtDO0FBQzFDLG1CQUFPLENBQUMsa0dBQWdDO0FBQ3hDLG1CQUFPLENBQUMsb0dBQWlDO0FBQ3pDLG1CQUFPLENBQUMsd0dBQW1DO0FBQzNDLG1CQUFPLENBQUMsd0dBQW1DO0FBQzNDLG1CQUFPLENBQUMsb0dBQWlDO0FBQ3pDLG1CQUFPLENBQUMsOEhBQThDO0FBQ3RELG1CQUFPLENBQUMsZ0dBQStCO0FBQ3ZDLG1CQUFPLENBQUMsd0dBQW1DO0FBQzNDLG1CQUFPLENBQUMsd0hBQTJDO0FBQ25ELG1CQUFPLENBQUMsNEhBQTZDO0FBQ3JELG1CQUFPLENBQUMsd0hBQTJDOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViM19wcm9maWxlLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWIzX3Byb2ZpbGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5yZXF1aXJlKFwic3ZnLXVybC1sb2FkZXIhLi9IVE1MNV9CYWRnZS5zdmdcIik7XG5yZXF1aXJlKFwic3ZnLXVybC1sb2FkZXIhLi9DU1MzX2xvZ28uc3ZnXCIpO1xucmVxdWlyZShcInN2Zy11cmwtbG9hZGVyIS4vamF2YXNjcmlwdC5zdmdcIik7XG5yZXF1aXJlKFwic3ZnLXVybC1sb2FkZXIhLi93ZWJwYWNrLWljb24uc3ZnXCIpO1xucmVxdWlyZShcInN2Zy11cmwtbG9hZGVyIS4vamVzdC1qcy1pY29uLnN2Z1wiKTtcbnJlcXVpcmUoXCJzdmctdXJsLWxvYWRlciEuL1JlYWN0LWljb24uc3ZnXCIpO1xucmVxdWlyZShcInN2Zy11cmwtbG9hZGVyIS4vbm9kZWpzLWljb24tc3ZncmVwby1jb20uc3ZnXCIpO1xucmVxdWlyZShcInN2Zy11cmwtbG9hZGVyIS4vR2l0X2ljb24uc3ZnXCIpO1xucmVxdWlyZShcInN2Zy11cmwtbG9hZGVyIS4vbW9uZ29kYi1pY29uLnN2Z1wiKTtcbnJlcXVpcmUoXCJzdmctdXJsLWxvYWRlciEuL3NvbGlkaXR5LXN2Z3JlcG8tY29tLnN2Z1wiKTtcbnJlcXVpcmUoXCJzdmctdXJsLWxvYWRlciEuL3RydWZmbGUtc2Vla2xvZ28uY29tIDIuc3ZnXCIpO1xucmVxdWlyZShcInN2Zy11cmwtbG9hZGVyIS4vaGFyZGhhdC1zZWVrbG9nby5jb20uc3ZnXCIpO1xuXG4vLyBpbmZpbml0ZSBzY3JvbGxlciBmb3IgdGVjaCBzdGFjayBpY29uc1xuY29uc3Qgc2Nyb2xsZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjcm9sbGVyJyk7XG4vLyBvbmx5IGFwcGx5IHRvIHVzZXJzIHdobyBkb250IGhhdmUgcmVkdWNlIG1vdGlvbiB0dXJuZWQgb25cbmNvbnN0IGFkZEFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICBzY3JvbGxlcnMuZm9yRWFjaCgoc2Nyb2xsZXIpID0+IHtcbiAgICAgICAgc2Nyb2xsZXIuc2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsZXJMaXN0ID0gc2Nyb2xsZXIucXVlcnlTZWxlY3RvcihcIi50ZWNoLXN0YWNrLWNhcm91c2VsLWxpc3RcIik7XG4gICAgICAgIGNvbnN0IHNjcm9sbGVyQ29udGVudCA9IEFycmF5LmZyb20oc2Nyb2xsZXJMaXN0LmNoaWxkcmVuKTtcblxuICAgICAgICBzY3JvbGxlckNvbnRlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZHVwbGljYXRlZEl0ZW0gPSBpdGVtLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGR1cGxpY2F0ZWRJdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgICAgIHNjcm9sbGVyTGlzdC5hcHBlbmRDaGlsZChkdXBsaWNhdGVkSXRlbSk7XG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5cbmlmKCF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKXtcbiAgICBhZGRBbmltYXRpb24oKTtcbn1cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9