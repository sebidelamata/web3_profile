import Loading from "./Loading"
import { useState } from "react"

const NFTPreviewsCard = ({metadata}) => {

    const [imageLoading, setImageLoading] = useState(true)


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