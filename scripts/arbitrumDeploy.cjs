const hre = require("hardhat");
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
require('dotenv').config();

async function main() {

    // deploy to blockchain
    const [deployer] = await hre.ethers.getSigners();
    const NFT = await hre.ethers.getContractFactory("BiP");
    const nft = await NFT.deploy(deployer);
    await nft.waitForDeployment();
    const contractAddress = await nft.getAddress()
    console.log("Boxers in Predicaments contract deployed to:", contractAddress);
    await nft.setBaseTokenUri(process.env.VITE_IPFS_METADATA_BASE_URI)
    console.log(await nft.getBaseURI())

    const envFilePath = '.env';
    const parsedEnv = dotenv.parse(fs.readFileSync(envFilePath));
    const envVariableName = 'VITE_ARBITRUM_CONTRACT_ADDRESS';
    if (envVariableName in parsedEnv) {
        delete parsedEnv[envVariableName];
    }
    parsedEnv[envVariableName] = contractAddress;
    const updatedEnvContent = Object.entries(parsedEnv)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
    fs.writeFileSync(envFilePath, updatedEnvContent);

    console.log('Contract address written to contractConfig.js and .env file successfully.');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });