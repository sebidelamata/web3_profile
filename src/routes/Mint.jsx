import { useEffect, useState } from "react"
import { useProvider, useAccount } from "../EthersProvider";
import Navbar from "../components/Navbar"
import { ethers } from "ethers";
import portfolioNFTArtifact from '../../artifacts/contracts/PortfolioNFT.sol/BiP.json';
import UserNFTPortfolio from "../components/UserNFTPortfolio";

const Mint = () => {
    
    const [minted, setMinted] = useState(null);
    const [mintLoading, setMintLoading] = useState(false);

    const [walletMints, setWalletMints] = useState(null)

    const provider = useProvider();
    const account = useAccount();

    const loadAccountData = async () => {
        try{
            const signer = await provider.getSigner()
            const contractAddress = import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS
            const contractABI = portfolioNFTArtifact.abi
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const walletMints = await contract.getWalletMints(signer.address);
            setWalletMints(parseInt(await walletMints))
            
        } catch(err){
            console.log(err)
        }
    }

    const mintNFT = async () => {
        try{
            if(walletMints >= 2){return}
            setMinted(false)
            setLoading(true)
            const signer = await provider.getSigner()
            const contractAddress = import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS
            const contractABI = portfolioNFTArtifact.abi
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const tx = await contract.safeMint(signer.address);
            await tx.wait()
            setMinted(tx)
        } catch(err) {
            console.error(err);
        } finally {
            setMintLoading(false);
        }
    }

    useEffect(() => {
        loadAccountData()
    }, [provider, account, minted])

    const exitSuccessBanner = () => {
        setMinted(false)
    }

    return(
        <>
            <Navbar></Navbar>
            <div className="minting-body">
                <h1>Mint Guestbook NFT</h1>
                <button onClick={mintNFT} className="mint-button">
                    {
                        walletMints >= 2 
                        ? "Max Minted"
                        : mintLoading 
                        ? "Minting..." 
                        : "Free Mint"
                    }
                </button>
                {
                    minted &&
                    <div className="mint-success-banner">
                        <div className="mint-success-message">Successfully Minted!</div>
                        <div className="mint-success-row-two">
                            <a 
                            href={`https://sepolia.arbiscan.io/tx/${minted.hash}`}
                            target="_blank"
                            className="view-tx"
                            >
                                View Transaction
                            </a>
                            <div className="exit-success-banner" onClick={exitSuccessBanner}>
                                ✕
                            </div>
                        </div>
                    </div>
                }
            </div>
            {
                walletMints !== null &&
                walletMints > 0 &&
                <UserNFTPortfolio />
            }
        </>
    )
}

export default Mint