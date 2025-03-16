// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../permission/AccControl.sol";
import "../security/CustomHash.sol";

/**
 * @title Enhanced Token Contract for DAO-VC Asset Platform
 * @dev Manages tokenization of various assets with dynamic pricing and NFT support
 */
contract Token is ERC20, Ownable2Step, ReentrancyGuard, Pausable {
    using Counters for Counters.Counter;

    // Contracts
    AccControl public accControl;
    CustomHash public hasher;

    // Counters
    Counters.Counter private assetIdCounter;
    Counters.Counter private nftIdCounter;

    // Constants
    uint256 public constant PRICE_PRECISION = 1e18;
    uint256 public constant MIN_LOCK_PERIOD = 30 days;
    uint256 public constant MAX_LOCK_PERIOD = 365 days;

    // Asset Types
    enum AssetType { 
        GOLD,      // Gold
        SILVER,    // Silver
        OIL,       // Oil
        LAND,      // Land
        BUILDING,  // Building
        VEHICLE,   // Vehicle
        OTHER      // Other assets
    }

    // Asset Status
    enum AssetStatus {
        PENDING,    // Waiting for validation
        ACTIVE,     // Active and tokenized
        LOCKED,     // Locked in staking or governance
        LIQUIDATED  // Asset has been liquidated
    }

    // Asset Structure
    struct Asset {
        uint256 id;
        AssetType assetType;
        string metadata;
        uint256 valueInTokens;
        uint256 lastValuation;
        address owner;
        bytes32 hash;
        AssetStatus status;
        uint256 lockPeriod;
        uint256 lockEndTime;
        uint256 collateralRatio;
        bool isNFT;
    }

    // Price Oracle Structure
    struct PriceOracle {
        uint256 lastPrice;
        uint256 lastUpdate;
        uint256 volatility;
        bool isActive;
    }

    // Mappings
    mapping(uint256 => Asset) public assets;
    mapping(address => uint256[]) public ownedAssets;
    mapping(bytes32 => bool) public transactionHashes;
    mapping(AssetType => PriceOracle) public priceOracles;
    mapping(AssetType => uint256) public minCollateralRatio;
    mapping(uint256 => mapping(address => uint256)) public assetShares;

    // Events
    event AssetRegistered(uint256 indexed assetId, AssetType assetType, uint256 valueInTokens, address indexed owner, bytes32 hash);
    event AssetValidated(uint256 indexed assetId, address indexed validator);
    event AssetPriceUpdated(uint256 indexed assetId, uint256 oldValue, uint256 newValue);
    event AssetLocked(uint256 indexed assetId, uint256 lockPeriod, uint256 lockEndTime);
    event AssetUnlocked(uint256 indexed assetId);
    event AssetLiquidated(uint256 indexed assetId, address indexed liquidator);
    event NFTMinted(uint256 indexed assetId, address indexed owner);
    event CollateralRatioUpdated(AssetType indexed assetType, uint256 newRatio);
    event PriceOracleUpdated(AssetType indexed assetType, uint256 price, uint256 volatility);

    /**
     * @dev Constructor
     */
    constructor(
        uint256 initialSupply,
        address initialOwner,
        address _accControl,
        address _hasher
    ) ERC20("Rayan Token", "RYC") {
        require(_accControl != address(0), "Invalid AccControl address");
        require(_hasher != address(0), "Invalid hasher address");
        
        _mint(msg.sender, initialSupply);
        _transferOwnership(initialOwner);
        
        accControl = AccControl(_accControl);
        hasher = CustomHash(_hasher);

        // Initialize minimum collateral ratios
        minCollateralRatio[AssetType.GOLD] = 150;     // 150%
        minCollateralRatio[AssetType.SILVER] = 150;   // 150%
        minCollateralRatio[AssetType.OIL] = 175;      // 175%
        minCollateralRatio[AssetType.LAND] = 125;     // 125%
        minCollateralRatio[AssetType.BUILDING] = 125; // 125%
        minCollateralRatio[AssetType.VEHICLE] = 200;  // 200%
        minCollateralRatio[AssetType.OTHER] = 200;    // 200%
    }

    /**
     * @dev Modifier to ensure caller is DAO
     */
    modifier onlyDAO() {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.Admin, "Only DAO can execute");
        _;
    }

    /**
     * @dev Modifier to ensure caller is Validator
     */
    modifier onlyValidator() {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.Validator, "Only validator can execute");
        _;
    }

    /**
     * @dev Register a new asset
     */
    function registerAsset(
        AssetType assetType,
        string memory metadata,
        uint256 valueInTokens,
        bool isNFT,
        uint256 lockPeriod
    ) external whenNotPaused nonReentrant {
        require(valueInTokens > 0, "Value must be greater than zero");
        require(lockPeriod >= MIN_LOCK_PERIOD && lockPeriod <= MAX_LOCK_PERIOD, "Invalid lock period");

        assetIdCounter.increment();
        uint256 newAssetId = assetIdCounter.current();

        bytes32 assetHash = hasher.customHash(
            abi.encodePacked(metadata, block.timestamp),
            keccak256(abi.encodePacked("registerAsset"))
        );

        require(!transactionHashes[assetHash], "Duplicate transaction");

        assets[newAssetId] = Asset({
            id: newAssetId,
            assetType: assetType,
            metadata: metadata,
            valueInTokens: valueInTokens,
            lastValuation: block.timestamp,
            owner: msg.sender,
            hash: assetHash,
            status: AssetStatus.PENDING,
            lockPeriod: lockPeriod,
            lockEndTime: block.timestamp + lockPeriod,
            collateralRatio: minCollateralRatio[assetType],
            isNFT: isNFT
        });

        ownedAssets[msg.sender].push(newAssetId);
        transactionHashes[assetHash] = true;

        emit AssetRegistered(newAssetId, assetType, valueInTokens, msg.sender, assetHash);
    }

    /**
     * @dev Validate an asset by validator
     */
    function validateAsset(uint256 assetId) external onlyValidator whenNotPaused {
        Asset storage asset = assets[assetId];
        require(asset.status == AssetStatus.PENDING, "Invalid asset status");

        asset.status = AssetStatus.ACTIVE;
        
        if (asset.isNFT) {
            _mintNFT(assetId, asset.owner);
        } else {
            _mint(asset.owner, asset.valueInTokens);
        }

        emit AssetValidated(assetId, msg.sender);
    }

    /**
     * @dev Update asset price by oracle
     */
    function updateAssetPrice(
        uint256 assetId,
        uint256 newValue
    ) external onlyDAO whenNotPaused {
        Asset storage asset = assets[assetId];
        require(asset.status == AssetStatus.ACTIVE, "Asset not active");

        uint256 oldValue = asset.valueInTokens;
        asset.valueInTokens = newValue;
        asset.lastValuation = block.timestamp;

        emit AssetPriceUpdated(assetId, oldValue, newValue);

        // Check if collateral ratio is still maintained
        if (newValue < oldValue) {
            _checkCollateralRatio(assetId);
        }
    }

    /**
     * @dev Lock an asset for staking or governance
     */
    function lockAsset(
        uint256 assetId,
        uint256 lockPeriod
    ) external whenNotPaused nonReentrant {
        require(lockPeriod >= MIN_LOCK_PERIOD && lockPeriod <= MAX_LOCK_PERIOD, "Invalid lock period");
        Asset storage asset = assets[assetId];
        require(asset.owner == msg.sender, "Not asset owner");
        require(asset.status == AssetStatus.ACTIVE, "Asset not active");

        asset.status = AssetStatus.LOCKED;
        asset.lockPeriod = lockPeriod;
        asset.lockEndTime = block.timestamp + lockPeriod;

        emit AssetLocked(assetId, lockPeriod, asset.lockEndTime);
    }

    /**
     * @dev Unlock an asset after lock period
     */
    function unlockAsset(uint256 assetId) external whenNotPaused nonReentrant {
        Asset storage asset = assets[assetId];
        require(asset.owner == msg.sender, "Not asset owner");
        require(asset.status == AssetStatus.LOCKED, "Asset not locked");
        require(block.timestamp >= asset.lockEndTime, "Lock period not ended");

        asset.status = AssetStatus.ACTIVE;
        emit AssetUnlocked(assetId);
    }

    /**
     * @dev Update price oracle for asset type
     */
    function updatePriceOracle(
        AssetType assetType,
        uint256 price,
        uint256 volatility
    ) external onlyDAO {
        priceOracles[assetType] = PriceOracle({
            lastPrice: price,
            lastUpdate: block.timestamp,
            volatility: volatility,
            isActive: true
        });

        emit PriceOracleUpdated(assetType, price, volatility);
    }

    /**
     * @dev Update minimum collateral ratio for asset type
     */
    function updateCollateralRatio(
        AssetType assetType,
        uint256 newRatio
    ) external onlyDAO {
        require(newRatio >= 100, "Invalid ratio");
        minCollateralRatio[assetType] = newRatio;
        emit CollateralRatioUpdated(assetType, newRatio);
    }

    /**
     * @dev Internal function to mint NFT
     */
    function _mintNFT(uint256 assetId, address owner) internal {
        nftIdCounter.increment();
        // NFT minting logic here
        emit NFTMinted(assetId, owner);
    }

    /**
     * @dev Internal function to check collateral ratio
     */
    function _checkCollateralRatio(uint256 assetId) internal {
        Asset storage asset = assets[assetId];
        uint256 requiredCollateral = (asset.valueInTokens * asset.collateralRatio) / 100;
        
        if (balanceOf(asset.owner) < requiredCollateral) {
            asset.status = AssetStatus.LIQUIDATED;
            emit AssetLiquidated(assetId, msg.sender);
        }
    }

    /**
     * @dev Get asset details
     */
    function getAssetDetails(uint256 assetId) external view returns (
        AssetType assetType,
        uint256 valueInTokens,
        address owner,
        AssetStatus status,
        uint256 lockEndTime,
        uint256 collateralRatio,
        bool isNFT
    ) {
        Asset storage asset = assets[assetId];
        return (
            asset.assetType,
            asset.valueInTokens,
            asset.owner,
            asset.status,
            asset.lockEndTime,
            asset.collateralRatio,
            asset.isNFT
        );
    }

    /**
     * @dev Pause contract
     */
    function pause() external onlyDAO {
        _pause();
    }

    /**
     * @dev Unpause contract
     */
    function unpause() external onlyDAO {
        _unpause();
    }
}