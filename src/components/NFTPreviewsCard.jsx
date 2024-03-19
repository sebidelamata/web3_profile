const NFTPreviewsCard = ({metadata}) => {
    return(
        <div className="nft-previews-card">
            <h3 className="nft-previews-card-name">
                <strong>{metadata.name}</strong>
            </h3>
            <img src={metadata.image} alt={metadata.name} className="nft-previews-card-image"/>
        </div>
    )
}

export default NFTPreviewsCard