import React from "react"

const Hero: React.FC = () => {
    return (
        <div className="py-16 sm:py-24">
            <p className="text-fg-dim">hi, I&apos;m</p>
            <h1 className="mt-1 text-3xl font-bold text-accent sm:text-4xl">
                Sebi de la Mata
                <span
                    aria-hidden="true"
                    className="ml-1 inline-block w-[0.5ch] animate-blink bg-accent align-middle"
                >
                    &nbsp;
                </span>
            </h1>
            <p className="mt-4 border-l-2 border-accent pl-3 text-fg-dim">
                full-stack web3 development
            </p>
        </div>
    )
}

export default Hero