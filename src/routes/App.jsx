import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <body>
       <section id="hero" className="hero">
        <div className="hero-card">
            <div className="hero-text">
                <div className="hero-intro-name">
                    <div id="hero-intro-name-block-1">
                        <div></div>
                        <div id="hero-intro-name-block-1-inner">
                            <div id="hero-intro-name-block-1-inner-1">Hi, </div>
                            <div id="hero-intro-name-block-1-inner-2">I&apos;m</div>
                        </div>
                    </div>
                    <div id="hero-intro-name-block-2">
                        <div id="name-highlight"><strong>Sebi de la Mata</strong></div>
                        <div></div>
                    </div>
                </div>
                <div className="hero-intro-title-card">
                    <div></div>
                    <div className="hero-intro-title">Full-Stack Web3 Development</div>
                    <div></div>
                </div>
            </div>
            <div className="tech-stack-carousel-scroller scroller">
                <ul className="tech-stack-carousel-list">
                    <li>
                        <div id="html-icon" className="tech-stack-icon"></div>
                    </li>
                    <li>
                        <div id="css-icon" className="tech-stack-icon"></div>
                    </li>
                    <li>
                        <div id="js-icon" className="tech-stack-icon"></div>
                    </li>
                    <li>
                        <div id="webpack-icon" className="tech-stack-icon"></div>
                    </li>
                    <li>
                        <div id="jest-icon" className="tech-stack-icon"></div>
                    </li>
                    <li>
                        <div id="react-icon" className="tech-stack-icon"></div>
                    </li>
                    <li>
                        <div id="node-icon" className="tech-stack-icon"></div>
                    </li>
                    <li>
                        <div id="git-icon" className="tech-stack-icon"></div>
                    </li>
                    <li>
                        <div id="mongodb-icon" className="tech-stack-icon"></div>
                    </li>
                    <li>
                        <div id="solidity-icon" className="tech-stack-icon"></div>
                    </li>
                    <li>
                        <div id="truffle-icon" className="tech-stack-icon"></div>
                    </li>
                    <li>
                        <div id="hardhat-icon" className="tech-stack-icon"></div>
                    </li>
                </ul>
            </div>
            <div className="scroll-button-card">
                <div></div>
                <a href="#projects" className="scroll-link">
                    <button type="button" className="scroll-button">
                        <span>Check Out My Work</span>
                        <div id="scroll-symbol">&darr;</div>
                    </button>
                </a>
                <div></div>
            </div>
        </div>
      </section>
    </body>
  )
}

export default App
