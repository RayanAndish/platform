// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // اتصال به قرارداد ERC20 از OpenZeppelin
import "@openzeppelin/contracts/access/Ownable.sol"; // اتصال به قرارداد Ownable از OpenZeppelin
import "@openzeppelin/contracts/utils/Counters.sol"; // اتصال به کتابخانه Counters از OpenZeppelin
import "../permission/AccControl.sol"; // اتصال به قرارداد AccControl برای مدیریت نقش‌ها
import "../security/CustomHash.sol"; // اتصال به قرارداد CustomHash برای هش کردن اطلاعات

/**
 * @title Token
 * @dev مدیریت توکن و دارایی‌های شبکه DAO-VC
 */
contract Token is ERC20, Ownable {
    using Counters for Counters.Counter; // استفاده از کتابخانه Counters برای شمارش شناسه‌ها

    AccControl public accControl; // متغیر عمومی برای نگهداری آدرس قرارداد AccControl
    CustomHash public hasher; // متغیر عمومی برای نگهداری آدرس قرارداد تابع هش

    // ساختار Asset شامل شناسه، نوع دارایی، متاداده، مقدار توکن، مالک و هش
    struct Asset {
        uint256 id;
        string assetType;
        string metadata;
        uint256 valueInTokens;
        address owner;
        bytes32 hash;
    }

    Counters.Counter private assetIdCounter; // شمارنده شناسه دارایی‌ها
    mapping(uint256 => Asset) public assets; // نگاشت برای ذخیره‌سازی دارایی‌ها
    mapping(address => uint256[]) public ownedAssets; // نگاشت برای ذخیره دارایی‌های متعلق به هر آدرس
    mapping(bytes32 => bool) public transactionHashes; // نگاشت برای پیگیری هش تراکنش‌ها به منظور جلوگیری از تراکنش‌های تکراری

    // رویدادها برای ثبت تغییرات در قرارداد
    event AssetRegistered(uint256 indexed assetId, string assetType, uint256 valueInTokens, address indexed owner, bytes32 hash);
    event AssetTransferred(uint256 indexed assetId, address indexed from, address indexed to, uint256 valueInTokens, bytes32 hash);
    event Tokenized(uint256 indexed assetId, address indexed owner, uint256 valueInTokens, bytes32 hash);

    /**
     * @dev سازنده قرارداد
     * @param initialSupply میزان اولیه توکن‌ها
     * @param initialOwner آدرس مالک اولیه
     * @param _accControl آدرس قرارداد AccControl
     * @param _hasher آدرس قرارداد تابع هش
     */
    constructor(uint256 initialSupply, address initialOwner, address _accControl, address _hasher) 
        ERC20("Rayan Token", "RYC") Ownable(initialOwner) {
        _mint(msg.sender, initialSupply); // ضرب توکن‌های اولیه
        accControl = AccControl(_accControl);
        hasher = CustomHash(_hasher);
    }

    /**
     * @dev Modifier برای اطمینان از اینکه تنها DAO می‌تواند عمل انجام دهد
     */
    modifier onlyDAO() {
        require(accControl.isDAONode(msg.sender), "Only DAO can execute this action");
        _;
    }

    /**
     * @dev ثبت دارایی جدید
     * @param assetType نوع دارایی
     * @param metadata متاداده دارایی
     * @param valueInTokens مقدار توکن‌های دارایی
     */
    function registerAsset(string memory assetType, string memory metadata, uint256 valueInTokens) external {
        require(valueInTokens > 0, "Asset value must be greater than zero");
        assetIdCounter.increment(); // افزایش شمارنده شناسه دارایی‌ها
        uint256 newAssetId = assetIdCounter.current();
        bytes32 assetHash = hasher.customHash(abi.encodePacked(metadata, block.timestamp), keccak256(abi.encodePacked("registerAsset")));

        assets[newAssetId] = Asset({
            id: newAssetId,
            assetType: assetType,
            metadata: metadata,
            valueInTokens: valueInTokens,
            owner: msg.sender,
            hash: assetHash
        });
        ownedAssets[msg.sender].push(newAssetId); // اضافه کردن دارایی به لیست دارایی‌های مالک
        transactionHashes[assetHash] = true; // ذخیره هش تراکنش به منظور جلوگیری از تراکنش‌های تکراری

        emit AssetRegistered(newAssetId, assetType, valueInTokens, msg.sender, assetHash);
    }

    /**
     * @dev انتقال دارایی به آدرس جدید
     * @param assetId شناسه دارایی
     * @param to آدرس گیرنده
     */
    function transferAsset(uint256 assetId, address to) external {
        Asset storage asset = assets[assetId];
        require(asset.owner == msg.sender, "You are not the owner of this asset");
        bytes32 transferHash = hasher.customHash(abi.encodePacked(assetId, msg.sender, to, block.timestamp), keccak256(abi.encodePacked("transferAsset")));

        asset.owner = to; // تغییر مالک دارایی
        ownedAssets[to].push(assetId); // اضافه کردن دارایی به لیست دارایی‌های مالک جدید
        transactionHashes[transferHash] = true; // ذخیره هش تراکنش به منظور جلوگیری از تراکنش‌های تکراری

        emit AssetTransferred(assetId, msg.sender, to, asset.valueInTokens, transferHash);
    }

    /**
     * @dev تبدیل دارایی به توکن
     * @param assetId شناسه دارایی
     */
    function tokenizeAsset(uint256 assetId) external {
        Asset storage asset = assets[assetId];
        require(asset.owner == msg.sender, "You are not the owner of this asset");
        bytes32 tokenizeHash = hasher.customHash(abi.encodePacked(assetId, msg.sender, block.timestamp), keccak256(abi.encodePacked("tokenizeAsset")));

        _mint(msg.sender, asset.valueInTokens); // ضرب توکن‌ها به میزان ارزش دارایی
        delete assets[assetId]; // حذف دارایی از لیست
        transactionHashes[tokenizeHash] = true; // ذخیره هش تراکنش به منظور جلوگیری از تراکنش‌های تکراری

        emit Tokenized(assetId, msg.sender, asset.valueInTokens, tokenizeHash);
    }
}