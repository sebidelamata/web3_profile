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
import battleShipVid from './battleShipPreviewVideo.mov';
import weatherAppVid from './weatherApp.mov';
import todoVid from './todo.mov';

let project1Video = document.getElementById('project-video-card-1');
let video1 = document.createElement('video');
project1Video.appendChild(video1);
video1.src = battleShipVid;
video1.type = 'video/mp4';
video1.autoplay = true;
video1.loop = true;
video1.muted = true;
video1.playsInline = true;

let project2Video = document.getElementById('project-video-card-2');
let video2 = document.createElement('video');
project2Video.appendChild(video2);
video2.src = weatherAppVid;
video2.type = 'video/mp4';
video2.autoplay = true;
video2.loop = true;
video2.muted = true;
video2.playsInline = true;

let project3Video = document.getElementById('project-video-card-3');
let video3 = document.createElement('video');
project3Video.appendChild(video3);
video3.src = todoVid;
video3.type = 'video/mp4';
video3.autoplay = true;
video3.loop = true;
video3.muted = true;
video3.playsInline = true;

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

