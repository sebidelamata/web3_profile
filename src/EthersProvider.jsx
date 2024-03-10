import { useEffect, useState, createContext, useContext } from 'react';
import { ethers } from 'ethers';

// contexts
const AccountContext = createContext();
const AccountUpdateContext = createContext();
const ProviderContext = createContext();
const ProviderUpdateContext = createContext();

export const useAccount = () => {
    return useContext(AccountContext)
}
export const useAccountUpdate = () => {
    return useContext(AccountUpdateContext)
}
export const useProvider = () => {
    return useContext(ProviderContext)
}
export const useProviderUpdate = () => {
    return useContext(ProviderUpdateContext)
}

// ethers provider
export const EthersProvider = ({children}) => {

    const [provider, setProvider] = useState(null)
    const [account, setAccount] = useState(null)

    const loadBlockchainData = async () => {

        const provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(provider)
    
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          const account = ethers.utils.getAddress(accounts[0])
          setAccount(account)
        })
      }
    
      useEffect(() => {
        loadBlockchainData()
      }, [])

    return (
        <AccountContext.Provider value={ account }>
            <AccountUpdateContext.Provider value={ setAccount }>
                <ProviderContext.Provider value={ provider }>
                    <ProviderUpdateContext.Provider value={ setProvider }>
                        {children}
                    </ProviderUpdateContext.Provider>
                </ProviderContext.Provider>
            </AccountUpdateContext.Provider>
        </AccountContext.Provider>
    );
}