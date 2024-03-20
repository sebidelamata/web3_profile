import { useEffect, useState } from "react"
import { useProvider, useAccount } from "../EthersProvider";
import Navbar from "../components/Navbar"
import { ethers } from "ethers";
import portfolioNFTArtifact from '../../artifacts/contracts/PortfolioNFT.sol/BiP.json';
import UserNFTPortfolio from "../components/UserNFTPortfolio";
import NFTPreviews from "../components/NFTPreviews";

const Mint = () => {
    
    const [minted, setMinted] = useState(null);
    const [mintLoading, setMintLoading] = useState(false);

    const [totalSupply, setTotalSupply] = useState(null)

    const [walletMints, setWalletMints] = useState(null)

    const [showPortfolio, setShowPortfolio] = useState(false)

    const provider = useProvider();
    const account = useAccount();

    const getTotalSupply = async () => {
        try{
            const signer = await provider.getSigner()
            const contractAddress = import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS
            const contractABI = portfolioNFTArtifact.abi
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const totalSupply = await contract.totalSupply()
            setTotalSupply(parseInt(totalSupply))
        } catch(err){
            console.log(err)
        }
    }

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
            setMintLoading(true)
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
        getTotalSupply()
        loadAccountData()
    }, [provider, account, minted])

    const exitSuccessBanner = () => {
        setMinted(false)
    }
    console.log(totalSupply)
    return(
        <>
            <Navbar></Navbar>
            <div className="minting-body">
                <h1 className="minting-title">Mint Boxers in Predicaments NFT</h1>
                <NFTPreviews/>
                <div className="collection-description">
                Thank you for taking the time to explore my website. As a gesture of appreciation, I&lsquo;m delighted to extend an exclusive offer: a complimentary mint of a commemorative NFT from the esteemed collection, Boxers in Predicaments.
                    <br></br><br></br>This collection comprises 138 meticulously crafted art pieces generated through cutting-edge AI technology. The contracts are deployed to Arbitrum and the images are deployed to IPFS for decentralized and tamper-proof data hosting.
                    <br></br><br></br>To ensure fairness and accessibility, there&lsquo;s a limit of two mints per wallet.
                    <br></br><br></br>Feel free to reach out if you have any questions or if there&lsquo;s anything else I can assist you with. Your interest is truly valued.
                </div>
                <div className="mint-button-container">
                    {
                        totalSupply < 138 &&
                        <button onClick={mintNFT} className="mint-button">
                            {
                                walletMints >= 2 
                                ? "Max Minted"
                                : mintLoading 
                                ? "Minting..." 
                                : "Free Mint"
                            }
                        </button>
                    }
                    {
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
                <UserNFTPortfolio setShowPortfolio={setShowPortfolio}/>
            }
        </>
    )
}

export default Mint