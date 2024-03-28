import React, { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { ethers } from 'ethers';

// Define types for context values
type AccountType = string | null;
type ProviderType = ethers.BrowserProvider | null;
type UpdateFunction<T> = Dispatch<SetStateAction<T>>;

// Define contexts
const AccountContext = createContext<AccountType>(null);
const AccountUpdateContext = createContext<UpdateFunction<AccountType>>(() => {});
const ProviderContext = createContext<ProviderType>(null);
const ProviderUpdateContext = createContext<UpdateFunction<ProviderType>>(() => {});

// Custom hooks to access context values
export const useAccount = (): AccountType => useContext(AccountContext);
export const useAccountUpdate = (): UpdateFunction<AccountType> => useContext(AccountUpdateContext);
export const useProvider = (): ProviderType => useContext(ProviderContext);
export const useProviderUpdate = (): UpdateFunction<ProviderType> => useContext(ProviderUpdateContext);

// Ethers provider component
interface EthersProviderProps {
    children: ReactNode;
}

export const EthersProvider = ({ children }: EthersProviderProps): JSX.Element => {
    const [provider, setProvider] = useState<ProviderType>(null);
    const [account, setAccount] = useState<AccountType>(null);

    const loadBlockchainData = async (): Promise<void> => {
        if (typeof window !== 'undefined' && window.ethereum) {
            const browserProvider = new ethers.BrowserProvider(window.ethereum as any);
            setProvider(browserProvider);

            window.ethereum.on('accountsChanged', async (): Promise<void> => {
                const accounts = await window.ethereum?.request({ method: 'eth_requestAccounts' });
                const updatedAccount = ethers.getAddress(accounts[0]);
                setAccount(updatedAccount);
            })
        } else {
            console.error('Ethereum provider not detected. Please install MetaMask or another Ethereum wallet extension.');
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && window.ethereum !== undefined) {
            loadBlockchainData();
        } else {
            console.error('Window object or Ethereum provider is not available.');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AccountContext.Provider value={account}>
            <AccountUpdateContext.Provider value={setAccount}>
                <ProviderContext.Provider value={provider}>
                    <ProviderUpdateContext.Provider value={setProvider}>
                        {children}
                    </ProviderUpdateContext.Provider>
                </ProviderContext.Provider>
            </AccountUpdateContext.Provider>
        </AccountContext.Provider>
    );
};
