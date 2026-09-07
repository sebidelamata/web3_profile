import ProjectRow from "../components/ProjectRow"
import React from "react"

const PROJECTS = [
    {
        title: 'AlphaPING',
        description: 'AlphaPING is a DeFi chat protocol on Arbitrum, built with Next.js, React, TypeScript, Solidity, and Hardhat. It features token-gated messaging, aggregated social trading insights, sentiment analysis, integrated trading, creating a social experience.',
        applicationLink: 'https://www.alphaping.xyz/',
        repositoryLink: 'https://github.com/sebidelamata/alpha-ping',
        videoLink: 'https://www.youtube.com/embed/sI4y7i_BnBQ',
        videoTitle: 'AlphaPING',
    },
    {
        title: 'REPO',
        description: "ETH Denver 2024's 1st place Euler Finance Bounty winner, Repo Vault provides liquidity and leverage for Pendle Principal Token (PT) holders through fixed-rate loans.",
        applicationLink: 'https://defi-interest-rate-swaps-frontend.vercel.app/',
        repositoryLink: 'https://devfolio.co/projects/repo-9d33',
        videoLink: 'https://www.youtube.com/embed/7VfPbW5x3Dw',
        videoTitle: 'repo',
    },
    {
        title: 'Open Dollar Gov Proposals',
        description: 'Built with Next.js, TypeScript, WalletConnect, and Ethers.js. Users view and submit proposals via Arbitrum blockchain. Features data from GitHub, decoded calldata, and user status messages.',
        applicationLink: 'https://propose.opendollar.com/',
        repositoryLink: 'https://github.com/open-dollar/od-gov-proposal-app',
        videoLink: 'https://www.youtube.com/embed/NQOsW6Spuq4',
        videoTitle: 'Open Dollar Governance Proposal App',
    },
    {
        title: 'Web3 Portfolio NFT',
        description: 'Web3 app utilizing TypeScript, React, and Hardhat. Users have the ability to mint commemorative NFTs, showcasing unique generative AI artwork with metadata securely pinned to IPFS.',
        applicationLink: 'https://www.sebidelamata.com/mint',
        repositoryLink: 'https://github.com/sebidelamata/web3_profile',
        videoLink: 'https://www.youtube.com/embed/K-umMAg4uVQ',
        videoTitle: 'Web3 Portfolio NFT',
    },
    {
        title: 'Gaping Pond',
        description: "GapingPond is a whitelabel NFT Marketplace using DeFiLlamma and OpenSea APIs. GapingPond provides metrics and interactive charts unavailable on OpenSea.",
        applicationLink: 'https://shoppingcart-e1v.pages.dev/',
        repositoryLink: 'https://github.com/sebidelamata/shoppingCart',
        videoLink: 'https://www.youtube.com/embed/DW4x2mfdgzE',
        videoTitle: 'GapingPond',
    },
]

const Projects: React.FC = () => {
    return (
        <div id="projects">
            <span className="prompt-label text-sm text-accent">ls ./projects</span>
            <ul className="mt-4 flex flex-col">
                {PROJECTS.map((project, index) => (
                    <ProjectRow key={project.title} index={index} {...project} />
                ))}
            </ul>
        </div>
    )
}

export default Projects