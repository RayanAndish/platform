// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Migrations - A contract for managing migrations in Truffle
contract Migrations {
    address public owner; // آدرس مالک قرارداد
    uint256 public lastCompletedMigration; // شماره آخرین مهاجرت کامل شده

    /// @dev رویدادها برای دیباگینگ
    event ConstructorCalled(address indexed ownerAddress);
    event SetCompletedCalled(uint256 completed);
    event UpgradeCalled(address newAddress);
    event RestrictedFunctionCalled(address indexed caller);

    /// @notice سازنده برای مقداردهی اولیه مالک قرارداد
    constructor() {
        owner = msg.sender;
        require(owner != address(0), "Error: Owner address cannot be the zero address");
        emit ConstructorCalled(owner); // ارسال رویداد برای نشان دادن اینکه سازنده فراخوانی شده است
    }

    /// @dev Modifier برای محدود کردن دسترسی به مالک
    modifier restricted() {
        require(msg.sender == owner, "Error: This function is restricted to the contract's owner");
        emit RestrictedFunctionCalled(msg.sender);
        _;
    }

    /// @notice تنظیم شماره آخرین مهاجرت کامل شده
    /// @param completed شماره مهاجرت
    function setCompleted(uint256 completed) public restricted {
        lastCompletedMigration = completed;
        emit SetCompletedCalled(completed); // ارسال رویداد برای نشان دادن اینکه تابع فراخوانی شده است
    }

    /// @notice ارتقاء آدرس قرارداد
    /// @param newAddress آدرس قرارداد جدید
    function upgrade(address newAddress) public restricted {
        require(newAddress != address(0), "Error: New address cannot be the zero address");
        Migrations upgraded = Migrations(newAddress);
        upgraded.setCompleted(lastCompletedMigration);
        emit UpgradeCalled(newAddress); // ارسال رویداد برای نشان دادن اینکه تابع فراخوانی شده است
    }
}