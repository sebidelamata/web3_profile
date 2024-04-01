require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    arbitrumSepolia: {
      url: process.env.VITE_INFURA_TESTNET_RPC,
      accounts: [process.env.VITE_TESTNET_DEV_ACCOUNT0_KEY],
    }
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: process.env.VITE_ARBISCAN_API_KEY,
    },
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: process.env.VITE_TESTNET_CHAINID,
        urls: {
            apiURL: "https://api-sepolia.arbiscan.io/api",
            browserURL: "https://sepolia.arbiscan.io/",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};
