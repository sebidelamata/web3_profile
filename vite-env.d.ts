

/// <reference types="vite/client" />

interface Window {
    ethereum?: any
}

interface W3MButtonProps {
    size: string;
    label: string;
    balance: string;
}

// Declare the custom element
declare namespace JSX {
    interface IntrinsicElements {
        // Replace 'w3m-button' with the actual name of your custom element
        'w3m-button': React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement> & W3MButtonProps, HTMLButtonElement>;
    }
}

interface ImportMetaEnv {
    readonly VITE_EMAILJS_PUBLIC_KEY: string;
    readonly VITE_EMAILJS_SERVICE_ID: string;
    readonly VITE_EMAILJS_TEMPLATE_ID: string;
    readonly VITE_WALLET_CONNECT_KEY: string;
    readonly VITE_INFURA_TESTNET_RPC: string;
    readonly VITE_TESTNET_DEV_ACCOUNT0_KEY: string;
    readonly VITE_IPFS_METADATA_BASE_URI: string;
    readonly VITE_ARBISCAN_API_KEY: string;
    readonly VITE_TESTNET_CONTRACT_ADDRESS: string;
  }
