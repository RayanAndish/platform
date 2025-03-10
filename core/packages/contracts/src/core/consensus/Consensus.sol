pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "../permission/AccControl.sol"; // اتصال به قرارداد AccControl برای مدیریت نقش‌ها
import "../security/CustomHash.sol"; // اتصال به تابع هش اختصاصی

/**
 * @title Consensus
 * @dev مدیریت مکانیزم اجماع با ترکیب PoA + dPoS + PoP + AI
 */
contract Consensus is Ownable2Step {
    AccControl public accControl; // متغیر عمومی برای نگهداری آدرس قرارداد AccControl
    CustomHash public hasher; // متغیر عمومی برای نگهداری آدرس قرارداد تابع هش

    // ساختار Validator شامل آدرس، مقدار استیک، اعتبار، تعداد مشارکت و وضعیت فعال بودن
    struct Validator {
        address validatorAddress;
        uint256 stake;
        uint256 reputation;
        uint256 participationCount;
        bool isActive;
    }

    // نگاشت برای ذخیره Validatorها
    mapping(address => Validator) public validators;
    address[] public validatorList; // لیست آدرس‌های Validatorها
    uint256 public requiredReputation = 10; // اعتبار مورد نیاز برای Validatorها
    uint256 public minParticipation = 5; // حداقل تعداد مشارکت برای حفظ اعتبار

    // رویدادها برای ثبت تغییرات در قرارداد
    event ValidatorAdded(address indexed validator, uint256 stake);
    event ValidatorRemoved(address indexed validator);
    event TransactionValidated(address indexed validator, bytes32 transactionHash);
    event ReputationUpdated(address indexed validator, uint256 newReputation);

    /**
     * @dev سازنده قرارداد
     * @param _accControl آدرس قرارداد AccControl
     * @param _hasher آدرس قرارداد تابع هش
     * @param initialOwner آدرس مالک اولیه
     */
    constructor(address _accControl, address _hasher, address initialOwner) {
        require(_accControl != address(0), "Invalid AccControl address");
        require(_hasher != address(0), "Invalid CustomHash address");
        require(initialOwner != address(0), "Invalid owner address");
        
        _transferOwnership(initialOwner);
        accControl = AccControl(_accControl);
        hasher = CustomHash(_hasher);
    }

    /**
     * @dev Modifier برای اطمینان از اینکه تنها Validatorهای فعال می‌توانند عمل انجام دهند
     */
    modifier onlyValidator() {
        require(validators[msg.sender].isActive, "Only active validators can perform this action");
        require(validators[msg.sender].reputation >= requiredReputation, "Validator reputation too low");
        _;
    }

    /**
     * @dev افزودن Validator جدید به قرارداد
     * @param validatorAddress آدرس Validator جدید
     * @param stake مقدار استیک Validator
     */
    function addValidator(address validatorAddress, uint256 stake) external onlyOwner {
        require(validatorAddress != address(0), "Invalid validator address");
        require(!validators[validatorAddress].isActive, "Validator already exists");
        validators[validatorAddress] = Validator(validatorAddress, stake, 10, 0, true);
        validatorList.push(validatorAddress);
        emit ValidatorAdded(validatorAddress, stake);
    }

    /**
     * @dev حذف Validator موجود از قرارداد
     * @param validatorAddress آدرس Validator
     */
    function removeValidator(address validatorAddress) external onlyOwner {
        require(validatorAddress != address(0), "Invalid validator address");
        require(validators[validatorAddress].isActive, "Validator not found");
        validators[validatorAddress].isActive = false;
        emit ValidatorRemoved(validatorAddress);
    }

    /**
     * @dev تایید تراکنش توسط Validator
     * @param transactionHash هش تراکنش
     */
    function validateTransaction(bytes32 transactionHash) external onlyValidator {
        require(transactionHash != bytes32(0), "Invalid transaction hash");
        validators[msg.sender].participationCount++;
        adjustReputation(msg.sender, true);
        emit TransactionValidated(msg.sender, transactionHash);
    }

    /**
     * @dev تنظیم اعتبار Validator بر اساس مشارکت
     * @param validator آدرس Validator
     * @param participated وضعیت مشارکت Validator
     */
    function adjustReputation(address validator, bool participated) internal {
        require(validator != address(0), "Invalid validator address");
        if (participated) {
            validators[validator].reputation += 2;
        } else if (validators[validator].participationCount < minParticipation) {
            validators[validator].reputation = validators[validator].reputation > 0 ? validators[validator].reputation - 1 : 0;
        }
        emit ReputationUpdated(validator, validators[validator].reputation);
    }
}