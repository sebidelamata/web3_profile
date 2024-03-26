import React from "react"

const ScrollToProjectsCard: React.FC = () => {
    return(
        <div className="scroll-button-card">
            <div></div>
            <a href="#projects-list-card" className="scroll-link">
                <button type="button" className="scroll-button">
                    <span>Check Out My Work</span>
                    <div id="scroll-symbol">&darr;</div>
                </button>
            </a>
            <div></div>
        </div>
    )
}

export default ScrollToProjectsCard