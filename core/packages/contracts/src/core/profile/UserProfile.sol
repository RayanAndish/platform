// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../permission/AccControl.sol";

/**
 * @title User Profile Management for DAO-VC Network
 * @dev Manages user profiles, projects, investments, and achievements
 */
contract UserProfile is Ownable2Step, Pausable, ReentrancyGuard {
    AccControl public accControl;

    // Skill Level System
    enum SkillLevel {
        Beginner,       // تازه‌کار
        Intermediate,   // متوسط
        Advanced,       // پیشرفته
        Expert         // خبره
    }

    // Project Status
    enum ProjectStatus {
        Draft,          // پیش‌نویس
        UnderReview,    // در حال بررسی
        Active,         // فعال
        Funded,         // تامین مالی شده
        Completed,      // تکمیل شده
        Cancelled       // لغو شده
    }

    // Investment Status
    enum InvestmentStatus {
        Active,         // فعال
        Withdrawn,      // برداشت شده
        Completed,      // تکمیل شده
        Failed         // شکست خورده
    }

    // User Profile Structure
    struct Profile {
        string name;                    // نام کاربر
        string bio;                     // بیوگرافی
        string[] skills;                // مهارت‌ها
        SkillLevel skillLevel;          // سطح مهارت
        uint256 reputation;             // اعتبار
        uint256 totalInvestments;       // کل سرمایه‌گذاری‌ها
        uint256 successfulProjects;     // پروژه‌های موفق
        uint256 createdAt;              // تاریخ ایجاد
        bool isVerified;                // تایید شده
        mapping(uint256 => bool) badges; // نشان‌ها
    }

    // Project Structure
    struct Project {
        string title;                   // عنوان پروژه
        string description;             // توضیحات
        address owner;                  // مالک
        uint256 fundingGoal;           // هدف تامین مالی
        uint256 currentFunding;         // تامین مالی فعلی
        uint256 startDate;              // تاریخ شروع
        uint256 endDate;                // تاریخ پایان
        ProjectStatus status;           // وضعیت
        string[] tags;                  // برچسب‌ها
        address[] investors;            // سرمایه‌گذاران
        mapping(address => uint256) investments; // مقدار سرمایه‌گذاری هر آدرس
    }

    // Investment Structure
    struct Investment {
        uint256 projectId;              // شناسه پروژه
        uint256 amount;                 // مقدار سرمایه‌گذاری
        uint256 timestamp;              // زمان سرمایه‌گذاری
        InvestmentStatus status;        // وضعیت
        uint256 returnAmount;           // بازگشت سرمایه
    }

    // Achievement Structure
    struct Achievement {
        string title;                   // عنوان دستاورد
        string description;             // توضیحات
        uint256 timestamp;              // زمان کسب
        uint256 value;                  // ارزش
    }

    // State Variables
    mapping(address => Profile) public profiles;
    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) public userProjects;
    mapping(address => Investment[]) public userInvestments;
    mapping(address => Achievement[]) public userAchievements;
    
    uint256 public projectCounter;
    uint256 public constant MAX_PROJECTS_PER_USER = 10;
    uint256 public constant MIN_INVESTMENT_AMOUNT = 100 * 10**18; // 100 tokens

    // Events
    event ProfileCreated(address indexed user, string name, uint256 timestamp);
    event ProfileUpdated(address indexed user, uint256 timestamp);
    event ProjectCreated(uint256 indexed projectId, address indexed owner, string title);
    event ProjectUpdated(uint256 indexed projectId, ProjectStatus status);
    event InvestmentMade(address indexed investor, uint256 indexed projectId, uint256 amount);
    event AchievementUnlocked(address indexed user, string title, uint256 timestamp);
    event BadgeAwarded(address indexed user, uint256 badgeId);
    event SkillLevelUpdated(address indexed user, SkillLevel newLevel);

    /**
     * @dev Constructor
     */
    constructor(address _accControl) {
        require(_accControl != address(0), "Invalid AccControl address");
        accControl = AccControl(_accControl);
    }

    /**
     * @dev Create or update user profile
     */
    function createProfile(
        string memory name,
        string memory bio,
        string[] memory skills
    ) external whenNotPaused {
        require(bytes(name).length > 0, "Name cannot be empty");
        
        Profile storage profile = profiles[msg.sender];
        if (profile.createdAt == 0) {
            profile.createdAt = block.timestamp;
            emit ProfileCreated(msg.sender, name, block.timestamp);
        }

        profile.name = name;
        profile.bio = bio;
        profile.skills = skills;
        profile.skillLevel = SkillLevel.Beginner;
        
        emit ProfileUpdated(msg.sender, block.timestamp);
    }

    /**
     * @dev Create new project
     */
    function createProject(
        string memory title,
        string memory description,
        uint256 fundingGoal,
        uint256 duration,
        string[] memory tags
    ) external whenNotPaused {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(fundingGoal > 0, "Funding goal must be positive");
        require(duration > 0, "Duration must be positive");
        require(userProjects[msg.sender].length < MAX_PROJECTS_PER_USER, "Too many projects");

        projectCounter++;
        Project storage project = projects[projectCounter];
        project.title = title;
        project.description = description;
        project.owner = msg.sender;
        project.fundingGoal = fundingGoal;
        project.startDate = block.timestamp;
        project.endDate = block.timestamp + duration;
        project.status = ProjectStatus.Draft;
        project.tags = tags;

        userProjects[msg.sender].push(projectCounter);
        
        emit ProjectCreated(projectCounter, msg.sender, title);
    }

    /**
     * @dev Invest in a project
     */
    function investInProject(
        uint256 projectId,
        uint256 amount
    ) external whenNotPaused nonReentrant {
        require(amount >= MIN_INVESTMENT_AMOUNT, "Investment too small");
        require(projects[projectId].status == ProjectStatus.Active, "Project not active");
        require(block.timestamp < projects[projectId].endDate, "Project ended");

        Project storage project = projects[projectId];
        project.currentFunding += amount;
        project.investments[msg.sender] += amount;
        project.investors.push(msg.sender);

        Investment memory investment = Investment({
            projectId: projectId,
            amount: amount,
            timestamp: block.timestamp,
            status: InvestmentStatus.Active,
            returnAmount: 0
        });

        userInvestments[msg.sender].push(investment);
        profiles[msg.sender].totalInvestments += amount;

        emit InvestmentMade(msg.sender, projectId, amount);
    }

    /**
     * @dev Update project status
     */
    function updateProjectStatus(
        uint256 projectId,
        ProjectStatus newStatus
    ) external {
        Project storage project = projects[projectId];
        require(project.owner == msg.sender || accControl.members(msg.sender).role == AccControl.Role.Admin, "Not authorized");
        
        project.status = newStatus;
        
        if (newStatus == ProjectStatus.Completed) {
            profiles[project.owner].successfulProjects++;
            _checkAndUpdateSkillLevel(project.owner);
        }

        emit ProjectUpdated(projectId, newStatus);
    }

    /**
     * @dev Add achievement to user
     */
    function addAchievement(
        address user,
        string memory title,
        string memory description,
        uint256 value
    ) external {
        require(accControl.members(msg.sender).role == AccControl.Role.Admin, "Not authorized");

        Achievement memory achievement = Achievement({
            title: title,
            description: description,
            timestamp: block.timestamp,
            value: value
        });

        userAchievements[user].push(achievement);
        emit AchievementUnlocked(user, title, block.timestamp);
    }

    /**
     * @dev Award badge to user
     */
    function awardBadge(
        address user,
        uint256 badgeId
    ) external {
        require(accControl.members(msg.sender).role == AccControl.Role.Admin, "Not authorized");
        require(!profiles[user].badges[badgeId], "Badge already awarded");

        profiles[user].badges[badgeId] = true;
        emit BadgeAwarded(user, badgeId);
    }

    /**
     * @dev Internal function to check and update skill level
     */
    function _checkAndUpdateSkillLevel(address user) internal {
        Profile storage profile = profiles[user];
        uint256 successfulProjects = profile.successfulProjects;
        uint256 totalInvestments = profile.totalInvestments;

        if (successfulProjects >= 10 && totalInvestments >= 10000 * 10**18) {
            profile.skillLevel = SkillLevel.Expert;
        } else if (successfulProjects >= 5 && totalInvestments >= 5000 * 10**18) {
            profile.skillLevel = SkillLevel.Advanced;
        } else if (successfulProjects >= 2 && totalInvestments >= 1000 * 10**18) {
            profile.skillLevel = SkillLevel.Intermediate;
        }

        emit SkillLevelUpdated(user, profile.skillLevel);
    }

    /**
     * @dev Get user profile details
     */
    function getProfile(
        address user
    ) external view returns (
        string memory name,
        string memory bio,
        string[] memory skills,
        SkillLevel skillLevel,
        uint256 reputation,
        uint256 totalInvestments,
        uint256 successfulProjects,
        bool isVerified
    ) {
        Profile storage profile = profiles[user];
        return (
            profile.name,
            profile.bio,
            profile.skills,
            profile.skillLevel,
            profile.reputation,
            profile.totalInvestments,
            profile.successfulProjects,
            profile.isVerified
        );
    }

    /**
     * @dev Get user projects
     */
    function getUserProjects(
        address user
    ) external view returns (uint256[] memory) {
        return userProjects[user];
    }

    /**
     * @dev Get user investments
     */
    function getUserInvestments(
        address user
    ) external view returns (Investment[] memory) {
        return userInvestments[user];
    }

    /**
     * @dev Get user achievements
     */
    function getUserAchievements(
        address user
    ) external view returns (Achievement[] memory) {
        return userAchievements[user];
    }

    /**
     * @dev Verify user profile
     */
    function verifyProfile(address user) external {
        require(accControl.members(msg.sender).role == AccControl.Role.Admin, "Not authorized");
        profiles[user].isVerified = true;
        emit ProfileUpdated(user, block.timestamp);
    }

    /**
     * @dev Pause contract
     */
    function pause() external {
        require(accControl.members(msg.sender).role == AccControl.Role.Admin, "Not authorized");
        _pause();
    }

    /**
     * @dev Unpause contract
     */
    function unpause() external {
        require(accControl.members(msg.sender).role == AccControl.Role.Admin, "Not authorized");
        _unpause();
    }
} 