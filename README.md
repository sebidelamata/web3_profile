# Web3 Portfolio NFT

This project is a Web3 Full-stack portfolio built with React, Vite, Typescript, Hardhat, and Solidity.

The portfolio app offers the first users the ability to print a commemorative NFT from a collection of 138 pieces entitled "Boxers in Predicaments" and deployed to Arbitrum One network. These pieces feature boxers in scenarios that capture their inner essence. The collection was created using stable diffusion generative models. The collection metadata and images have been deployed to IPFS to preserve their integrity. The collection metadata is of standard format for visual art NFT marketplaces such as OpenSea. The contract for "Boxers in Predicaments" is published and verified on Arbiscan.

## Running Locally

To run locally, first clone, then `cd <yourDirectory>/web3_profile`.

Then, run `npm install`

### Creating your own collection (optional)

To create your own collection, create metadata according to standarm NFT art format as well as images. Deploy to images to IPFS. Attach IPFS endpoints for images to metadata image entry for each metadata file. Deploy metadatafiles to IPFS. Change your local .env file to match your specific IPFS endpoints. 

Adjust your testnetDeploy.js file to reflect your metadata tokenURI. run `npm run testnetDeploy`. Adjust React app if necessary to run on Arbitrum Sepolia.

If you would like to deploy to Arbitrum One, adjust your arbitrumDeploy.js file to reflect your metadata tokenURI. run `npm run arbitrumDeploy`. Adjust React app if necessary to run on Arbitrum One.

## Running Client

To run the frontend app locally, run `npm run dev`. The application should be available on port 9999.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
