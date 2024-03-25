import Loading from "./Loading"
import React, { useState } from "react"

interface Metadata {
    name: string;
    image: string;
}

interface NFTPreviewsCardProps {
    metadata: Metadata;
}

const NFTPreviewsCard: React.FC<NFTPreviewsCardProps>  = ({metadata}) => {

    const [imageLoading, setImageLoading] = useState<boolean>(true)


    const handleImageLoad = () => {
        setImageLoading(false)
    }


    return(
        <div className="nft-previews-card">
            {
                imageLoading === true &&
                <Loading/>
            }
            <h3 className="nft-previews-card-name">
                <strong>{metadata.name}</strong>
            </h3>
            <img 
            src={metadata.image} 
            alt={metadata.name} 
            onLoad={handleImageLoad}
            style={{ display: imageLoading ? 'none' : 'grid' }}
            className="nft-previews-card-image"
            />
        </div>
    )
}

export default NFTPreviewsCard