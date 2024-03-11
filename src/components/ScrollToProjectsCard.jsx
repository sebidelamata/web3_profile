import { Link } from "react-router-dom"

const ScrollToProjectsCard = () => {
    return(
        <div className="scroll-button-card">
            <div></div>
            <Link to="/projects" className="scroll-link">
                <button type="button" className="scroll-button">
                    <span>Check Out My Work</span>
                    <div id="scroll-symbol">&darr;</div>
                </button>
            </Link>
            <div></div>
        </div>
    )
}

export default ScrollToProjectsCard