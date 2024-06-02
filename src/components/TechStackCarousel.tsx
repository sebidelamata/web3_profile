import { useEffect } from "react"
import React from "react";

const TechStackCarousel: React.FC = () => {

    useEffect(() => {
        // infinite scroller for tech stack icons
        const scrollers = document.querySelectorAll('.scroller');
        // only apply to users who dont have reduce motion turned on
        const addAnimation = () => {
            scrollers.forEach((scroller) => {
                scroller.setAttribute('data-animated', 'true');

                const scrollerList = scroller.querySelector<HTMLUListElement>(".tech-stack-carousel-list");
                const scrollerContent = Array.from(scrollerList?.children || []);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true) as HTMLElement;
                    duplicatedItem.setAttribute('aria-hidden', 'true');
                    scrollerList?.appendChild(duplicatedItem);
                })
            });
        }

        if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
            addAnimation();
        }

        // need to do js scrolling to override github pages bullshit
        document.addEventListener('DOMContentLoaded', function () {
            // Get all elements with the class "scroll-link"
            var scrollLinks = document.querySelectorAll('.scroll-link');
            
            // Add click event listener to each scroll link
            scrollLinks.forEach(function (scrollLink) {
                scrollLink.addEventListener('click', function (event) {
                // Prevent default behavior of the anchor link
                event.preventDefault();
            
                // Get the target element's ID from the href attribute
                var targetId = scrollLink.getAttribute('href')?.substring(1) || '';
            
                // Find the target element by its ID
                var targetElement = document.getElementById(targetId);
            
                // Scroll to the target element using smooth behavior
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                });
            });
            });
    },[])
    
    return(
        <div className="tech-stack-carousel-scroller scroller">
            <ul className="tech-stack-carousel-list">
                <li>
                    <div id="html-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="css-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="js-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="ts-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="webpack-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="jest-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="react-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="next-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="vite-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="node-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="git-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="mongodb-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="solidity-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="truffle-icon" className="tech-stack-icon"></div>
                </li>
                <li>
                    <div id="hardhat-icon" className="tech-stack-icon"></div>
                </li>
            </ul>
        </div>
    )
}

export default TechStackCarousel