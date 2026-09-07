export interface Project {
    slug: string;
    title: string;
    description: string;
    applicationLink: string;
    repositoryLink: string;
    videoLink: string;
    videoTitle: string;
}

export const PROJECTS: Project[] = [
    {
        slug: 'alphaping',
        title: 'AlphaPING',
        description: 'AlphaPING is a DeFi chat protocol on Arbitrum, built with Next.js, React, TypeScript, Solidity, and Hardhat. It features token-gated messaging, aggregated social trading insights, sentiment analysis, integrated trading, creating a social experience.',
        applicationLink: 'https://www.alphaping.xyz/',
        repositoryLink: 'https://github.com/sebidelamata/alpha-ping',
        videoLink: 'https://www.youtube.com/embed/sI4y7i_BnBQ',
        videoTitle: 'AlphaPING',
    },
    {
        slug: 'repo',
        title: 'REPO',
        description: "ETH Denver 2024's 1st place Euler Finance Bounty winner, Repo Vault provides liquidity and leverage for Pendle Principal Token (PT) holders through fixed-rate loans.",
        applicationLink: 'https://defi-interest-rate-swaps-frontend.vercel.app/',
        repositoryLink: 'https://devfolio.co/projects/repo-9d33',
        videoLink: 'https://www.youtube.com/embed/7VfPbW5x3Dw',
        videoTitle: 'repo',
    },
    {
        slug: 'open-dollar',
        title: 'Open Dollar Gov Proposals',
        description: 'Built with Next.js, TypeScript, WalletConnect, and Ethers.js. Users view and submit proposals via Arbitrum blockchain. Features data from GitHub, decoded calldata, and user status messages.',
        applicationLink: 'https://propose.opendollar.com/',
        repositoryLink: 'https://github.com/open-dollar/od-gov-proposal-app',
        videoLink: 'https://www.youtube.com/embed/NQOsW6Spuq4',
        videoTitle: 'Open Dollar Governance Proposal App',
    },
    {
        slug: 'web3-portfolio-nft',
        title: 'Web3 Portfolio NFT',
        description: 'Web3 app utilizing TypeScript, React, and Hardhat. Users have the ability to mint commemorative NFTs, showcasing unique generative AI artwork with metadata securely pinned to IPFS.',
        applicationLink: 'https://www.sebidelamata.com/mint',
        repositoryLink: 'https://github.com/sebidelamata/web3_profile',
        videoLink: 'https://www.youtube.com/embed/K-umMAg4uVQ',
        videoTitle: 'Web3 Portfolio NFT',
    },
    {
        slug: 'gaping-pond',
        title: 'Gaping Pond',
        description: "GapingPond is a whitelabel NFT Marketplace using DeFiLlamma and OpenSea APIs. GapingPond provides metrics and interactive charts unavailable on OpenSea.",
        applicationLink: 'https://shoppingcart-e1v.pages.dev/',
        repositoryLink: 'https://github.com/sebidelamata/shoppingCart',
        videoLink: 'https://www.youtube.com/embed/DW4x2mfdgzE',
        videoTitle: 'GapingPond',
    },
]