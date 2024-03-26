/// <reference types="react-scripts" />

interface Window {
    ethereum: any
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