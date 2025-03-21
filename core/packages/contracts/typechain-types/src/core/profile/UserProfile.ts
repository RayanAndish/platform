/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";

export declare namespace UserProfile {
  export type AchievementStruct = {
    title: string;
    description: string;
    timestamp: BigNumberish;
    value: BigNumberish;
  };

  export type AchievementStructOutput = [
    title: string,
    description: string,
    timestamp: bigint,
    value: bigint
  ] & { title: string; description: string; timestamp: bigint; value: bigint };

  export type InvestmentStruct = {
    projectId: BigNumberish;
    amount: BigNumberish;
    timestamp: BigNumberish;
    status: BigNumberish;
    returnAmount: BigNumberish;
  };

  export type InvestmentStructOutput = [
    projectId: bigint,
    amount: bigint,
    timestamp: bigint,
    status: bigint,
    returnAmount: bigint
  ] & {
    projectId: bigint;
    amount: bigint;
    timestamp: bigint;
    status: bigint;
    returnAmount: bigint;
  };
}

export interface UserProfileInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "MAX_PROJECTS_PER_USER"
      | "MIN_INVESTMENT_AMOUNT"
      | "accControl"
      | "acceptOwnership"
      | "addAchievement"
      | "awardBadge"
      | "createProfile"
      | "createProject"
      | "getProfile"
      | "getUserAchievements"
      | "getUserInvestments"
      | "getUserProjects"
      | "investInProject"
      | "owner"
      | "pause"
      | "paused"
      | "pendingOwner"
      | "profiles"
      | "projectCounter"
      | "projects"
      | "renounceOwnership"
      | "reputationThreshold"
      | "transferOwnership"
      | "unpause"
      | "updateMemberProfile"
      | "updateMemberStatus"
      | "updateProjectStatus"
      | "updateReputationThreshold"
      | "userAchievements"
      | "userInvestments"
      | "userProjects"
      | "verifyProfile"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AchievementUnlocked"
      | "BadgeAwarded"
      | "InvestmentMade"
      | "OwnershipTransferStarted"
      | "OwnershipTransferred"
      | "Paused"
      | "ProfileCreated"
      | "ProfileMetadataUpdated"
      | "ProfileUpdated"
      | "ProjectCreated"
      | "ProjectUpdated"
      | "SkillLevelUpdated"
      | "StatusUpdated"
      | "Unpaused"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "MAX_PROJECTS_PER_USER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MIN_INVESTMENT_AMOUNT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "accControl",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addAchievement",
    values: [AddressLike, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "awardBadge",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createProfile",
    values: [string, string, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "createProject",
    values: [string, string, BigNumberish, BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getProfile",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserAchievements",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserInvestments",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserProjects",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "investInProject",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "profiles",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "projectCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "projects",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "reputationThreshold",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updateMemberProfile",
    values: [AddressLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateMemberStatus",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "updateProjectStatus",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateReputationThreshold",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userAchievements",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userInvestments",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userProjects",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyProfile",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "MAX_PROJECTS_PER_USER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MIN_INVESTMENT_AMOUNT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "accControl", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addAchievement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "awardBadge", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createProfile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createProject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getProfile", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUserAchievements",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserInvestments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserProjects",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "investInProject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "profiles", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "projectCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "projects", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reputationThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateMemberProfile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateMemberStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateProjectStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateReputationThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userAchievements",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userInvestments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userProjects",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyProfile",
    data: BytesLike
  ): Result;
}

export namespace AchievementUnlockedEvent {
  export type InputTuple = [
    user: AddressLike,
    title: string,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [user: string, title: string, timestamp: bigint];
  export interface OutputObject {
    user: string;
    title: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BadgeAwardedEvent {
  export type InputTuple = [user: AddressLike, badgeId: BigNumberish];
  export type OutputTuple = [user: string, badgeId: bigint];
  export interface OutputObject {
    user: string;
    badgeId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InvestmentMadeEvent {
  export type InputTuple = [
    investor: AddressLike,
    projectId: BigNumberish,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    investor: string,
    projectId: bigint,
    amount: bigint
  ];
  export interface OutputObject {
    investor: string;
    projectId: bigint;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferStartedEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProfileCreatedEvent {
  export type InputTuple = [
    user: AddressLike,
    name: string,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [user: string, name: string, timestamp: bigint];
  export interface OutputObject {
    user: string;
    name: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProfileMetadataUpdatedEvent {
  export type InputTuple = [user: AddressLike, metadata: string];
  export type OutputTuple = [user: string, metadata: string];
  export interface OutputObject {
    user: string;
    metadata: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProfileUpdatedEvent {
  export type InputTuple = [user: AddressLike, timestamp: BigNumberish];
  export type OutputTuple = [user: string, timestamp: bigint];
  export interface OutputObject {
    user: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProjectCreatedEvent {
  export type InputTuple = [
    projectId: BigNumberish,
    owner: AddressLike,
    title: string
  ];
  export type OutputTuple = [projectId: bigint, owner: string, title: string];
  export interface OutputObject {
    projectId: bigint;
    owner: string;
    title: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProjectUpdatedEvent {
  export type InputTuple = [projectId: BigNumberish, status: BigNumberish];
  export type OutputTuple = [projectId: bigint, status: bigint];
  export interface OutputObject {
    projectId: bigint;
    status: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SkillLevelUpdatedEvent {
  export type InputTuple = [user: AddressLike, newLevel: BigNumberish];
  export type OutputTuple = [user: string, newLevel: bigint];
  export interface OutputObject {
    user: string;
    newLevel: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace StatusUpdatedEvent {
  export type InputTuple = [member: AddressLike, isActive: boolean];
  export type OutputTuple = [member: string, isActive: boolean];
  export interface OutputObject {
    member: string;
    isActive: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface UserProfile extends BaseContract {
  connect(runner?: ContractRunner | null): UserProfile;
  waitForDeployment(): Promise<this>;

  interface: UserProfileInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  MAX_PROJECTS_PER_USER: TypedContractMethod<[], [bigint], "view">;

  MIN_INVESTMENT_AMOUNT: TypedContractMethod<[], [bigint], "view">;

  accControl: TypedContractMethod<[], [string], "view">;

  acceptOwnership: TypedContractMethod<[], [void], "nonpayable">;

  addAchievement: TypedContractMethod<
    [
      user: AddressLike,
      title: string,
      description: string,
      value: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  awardBadge: TypedContractMethod<
    [user: AddressLike, badgeId: BigNumberish],
    [void],
    "nonpayable"
  >;

  createProfile: TypedContractMethod<
    [name: string, bio: string, skills: string[]],
    [void],
    "nonpayable"
  >;

  createProject: TypedContractMethod<
    [
      title: string,
      description: string,
      fundingGoal: BigNumberish,
      duration: BigNumberish,
      tags: string[]
    ],
    [void],
    "nonpayable"
  >;

  getProfile: TypedContractMethod<
    [user: AddressLike],
    [
      [
        string,
        string,
        string[],
        bigint,
        bigint,
        bigint,
        bigint,
        boolean,
        boolean,
        string
      ] & {
        name: string;
        bio: string;
        skills: string[];
        skillLevel: bigint;
        reputation: bigint;
        totalInvestments: bigint;
        successfulProjects: bigint;
        isVerified: boolean;
        isActive: boolean;
        metadata: string;
      }
    ],
    "view"
  >;

  getUserAchievements: TypedContractMethod<
    [user: AddressLike],
    [UserProfile.AchievementStructOutput[]],
    "view"
  >;

  getUserInvestments: TypedContractMethod<
    [user: AddressLike],
    [UserProfile.InvestmentStructOutput[]],
    "view"
  >;

  getUserProjects: TypedContractMethod<[user: AddressLike], [bigint[]], "view">;

  investInProject: TypedContractMethod<
    [projectId: BigNumberish, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  paused: TypedContractMethod<[], [boolean], "view">;

  pendingOwner: TypedContractMethod<[], [string], "view">;

  profiles: TypedContractMethod<
    [arg0: AddressLike],
    [
      [
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        boolean,
        boolean,
        string
      ] & {
        name: string;
        bio: string;
        skillLevel: bigint;
        reputation: bigint;
        totalInvestments: bigint;
        successfulProjects: bigint;
        createdAt: bigint;
        isVerified: boolean;
        isActive: boolean;
        metadata: string;
      }
    ],
    "view"
  >;

  projectCounter: TypedContractMethod<[], [bigint], "view">;

  projects: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, bigint, bigint, bigint, bigint, bigint] & {
        title: string;
        description: string;
        owner: string;
        fundingGoal: bigint;
        currentFunding: bigint;
        startDate: bigint;
        endDate: bigint;
        status: bigint;
      }
    ],
    "view"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  reputationThreshold: TypedContractMethod<[], [bigint], "view">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  updateMemberProfile: TypedContractMethod<
    [member: AddressLike, newMetadata: string],
    [void],
    "nonpayable"
  >;

  updateMemberStatus: TypedContractMethod<
    [member: AddressLike, isActive: boolean],
    [void],
    "nonpayable"
  >;

  updateProjectStatus: TypedContractMethod<
    [projectId: BigNumberish, newStatus: BigNumberish],
    [void],
    "nonpayable"
  >;

  updateReputationThreshold: TypedContractMethod<
    [newThreshold: BigNumberish],
    [void],
    "nonpayable"
  >;

  userAchievements: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [string, string, bigint, bigint] & {
        title: string;
        description: string;
        timestamp: bigint;
        value: bigint;
      }
    ],
    "view"
  >;

  userInvestments: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [bigint, bigint, bigint, bigint, bigint] & {
        projectId: bigint;
        amount: bigint;
        timestamp: bigint;
        status: bigint;
        returnAmount: bigint;
      }
    ],
    "view"
  >;

  userProjects: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [bigint],
    "view"
  >;

  verifyProfile: TypedContractMethod<[user: AddressLike], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "MAX_PROJECTS_PER_USER"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MIN_INVESTMENT_AMOUNT"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "accControl"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "acceptOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "addAchievement"
  ): TypedContractMethod<
    [
      user: AddressLike,
      title: string,
      description: string,
      value: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "awardBadge"
  ): TypedContractMethod<
    [user: AddressLike, badgeId: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createProfile"
  ): TypedContractMethod<
    [name: string, bio: string, skills: string[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createProject"
  ): TypedContractMethod<
    [
      title: string,
      description: string,
      fundingGoal: BigNumberish,
      duration: BigNumberish,
      tags: string[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getProfile"
  ): TypedContractMethod<
    [user: AddressLike],
    [
      [
        string,
        string,
        string[],
        bigint,
        bigint,
        bigint,
        bigint,
        boolean,
        boolean,
        string
      ] & {
        name: string;
        bio: string;
        skills: string[];
        skillLevel: bigint;
        reputation: bigint;
        totalInvestments: bigint;
        successfulProjects: bigint;
        isVerified: boolean;
        isActive: boolean;
        metadata: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserAchievements"
  ): TypedContractMethod<
    [user: AddressLike],
    [UserProfile.AchievementStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserInvestments"
  ): TypedContractMethod<
    [user: AddressLike],
    [UserProfile.InvestmentStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserProjects"
  ): TypedContractMethod<[user: AddressLike], [bigint[]], "view">;
  getFunction(
    nameOrSignature: "investInProject"
  ): TypedContractMethod<
    [projectId: BigNumberish, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "paused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "pendingOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "profiles"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [
      [
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        boolean,
        boolean,
        string
      ] & {
        name: string;
        bio: string;
        skillLevel: bigint;
        reputation: bigint;
        totalInvestments: bigint;
        successfulProjects: bigint;
        createdAt: bigint;
        isVerified: boolean;
        isActive: boolean;
        metadata: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "projectCounter"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "projects"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, bigint, bigint, bigint, bigint, bigint] & {
        title: string;
        description: string;
        owner: string;
        fundingGoal: bigint;
        currentFunding: bigint;
        startDate: bigint;
        endDate: bigint;
        status: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "reputationThreshold"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unpause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateMemberProfile"
  ): TypedContractMethod<
    [member: AddressLike, newMetadata: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateMemberStatus"
  ): TypedContractMethod<
    [member: AddressLike, isActive: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateProjectStatus"
  ): TypedContractMethod<
    [projectId: BigNumberish, newStatus: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateReputationThreshold"
  ): TypedContractMethod<[newThreshold: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "userAchievements"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [string, string, bigint, bigint] & {
        title: string;
        description: string;
        timestamp: bigint;
        value: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "userInvestments"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [bigint, bigint, bigint, bigint, bigint] & {
        projectId: bigint;
        amount: bigint;
        timestamp: bigint;
        status: bigint;
        returnAmount: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "userProjects"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "verifyProfile"
  ): TypedContractMethod<[user: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "AchievementUnlocked"
  ): TypedContractEvent<
    AchievementUnlockedEvent.InputTuple,
    AchievementUnlockedEvent.OutputTuple,
    AchievementUnlockedEvent.OutputObject
  >;
  getEvent(
    key: "BadgeAwarded"
  ): TypedContractEvent<
    BadgeAwardedEvent.InputTuple,
    BadgeAwardedEvent.OutputTuple,
    BadgeAwardedEvent.OutputObject
  >;
  getEvent(
    key: "InvestmentMade"
  ): TypedContractEvent<
    InvestmentMadeEvent.InputTuple,
    InvestmentMadeEvent.OutputTuple,
    InvestmentMadeEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferStarted"
  ): TypedContractEvent<
    OwnershipTransferStartedEvent.InputTuple,
    OwnershipTransferStartedEvent.OutputTuple,
    OwnershipTransferStartedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Paused"
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: "ProfileCreated"
  ): TypedContractEvent<
    ProfileCreatedEvent.InputTuple,
    ProfileCreatedEvent.OutputTuple,
    ProfileCreatedEvent.OutputObject
  >;
  getEvent(
    key: "ProfileMetadataUpdated"
  ): TypedContractEvent<
    ProfileMetadataUpdatedEvent.InputTuple,
    ProfileMetadataUpdatedEvent.OutputTuple,
    ProfileMetadataUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "ProfileUpdated"
  ): TypedContractEvent<
    ProfileUpdatedEvent.InputTuple,
    ProfileUpdatedEvent.OutputTuple,
    ProfileUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "ProjectCreated"
  ): TypedContractEvent<
    ProjectCreatedEvent.InputTuple,
    ProjectCreatedEvent.OutputTuple,
    ProjectCreatedEvent.OutputObject
  >;
  getEvent(
    key: "ProjectUpdated"
  ): TypedContractEvent<
    ProjectUpdatedEvent.InputTuple,
    ProjectUpdatedEvent.OutputTuple,
    ProjectUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "SkillLevelUpdated"
  ): TypedContractEvent<
    SkillLevelUpdatedEvent.InputTuple,
    SkillLevelUpdatedEvent.OutputTuple,
    SkillLevelUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "StatusUpdated"
  ): TypedContractEvent<
    StatusUpdatedEvent.InputTuple,
    StatusUpdatedEvent.OutputTuple,
    StatusUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused"
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;

  filters: {
    "AchievementUnlocked(address,string,uint256)": TypedContractEvent<
      AchievementUnlockedEvent.InputTuple,
      AchievementUnlockedEvent.OutputTuple,
      AchievementUnlockedEvent.OutputObject
    >;
    AchievementUnlocked: TypedContractEvent<
      AchievementUnlockedEvent.InputTuple,
      AchievementUnlockedEvent.OutputTuple,
      AchievementUnlockedEvent.OutputObject
    >;

    "BadgeAwarded(address,uint256)": TypedContractEvent<
      BadgeAwardedEvent.InputTuple,
      BadgeAwardedEvent.OutputTuple,
      BadgeAwardedEvent.OutputObject
    >;
    BadgeAwarded: TypedContractEvent<
      BadgeAwardedEvent.InputTuple,
      BadgeAwardedEvent.OutputTuple,
      BadgeAwardedEvent.OutputObject
    >;

    "InvestmentMade(address,uint256,uint256)": TypedContractEvent<
      InvestmentMadeEvent.InputTuple,
      InvestmentMadeEvent.OutputTuple,
      InvestmentMadeEvent.OutputObject
    >;
    InvestmentMade: TypedContractEvent<
      InvestmentMadeEvent.InputTuple,
      InvestmentMadeEvent.OutputTuple,
      InvestmentMadeEvent.OutputObject
    >;

    "OwnershipTransferStarted(address,address)": TypedContractEvent<
      OwnershipTransferStartedEvent.InputTuple,
      OwnershipTransferStartedEvent.OutputTuple,
      OwnershipTransferStartedEvent.OutputObject
    >;
    OwnershipTransferStarted: TypedContractEvent<
      OwnershipTransferStartedEvent.InputTuple,
      OwnershipTransferStartedEvent.OutputTuple,
      OwnershipTransferStartedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Paused(address)": TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    "ProfileCreated(address,string,uint256)": TypedContractEvent<
      ProfileCreatedEvent.InputTuple,
      ProfileCreatedEvent.OutputTuple,
      ProfileCreatedEvent.OutputObject
    >;
    ProfileCreated: TypedContractEvent<
      ProfileCreatedEvent.InputTuple,
      ProfileCreatedEvent.OutputTuple,
      ProfileCreatedEvent.OutputObject
    >;

    "ProfileMetadataUpdated(address,string)": TypedContractEvent<
      ProfileMetadataUpdatedEvent.InputTuple,
      ProfileMetadataUpdatedEvent.OutputTuple,
      ProfileMetadataUpdatedEvent.OutputObject
    >;
    ProfileMetadataUpdated: TypedContractEvent<
      ProfileMetadataUpdatedEvent.InputTuple,
      ProfileMetadataUpdatedEvent.OutputTuple,
      ProfileMetadataUpdatedEvent.OutputObject
    >;

    "ProfileUpdated(address,uint256)": TypedContractEvent<
      ProfileUpdatedEvent.InputTuple,
      ProfileUpdatedEvent.OutputTuple,
      ProfileUpdatedEvent.OutputObject
    >;
    ProfileUpdated: TypedContractEvent<
      ProfileUpdatedEvent.InputTuple,
      ProfileUpdatedEvent.OutputTuple,
      ProfileUpdatedEvent.OutputObject
    >;

    "ProjectCreated(uint256,address,string)": TypedContractEvent<
      ProjectCreatedEvent.InputTuple,
      ProjectCreatedEvent.OutputTuple,
      ProjectCreatedEvent.OutputObject
    >;
    ProjectCreated: TypedContractEvent<
      ProjectCreatedEvent.InputTuple,
      ProjectCreatedEvent.OutputTuple,
      ProjectCreatedEvent.OutputObject
    >;

    "ProjectUpdated(uint256,uint8)": TypedContractEvent<
      ProjectUpdatedEvent.InputTuple,
      ProjectUpdatedEvent.OutputTuple,
      ProjectUpdatedEvent.OutputObject
    >;
    ProjectUpdated: TypedContractEvent<
      ProjectUpdatedEvent.InputTuple,
      ProjectUpdatedEvent.OutputTuple,
      ProjectUpdatedEvent.OutputObject
    >;

    "SkillLevelUpdated(address,uint8)": TypedContractEvent<
      SkillLevelUpdatedEvent.InputTuple,
      SkillLevelUpdatedEvent.OutputTuple,
      SkillLevelUpdatedEvent.OutputObject
    >;
    SkillLevelUpdated: TypedContractEvent<
      SkillLevelUpdatedEvent.InputTuple,
      SkillLevelUpdatedEvent.OutputTuple,
      SkillLevelUpdatedEvent.OutputObject
    >;

    "StatusUpdated(address,bool)": TypedContractEvent<
      StatusUpdatedEvent.InputTuple,
      StatusUpdatedEvent.OutputTuple,
      StatusUpdatedEvent.OutputObject
    >;
    StatusUpdated: TypedContractEvent<
      StatusUpdatedEvent.InputTuple,
      StatusUpdatedEvent.OutputTuple,
      StatusUpdatedEvent.OutputObject
    >;

    "Unpaused(address)": TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
  };
}
