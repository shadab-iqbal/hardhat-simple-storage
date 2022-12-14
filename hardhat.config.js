// the following line imports hardhat- {ethers, ether-scan, gas-reporter}, solidity-coverage, typechain-hardhat
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // version of the solidity with which the contract will be compiled
  solidity: "0.8.17",
  // default is hardhat temporary network,
  // we can also deploy the contract in any other network defined below
  networks: {
    goerli: {
      url: process.env.GOERLI_RPC_URL, // the url to connect to the "node as a service" provided by alchemy
      accounts: [process.env.GOERLI_PRIVATE_KEY], // this is found from metamask wallet account
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: hardhat provides accounts by itself
      chainId: 31337,
    },
  },
  // to verify the contract on etherscan, we need this api key
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  // gasReporter is used to calculate the gas fees our contract is consuming
  gasReporter: {
    enabled: true, // if gasReport will be enabled or not
    outputFile: "gas-report.txt", // the file where the report will be generated
    noColors: true, // this is set to output plain text in output file
    currency: "usd", // the currency in which the price will be shown
    coinmarketcap: process.env.COINMARKETCAP_API_KEY, // where to get the conversion rate from
    token: "MATIC", // to test what will be the price if deployed on polygon instead of ethereum
  },
};
