import React from "react"

interface Attribute {
    trait_type: string;
    value: string;
  }
  
  interface Metadata {
    name: string;
    image: string;
    description: string;
    attributes: Attribute[];
  }
  
  interface UserNFTCardProps {
    metadata: Metadata;
    tokenID: number;
    index: number;
  }

const UserNFTCard: React.FC<UserNFTCardProps> = ({metadata, tokenID, index}) => {
    
    return(
        <div className="user-nft-card" id={`user-nft-card-${index}`}>
            <div className="nft-image-container" id={`nft-image-container-${index}`}>
                <h2 className="nft-title">
                    {metadata.name}
                </h2>
                <img className="nft-image" src={metadata.image} alt={metadata.description} />
                <ul className="nft-links-list">
                    <li className="arbiscan-link">
                        <a 
                        href={`https://sepolia.arbiscan.io/token/${import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS}?a=${tokenID}`}
                        target="_blank"
                        >
                            <img 
                            src="https://sepolia.arbiscan.io/images/logo-Arbiscan.svg" 
                            alt="Arbiscan Logo" 
                            className="arbiscan-logo"
                            />
                        </a>
                    </li>
                    <li className="open-sea-link">
                        <a 
                        href={`https://testnets.opensea.io/assets/arbitrum-sepolia/${import.meta.env.VITE_TESTNET_CONTRACT_ADDRESS}/${tokenID}`}
                        target="_blank"
                        >
                            <img 
                            src="https://opensea.io/static/images/logos/opensea-logo.svg" 
                            alt="OpenSea Logo"
                            className="opensea-logo" />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="nft-description-and-attributes" id={`nft-description-card-${index}`}>
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