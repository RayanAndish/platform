import {networkExtensions} from './networks';
import {TestingFork} from './types/hardhat';
import {
  networks as commonNetworkConfigs,
  SupportedNetworks,
} from '@aragon/osx-commons-configs';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-network-helpers';
import '@nomicfoundation/hardhat-verify';
import '@openzeppelin/hardhat-upgrades';
import * as dotenv from 'dotenv';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import 'solidity-docgen';
import {extendEnvironment, HardhatUserConfig, task} from 'hardhat/config';

dotenv.config();

const accounts = process.env.ETH_KEY ? process.env.ETH_KEY.split(',') : [];

const ENABLE_DEPLOY_TEST = process.env.TEST_UPDATE_DEPLOY_SCRIPT !== undefined;

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
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      blockGasLimit: 3000000000,
      gasPrice: 80000000000,
      deploy: ENABLE_DEPLOY_TEST
        ? ['./deploy']
        : ['./deploy/env', './deploy/new', './deploy/verification'],
    },
    localhost: {
      url: "http://172.16.22.120:9545",
      chainId: 1337,
      deploy: ENABLE_DEPLOY_TEST
        ? ['./deploy']
        : ['./deploy/env', './deploy/new', './deploy/verification'],
      accounts: {
        mnemonic: "hire shove sort rather under deliver myth victory exhaust enable quick bid",
      },
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