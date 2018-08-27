// var HDWalletProvider = require("truffle-hdwallet-provider");

// var mnemonic = "board poet army combine upon appear trim area annual vendor degree castle";

// module.exports = {
//   networks: {
//     development: {
//       host: "localhost",
//       port: 8545,
//       network_id: "*" // Match any network id
//     },
//     ropsten: {
//       provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/IL9I5TVUNnwFGCv4Yb6h"),
//       network_id: 3,
//       gas: 1828127,
//       gasPrice: 90000000000
//     }
//   }
// };

module.exports = {
    networks: {
      development: {
        host: "localhost",
        port: 8545,
        network_id: "*" // Match any network id
      }
    },
    compilers: {
      solc: {
        version: "0.4.24"
      }
   }
  }