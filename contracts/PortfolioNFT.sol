// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract MERNS is ERC721, Pausable {

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() ERC721("Sebi's MERNS Monsters", "MERNS") {
        owner = msg.sender;
    }

    uint256 private _tokenIdCounter;

    function safeMint(address _receiver) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(_receiver, tokenId);
        _tokenIdCounter += 1;
    }

    function totalSupply() public view returns (uint256){
        return _tokenIdCounter;
    }
}