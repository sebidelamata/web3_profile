import React from "react"

const Hero: React.FC = () => {
    return(
        <div className="hero-text">
            <div className="hero-intro-name">
                <div id="hero-intro-name-block-1">
                    <div></div>
                    <div id="hero-intro-name-block-1-inner">
                        <h1 id="hero-intro-name-block-1-inner-1">Hi, </h1>
                        <h1 id="hero-intro-name-block-1-inner-2">I&apos;m</h1>
                    </div>
                </div>
                <div id="hero-intro-name-block-2">
                    <div id="name-highlight"><strong>Sebi de la Mata</strong></div>
                    <div></div>
                </div>
            </div>
            <div className="hero-intro-title-card">
                <div></div>
                <h2 className="hero-intro-title">Full-Stack Web3 Development</h2>
                <div></div>
            </div>
        </div>
    )
}

export default Hero