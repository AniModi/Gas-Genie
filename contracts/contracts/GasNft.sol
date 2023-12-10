// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract GasNFT is ERC721 {
    uint256 tokenIds;

    constructor() ERC721("GasNFT", "GT") {}

    mapping(uint256 => uint256) public tokenToMaxGas;

    function mint(address to, uint256 gasLimit) external {
        tokenIds++;
        uint256 tokenId = tokenIds;
        _mint(to, tokenId);
        tokenToMaxGas[tokenId] = gasLimit;
    }
}
