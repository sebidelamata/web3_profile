
import ProjectCard from "../components/ProjectCard"

const Projects = () => {

    return(
        <div id="projects-list-card">
            <h2 id="projects-title"><strong>Projects</strong></h2>
            <ul className="projects-lists" id="projects">
                <li className="project-card" id="project-card-1">
                    <ProjectCard
                        title={'Web3 Portfolio NFT'} 
                        description={'A full-stack Web3 App using React and Hardhat. Users can mint a commemorative NFT with Generative AI art and metadata pinned to IPFS.'} 
                        applicationLink={'/mint'}
                        repositoryLink={'https://github.com/sebidelamata/web3_profile'} 
                        videoLink={'https://youtube.com/embed/dEuhGtQ2Bko?autoplay=1&mute=1&loop=1'}
                        videoTitle={'Web3 Portfolio NFT'}
                        cardNumber={1}
                    />
                </li>
                <li className="project-card" id="project-card-2">
                    <ProjectCard
                        title={'REPO'} 
                        description={"ETH Denver 2024's 1st place Euler Bounty winner, Repo Vault provides liquidity and leverage for Pendle Principal Token (PT) holders through fixed-rate loans."} 
                        applicationLink={'https://defi-interest-rate-swaps-frontend.vercel.app/'}
                        repositoryLink={'https://devfolio.co/projects/repo-9d33'} 
                        videoLink={'https://www.youtube.com/embed/_IlwpC8A_gE?start=19956&autoplay=1&mute=1&loop=1'}
                        videoTitle={'repo'}
                        cardNumber={2}
                    />
                </li>
            </ul>
        </div>
    )
}

export default Projects