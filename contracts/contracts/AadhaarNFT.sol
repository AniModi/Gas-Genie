// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {AadharVerifier} from "./AadharVerifier.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AadharNFT is ERC721, AadharVerifier {
    uint256 tokenIds;
    mapping(address => uint256) public isVerified;

    constructor() ERC721("AadharNFT", "AT") {}

    function mint(
        address to,
        uint[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[34] calldata _pubSignals
    ) external {
        tokenIds++;
        uint256 tokenId = tokenIds;
        _mint(to, tokenId);
    }
}
