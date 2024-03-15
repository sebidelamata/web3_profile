
import ProjectCard from "../components/ProjectCard"

const Projects = () => {

    return(
        <div id="projects-list-card">
            <h2 id="projects-title"><strong>Projects</strong></h2>
            <ul className="projects-lists" id="projects">
                <li className="project-card" id="project-card-1">
                    <ProjectCard
                        title={'Battleship'} 
                        description={'A vanilla Javascript-based game of battleship using TDD and Jest as well as Webpack.'} 
                        applicationLink={'https://sebidelamata.github.io/battleship/'}
                        repositoryLink={'https://github.com/sebidelamata/battleship'} 
                        videoLink={'https://www.youtube.com/embed/AqNxUMlHDXA?autoplay=1&mute=1&loop=1&playlist=AqNxUMlHDXA'}
                        videoTitle={'battleShipPreviewVideo'}
                        cardNumber={1}
                    />
                </li>
                <li className="project-card" id="project-card-2">
                    <ProjectCard
                        title={'Weather App'} 
                        description={'A weather app written in vanilla JavaScript using async functions and webpack.'} 
                        applicationLink={'https://sebidelamata.github.io/weatherApp/'}
                        repositoryLink={'https://sebidelamata.github.io/weatherApp/'} 
                        videoLink={'https://www.youtube.com/embed/KHuj7lDrl5E?autoplay=1&mute=1&loop=1&playlist=KHuj7lDrl5E'}
                        videoTitle={'weatherApp'}
                        cardNumber={2}
                    />
                </li>
                <li className="project-card" id="project-card-3">
                    <ProjectCard
                        title={'2dü'} 
                        description={'A vanilla JavaScript to-do list application built with Webpack.'} 
                        applicationLink={'https://sebidelamata.github.io/toDoList/'}
                        repositoryLink={'https://github.com/sebidelamata/toDoList'} 
                        videoLink={'https://www.youtube.com/embed/NnLBLz3f8HQ?autoplay=1&mute=1&loop=1&playlist=NnLBLz3f8HQ'}
                        videoTitle={'todo'}
                        cardNumber={3}
                    />
                </li>
            </ul>
        </div>
    )
}

export default Projects