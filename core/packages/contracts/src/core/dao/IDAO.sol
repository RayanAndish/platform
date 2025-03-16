// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDAO {
    function ROOT_PERMISSION_ID() external view returns (bytes32);
    function UPGRADE_DAO_PERMISSION_ID() external view returns (bytes32);
    function SET_TRUSTED_FORWARDER_PERMISSION_ID() external view returns (bytes32);
    function SET_METADATA_PERMISSION_ID() external view returns (bytes32);
    function REGISTER_STANDARD_CALLBACK_PERMISSION_ID() external view returns (bytes32);
    function EXECUTE_PERMISSION_ID() external view returns (bytes32);
    
    function grant(address _where, address _who, bytes32 _permissionId) external;
    function revoke(address _where, address _who, bytes32 _permissionId) external;
} 