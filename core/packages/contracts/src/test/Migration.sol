// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.28;

/**
 * @title Migration
 *
 * @dev This file imports contracts from @aragon/osx for testing purposes
 */

/* solhint-disable no-unused-import */

// Deploy Script
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

// Regression Testing
import {DAO} from "@aragon/osx/core/dao/DAO.sol";
import {DAORegistry} from "@aragon/osx/framework/dao/DAORegistry.sol";
import {PluginRepo} from "@aragon/osx/framework/plugin/repo/PluginRepo.sol";
import {PluginRepoRegistry} from "@aragon/osx/framework/plugin/repo/PluginRepoRegistry.sol";
import {ENSSubdomainRegistrar} from "@aragon/osx/framework/utils/ens/ENSSubdomainRegistrar.sol";

// Integration Testing
import {ProxyFactory} from "@aragon/osx-commons-contracts/src/utils/deployment/ProxyFactory.sol";

/* solhint-enable no-unused-import */
