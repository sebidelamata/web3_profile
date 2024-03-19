import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {

    const [open, setOpen] = useState(false)
    const menuRef = useRef()

    useEffect(() => {
        const handler = (e) => {
            if(!menuRef.current.contains(e.target)){
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handler)

        return() =>{
            document.removeEventListener('mousedown', handler);
        }
    },[])

    return(
        <nav className="navbar" ref={menuRef}>
            <button className="icon-button" onClick={() => {setOpen(!open)}}>
                <strong>Ξ</strong>
            </button>
            <ul className={`navbar-list ${open ? 'active' : 'inactive'}`}>
                <li className="navbar-list-item">
                    <Link to={'/'}>Home</Link>
                </li>
                {/* <li className="navbar-list-item">
                    <Link to={'/blog'}>Blog</Link>
                </li> */}
                <li className="navbar-list-item">
                    <Link to={'/mint'}>Mint</Link>
                </li>
                <li className="navbar-list-item">
                    <w3m-button size="sm" label="Connect" balance="hide"/>
                </li>
                <li className="navbar-list-item">
                    <Link to={'/resume'}>Resume</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar