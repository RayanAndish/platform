import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-network-helpers';
import '@nomicfoundation/hardhat-verify';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-deploy';
import '@nomicfoundation/hardhat-ethers';
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import * as dotenv from 'dotenv';
import 'solidity-coverage';
import 'solidity-docgen';

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const INFURA_KEY = process.env.INFURA_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.28',
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000,
      },
      outputSelection: {
        '*': {
          '*': ['storageLayout'],
        },
      },
      viaIR: true
    },
  },
  defaultNetwork: 'DAO-VC',
  networks: {
    'DAO-VC': {
      url: 'http://172.16.22.120:9545', // آدرس RPC شبکه
      chainId: 1337, // Chain ID شبکه Ganache
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20
      },
      gas: 3000000, // تنظیم Gas Limit
      gasPrice: 1000000000, // تنظیم Gas Price برای Ganache (1 Gwei)
      hardfork: 'london', // تنظیم Hardfork به London
    },
    // Hardhat local network
    hardhat: {
      chainId: 31337,
      gas: "auto",
      gasPrice: "auto",
      mining: {
        auto: true,
        interval: 5000
      }
    }
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
    alwaysGenerateOverloads: true,
    discriminateTypes: true
  },
  paths: {
    sources: './src',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  mocha: {
    timeout: 90000,
  },
};

export default config;