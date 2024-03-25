import { useEffect, useState } from "react"
import { useProvider, useAccount } from "../EthersProvider.tsx";
import { ethers } from "ethers";
import portfolioNFTArtifact from '../../artifacts/contracts/PortfolioNFT.sol/BiP.json';
import UserNFTCard from "./UserNFTCard";

const UserNFTPortfolio = ({showPortfolio, setShowPortfolio}) => {

    const provider = useProvider();
    const account = useAccount();

    const [tokenIDs, setTokenIDs] = useState([])
    const [tokenIDsLoading, setTokenIDsLoading] = useState(true)

    const [mintedMetaData, setMintedMetadata] = useState([])
    const [mintedMetadataLoading, setMintedMetadataLoading] = useState(true)

    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleNextSelect = () => {

        if(selectedIndex >= tokenIDs.length - 1){
            const descriptionCard = document.getElementById(`nft-description-card-${selectedIndex}`);
            const imageCard = document.getElementById(`nft-image-container-${selectedIndex}`);
            descriptionCard.classList.remove('show');
            imageCard.classList.remove('show');
            const nextDescriptionCard = document.getElementById(`nft-description-card-${0}`);
            const nextImageCard = document.getElementById(`nft-image-container-${0}`);
            nextDescriptionCard.classList.add('show');
            nextImageCard.classList.add('show');
            setSelectedIndex(0)
        } else {
            const descriptionCard = document.getElementById(`nft-description-card-${selectedIndex}`);
            const imageCard = document.getElementById(`nft-image-container-${selectedIndex}`);
            descriptionCard.classList.remove('show');
            imageCard.classList.remove('show');
            const nextDescriptionCard = document.getElementById(`nft-description-card-${selectedIndex + 1}`);
            const nextImageCard = document.getElementById(`nft-image-container-${selectedIndex + 1}`);
            nextDescriptionCard.classList.add('show');
            nextImageCard.classList.add('show');
            setSelectedIndex(selectedIndex + 1)
        }
    }

    const handlePrevSelect = () => {
        if(selectedIndex <= 0){
            const descriptionCard = document.getElementById(`nft-description-card-${selectedIndex}`);
            const imageCard = document.getElementById(`nft-image-container-${selectedIndex}`);
            descriptionCard.classList.remove('show');
            imageCard.classList.remove('show');
            const nextDescriptionCard = document.getElementById(`nft-description-card-${tokenIDs.length - 1}`);
            const nextImageCard = document.getElementById(`nft-image-container-${tokenIDs.length - 1}`);
            nextDescriptionCard.classList.add('show');
            nextImageCard.classList.add('show');
            setSelectedIndex(tokenIDs.length - 1)
        } else {
            const descriptionCard = document.getElementById(`nft-description-card-${selectedIndex}`);
            const imageCard = document.getElementById(`nft-image-container-${selectedIndex}`);
            descriptionCard.classList.remove('show');
            imageCard.classList.remove('show');
            const nextDescriptionCard = document.getElementById(`nft-description-card-${selectedIndex - 1}`);
            const nextImageCard = document.getElementById(`nft-image-container-${selectedIndex - 1}`);
            nextDescriptionCard.classList.add('show');
            nextImageCard.classList.add('show');
            setSelectedIndex(selectedIndex - 1)
        }
    }

    // fetches the actual ipfs data
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

    // load the uri of the ipfs metadata for each token in the collection
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

    // load which nfts the wallet has
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

    useEffect(() => {
        loadNFTPortfolioMetaData().then(() => {
            const descriptionCard = document.getElementById(`nft-description-card-0`);
            const imageCard = document.getElementById(`nft-image-container-0`);
            if (descriptionCard && imageCard) {
                descriptionCard.classList.add('show');
                imageCard.classList.add('show');
            }
        });
    }, [tokenIDsLoading]);

    return(
        <div className="user-nft-portfolio-container">
            <h1 className="user-nft-portfolio-title">Your Boxers in Predicaments</h1>
            <button onClick={() => setShowPortfolio(false)} className="close-portfolio-button">
                <h1 className="user-nft-portfolio-x">✕</h1>
            </button>
            <ul className="user-nft-portfolio-list">
                {   
                    mintedMetadataLoading === false &&
                    mintedMetaData.map((metadata, index) => (
                        <li key={metadata.image} className="user-nft-portfolio-item">
                            <UserNFTCard metadata={metadata} tokenID={tokenIDs[index]}/>
                        </li>
                    ))
                }
            </ul>
            <div className="select-nft-row">
                <button 
                className="select-prev"
                onClick={() => handlePrevSelect()}
                >
                    <h1>{'<'}</h1>
                </button>
                <button 
                className="select-next"
                onClick={() => handleNextSelect()}
                >
                    <h1>{'>'}</h1>
                </button>
            </div>
        </div>
    )
}

export default UserNFTPortfolio