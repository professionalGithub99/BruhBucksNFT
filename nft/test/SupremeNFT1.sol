// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract SupremeNFT is  Ownable,ERC721URIStorage{
  event TokenMinted(uint256 tokenId);
uint256 private tokenId=0;
uint256 private MAX_TOKENS=25;
uint256 private decimals=16;
uint256 private currentPrice=5*(10**uint256(decimals));
uint256 private addition=2*(10**uint256(decimals));
    constructor() ERC721("SupremeNFT", "MNFT") {
    }
 function withdraw() external {
    address _owner = owner();
    payable(_owner).transfer(address(this).balance);
  }
 function purchase(string memory _tokenURI) external payable returns(uint256){
   require(msg.value== currentPrice,"pay more money");
   require(tokenId<MAX_TOKENS,"All bricks have sold out");
   _mint(msg.sender,tokenId);
   _setTokenURI(tokenId, _tokenURI);
   tokenId++;
   currentPrice=currentPrice+addition;
   emit TokenMinted(tokenId);
 return tokenId;
  }
  function getSoldCount() public view returns(uint){
    return tokenId;
  }
  function getCurrentPrice() public view returns(uint){
    return currentPrice;
  }
  function getMaxTokens() public view returns(uint){
    return MAX_TOKENS;
  }
  function mint(address to,uint256 tokenId) public onlyOwner{
      _mint(to,tokenId);
  }
}
