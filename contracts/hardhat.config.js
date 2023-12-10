require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    lineaGoerli: {
      url: `https://linea-goerli.infura.io/v3/${process.env.KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 8000000000
    },
    base: {
      url: `https://goerli.base.org`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.8.20",
      },
    ]
  },
};
