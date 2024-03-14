const ProjectCard = ({ 
    title, 
    description, 
    applicationLink, 
    repositoryLink, 
    videoLink,
    videoTitle,
    cardNumber 
}) => {

    window.addEventListener('scroll', function() {
        const projectCard = document.getElementById(`project-card-${cardNumber}`);
        const descriptionCard = document.getElementById(`project-description-card-${cardNumber}`);
        const videoCard = document.getElementById(`project-video-card-${cardNumber}`);
      
        const rect = projectCard.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
        if (rect.top < (windowHeight*0.25) && rect.bottom >= (windowHeight*0.25)) {
          // Card is in view
          descriptionCard.classList.add('show');
          videoCard.classList.add('show');
        } else {
          // Card is out of view
          descriptionCard.classList.remove('show');
          videoCard.classList.remove('show');
        }
      });

    return(
        <>
            <div className="project-description-card" id={`project-description-card-${cardNumber}`}>
                <h1 className="project-description-title">
                    {title}
                </h1>
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
            <div className="project-video-card" id={`project-video-card-${cardNumber}`}>
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