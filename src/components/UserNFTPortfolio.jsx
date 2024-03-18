import { useEffect, useState } from "react"
import { useProvider, useAccount } from "../EthersProvider";
import { ethers } from "ethers";
import portfolioNFTArtifact from '../../artifacts/contracts/PortfolioNFT.sol/BiP.json';
import UserNFTCard from "./UserNFTCard";

const UserNFTPortfolio = () => {

    const provider = useProvider();
    const account = useAccount();

    const [tokenIDs, setTokenIDs] = useState([])
    const [tokenIDsLoading, setTokenIDsLoading] = useState(true)

    const [mintedMetaData, setMintedMetadata] = useState([])
    const [mintedMetadataLoading, setMintedMetadataLoading] = useState(true)

    const fetchMetaData = async (uri) => {
        try{
            let metadata = await fetch(uri)
            if (!metadata.ok) {
                throw new Error('Network response was not ok');
                }
            metadata = await metadata.json()
            return metadata
        } catch(err){
            console.log(err)
        }
    }

    const loadNFTPortfolioMetaData = async () => {

        let metadataArray = []
        for(let token of tokenIDs){
            try{
                const signer = await provider.getSigner()
                const contractAddress = import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS
                const contractABI = portfolioNFTArtifact.abi
                const contract = new ethers.Contract(contractAddress, contractABI, signer)
                const uri = await contract.tokenURI(token)
                const metadata = await fetchMetaData(await uri)
                metadataArray.push(metadata)
            } catch(err) {
                console.log(err)
            }
        }
        setMintedMetadata(metadataArray)
        setMintedMetadataLoading(false)
    }

    const loadPortfolioIDs = async () => {
        
        try{
            const signer = await provider.getSigner()
            const contractAddress = import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS
            const contractABI = portfolioNFTArtifact.abi
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            
            const _tokenIDs = await contract.getWalletTokenIDs(signer.address);
            const tokenIDsArray = Object.values(await _tokenIDs).map(value => parseInt(value))
            setTokenIDs(tokenIDsArray)
        } catch(err){
            console.log(err)
        } finally {
            setTokenIDsLoading(false)
        }
    }

    useEffect(() => {
        loadPortfolioIDs()
    }, [provider, account])

    useEffect(() => {
        loadNFTPortfolioMetaData()
    },[tokenIDsLoading])

    return(
        <div className="user-nft-portfolio-container">
            <h1 className="user-nft-portfolio-title">Your Boxers in Predicaments</h1>
            <ul className="user-nft-portfolio-list">
                {   
                    mintedMetadataLoading === false &&
                    mintedMetaData.map((metadata) => (
                        <li key={metadata.image} className="user-nft-portfolio">
                            <UserNFTCard metadata={metadata}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default UserNFTPortfolio