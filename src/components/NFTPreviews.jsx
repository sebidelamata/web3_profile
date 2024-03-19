import { useState } from "react";
import { useProvider, useAccount } from "../EthersProvider";


const NFTPreviews = () => {

    const provider = useProvider();
    const account = useAccount();

    const [randomIndexArray, setRandomIndexArray] = useState([])

    const createRandomIndexArray = () => {
        let localArray = []
        // for(let i; i<)
    }

    return(
        <div className="nft-previews">
            nft previews
        </div>
    )
}

export default NFTPreviews