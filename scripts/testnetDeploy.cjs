const hre = require("hardhat");
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const NFT = await hre.ethers.getContractFactory("MERNS");
    const nft = await NFT.deploy(deployer);
    await nft.waitForDeployment();
    const contractAddress = await nft.getAddress()
    console.log("MERNS contract deployed to:", contractAddress);

    const envFilePath = '.env';
    const parsedEnv = dotenv.parse(fs.readFileSync(envFilePath));
    const envVariableName = 'VITE_TESTNET_CONTRACT_ADDRESS';
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