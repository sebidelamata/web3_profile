// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MERNS is ERC721, Pausable, Ownable, ERC721URIStorage {

    constructor(address initialOwner) 
        ERC721("Sebi's MERNS Monsters", "MERNS")
        Ownable(initialOwner)
        {}

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    uint256 private _tokenIdCounter;

    function safeMint(address _receiver, string memory _tokenURI) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(_receiver, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        _tokenIdCounter += 1;
    }

    function totalSupply() public view returns (uint256){
        return _tokenIdCounter;
    }
}