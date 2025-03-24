
import ProjectCard from "../components/ProjectCard"
import React from "react"


const Projects: React.FC = () => {

    return(
        <div id="projects-list-card">
            <h2 id="projects-title"><strong>Projects</strong></h2>
            <ul className="projects-lists" id="projects">
            <li className="project-card" id="project-card-1">
                    <ProjectCard
                        title={'AlphaPING'} 
                        description={'AlphaPING is a DeFi chat protocol on Arbitrum, built with Next.js, React, TypeScript, Solidity, and Hardhat. It features token-gated messaging, aggregated social trading insights, sentiment analysis, integrated trading, creating a social experience.'} 
                        applicationLink={'https://www.alphaping.xyz/'}
                        repositoryLink={'https://github.com/sebidelamata/alpha-ping'} 
                        videoLink={'https://www.youtube.com/embed/sI4y7i_BnBQ?autoplay=1&mute=1&loop=1&playlist=sI4y7i_BnBQ'}
                        videoTitle={'AlphaPING'}
                        cardNumber={1}
                    />
                </li>
                <li className="project-card" id="project-card-2">
                    <ProjectCard
                        title={'Open Dollar Gov Proposals'} 
                        description={'Built with Next.js, TypeScript, WalletConnect, and Ethers.js. Users view and submit proposals via Arbitrum blockchain. Features data from GitHub, decoded calldata, and user status messages.'} 
                        applicationLink={'https://propose.opendollar.com/'}
                        repositoryLink={'https://github.com/open-dollar/od-gov-proposal-app'} 
                        videoLink={'https://www.youtube.com/embed/NQOsW6Spuq4?autoplay=1&mute=1&loop=1&playlist=NQOsW6Spuq4'}
                        videoTitle={'Open Dollar Governance Proposal App'}
                        cardNumber={2}
                    />
                </li>
                <li className="project-card" id="project-card-3">
                    <ProjectCard
                        title={'Web3 Portfolio NFT'} 
                        description={'Web3 app utilizing TypeScript, React, and Hardhat. Users have the ability to mint commemorative NFTs, showcasing unique generative AI artwork with metadata securely pinned to IPFS'} 
                        applicationLink={'https://www.sebidelamata.com/mint'}
                        repositoryLink={'https://github.com/sebidelamata/web3_profile'} 
                        videoLink={'https://www.youtube.com/embed/K-umMAg4uVQ?autoplay=1&mute=1&loop=1&playlist=K-umMAg4uVQ'}
                        videoTitle={'Web3 Portfolio NFT'}
                        cardNumber={3}
                    />
                </li>
                <li className="project-card" id="project-card-4">
                    <ProjectCard
                        title={'REPO'} 
                        description={"ETH Denver 2024's 1st place Euler Finance Bounty winner, Repo Vault provides liquidity and leverage for Pendle Principal Token (PT) holders through fixed-rate loans."} 
                        applicationLink={'https://defi-interest-rate-swaps-frontend.vercel.app/'}
                        repositoryLink={'https://devfolio.co/projects/repo-9d33'} 
                        videoLink={'https://www.youtube.com/embed/7VfPbW5x3Dw?si=DxM4wRr-ApAb5twY&autoplay=1&mute=1&loop=1&playlist=7VfPbW5x3Dw'}
                        videoTitle={'repo'}
                        cardNumber={4}
                    />
                </li>
                <li className="project-card" id="project-card-5">
                    <ProjectCard
                        title={'Gaping Pond'} 
                        description={"GapingPond is a whitelabel NFT Marketplace using DeFiLlamma and OpenSea APIs. GapingPond provides metrics and interactive charts unavailable on OpenSea."} 
                        applicationLink={'https://shoppingcart-e1v.pages.dev/'}
                        repositoryLink={'https://github.com/sebidelamata/shoppingCart'} 
                        videoLink={'https://www.youtube.com/embed/DW4x2mfdgzE?si=NL5thjhvVo5hBQ4B&autoplay=1&mute=1&loop=1&playlist=DW4x2mfdgzE'}
                        videoTitle={'GapingPond'}
                        cardNumber={5}
                    />
                </li>
            </ul>
        </div>
    )
}

export default Projects