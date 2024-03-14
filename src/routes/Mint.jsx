import { useState } from "react"
import { useProvider, useAccount } from "../EthersProvider";
import Navbar from "../components/Navbar"
import { min } from "bn.js";

const Mint = () => {
    
    const [minted, setMinted] = useState(false);
    const [loading, setLoading] = useState(false);

    const provider = useProvider();
    const account = useAccount();

    const mintNFT = async () => {
        try{
            setLoading(true)
            const signer = await provider.getSigner()
            console.log(signer)


        } catch(err) {
            console.log(err)
        } finally {
            console.log('tada')
        }
    }

    return(
        <>
            <Navbar></Navbar>
            <div>Mint not implemented</div>
            <button onClick={mintNFT}>Mint</button>
        </>
    )
}

export default Mint