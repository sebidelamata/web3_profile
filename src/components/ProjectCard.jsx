const ProjectCard = ({ 
    title, 
    description, 
    applicationLink, 
    repositoryLink, 
    videoLink,
    videoTitle 
}) => {
    return(
        <>
            <div className="project-description-card" id="project-description-card-1">
                <div className="project-description-title">
                    {title}
                </div>
                <div className="project-description-content">
                    {description}
                </div>
                <div className="project-card-footer">
                    <a href={applicationLink} target="_blank">
                        <button type="button" className="live-app-link">Live Application</button>
                    </a>
                    <a href={repositoryLink} target="_blank">
                        <button type="button" className="repository-link"></button>
                    </a>
                </div>
            </div>
            <div className="project-video-card" id="project-video-card-1">
                <iframe 
                    src={videoLink} 
                    title={videoTitle} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                ></iframe>
            </div>
        </>
    )
}

export default ProjectCard