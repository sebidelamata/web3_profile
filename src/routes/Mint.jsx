import { useEffect, useState } from "react"
import { useProvider, useAccount } from "../EthersProvider";
import Navbar from "../components/Navbar"
import { ethers } from "ethers";
import portfolioNFTArtifact from '../../artifacts/contracts/PortfolioNFT.sol/BiP.json';

const Mint = () => {
    
    const [minted, setMinted] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mintedMetaData, setMintedMetadata] = useState(null)

    const provider = useProvider();
    const account = useAccount();

    const mintNFT = async () => {
        try{
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
            setLoading(false);
        }
    }

    const viewMetaData = async () => {
        try{
            const signer = await provider.getSigner()
            const contractAddress = import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS
            const contractABI = portfolioNFTArtifact.abi
            const contract = new ethers.Contract(contractAddress, contractABI, signer)
            const uri = await contract.tokenURI(0)
            setMintedMetadata(uri)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        viewMetaData()
    },[minted, loading, provider, account])

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
                    loading ? "Minting..." : "Free Mint"
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
        </>
    )
}

export default Mint