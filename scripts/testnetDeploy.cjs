const hre = require("hardhat");

async function main() {
    const NFT = await hre.ethers.getContractFactory("MERNS");
    const nft = await NFT.deploy();
    console.log(nft)
    await nft.waitForDeployment();
    console.log("MERNS contract deployed to:", await nft.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });