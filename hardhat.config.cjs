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
};
