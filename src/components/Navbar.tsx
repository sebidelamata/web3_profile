import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        if (document) {
            document.addEventListener('mousedown', handler);
        }

        return () => {
            if (document) {
                document.removeEventListener('mousedown', handler);
            }
        };
    }, []);

    return (
        <nav className="navbar" ref={menuRef}>
            <button className="icon-button" onClick={() => setOpen(!open)}>
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
                    <w3m-button size="sm" label="Connect" balance="hide" />
                </li>
                <li className="navbar-list-item">
                    <Link to={'/resume'}>Resume</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
