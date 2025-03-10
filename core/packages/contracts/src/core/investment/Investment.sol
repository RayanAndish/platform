// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol"; // اتصال به قرارداد Ownable از OpenZeppelin
import "../token/Token.sol"; // اتصال به قرارداد Token برای مدیریت توکن‌ها
import "../permission/AccControl.sol"; // اتصال به قرارداد AccControl برای مدیریت نقش‌ها
import "../security/CustomHash.sol"; // اتصال به قرارداد CustomHash برای هش کردن اطلاعات

/**
 * @title Investment
 * @dev مدیریت سرمایه‌گذاری‌ها در شبکه DAO-VC
 */
contract Investment is Ownable {
    Token public token; // متغیر عمومی برای نگهداری آدرس قرارداد توکن
    AccControl public accControl; // متغیر عمومی برای نگهداری آدرس قرارداد AccControl
    CustomHash public hasher; // متغیر عمومی برای نگهداری آدرس قرارداد تابع هش

    // ساختار InvestmentInfo شامل مقدار سرمایه‌گذاری، زمان‌بندی و هش
    struct InvestmentInfo {
        uint256 amount;
        uint256 timestamp;
        bytes32 hash;
    }

    // نگاشت برای ذخیره‌سازی اطلاعات سرمایه‌گذاری‌ها
    mapping(address => InvestmentInfo) public investments;
    // نگاشت برای پیگیری هش تراکنش‌ها به منظور جلوگیری از تراکنش‌های تکراری
    mapping(bytes32 => bool) public transactionHashes;

    // رویدادها برای ثبت تغییرات در قرارداد
    event InvestmentMade(address indexed investor, uint256 amount, bytes32 hash);
    event InvestmentWithdrawn(address indexed investor, uint256 amount, bytes32 hash);

    /**
     * @dev سازنده قرارداد
     * @param initialOwner آدرس مالک اولیه
     * @param _token آدرس قرارداد توکن
     * @param _accControl آدرس قرارداد AccControl
     * @param _hasher آدرس قرارداد تابع هش
     */
    constructor(address initialOwner, address _token, address _accControl, address _hasher) Ownable(initialOwner) {
        token = Token(_token);
        accControl = AccControl(_accControl);
        hasher = CustomHash(_hasher);
    }

    /**
     * @dev Modifier برای اطمینان از اینکه تنها سرمایه‌گذاران می‌توانند عمل انجام دهند
     */
    modifier onlyInvestor() {
        require(accControl.getRole(msg.sender) == AccControl.Role.Investor, "Only investors can perform this action");
        _;
    }

    /**
     * @dev سرمایه‌گذاری توکن‌ها
     * @param amount مقدار توکن‌های سرمایه‌گذاری شده
     */
    function stakeTokens(uint256 amount) external onlyInvestor {
        require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");
        bytes32 stakeHash = hasher.customHash(abi.encodePacked(msg.sender, amount, block.timestamp), keccak256(abi.encodePacked("stake")));
        require(!transactionHashes[stakeHash], "Duplicate transaction detected");

        token.transferFrom(msg.sender, address(this), amount);
        investments[msg.sender] = InvestmentInfo(amount, block.timestamp, stakeHash);
        transactionHashes[stakeHash] = true;

        emit InvestmentMade(msg.sender, amount, stakeHash);
    }

    /**
     * @dev برداشت سرمایه‌گذاری
     */
    function withdrawInvestment() external onlyInvestor {
        InvestmentInfo storage userInvestment = investments[msg.sender];
        require(userInvestment.amount > 0, "No investment found");
        bytes32 withdrawHash = hasher.customHash(abi.encodePacked(msg.sender, userInvestment.amount, block.timestamp), keccak256(abi.encodePacked("withdraw")));
        require(!transactionHashes[withdrawHash], "Duplicate withdrawal detected");

        token.transfer(msg.sender, userInvestment.amount);
        delete investments[msg.sender];
        transactionHashes[withdrawHash] = true;

        emit InvestmentWithdrawn(msg.sender, userInvestment.amount, withdrawHash);
    }
}