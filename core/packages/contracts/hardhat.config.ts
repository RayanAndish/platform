import {networkExtensions} from './networks';
import {TestingFork} from './types/hardhat';
import {
  networks as commonNetworkConfigs,
  SupportedNetworks,
  addRpcUrlToNetwork,
} from '@aragon/osx-commons-configs';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-network-helpers';
import '@nomicfoundation/hardhat-verify';
import '@openzeppelin/hardhat-upgrades';
import * as dotenv from 'dotenv';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import {extendEnvironment, HardhatUserConfig, task} from 'hardhat/config';
import type {NetworkUserConfig} from 'hardhat/types';
import 'solidity-coverage';
import 'solidity-docgen';

dotenv.config();

const ETH_KEY = process.env.ETH_KEY;
const accounts = ETH_KEY ? ETH_KEY.split(',') : [];

// check alchemy Api key existence
if (process.env.ALCHEMY_API_KEY) {
  addRpcUrlToNetwork(process.env.ALCHEMY_API_KEY);
} else {
  //throw new Error('ALCHEMY_API_KEY in .env not set');  // حذف یا کامنت کردن
}

// add accounts to network configs
const hardhatNetworks: {[index: string]: NetworkUserConfig} =
  commonNetworkConfigs;
for (const network of Object.keys(hardhatNetworks) as SupportedNetworks[]) {
  if (network === SupportedNetworks.LOCAL) {
    continue;
  }

  if (networkExtensions[network] == undefined) {
    console.log(`WARNING: newtork ${network} is not found in networks.ts file`);
    continue;
  }

  hardhatNetworks[network].accounts = accounts;
  hardhatNetworks[network].deploy = networkExtensions[network].deploy;
}

// Extend HardhatRuntimeEnvironment
extendEnvironment(hre => {
  const testingFork: TestingFork = {
    network: '',
    osxVersion: '',
    activeContracts: {},
  };
  hre.aragonToVerifyContracts = [];
  hre.managementDAOMultisigPluginAddress = ''; // TODO This must be removed after the deploy script got refactored (see https://github.com/aragon/osx/pull/582)
  hre.managementDAOActions = [];
  hre.testingFork = testingFork;
});

const ENABLE_DEPLOY_TEST = process.env.TEST_UPDATE_DEPLOY_SCRIPT !== undefined;

console.log('Is deploy test is enabled: ', ENABLE_DEPLOY_TEST);

// Override the test task so it injects wrapper.
// Note that this also gets injected when running it through coverage.
task('test').setAction(async (args, hre, runSuper) => {
  await hre.run('compile');
  const imp = await import('./test/test-utils/wrapper');

  const wrapper = await imp.Wrapper.create(
    hre.network.name,
    hre.ethers.provider
  );
  hre.wrapper = wrapper;

  await runSuper(args);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
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
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      blockGasLimit: 3000000000, // really high to test some things that are only possible with a higher block gas limit
      gasPrice: 80000000000,
      deploy: ENABLE_DEPLOY_TEST
        ? ['./deploy']
        : ['./deploy/env', './deploy/new', './deploy/verification'],
    },
    localhost: { // اضافه کردن تنظیمات ganache
      url: "http://172.16.22.120:9545",
      chainId: 5777,
      deploy: ENABLE_DEPLOY_TEST
          ? ['./deploy']
          : ['./deploy/env', './deploy/new', './deploy/verification'],
        accounts: accounts // اگر آدرس خصوصی دارید
    },
    ...hardhatNetworks,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: 'USD',
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_KEY || '',
      rinkeby: process.env.ETHERSCAN_KEY || '',
      goerli: process.env.ETHERSCAN_KEY || '',
      sepolia: process.env.ETHERSCAN_KEY || '',
      holesky: process.env.ETHERSCAN_KEY || '',
      polygon: process.env.POLYGONSCAN_KEY || '',
      polygonMumbai: process.env.POLYGONSCAN_KEY || '',
      baseMainnet: process.env.BASESCAN_KEY || '',
      baseGoerli: process.env.BASESCAN_KEY || '',
      baseSepolia: process.env.BASESCAN_KEY || '',
      arbitrumOne: process.env.ARBISCAN_KEY || '',
      arbitrumGoerli: process.env.ARBISCAN_KEY || '',
      arbitrumSepolia: process.env.ARBISCAN_KEY || '',
      modeTestnet: 'modeTestnet',
      modeMainnet: 'modeMainnet',
    },
    customChains: [
      {
        network: 'baseMainnet',
        chainId: 8453,
        urls: {
          apiURL: 'https://api.basescan.org/api',
          browserURL: 'https://basescan.org',
        },
      },
      {
        network: 'baseGoerli',
        chainId: 84531,
        urls: {
          apiURL: 'https://api-goerli.basescan.org/api',
          browserURL: 'https://goerli.basescan.org',
        },
      },
      {
        network: 'baseSepolia',
        chainId: 84532,
        urls: {
          apiURL: 'https://api-sepolia.basescan.org/api',
          browserURL: 'https://sepolia.arbiscan.io',
        },
      },
      {
        network: 'arbitrumSepolia',
        chainId: 421614,
        urls: {
          apiURL: 'https://api-sepolia.arbiscan.io/api',
          browserURL: 'https://sepolia.arbiscan.io',
        },
      },
      {
        network: 'holesky',
        chainId: 17000,
        urls: {
          apiURL: 'https://api-holesky.etherscan.io/api',
          browserURL: 'https://holesky.etherscan.io',
        },
      },
      {
        network: 'modeTestnet',
        chainId: 919,
        urls: {
          apiURL:
            'https://api.routescan.io/v2/network/testnet/evm/919/etherscan',
          browserURL: 'https://testnet.modescan.io',
        },
      },
      {
        network: 'modeMainnet',
        chainId: 34443,
        urls: {
          apiURL:
            'https://api.routescan.io/v2/network/mainnet/evm/34443/etherscan',
          browserURL: 'https://modescan.io',
        },
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    sources: './src',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
    deploy: './deploy',
  },
  docgen: process.env.DOCS ? require('./docs/config.js') : undefined,
  mocha: {
    timeout: 90_000, // 90 seconds // increase the timeout for subdomain validation tests
  },
};

export default config;