// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol"; // اتصال به قرارداد Ownable از OpenZeppelin
import "../token/Token.sol"; // اتصال به قرارداد Token برای مدیریت توکن‌ها
import "../permission/AccControl.sol"; // اتصال به قرارداد AccControl برای مدیریت نقش‌ها
import "../security/CustomHash.sol"; // اتصال به قرارداد CustomHash برای هش کردن اطلاعات

/**
 * @title Payments
 * @dev مدیریت پرداخت‌ها و تراکنش‌های مالی در شبکه DAO-VC
 */
contract Payments is Ownable {
    Token public token; // متغیر عمومی برای نگهداری آدرس قرارداد توکن
    AccControl public accControl; // متغیر عمومی برای نگهداری آدرس قرارداد AccControl
    CustomHash public hasher; // متغیر عمومی برای نگهداری آدرس قرارداد تابع هش

    // نگاشت برای پیگیری هش تراکنش‌ها به منظور جلوگیری از تراکنش‌های تکراری
    mapping(bytes32 => bool) public transactionHashes;

    // رویدادها برای ثبت تغییرات در قرارداد
    event PaymentTransferred(address indexed from, address indexed to, uint256 amount, bytes32 hash);
    event FundsWithdrawn(address indexed user, uint256 amount, bytes32 hash);

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
     * @dev Modifier برای اطمینان از اینکه تنها اعضای مجاز می‌توانند عمل انجام دهند
     */
    modifier onlyAuthorized() {
        require(accControl.isDAONode(msg.sender) || accControl.isValidator(msg.sender), "Unauthorized action");
        _;
    }

    /**
     * @dev انتقال پرداخت از یک آدرس به آدرس دیگر
     * @param to آدرس گیرنده
     * @param amount مقدار توکن‌های انتقالی
     */
    function transferPayment(address to, uint256 amount) external onlyAuthorized {
        require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");
        bytes32 paymentHash = hasher.customHash(abi.encodePacked(msg.sender, to, amount, block.timestamp), keccak256(abi.encodePacked("payment")));
        require(!transactionHashes[paymentHash], "Duplicate transaction detected");

        token.transferFrom(msg.sender, to, amount);
        transactionHashes[paymentHash] = true;

        emit PaymentTransferred(msg.sender, to, amount, paymentHash);
    }

    /**
     * @dev برداشت وجه از قرارداد
     * @param amount مقدار توکن‌های برداشتی
     */
    function withdrawFunds(uint256 amount) external onlyAuthorized {
        require(token.balanceOf(address(this)) >= amount, "Insufficient contract balance");
        bytes32 withdrawHash = hasher.customHash(abi.encodePacked(msg.sender, amount, block.timestamp), keccak256(abi.encodePacked("withdraw")));
        require(!transactionHashes[withdrawHash], "Duplicate withdrawal detected");

        token.transfer(msg.sender, amount);
        transactionHashes[withdrawHash] = true;

        emit FundsWithdrawn(msg.sender, amount, withdrawHash);
    }
}