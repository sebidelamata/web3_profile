import React, { useEffect, useState } from "react";
import { useProvider, useAccount } from "../EthersProvider";
import { ethers } from "ethers";
import portfolioNFTArtifact from '../../artifacts/contracts/PortfolioNFT.sol/BiP.json';
import NFTPreviewsCard from "./NFTPreviewsCard";

interface Metadata {
    name: string;
    image: string;
}


const NFTPreviews: React.FC = () => {

    const provider = useProvider();
    const account = useAccount();

    const [maxSupply, setMaxSupply] = useState<number | null>(null)
    const [randomIndexArray, setRandomIndexArray] = useState<number[]>([])

    const [randomMetadata, setRandomMetadata] = useState<Metadata[]>([])
    const [randomMetadataLoading, setRandomMetadataLoading] = useState<boolean>(false)

    const loadMaxSupply = async () => {
        try{
            const signer = await provider.getSigner()
            const contractAddress = import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS
            const contractABI = portfolioNFTArtifact.abi
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const _maxSupply = await contract.maxSupply();
            setMaxSupply(parseInt(await _maxSupply))
            
        } catch(err){
            console.log(err)
        }
    }


    const createRandomIndexArray = () => {
        if(maxSupply !== null){
            let localArray: number[] = [];
            for (let i = 0; i < 6; i++) {
                let randomNumber = Math.floor(Math.random() * maxSupply);
                while(localArray.includes(randomNumber)) {
                    randomNumber = Math.floor(Math.random() * maxSupply);
                }
                localArray.push(randomNumber);
            }
            setRandomIndexArray(localArray);
        }
    };

    // fetches the actual ipfs data
    const fetchMetaData = async (uri: string): Promise<Metadata> => {
        try{
            let response = await fetch(uri)
            if (!response.ok) {
                throw new Error('Network response was not ok');
                }
            const metadata: Metadata = await response.json()
            return metadata
        } catch(err){
            console.log(err)
            throw err
        }
    }

    // load the uri of the ipfs metadata for each token in the collection
    const loadRandomMetaData = async () => {

        setRandomMetadataLoading(true)
        let metadataArray: Metadata[] = []
        for(let id of randomIndexArray){
            try{
                const uri = `${import.meta.env.VITE_IPFS_METADATA_BASE_URI}${id}.json`
                const metadata = await fetchMetaData( uri)
                metadataArray.push(metadata)
            } catch(err) {
                console.log(err)
            }
        }
        setRandomMetadata(metadataArray)
        setRandomMetadataLoading(false)
    }

    useEffect(() => {
        loadMaxSupply()
    }, [provider, account]);

    useEffect(() => {
        createRandomIndexArray();
    }, [maxSupply]);

    useEffect(() => {
        loadRandomMetaData()
    }, [randomIndexArray])
    
    return(
        <div className="nft-previews-container">
            <ul className="nft-previews-list">
                {
                    randomMetadata &&
                    randomMetadata.map((metadata, index) => (
                        <li key={metadata.image} className="nft-previews-card" id={`nft-previews-card-${index}`}>
                            <NFTPreviewsCard metadata={metadata}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default NFTPreviews