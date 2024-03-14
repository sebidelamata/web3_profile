const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const NFT = await hre.ethers.getContractFactory("MERNS");
    const nft = await NFT.deploy(deployer);
    await nft.waitForDeployment();
    console.log("MERNS contract deployed to:", await nft.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });