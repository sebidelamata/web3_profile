# Web3 Portfolio NFT

![Boxer NFT](https://ipfs.io/ipfs/QmZ9jpBCcaC8izFoNiqRtrXq7d5pHnAFSy71hqVE29GWEk/23.png)

This project is a Web3 Full-stack portfolio built with [React](https://react.dev/reference/react), [Vite](https://vitejs.dev/), [Typescript](https://www.typescriptlang.org/), [Hardhat](https://hardhat.org/), and [Solidity](https://soliditylang.org/).

The portfolio app offers the first users the ability to print a commemorative NFT from a collection of 138 pieces entitled "Boxers in Predicaments" and deployed to [Arbitrum](https://arbitrum.io/) One network. These pieces feature boxers in scenarios that capture their inner essence. The collection was created using stable diffusion generative models. The collection metadata and images have been deployed to [IPFS](https://ipfs.tech/) to preserve their integrity. The collection metadata is of standard format for visual art NFT marketplaces such as [OpenSea](https://testnets.opensea.io/collection/boxers-in-predicaments). The contract for "Boxers in Predicaments" is published and verified on [Arbiscan](https://sepolia.arbiscan.io/token/0x252Be76A5d39f610E63D9c4d246077A61CCE078B).

## Installing Locally

To run locally, first clone, then `cd <yourDirectory>/web3_profile`.

Then, run `npm install`

### Creating your own collection (optional)

To create your own collection, create metadata according to standarm NFT art format as well as images. Deploy to images to IPFS. Attach IPFS endpoints for images to metadata image entry for each metadata file. Deploy metadatafiles to IPFS. Change your local .env file to match your specific IPFS endpoints. 

Adjust your testnetDeploy.js file to reflect your metadata tokenURI. run `npm run testnetDeploy`. Adjust React app if necessary to run on Arbitrum Sepolia.

Adjust your package.json file to reflect your testnet deployment:
    <code>
        {<br>
            "scripts": {<br>
                ...,<br>
                "testnetVerify": "npx hardhat verify --network arbitrumSepolia <contractAddress><br> <ownerAddress>",<br>
                ...<br>
                },<br>
            ...<br>
        }<br>
    </code>
After making this adjustment, run 'npm run testnetVerify' to verify your deployed contract on Arbitrum Sepolia.

If you would like to deploy to Arbitrum One, adjust your arbitrumDeploy.js file to reflect your metadata tokenURI. run `npm run arbitrumDeploy`. Adjust React app if necessary to run on Arbitrum One.

## Running Client

To run the frontend app locally, run `npm run dev`. The application should be available on [port 9999](http://localhost:9999/).
