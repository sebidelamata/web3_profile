import React from "react"

const ScrollTopButton: React.FC = () => {
    return(
        <div className="scroll-to-top-card">
            <a href="#hero" className="scroll-link">
                <button className="scroll-to-top-button scroll-button" type="button">Back To Top</button>
            </a>
        </div>
    )
}

export default ScrollTopButton