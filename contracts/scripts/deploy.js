const { ethers } = require("hardhat")

async function main() {
  const aadharNft = await ethers.deployContract("AadharNFT");
  // const gasNft = await ethers.deployContract("GasNFT", { gasLimit: 1_000_000 });

  console.log('Aadhar deployed to ', aadharNft.target)
  // console.log('Gas deployed to ', gasNft.target)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});