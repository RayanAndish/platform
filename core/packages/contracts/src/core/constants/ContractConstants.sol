// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ContractConstants
 * @dev کتابخانه ثابت‌های مورد نیاز قراردادها
 */
library ContractConstants {
    // نقش‌های سیستم
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");
    bytes32 public constant INVESTOR_ROLE = keccak256("INVESTOR_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");

    // وضعیت‌های مختلف
    uint8 public constant STATUS_PENDING = 0;
    uint8 public constant STATUS_ACTIVE = 1;
    uint8 public constant STATUS_COMPLETED = 2;
    uint8 public constant STATUS_CANCELLED = 3;
    uint8 public constant STATUS_REJECTED = 4;

    // محدودیت‌های سیستم
    uint256 public constant MAX_UINT = type(uint256).max;
    uint256 public constant PERCENTAGE_BASE = 1000; // برای محاسبه درصدها (0.1%)
    uint256 public constant MAX_DESCRIPTION_LENGTH = 2000;
    uint256 public constant MAX_NAME_LENGTH = 100;
    uint256 public constant MAX_SYMBOL_LENGTH = 10;

    // زمان‌های ثابت
    uint256 public constant ONE_HOUR = 1 hours;
    uint256 public constant ONE_DAY = 1 days;
    uint256 public constant ONE_WEEK = 7 days;
    uint256 public constant ONE_MONTH = 30 days;
    uint256 public constant ONE_YEAR = 365 days;

    // آدرس‌های خاص
    address public constant ZERO_ADDRESS = address(0);
    address public constant DEAD_ADDRESS = 0x000000000000000000000000000000000000dEaD;

    // نام‌های رویدادها
    string public constant EVENT_TRANSFER = "Transfer";
    string public constant EVENT_APPROVAL = "Approval";
    string public constant EVENT_STAKE = "Stake";
    string public constant EVENT_UNSTAKE = "Unstake";
    string public constant EVENT_VOTE = "Vote";
    string public constant EVENT_INVEST = "Invest";

    // پیام‌های خطا
    string public constant ERROR_INVALID_ADDRESS = "Invalid address";
    string public constant ERROR_INVALID_AMOUNT = "Invalid amount";
    string public constant ERROR_INSUFFICIENT_BALANCE = "Insufficient balance";
    string public constant ERROR_UNAUTHORIZED = "Unauthorized";
    string public constant ERROR_INVALID_STATE = "Invalid state";
    string public constant ERROR_EXPIRED = "Expired";
    string public constant ERROR_NOT_STARTED = "Not started";
    string public constant ERROR_ALREADY_EXISTS = "Already exists";
    string public constant ERROR_DOES_NOT_EXIST = "Does not exist";
    string public constant ERROR_LOCKED = "Locked";
} 