// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol"; // اتصال به قرارداد Ownable از OpenZeppelin
import "./CustomHash.sol"; // اتصال به تابع هش اختصاصی

/**
 * @title AccControl
 * @dev مدیریت نقش‌ها، نودهای DAO و Validatorها در شبکه DAO-VC
 */
contract AccControl is Ownable {
    CustomHash public hasher; // متغیر عمومی برای نگهداری آدرس قرارداد تابع هش
    
    // تعریف نقش‌های مختلف برای اعضا
    enum Role { Investor, Developer, Auditor, DAO, Validator }
    
    // نگاشت برای ارتباط آدرس اعضا با نقش‌هایشان
    mapping(address => Role) public memberRoles;
    
    // نگاشت برای شناسایی نودهای DAO
    mapping(address => bool) public daoNodes;
    
    // نگاشت برای شناسایی Validatorها
    mapping(address => bool) public validators;
    address[] public validatorAddresses; // لیست آدرس‌های Validatorها
    
    // نگاشت برای نگهداری هش Validatorها
    mapping(address => bytes32) public validatorHashes;

    // رویدادها برای ثبت تغییرات در قرارداد
    event MemberAdded(address indexed member, Role role);
    event MemberRemoved(address indexed member);
    event ValidatorAdded(address indexed validator, bytes32 hash);
    event ValidatorRemoved(address indexed validator);
    event DAONodeAdded(address indexed dao);
    event DAONodeRemoved(address indexed dao);

    /**
     * @dev سازنده قرارداد
     * @param initialOwner آدرس مالک اولیه
     * @param hasherAddress آدرس قرارداد تابع هش
     */
    constructor(address initialOwner, address hasherAddress) Ownable(initialOwner) {
        hasher = CustomHash(hasherAddress); // تنظیم آدرس قرارداد تابع هش
    }

    /**
     * @dev افزودن عضو جدید به قرارداد
     * @param member آدرس عضو جدید
     * @param role نقش عضو جدید
     */
    function addMember(address member, Role role) external onlyOwner {
        require(role != Role.DAO && role != Role.Validator, "Use specific functions for DAO/Validator");
        require(memberRoles[member] == Role(0), "Member already exists");
        memberRoles[member] = role;
        emit MemberAdded(member, role);
    }

    /**
     * @dev حذف عضو موجود از قرارداد
     * @param member آدرس عضو
     */
    function removeMember(address member) external onlyOwner {
        require(memberRoles[member] != Role(0), "Member does not exist");
        delete memberRoles[member];
        emit MemberRemoved(member);
    }

    /**
     * @dev دریافت نقش یک عضو
     * @param member آدرس عضو
     * @return نقش عضو
     */
    function getRole(address member) external view returns (Role) {
        return memberRoles[member];
    }

    /**
     * @dev افزودن نود جدید به DAO
     * @param daoNode آدرس نود DAO جدید
     */
    function addDAONode(address daoNode) external onlyOwner {
        require(!daoNodes[daoNode], "DAO node already exists");
        daoNodes[daoNode] = true;
        memberRoles[daoNode] = Role.DAO;
        emit DAONodeAdded(daoNode);
    }

    /**
     * @dev حذف نود موجود از DAO
     * @param daoNode آدرس نود DAO
     */
    function removeDAONode(address daoNode) external onlyOwner {
        require(daoNodes[daoNode], "DAO node does not exist");
        daoNodes[daoNode] = false;
        delete memberRoles[daoNode];
        emit DAONodeRemoved(daoNode);
    }

    /**
     * @dev افزودن Validator جدید
     * @param validator آدرس Validator جدید
     */
    function addValidator(address validator) external {
        require(daoNodes[msg.sender], "Only DAO nodes can add validators");
        require(!validators[validator], "Validator already exists");
        
        bytes32 hash = hasher.customHash(abi.encodePacked(validator), blockhash(block.number - 1));
        validators[validator] = true;
        validatorHashes[validator] = hash;
        validatorAddresses.push(validator); // افزودن به لیست آدرس‌های Validatorها
        memberRoles[validator] = Role.Validator;
        emit ValidatorAdded(validator, hash);
    }

    /**
     * @dev حذف Validator موجود
     * @param validator آدرس Validator
     */
    function removeValidator(address validator) external {
        require(daoNodes[msg.sender], "Only DAO nodes can remove validators");
        require(validators[validator], "Validator does not exist");
        validators[validator] = false;
        delete memberRoles[validator];
        delete validatorHashes[validator];
        // حذف آدرس Validator از لیست
        for (uint256 i = 0; i < validatorAddresses.length; i++) {
            if (validatorAddresses[i] == validator) {
                validatorAddresses[i] = validatorAddresses[validatorAddresses.length - 1];
                validatorAddresses.pop();
                break;
            }
        }
        emit ValidatorRemoved(validator);
    }

    /**
     * @dev بررسی اینکه آیا یک آدرس نود DAO است یا خیر
     * @param daoNode آدرس نود DAO
     * @return نتیجه بررسی
     */
    function isDAONode(address daoNode) external view returns (bool) {
        return daoNodes[daoNode];
    }

    /**
     * @dev بررسی اینکه آیا یک آدرس Validator است یا خیر
     * @param validator آدرس Validator
     * @return نتیجه بررسی
     */
    function isValidator(address validator) external view returns (bool) {
        return validators[validator];
    }

    /**
     * @dev دریافت تعداد کل اعتبارسنج‌ها
     * @return تعداد اعتبارسنج‌ها
     */
    function validatorCount() external view returns (uint256) {
        return validatorAddresses.length;
    }
}