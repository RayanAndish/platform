import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-network-helpers';
import '@nomicfoundation/hardhat-verify';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import 'solidity-docgen';
import "@nomiclabs/hardhat-ethers";
import * as dotenv from 'dotenv';

dotenv.config();

const accounts = [
  '0xf9bb86ea36bf79804486ffb9034b77f32f796279219215bba7326f262650197e', // 0xc73a9048bf40235A1BACBB1Bd88670D3272469Dc
  '0x637a6ddf35bebe97bc9cd16f2539632a21a7960c3b434b349bedee150f330db9', // 0x40Ecd8c8Ce840309C9Be4A34DD3BC650F10b0Ec9
  '0x689c3060614881a72eecbc98b5003831a26a8ee07575e7c0a172d0a05b84e998', // 0x5C149A4EF1f5747f4B8Bac70e8f3C2bA425D5CFA
  '0xd1c2e81dbd4f26bebc9d1bd3ccfb53e80b601633a72b9a34650b59d2d19b0eec', // 0x3e707d8465599ecBEc5116Df07377fBcbFf84354
  '0x613397f73605732cf108b38efd5c5cb19f8f49302ce9416edabb054f5ab19617', // 0x053D63286dDBf3b54FacC2a6d35CFc51C7238158
  '0xc3c4677eddd53eae12ae40c4b9a23c96880e546eb989a8af07bf425d140b266a', // 0x74a21b93153489bFC02a04013A46545029bF01dC
  '0xd6c3da9a00659739cd318928f8636a57b916050732b90cc36d2b6fad77089c01', // 0x144e4870DE0dd98bA018590C90183C7D6C8E2d89
  '0x4fa179c8e7f70716fdbed29555111035570c312de2662d9119a66b1817768ee3', // 0xDb1de39FF59A72F19769aded1c8606a45c81b8f5
  '0x79fbca030046435fc71780c81bd0b1238286095d1f0be1c89d75c85f178459b7', // 0x22Ee79B91AB1f5737Ca18b224a4e72fb10b89fb8
  '0xd0d8a122c16173bf079dd397f7b29bd5c9390e30a634e01f3358d34771708822'  // 0x6e1AD975DB65AFA9dc66924D398444f0106Ef01D
];

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
    },
  },
  defaultNetwork: 'DAO-VC',
  networks: {
    'DAO-VC': {
      url: 'http://172.16.22.120:9545', // آدرس RPC شبکه
      chainId: 1337, // Chain ID شبکه Ganache
      accounts, // استفاده از کلیدهای خصوصی حساب‌ها
      gas: 3000000, // تنظیم Gas Limit
      gasPrice: 1000000000, // تنظیم Gas Price برای Ganache (1 Gwei)
      hardfork: 'london', // تنظیم Hardfork به London
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_KEY || '',
    },
  },
  paths: {
    sources: './src',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
    deploy: './deploy',
  },
  mocha: {
    timeout: 90000,
  },
};

export default config;