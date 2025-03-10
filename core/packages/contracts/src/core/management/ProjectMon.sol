// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable2Step.sol"; // اتصال به قرارداد Ownable2Step از OpenZeppelin
import "../permission/AccControl.sol"; // اتصال به قرارداد AccControl برای مدیریت نقش‌ها
import "../security/CustomHash.sol"; // اتصال به قرارداد CustomHash برای هش کردن اطلاعات

/**
 * @title ProjectMon
 * @dev مدیریت نظارت بر پروژه‌ها در شبکه DAO-VC
 */
contract ProjectMon is Ownable2Step {
    AccControl public accControl; // متغیر عمومی برای نگهداری آدرس قرارداد AccControl
    CustomHash public hasher; // متغیر عمومی برای نگهداری آدرس قرارداد تابع هش

    // ساختار Project شامل شناسه، عنوان، توضیحات، بودجه، وضعیت و زمان‌ها
    struct Project {
        uint256 id;
        string title;
        string description;
        uint256 budget;
        bool active;
        uint256 startTime;
        uint256 endTime;
        address owner;
        bytes32 hash;
    }

    uint256 public projectCount; // شمارنده تعداد پروژه‌ها
    mapping(uint256 => Project) public projects; // نگاشت برای ذخیره پروژه‌ها
    mapping(bytes32 => bool) public projectHashes; // نگاشت برای پیگیری هش پروژه‌ها

    // رویدادها برای ثبت تغییرات در قرارداد
    event ProjectCreated(uint256 indexed projectId, string title, uint256 budget);
    event ProjectUpdated(uint256 indexed projectId, string title, uint256 budget);
    event ProjectCompleted(uint256 indexed projectId);
    event ProjectRegistered(uint256 indexed projectId, string title, address indexed owner, bytes32 hash);

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
     * @dev Modifier برای اطمینان از اینکه تنها مالک پروژه می‌تواند عمل انجام دهد
     * @param projectId شناسه پروژه
     */
    modifier onlyProjectOwner(uint256 projectId) {
        require(projects[projectId].owner == msg.sender, "Only project owner can update");
        _;
    }

    /**
     * @dev ثبت پروژه جدید
     * @param title عنوان پروژه
     * @param description توضیحات پروژه
     * @param budget بودجه پروژه
     */
    function registerProject(string memory title, string memory description, uint256 budget) external {
        projectCount++;
        bytes32 projectHash = hasher.customHash(abi.encodePacked(title, description, budget, msg.sender, block.timestamp), keccak256(abi.encodePacked("register")));
        require(!projectHashes[projectHash], "Duplicate project detected");

        projects[projectCount] = Project({
            id: projectCount,
            title: title,
            description: description,
            budget: budget,
            active: true,
            startTime: block.timestamp,
            endTime: block.timestamp + 365 days,
            owner: msg.sender,
            hash: projectHash
        });
        projectHashes[projectHash] = true;

        emit ProjectRegistered(projectCount, title, msg.sender, projectHash);
    }

    /**
     * @dev به‌روزرسانی وضعیت پروژه
     * @param projectId شناسه پروژه
     * @param active وضعیت فعال بودن پروژه
     */
    function updateProjectStatus(uint256 projectId, bool active) external onlyProjectOwner(projectId) {
        bytes32 updateHash = hasher.customHash(abi.encodePacked(projectId, active, block.timestamp), keccak256(abi.encodePacked("update")));
        require(!projectHashes[updateHash], "Duplicate update detected");

        projects[projectId].active = active;
        projectHashes[updateHash] = true;

        emit ProjectUpdated(projectId, projects[projectId].title, projects[projectId].budget);
    }
}