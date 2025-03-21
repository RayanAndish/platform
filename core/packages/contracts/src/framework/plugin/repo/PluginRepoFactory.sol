// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.28;

import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";

import {PermissionLib} from "@aragon/osx-commons-contracts/src/permission/PermissionLib.sol";
import {IProtocolVersion} from "@aragon/osx-commons-contracts/src/utils/versioning/IProtocolVersion.sol";
import {ProtocolVersion} from "@aragon/osx-commons-contracts/src/utils/versioning/ProtocolVersion.sol";
import {ProxyLib} from "@aragon/osx-commons-contracts/src/utils/deployment/ProxyLib.sol";
import {PluginRepoRegistry} from "./PluginRepoRegistry.sol";
import {PluginRepo} from "./PluginRepo.sol";

/// @title PluginRepoFactory
/// @author Aragon X - 2022-2023
/// @notice This contract creates `PluginRepo` proxies and registers them on a `PluginRepoRegistry` contract.
/// @custom:security-contact sirt@aragon.org
contract PluginRepoFactory is ERC165, ProtocolVersion {
    using ProxyLib for address;

    /// @notice The Aragon plugin registry contract.
    PluginRepoRegistry public pluginRepoRegistry;

    /// @notice The address of the `PluginRepo` base contract to proxy to..
    address public pluginRepoBase;

    /// @notice Initializes the addresses of the Aragon plugin registry and `PluginRepo` base contract to proxy to.
    /// @param _pluginRepoRegistry The aragon plugin registry address.
    constructor(PluginRepoRegistry _pluginRepoRegistry) {
        pluginRepoRegistry = _pluginRepoRegistry;

        pluginRepoBase = address(new PluginRepo());
    }

    /// @notice Checks if this or the parent contract supports an interface by its ID.
    /// @param _interfaceId The ID of the interface.
    /// @return Returns `true` if the interface is supported.
    function supportsInterface(bytes4 _interfaceId) public view virtual override returns (bool) {
        return
            _interfaceId == type(IProtocolVersion).interfaceId ||
            super.supportsInterface(_interfaceId);
    }

    /// @notice Creates a plugin repository proxy pointing to the `pluginRepoBase` implementation and registers it in the Aragon plugin registry.
    /// @param _subdomain The plugin repository subdomain.
    /// @param _initialOwner The plugin maintainer address.
    function createPluginRepo(
        string calldata _subdomain,
        address _initialOwner
    ) external returns (PluginRepo) {
        return _createPluginRepo(_subdomain, _initialOwner);
    }

    /// @notice Creates and registers a `PluginRepo` with an ENS subdomain and publishes an initial version `1.1`.
    /// @param _subdomain The plugin repository subdomain.
    /// @param _pluginSetup The plugin factory contract associated with the plugin version.
    /// @param _maintainer The maintainer of the plugin repo. This address has permission to update metadata, upgrade the repo logic, and manage the repo permissions.
    /// @param _releaseMetadata The release metadata URI.
    /// @param _buildMetadata The build metadata URI.
    /// @dev After the creation of the `PluginRepo` and release of the first version by the factory, ownership is transferred to the `_maintainer` address.
    function createPluginRepoWithFirstVersion(
        string calldata _subdomain,
        address _pluginSetup,
        address _maintainer,
        bytes memory _releaseMetadata,
        bytes memory _buildMetadata
    ) external returns (PluginRepo pluginRepo) {
        // Sets `address(this)` as initial owner which is later replaced with the maintainer address.
        pluginRepo = _createPluginRepo(_subdomain, address(this));

        pluginRepo.createVersion(1, _pluginSetup, _buildMetadata, _releaseMetadata);

        // Setup permissions and transfer ownership from `address(this)` to `_maintainer`.
        _setPluginRepoPermissions(pluginRepo, _maintainer);
    }

    /// @notice Set the final permissions for the published plugin repository maintainer. All permissions are revoked from the plugin factory and granted to the specified plugin maintainer.
    /// @param pluginRepo The plugin repository instance just created.
    /// @param maintainer The plugin maintainer address.
    /// @dev The plugin maintainer is granted the `MAINTAINER_PERMISSION_ID`, `UPGRADE_REPO_PERMISSION_ID`, and `ROOT_PERMISSION_ID`.
    function _setPluginRepoPermissions(PluginRepo pluginRepo, address maintainer) internal {
        // Set permissions on the `PluginRepo`s `PermissionManager`
        PermissionLib.SingleTargetPermission[]
            memory items = new PermissionLib.SingleTargetPermission[](6);

        bytes32 rootPermissionID = pluginRepo.ROOT_PERMISSION_ID();
        bytes32 maintainerPermissionID = pluginRepo.MAINTAINER_PERMISSION_ID();
        bytes32 upgradePermissionID = pluginRepo.UPGRADE_REPO_PERMISSION_ID();

        // Grant the plugin maintainer all the permissions required
        items[0] = PermissionLib.SingleTargetPermission(
            PermissionLib.Operation.Grant,
            maintainer,
            maintainerPermissionID
        );
        items[1] = PermissionLib.SingleTargetPermission(
            PermissionLib.Operation.Grant,
            maintainer,
            upgradePermissionID
        );
        items[2] = PermissionLib.SingleTargetPermission(
            PermissionLib.Operation.Grant,
            maintainer,
            rootPermissionID
        );

        // Revoke permissions from the plugin repository factory (`address(this)`).
        items[3] = PermissionLib.SingleTargetPermission(
            PermissionLib.Operation.Revoke,
            address(this),
            rootPermissionID
        );
        items[4] = PermissionLib.SingleTargetPermission(
            PermissionLib.Operation.Revoke,
            address(this),
            maintainerPermissionID
        );
        items[5] = PermissionLib.SingleTargetPermission(
            PermissionLib.Operation.Revoke,
            address(this),
            upgradePermissionID
        );

        pluginRepo.applySingleTargetPermissions(address(pluginRepo), items);
    }

    /// @notice Internal method creating a `PluginRepo` via the [ERC-1967](https://eips.ethereum.org/EIPS/eip-1967) proxy pattern from the provided base contract and registering it in the Aragon plugin registry.
    /// @dev Passing an empty `_subdomain` will cause the transaction to revert.
    /// @param _subdomain The plugin repository subdomain.
    /// @param _initialOwner The initial owner address.
    function _createPluginRepo(
        string calldata _subdomain,
        address _initialOwner
    ) internal returns (PluginRepo pluginRepo) {
        pluginRepo = PluginRepo(
            pluginRepoBase.deployUUPSProxy(abi.encodeCall(PluginRepo.initialize, (_initialOwner)))
        );

        pluginRepoRegistry.registerPluginRepo(_subdomain, address(pluginRepo));
    }
}
