// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.28;

import {PermissionCondition} from "@aragon/osx-commons-contracts/src/permission/condition/PermissionCondition.sol";

/// @notice A mock permission condition that can be set to permit or deny every call.
/// @dev DO NOT USE IN PRODUCTION!
contract PermissionConditionMock is PermissionCondition {
    bool public answer;

    constructor() {
        answer = true;
    }

    function setAnswer(bool _answer) external {
        answer = _answer;
    }

    function isGranted(
        address _where,
        address _who,
        bytes32 _permissionId,
        bytes memory _data
    ) external view returns (bool) {
        (_where, _who, _permissionId, _data);
        return answer;
    }
}
