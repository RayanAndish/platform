// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "../permission/AccControl.sol";
import "../security/CustomHash.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import {PermissionLib} from "@aragon/osx-commons-contracts/src/permission/PermissionLib.sol";
import {IDAO} from "@aragon/osx-commons-contracts/src/dao/IDAO.sol";

/**
 * @title DAO
 * @dev مدیریت سازمان مستقل غیرمتمرکز DAO-VC
 */
contract DAO is IDAO, Ownable2Step, UUPSUpgradeable, Initializable {
    using PermissionLib for PermissionLib.MultiTargetPermission[];
    using PermissionLib for PermissionLib.SingleTargetPermission[];

    bytes32 public constant ROOT_PERMISSION_ID = keccak256("ROOT_PERMISSION");
    bytes32 public constant UPGRADE_DAO_PERMISSION_ID = keccak256("UPGRADE_DAO_PERMISSION");
    bytes32 public constant SET_TRUSTED_FORWARDER_PERMISSION_ID = keccak256("SET_TRUSTED_FORWARDER_PERMISSION");
    bytes32 public constant SET_METADATA_PERMISSION_ID = keccak256("SET_METADATA_PERMISSION");
    bytes32 public constant REGISTER_STANDARD_CALLBACK_PERMISSION_ID = keccak256("REGISTER_STANDARD_CALLBACK_PERMISSION");
    bytes32 public constant EXECUTE_PERMISSION_ID = keccak256("EXECUTE_PERMISSION");

    AccControl public accControl;
    CustomHash public hasher;
    address public trustedForwarder;
    string public daoURI;
    bytes public metadata;
    address public signatureValidator;

    // ساختار Project شامل شناسه، عنوان، توضیحات، بودجه، وضعیت و زمان‌ها
    struct Project {
        uint256 id;
        string title;
        string description;
        uint256 budget;
        bool active;
        uint256 startTime;
        uint256 endTime;
    }

    uint256 public projectCount; // شمارنده تعداد پروژه‌ها
    mapping(uint256 => Project) public projects; // نگاشت برای ذخیره پروژه‌ها

    struct Proposal {
        string description; // توضیحات پیشنهاد
        uint256 deadline; // مهلت رأی‌گیری
        uint256 votesFor; // تعداد آراء موافق
        uint256 votesAgainst; // تعداد آراء مخالف
        bool executed; // وضعیت اجرای پیشنهاد
        mapping(address => bool) hasVoted; // نگاشت برای پیگیری آراء داده شده توسط اعضا
    }

    mapping(uint256 => Proposal) private proposals; // نگاشت برای ذخیره‌سازی پیشنهادات
    uint256 public proposalCount; // تعداد پیشنهادات ایجاد شده
    address public tokenAddress; // آدرس قرارداد توکن
    uint256 public votingThreshold; // حداقل تعداد توکن برای شرکت در رأی‌گیری

    // رویدادهای مربوط به پروژه‌ها
    event ProjectCreated(uint256 indexed projectId, string title, uint256 budget);
    event ProjectUpdated(uint256 indexed projectId, string title, uint256 budget);
    event ProjectCompleted(uint256 indexed projectId);

    // رویدادهای مربوط به پیشنهادات
    event ProposalCreated(uint256 indexed proposalId, string description, uint256 deadline);
    event VoteCast(address indexed voter, uint256 indexed proposalId, bool support);
    event ProposalExecuted(uint256 indexed proposalId, bool success);

    // رویدادهای مربوط به اعتبارسنجی امضا
    event SignatureValidatorSet(address indexed signatureValidator);

    /**
     * @dev سازنده قرارداد
     * @param _accControl آدرس قرارداد AccControl
     * @param _hasher آدرس قرارداد تابع هش
     * @param initialOwner آدرس مالک اولیه
     */
    constructor(address _accControl, address _hasher, address initialOwner) {
        accControl = AccControl(_accControl);
        hasher = CustomHash(_hasher);
        _transferOwnership(initialOwner);
    }

    function initialize(
        bytes memory _metadata,
        address _initialOwner,
        address _trustedForwarder,
        string memory _daoURI
    ) public initializer {
        require(_initialOwner != address(0), "Invalid owner address");
        _transferOwnership(_initialOwner);
        metadata = _metadata;
        trustedForwarder = _trustedForwarder;
        daoURI = _daoURI;
    }

    function _authorizeUpgrade(address) internal view override {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.Admin, "Not authorized");
    }

    /**
     * @dev Modifier برای اطمینان از اینکه تنها دارندگان توکن می‌توانند عمل انجام دهند
     */
    modifier onlyTokenHolders() {
        require(balanceOf(msg.sender) >= votingThreshold, "Not enough tokens to participate");
        _;
    }

    /**
     * @dev بررسی موجودی توکن یک حساب
     * @param account آدرس حساب
     * @return تعداد توکن‌های حساب
     */
    function balanceOf(address account) internal view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(account);
    }

    /**
     * @dev ایجاد پیشنهاد جدید
     * @param description توضیحات پیشنهاد
     * @param duration مدت زمان رأی‌گیری به ثانیه
     */
    function createProposal(string memory description, uint256 duration) external onlyTokenHolders {
        require(duration > 0, "Duration must be greater than zero");

        Proposal storage newProposal = proposals[proposalCount];
        newProposal.description = description;
        newProposal.deadline = block.timestamp + duration;

        emit ProposalCreated(proposalCount, description, newProposal.deadline);
        proposalCount++;
    }

    /**
     * @dev رأی دادن به یک پیشنهاد
     * @param proposalId شناسه پیشنهاد
     * @param support رأی موافق یا مخالف
     */
    function vote(uint256 proposalId, bool support) external onlyTokenHolders {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp <= proposal.deadline, "Voting period has ended");
        require(!proposal.hasVoted[msg.sender], "You have already voted");

        if (support) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }

        proposal.hasVoted[msg.sender] = true;

        emit VoteCast(msg.sender, proposalId, support);
    }

    /**
     * @dev اجرای پیشنهاد پس از پایان دوره رأی‌گیری
     * @param proposalId شناسه پیشنهاد
     */
    function executeProposal(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp > proposal.deadline, "Voting period has not ended");
        require(!proposal.executed, "Proposal already executed");

        proposal.executed = true;
        bool success = proposal.votesFor > proposal.votesAgainst;

        emit ProposalExecuted(proposalId, success);
    }

    /**
     * @dev به‌روزرسانی حد نصاب رأی‌گیری
     * @param newThreshold حد نصاب جدید
     */
    function updateVotingThreshold(uint256 newThreshold) external onlyOwner {
        require(newThreshold > 0, "Threshold must be greater than zero");
        votingThreshold = newThreshold;
    }

    /**
     * @dev دریافت اطلاعات یک پیشنهاد
     * @param proposalId شناسه پیشنهاد
     * @return description توضیحات پیشنهاد
     * @return deadline مهلت پیشنهاد
     * @return votesFor تعداد آراء موافق
     * @return votesAgainst تعداد آراء مخالف
     * @return executed وضعیت اجرای پیشنهاد
     */
    function getProposal(uint256 proposalId)
        external
        view
        returns (
            string memory description,
            uint256 deadline,
            uint256 votesFor,
            uint256 votesAgainst,
            bool executed
        )
    {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.description,
            proposal.deadline,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.executed
        );
    }

    /**
     * @dev اعمال مجوزهای چند هدفه
     * @param _permissions آرایه‌ای از مجوزهای چند هدفه
     */
    function applyMultiTargetPermissions(PermissionLib.MultiTargetPermission[] calldata _permissions) external view {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(msg.sender == address(this) || role == AccControl.Role.DAO, "Not authorized");
        
        for (uint256 i = 0; i < _permissions.length; i++) {
            // اعمال مجوزها برای هر هدف
            // این تابع باید با توجه به نیازهای پروژه پیاده‌سازی شود
        }
    }

    /**
     * @dev بررسی مجوز
     */
    function hasPermission(
        address _where,
        address _who,
        bytes32 _permissionId,
        bytes memory _data
    ) external view returns (bool) {
        (AccControl.Role role, , , , , , ) = accControl.members(_who);
        return role == AccControl.Role.Admin;
    }

    function applySingleTargetPermissions(
        address _target,
        PermissionLib.SingleTargetPermission[] memory _items
    ) external {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(role == AccControl.Role.Admin || msg.sender == address(this), "Not authorized");

        for (uint256 i = 0; i < _items.length; i++) {
            PermissionLib.SingleTargetPermission memory item = _items[i];
            if (item.operation == PermissionLib.Operation.Grant) {
                grant(_target, msg.sender, item.permissionId);
            } else {
                revoke(_target, msg.sender, item.permissionId);
            }
        }
    }

    function grant(address _where, address _who, bytes32 _permissionId) public view {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(msg.sender == address(this) || role == AccControl.Role.DAO, "Not authorized");
        // اعطای مجوز به آدرس مورد نظر
        // این تابع باید با توجه به نیازهای پروژه پیاده‌سازی شود
    }

    function revoke(address _where, address _who, bytes32 _permissionId) public view {
        (AccControl.Role role, , , , , , ) = accControl.members(msg.sender);
        require(msg.sender == address(this) || role == AccControl.Role.DAO, "Not authorized");
        // لغو مجوز از آدرس مورد نظر
        // این تابع باید با توجه به نیازهای پروژه پیاده‌سازی شود
    }

    function deposit(address _token, uint256 _amount, string calldata _ref) external payable override {
        if (_token == address(0)) {
            require(msg.value == _amount, "Invalid ETH amount");
        } else {
            require(msg.value == 0, "ETH not accepted");
            require(IERC20(_token).transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        }
        emit Deposited(msg.sender, _token, _amount, _ref);
    }

    function getTrustedForwarder() external view override returns (address) {
        return trustedForwarder;
    }

    function setTrustedForwarder(address _trustedForwarder) external override {
        require(msg.sender == address(this), "Not authorized");
        trustedForwarder = _trustedForwarder;
        emit TrustedForwarderSet(_trustedForwarder);
    }

    function setMetadata(bytes calldata _metadata) external override {
        require(msg.sender == address(this), "Not authorized");
        metadata = _metadata;
        emit MetadataSet(_metadata);
    }

    function isValidSignature(bytes32 _hash, bytes memory _signature) external override returns (bytes4) {
        if (signatureValidator != address(0)) {
            return IERC1271(signatureValidator).isValidSignature(_hash, _signature);
        }
        return 0xffffffff;
    }

    function registerStandardCallback(
        bytes4 _interfaceId,
        bytes4 _callbackSelector,
        bytes4 _magicNumber
    ) external override {
        require(msg.sender == address(this), "Not authorized");
        emit StandardCallbackRegistered(_interfaceId, _callbackSelector, _magicNumber);
    }

    function setSignatureValidator(address _signatureValidator) external override {
        require(msg.sender == address(this), "Not authorized");
        signatureValidator = _signatureValidator;
        emit SignatureValidatorSet(_signatureValidator);
    }
}