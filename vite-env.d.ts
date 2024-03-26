
interface Window {
    ethereum?: any
}

/// <reference types="vite/client" />

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

interface ImportMeta {
    env: {
        VITE_EMAILJS_PUBLIC_KEY: string;
        VITE_EMAILJS_SERVICE_ID: string;
        VITE_EMAILJS_TEMPLATE_ID: string;
        VITE_WALLET_CONNECT_KEY: string;
        VITE_INFURA_TESTNET_RPC: string;
        VITE_TESTNET_DEV_ACCOUNT0_KEY: string;
        VITE_IPFS_METADATA_BASE_URI: string;
        VITE_ARBISCAN_API_KEY: string;
        VITE_TESTNET_CONTRACT_ADDRESS: string;
    };
  }
