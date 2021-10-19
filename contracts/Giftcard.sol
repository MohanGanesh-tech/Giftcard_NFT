pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract Giftcard is ERC721Full {
  string[] public giftcards;
  mapping(string => bool) _giftcardExists;

  struct Giftcardntf {
      uint price;
      uint timestamp;
    }
  mapping(uint => Giftcardntf) giftcardntfs;
  uint[] public giftcardntfid;

  constructor() ERC721Full("Giftcard", "GIFTCARD") public {}

  function mint(string memory _giftcard, uint _price) public {
    require(!_giftcardExists[_giftcard]);
    uint _id = giftcards.push(_giftcard);
    _mint(msg.sender, _id);
    _giftcardExists[_giftcard] = true;

    giftcardntfs[_id] = Giftcardntf(_price, now);
    giftcardntfid.push(_id);
    
  }

  function getGiftcardntf(uint _id) view public returns (uint, uint) {
      return (giftcardntfs[_id].price, giftcardntfs[_id].timestamp);
  }
  
  function buy(uint _id) public returns (address){
    address seller = ownerOf(_id);
    _transferFrom(seller, msg.sender, _id);
    // address payable selleraddress = address(uint160(seller));
    // selleraddress.transfer(price);
    return (seller);
  }

  function getowner(uint _id) view public returns (address) {
    address owner = ownerOf(_id);
    return (owner);
  }
}