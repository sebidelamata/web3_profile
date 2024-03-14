import { useState } from "react"
import { useProvider, useAccount } from "../EthersProvider";
import Navbar from "../components/Navbar"
import { ethers } from "ethers";
import portfolioNFTArtifact from '../../artifacts/contracts/PortfolioNFT.sol/MERNS.json';

const Mint = () => {
    
    const [minted, setMinted] = useState(null);
    const [loading, setLoading] = useState(false);

    const provider = useProvider();
    const account = useAccount();

    const mintNFT = async () => {
        try{
            setLoading(true)
            const signer = await provider.getSigner()
            console.log(signer.address)
            const contractAddress = '0x61989B222F0B93796E5c5f21CC44d95CAADe1B16'
            const contractABI = portfolioNFTArtifact.abi
            console.log(contractABI)
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

    return(
        <>
            <Navbar></Navbar>
            <div>Mint not implemented</div>
            <button onClick={mintNFT}>
                {loading ? "Minting..." : "Mint NFT"}
            </button>
            {console.log(minted)}
        </>
    )
}

export default Mint