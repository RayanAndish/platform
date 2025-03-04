// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol"; // اتصال به قرارداد Ownable از OpenZeppelin
import "./AccControl.sol"; // اتصال به قرارداد AccControl برای مدیریت نقش‌ها
import "./CustomHash.sol"; // اتصال به قرارداد CustomHash برای هش کردن اطلاعات

/**
 * @title ProjectMon
 * @dev نظارت بر پروژه‌ها در شبکه DAO-VC
 */
contract ProjectMon is Ownable {
    AccControl public accControl; // متغیر عمومی برای نگهداری آدرس قرارداد AccControl
    CustomHash public hasher; // متغیر عمومی برای نگهداری آدرس قرارداد تابع هش

    // ساختار Project شامل شناسه، نام، توضیحات، مالک، هش و وضعیت کامل شدن
    struct Project {
        uint256 id;
        string name;
        string description;
        address owner;
        bytes32 hash;
        bool isCompleted;
    }

    uint256 public projectCount; // شمارنده پروژه‌ها
    mapping(uint256 => Project) public projects; // نگاشت برای ذخیره‌سازی پروژه‌ها
    mapping(bytes32 => bool) public projectHashes; // نگاشت برای پیگیری هش پروژه‌ها به منظور جلوگیری از پروژه‌های تکراری

    // رویدادها برای ثبت تغییرات در قرارداد
    event ProjectRegistered(uint256 indexed projectId, string name, address indexed owner, bytes32 hash);
    event ProjectUpdated(uint256 indexed projectId, bool isCompleted, bytes32 hash);

    /**
     * @dev سازنده قرارداد
     * @param initialOwner آدرس مالک اولیه
     * @param _accControl آدرس قرارداد AccControl
     * @param _hasher آدرس قرارداد تابع هش
     */
    constructor(address initialOwner, address _accControl, address _hasher) Ownable(initialOwner) {
        accControl = AccControl(_accControl);
        hasher = CustomHash(_hasher);
    }

    /**
     * @dev Modifier برای اطمینان از اینکه تنها مالک پروژه می‌تواند عمل انجام دهد
     * @param projectId شناسه پروژه
     */
    modifier onlyProjectOwner(uint256 projectId) {
        require(projects[projectId].owner == msg.sender, "Only project owner can update");
        _;
    }

    /**
     * @dev ثبت پروژه جدید
     * @param name نام پروژه
     * @param description توضیحات پروژه
     */
    function registerProject(string memory name, string memory description) external {
        projectCount++;
        bytes32 projectHash = hasher.customHash(abi.encodePacked(name, description, msg.sender, block.timestamp), keccak256(abi.encodePacked("register")));
        require(!projectHashes[projectHash], "Duplicate project detected");

        projects[projectCount] = Project({
            id: projectCount,
            name: name,
            description: description,
            owner: msg.sender,
            hash: projectHash,
            isCompleted: false
        });
        projectHashes[projectHash] = true;

        emit ProjectRegistered(projectCount, name, msg.sender, projectHash);
    }

    /**
     * @dev به‌روزرسانی وضعیت پروژه
     * @param projectId شناسه پروژه
     * @param isCompleted وضعیت کامل شدن پروژه
     */
    function updateProjectStatus(uint256 projectId, bool isCompleted) external onlyProjectOwner(projectId) {
        bytes32 updateHash = hasher.customHash(abi.encodePacked(projectId, isCompleted, block.timestamp), keccak256(abi.encodePacked("update")));
        require(!projectHashes[updateHash], "Duplicate update detected");

        projects[projectId].isCompleted = isCompleted;
        projectHashes[updateHash] = true;

        emit ProjectUpdated(projectId, isCompleted, updateHash);
    }
}