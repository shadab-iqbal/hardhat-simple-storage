# Sample Hardhat Project

Run the following commands in terminal

```
yarn init
yarn add --dev hardhat
yarn hardhat
```

In the hardhat menu, select _"Create Javascript project"_. Then replace the _Lock.sol_ and _deploy.js_ file with your own codes.

After that, compile the code with hardhat

```
yarn hardhat compile
```

add the following script in _package.json_

```
"deploy": "yarn hardhat run scripts/deploy.js --network hardhat"
```

To deploy, run

```
yarn deploy
```

To deploy on a different network, add the network details in the _hardhat.config.js_ file. Say, we want to deploy on goerli testnet. For that we need to use a 'Node as a Service' provider like 'Alchemy', to get the RPC url. And we may use our metamask account's private key for the deployment transaction.

It is also possible to programatically verify a contract on etherscan, using the hardhat plugin known as _hardhat-etherscan_. To do so, etherscan api key is needed to be set in the _hardhat.config.js_ file. And then, write the necessary code in _deploy.js_

The cost for gas can also be calculated using the _hardhat-gas-reporter_. To do so, _hardhat.config.js_ needs to be configured properly and then simply _yarn hardhat test_.
