// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract BiP is ERC721, Pausable, Ownable, ERC721URIStorage {

    uint256 public maxSupply;
    uint256 public totalSupply;
    uint256 public maxPerWallet;
    string public baseTokenUriString;
    address payable public withdrawWallet;
    mapping (address => uint256) public walletMints;
    mapping (address => uint256[]) private walletTokenIDs;


    constructor(address initialOwner) payable
        ERC721("Boxers in Predicaments", "BiP")
        Ownable(initialOwner)
        {
            totalSupply = 0;
            maxSupply = 138;
            maxPerWallet = 2;
        }

    //

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function setBaseTokenUri(string calldata _baseURI) external onlyOwner{
        baseTokenUriString = _baseURI;
    }

    function tokenURI(uint256 _tokenID) public view override(ERC721, ERC721URIStorage) returns (string memory){
        require(_tokenID <= totalSupply, "Token does not exist");
        return string(abi.encodePacked(baseTokenUriString, Strings.toString(_tokenID), ".json"));
    }

    function withdraw() external onlyOwner{
        (bool success,) = withdrawWallet.call{value: address(this).balance }('');
        require(success, 'withdraw failed');
    }

    function safeMint(address _receiver) public whenNotPaused{
        require(totalSupply < maxSupply);
        require(walletMints[msg.sender] < maxPerWallet, "Already minted max per wallet");
        uint256 tokenId = totalSupply;
        walletMints[msg.sender]++;
        walletTokenIDs[msg.sender].push(tokenId);
        totalSupply++;
        _safeMint(_receiver, tokenId);
        tokenURI(tokenId);
    }

    function getTotalSupply() public view returns (uint256){
        return totalSupply;
    }

    function getWalletMints(address wallet) external view returns (uint256){
        return walletMints[wallet];
    }

    function getWalletTokenIDs(address wallet) external view returns (uint256[] memory) {
        return walletTokenIDs[wallet];
    }

    function getBaseURI() public view returns (string memory){
        return baseTokenUriString;
    }
}