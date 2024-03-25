const Footer = () => {
    return(
        <footer>
            <ul className="links-list">
                <li className="links-list-icon">
                    <a href="https://github.com/sebidelamata" target="_blank">
                        <button id="github-button" type="button"></button>
                    </a>
                </li>
                <li className="links-list-icon">
                    <a href="https://www.linkedin.com/in/miguel-sebasti%C3%A1n-de-la-mata/" target="_blank">
                        <button id="linkedin-button" type="button"></button>        
                    </a>
                </li>
                <li>
                    <a href="https://sebidelamata.github.io/datascienceblog/assets/delaMataResume.pdf" target="_blank">
                        <button className="resume-button" type="button">Resume</button>
                    </a>
                </li>
                <li>
                    <div className="llc-disclaimer">
                        &copy; 2024 Sebi de la Mata Web3 Development, LLC. All rights reserved.
                    </div>
                </li>
            </ul>
        </footer>
    )
}

export default Footer