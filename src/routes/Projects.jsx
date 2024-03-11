const Projects = () => {
    return(
        <div className="projects-list-card">
            <div id="projects-title"><strong>Projects</strong></div>
            <ul className="projects-lists" id="projects">
                <li className="project-card" id="project-card-1">
                    <div className="project-description-card" id="project-description-card-1">
                        <div className="project-description-title">Battleship</div>
                        <div className="project-description-content">
                            A vanilla Javascript-based game of battleship using TDD and Jest as well as Webpack.
                        </div>
                        <div className="project-card-footer">
                            <a href="https://sebidelamata.github.io/battleship/" target="_blank">
                                <button type="button" className="live-app-link">Live Application</button>
                            </a>
                            <a href="https://github.com/sebidelamata/battleship" target="_blank">
                                <button type="button" className="repository-link"></button>
                            </a>
                        </div>
                    </div>
                    <div className="project-video-card" id="project-video-card-1">
                        <iframe src="https://www.youtube.com/embed/AqNxUMlHDXA?autoplay=1&mute=1&loop=1&playlist=AqNxUMlHDXA" title="battleShipPreviewVideo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </li>
                <li className="project-card" id="project-card-2">
                    <div className="project-description-card" id="project-description-card-2">
                        <div className="project-description-title">Weather App</div>
                        <div className="project-description-content">
                            A weather app written in vanilla JavaScript using async functions and webpack.
                        </div>
                        <div className="project-card-footer">
                            <a href="https://sebidelamata.github.io/weatherApp/" target="_blank">
                                <button type="button" className="live-app-link">Live Application</button>
                            </a>
                            <a href="https://github.com/sebidelamata/weatherApp" target="_blank">
                                <button type="button" className="repository-link"></button>
                            </a>
                            </div>
                    </div>
                    <div className="project-video-card" id="project-video-card-2">
                        <iframe src="https://www.youtube.com/embed/KHuj7lDrl5E?autoplay=1&mute=1&loop=1&playlist=KHuj7lDrl5E" title="weatherApp" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </li>
                <li className="project-card" id="project-card-3">
                    <div className="project-description-card" id="project-description-card-3">
                        <div className="project-description-title">2dü</div>
                        <div className="project-description-content">
                            A vanilla JavaScript to-do list application built with Webpack.
                        </div>
                        <div className="project-card-footer">
                            <a href="https://sebidelamata.github.io/toDoList/" target="_blank">
                                <button type="button" className="live-app-link">Live Application</button>
                            </a>
                            <a href="https://github.com/sebidelamata/toDoList" target="_blank">
                                <button type="button" className="repository-link"></button>
                            </a>
                        </div>
                    </div>
                    <div className="project-video-card" id="project-video-card-3">
                        <iframe src="https://www.youtube.com/embed/NnLBLz3f8HQ?autoplay=1&mute=1&loop=1&playlist=NnLBLz3f8HQ" title="todo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Projects