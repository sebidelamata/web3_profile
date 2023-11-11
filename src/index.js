import './style.css';
require("svg-url-loader!./HTML5_Badge.svg");
require("svg-url-loader!./CSS3_logo.svg");
require("svg-url-loader!./javascript.svg");
require("svg-url-loader!./webpack-icon.svg");
require("svg-url-loader!./jest-js-icon.svg");
require("svg-url-loader!./React-icon.svg");
require("svg-url-loader!./nodejs-icon-svgrepo-com.svg");
require("svg-url-loader!./Git_icon.svg");
require("svg-url-loader!./mongodb-icon.svg");
require("svg-url-loader!./solidity-svgrepo-com.svg");
require("svg-url-loader!./truffle-seeklogo.com 2.svg");
require("svg-url-loader!./hardhat-seeklogo.com.svg");

// infinite scroller
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

