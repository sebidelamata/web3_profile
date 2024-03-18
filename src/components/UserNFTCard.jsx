import { useState, useEffect } from "react"

const UserNFTCard = ({metadata}) => {

    return(
        <div className="user-nft-card">
            <h2 className="nft-title">
                {metadata.name}
            </h2>
            <div className="nft-image-container">
                <img className="nft-image" src={metadata.image} alt={metadata.description} />
            </div>
            <div className="nft-description-and-attributes">
                <h3 className="nft-description">
                    {metadata.description}
                </h3>
                <ul className="nft-attributes-list">
                    {
                        metadata.attributes.map((attribute) => (
                            <li key={attribute.trait_type} className="nft-attribute">
                                <div className="nft-attribute-name">
                                    <strong>{`${attribute.trait_type}:`}</strong>
                                </div>
                                <div className="nft-attribute-value">
                                    {attribute.value}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default UserNFTCard