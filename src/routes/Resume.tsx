import React from "react"
import Navbar from "../components/Navbar"
import { Button } from "../components/components/ui/button"

const RESUME_URL = "https://sebidelamata.github.io/datascienceblog/assets/delaMataResumeDev.pdf"

const Resume: React.FC = () => {
    return (
        <div>

                <div className="mt-4 flex flex-col gap-1">
                    <a href={RESUME_URL} target="_blank" rel="noreferrer">
                        <button
                             className="w-fit text-left text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                        >
                            open in new tab
                        </button>
                    </a>
                    <a href={RESUME_URL} download>
                        <button 
                            className="w-fit text-left text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                        >
                            download pdf
                        </button>
                    </a>
                </div>

                {/*
                  Embedded viewer — shown from sm breakpoint up. Below that,
                  mobile browsers (iOS Safari especially) render embedded
                  PDFs inconsistently or not at all, so small screens get
                  the CTA card below instead rather than a blank/broken
                  iframe.
                */}
                <div className="mt-6 hidden overflow-hidden border border-border sm:block">
                    <object
                        data={RESUME_URL}
                        type="application/pdf"
                        className="aspect-[8.5/11] w-full"
                    >
                        {/* renders only if the browser can't display the object at all */}
                        <div className="flex aspect-[8.5/11] w-full flex-col items-center justify-center gap-4 bg-bg-raised p-8 text-center">
                            <p className="text-fg-dim">
                                Your browser can&apos;t preview PDFs inline.
                            </p>
                            <a href={RESUME_URL} download>
                                <button 
                                    className="w-fit text-left text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                                >
                                    download pdf
                                </button>
                            </a>
                        </div>
                    </object>
                </div>

                {/* mobile fallback CTA */}
                <div className="mt-6 flex flex-col items-center gap-4 border border-border bg-bg-raised p-10 text-center sm:hidden">
                    <p className="text-fg-dim">
                        PDF preview isn&apos;t reliable on mobile browsers —
                        open it directly instead.
                    </p>
                    <a href={RESUME_URL} download>
                        <button 
                            className="w-fit text-left text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                        >
                            download pdf
                        </button>
                    </a>
                </div>
        </div>
    )
}

export default Resume