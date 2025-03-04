const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      provider: () => new HDWalletProvider(
        'glide deny couple frequent bike ready income outside grace melt large old', // جایگزین کنید با mnemonic خود
        'http://172.16.22.120:9545' // جایگزین کنید با URL مورد نظر
      ),
      network_id: '*', // شبکه با هر ID
      gas: 8000000, // مقدار گاز کافی
      gasPrice: 20000000000, // قیمت گاز مناسب
    },
  },
  compilers: {
    solc: {
      version: "0.8.20", // نسخه Solidity
      evmVersion: "london"
    }
  }
}
