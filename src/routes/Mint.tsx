import React, { useEffect, useState } from "react"
import { useProvider, useAccount } from "../EthersProvider";
import Navbar from "../components/Navbar"
import { ethers } from "ethers";
import portfolioNFTArtifact from '../../artifacts/contracts/PortfolioNFT.sol/BiP.json';
import UserNFTPortfolio from "../components/UserNFTPortfolio";
import NFTPreviews from "../components/NFTPreviews";

const Mint: React.FC = () => {
    
    const [minted, setMinted] = useState<ethers.TransactionReceipt | null>(null);
    const [mintLoading, setMintLoading] = useState<boolean>(false);

    const [totalSupply, setTotalSupply] = useState<number | null>(null)

    const [walletMints, setWalletMints] = useState<number | null>(null)

    const [showPortfolio, setShowPortfolio] = useState<boolean>(false)

    const provider = useProvider();
    const account = useAccount();

    const getTotalSupply = async () => {
        try{
            if(provider){
                const signer = await provider.getSigner()
                const contractAddress = import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS as string
                const contractABI = portfolioNFTArtifact.abi
                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                const result: any = await contract.totalSupply()
                let totalSupply = await result.toString()
                setTotalSupply(parseInt(await totalSupply))
            }
        } catch(err){
            console.log(err)
        }
    }

    const loadAccountData = async () => {
        try{
            if(provider){
                const signer = await provider.getSigner()
                const contractAddress = import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS
                const contractABI = portfolioNFTArtifact.abi
                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                const response = await contract.getWalletMints(signer.address);
                const walletMints = await response.toString()
                setWalletMints(parseInt(await walletMints))
            }
            
        } catch(err){
            console.log(err)
        }
    }

    const mintNFT = async () => {
        try{
            console.log(walletMints)
            if(walletMints === null || walletMints >= 2){return}
            console.log('hi')
            if(provider){
                setMinted(null)
                setMintLoading(true)
                const signer = await provider.getSigner()
                const contractAddress = import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS
                const contractABI = portfolioNFTArtifact.abi
                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                const tx = await contract.safeMint(signer.address);
                await tx.wait()
                setMinted(tx)
            }
        } catch(err) {
            console.error(err);
        } finally {
            setMintLoading(false);
        }
    }

    useEffect(() => {
        getTotalSupply()
        loadAccountData()
    }, [provider, account, minted])

    const exitSuccessBanner = () => {
        setMinted(null)
    }
    return(
        <>
            <Navbar></Navbar>
            <div className="minting-body">
                {
                    !provider?.getSigner() &&
                    <h4 className="not-connected-message">
                       Please Connect Wallet
                    </h4>
                }
                <h1 className="minting-title">Mint Boxers in Predicaments NFT</h1>
                <NFTPreviews/>
                <div className="collection-description">
                    Thank you for taking the time to explore my website. As a gesture of appreciation, I&lsquo;m delighted to extend an exclusive offer: a complimentary mint of a commemorative NFT from the esteemed collection, Boxers in Predicaments.
                    <br></br><br></br>This collection comprises 138 meticulously crafted art pieces generated through cutting-edge AI technology. The contracts are deployed to Arbitrum and the images are deployed to IPFS for decentralized and tamper-proof data hosting.
                    <br></br><br></br>To ensure fairness and accessibility, there&lsquo;s a limit of two mints per wallet.
                    <br></br><br></br>Feel free to reach out if you have any questions or if there&lsquo;s anything else I can assist you with. Your interest is truly valued.
                    <br></br><br></br>
                    <div className="collection-description-footer">
                        <div>
                            <a 
                            href="https://testnets.opensea.io/collection/boxers-in-predicaments" 
                            target="_blank"
                            >View Collection on OpenSea</a>
                        </div>
                        <br></br>
                        <div>
                            <a 
                            href={`https://sepolia.arbiscan.io/token/${import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS}`} 
                            target="_blank"
                            >View Verified and Published Contract on Arbiscan</a>
                        </div>
                    </div>
                </div>
                <div className="mint-button-container">
                    {
                        totalSupply && totalSupply < 138 &&
                        <button onClick={mintNFT} className="mint-button">
                            {
                                walletMints &&
                                walletMints >= 2 
                                ? "Max Minted"
                                : mintLoading 
                                ? "Minting..." 
                                : "Free Mint"
                            }
                        </button>
                    }
                    {
                        totalSupply &&
                        totalSupply >= 138 &&
                        <button className="mint-button">
                            <a href="https://testnets.opensea.io/collection/boxers-in-predicaments" target="blank">
                                Mint Completed, Make an Offer on OpenSea.
                            </a>
                        </button>
                    }
                </div>
                {
                    totalSupply !== null &&
                    <h3 className="mint-supply">
                        <strong>{totalSupply}</strong> {`/ 138 Boxers Minted`}
                    </h3>
                }
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
                <div className="view-yours-container">
                    <button onClick={() => setShowPortfolio(true)} className="view-yours-container-button">
                        View Your Boxers
                    </button>
                </div>
            }
            {
                walletMints !== null &&
                walletMints > 0 &&
                showPortfolio === true &&
                <UserNFTPortfolio setShowPortfolio={setShowPortfolio} showPortfolio={showPortfolio}/>
            }
        </>
    )
}

export default Mint