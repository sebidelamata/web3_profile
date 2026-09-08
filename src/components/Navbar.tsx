import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "./components/ui/sheet";
import { Button } from "./components/ui/button";

const Navbar: React.FC = () => {
    return (
        <nav className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
            <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3">
                <Link to="/" className="text-accent">sebi@delamata:~$</Link>

                {/* desktop */}
                <div className="flex justify-end">
                    <w3m-button size="sm" label="connect" balance="hide" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;