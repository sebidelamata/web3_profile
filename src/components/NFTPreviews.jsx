import { useEffect, useState } from "react";
import { useProvider, useAccount } from "../EthersProvider";
import { ethers } from "ethers";
import portfolioNFTArtifact from '../../artifacts/contracts/PortfolioNFT.sol/BiP.json';


const NFTPreviews = () => {

    const provider = useProvider();
    const account = useAccount();

    const [maxSupply, setMaxSupply] = useState(null)
    const [randomIndexArray, setRandomIndexArray] = useState([])

    const [randomMetadata, setRandomMetadata] = useState([])
    const [randomMetadataLoading, setRandomMetadataLoading] = useState(false)

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
            let localArray = [];
            for (let i = 0; i < 3; i++) {
                let randomNumber = Math.floor(Math.random() * maxSupply);
                if(localArray.includes(randomNumber)) {
                    randomNumber = Math.floor(Math.random() * maxSupply);
                }
                localArray.push(randomNumber);
            }
            setRandomIndexArray(localArray);
        }
    };

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
    const loadRandomMetaData = async () => {

        setRandomMetadataLoading(true)
        let metadataArray = []
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
    
    console.log(maxSupply)
    console.log(randomMetadata)
    return(
        <div className="nft-previews">
            nft previews
        </div>
    )
}

export default NFTPreviews