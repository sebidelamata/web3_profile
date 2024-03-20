import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './Router'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId
const projectId = import.meta.env.VITE_WALLET_CONNECT_KEY

// 2. Set chains
const arbitrumSepolia = {
  chainId: 421614,
  name: 'Arbitrum Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.arbiscan.io',
  rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc'
}

const arbitrum = {
  chainId: 42161,
  name: 'Arbitrum',
  currency: 'ETH',
  explorerUrl: 'https://arbiscan.io/',
  rpcUrl: 'https://arb1.arbitrum.io/rpc'
}

// 3. Create a metadata object
const metadata = {
  name: 'Sebi de la Mata | Full-Stack Web3 Development',
  description: 'A Web3 Portfolio',
  url: 'https://www.sebidelamata.com', // origin must match your domain & subdomain
  icons: ['/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [arbitrumSepolia, arbitrum],
  projectId,
  enableOnramp: true,
  enableAnalytics: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'Roboto Mono',
    '--w3m-accent': 'rgb(10, 6, 37)',
    '--w3m-color-mix': 'rgb(181, 194, 202)'
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
