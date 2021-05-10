require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

const privateKey= fs.readFileSync(".secret").toString().trim();

module.exports = {
  plugins:[
  'truffle-plugin-verify'
],
api_keys:{
bscscan:'I1M9YW6ISWUGEA5TB19WPZY768EI8BZES3',
},
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      provider: () => new HDWalletProvider(privateKey, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(privateKey, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
version:"^0.8.0",
    }
  }
}
