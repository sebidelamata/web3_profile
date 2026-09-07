import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "./components/ui/sheet";
import { Button } from "./components/ui/button";

const links = [
    { to: "/", label: "home" },
    { to: "/resume", label: "resume" },
];

const Navbar: React.FC = () => {
    return (
        <nav className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
            <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3">
                <Link to="/" className="text-accent">sebi@delamata:~$</Link>

                {/* desktop */}
                <ul className="hidden items-center gap-8 text-sm sm:flex">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to} className="text-fg-dim transition-colors hover:text-accent">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <w3m-button size="sm" label="connect" balance="hide" />
                    </li>
                </ul>

                {/* mobile */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="default" size="sm" className="sm:hidden">menu</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <ul className="mt-8 flex flex-col gap-6 text-sm">
                            {links.map((link) => (
                                <li key={link.to}>
                                    <SheetClose asChild>
                                        <Link to={link.to} className="text-fg-dim transition-colors hover:text-accent">
                                            {link.label}
                                        </Link>
                                    </SheetClose>
                                </li>
                            ))}
                            <li>
                                <w3m-button size="sm" label="connect" balance="hide" />
                            </li>
                        </ul>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default Navbar;