import { useState } from "react"

const Navbar = () => {

    const [open, setOpen] = useState(false)

    return(
        <nav className="navbar">
            <button className="icon-button" onClick={() => setOpen(!open)}>
                🏠
            </button>
            {
                open === true &&
                <ul className="navbar-list">
                    <li className="navbar-list-item">a</li>
                    <li className="navbar-list-item">a</li>
                    <li className="navbar-list-item">a</li>
                    <li className="navbar-list-item">a</li>
                </ul>
            }
        </nav>
    )
}

export default Navbar