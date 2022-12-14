// we could technically use the standalone "ethers" package,
// but hardhat also has its' own ethers module which
// makes it much easier to work with hardhat and ethers together
// then, we also don't need to import ethers from hardhat, because hardhat-toolbox already includes that
// const hre = require("hardhat");

async function main() {
  // "await" is needed here because the program will need to read the abi and bin file of the contract
  const SimpleStorageFactory = await hre.ethers.getContractFactory(
    "SimpleStorage"
  );

  console.log("Deploying Contract...");
  // the network and private key will be provided from hardhat by default
  // we can change this setting in the hardhat.config.js file
  const simpleStorage = await SimpleStorageFactory.deploy();
  // waiting for the confirmation of deployment transaction
  await simpleStorage.deployed();
  console.log(`Contract Address: ${simpleStorage.address}`);

  // verify the contract only if the contract is NOT deployed in a local blockchain network
  // in this case, we are only verifying if the network deployed in, is goerli testnet
  if (hre.network.config.chainId == 5) {
    // but firstly, it is recommended to have a few block confirmations before verifying
    console.log("Waiting for block confirmation...");
    await simpleStorage.deployTransaction.wait(5);
    // calling the verify function with the contract address and an empty constructor parameter list (because we dont need it right now)
    console.log("Verifying the contract...");
    await verify(simpleStorage.address, []);
  }

  // interacting with the contract
  console.log("\nFetching data from the blockchain...");
  const currentNum = await simpleStorage.retrieve();
  console.log(`Current number is: ${currentNum}`);
  // changing the state of the blockchain by changing the value of a variable
  console.log("Making a transaction in the blockchain...");
  const trnxResponse = await simpleStorage.store("15");
  await trnxResponse.wait(1);
  const newNum = await simpleStorage.retrieve();
  console.log(`New number is: ${newNum}`);
}

async function verify(contractAddress, args) {
  // we should put the code inside "try-catch" block because, if the contract is already
  // verified on etherscan, this "run" function will return an error (which we need to handle)
  try {
    // we need "hre.run" for programatically running any TASK of HARDHAT
    // "verify:verify" is a subtask, and the "verify" task takes 2 parameters
    // -> the contract address  |  -> the constructor arguments for the contract
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Contract already verified!");
    } else {
      console.log(e);
    }
  }
}

// hardhat recommends this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((err) => {
  console.log(err);
  process.exit(1);
});
