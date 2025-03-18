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

export declare namespace ContractParameters {
  export type DAOParamsStruct = {
    executionDelay: BigNumberish;
    guardianDelay: BigNumberish;
    minMemberCount: BigNumberish;
    maxMemberCount: BigNumberish;
    proposalThreshold: BigNumberish;
  };

  export type DAOParamsStructOutput = [
    executionDelay: bigint,
    guardianDelay: bigint,
    minMemberCount: bigint,
    maxMemberCount: bigint,
    proposalThreshold: bigint
  ] & {
    executionDelay: bigint;
    guardianDelay: bigint;
    minMemberCount: bigint;
    maxMemberCount: bigint;
    proposalThreshold: bigint;
  };

  export type FinanceParamsStruct = {
    minInvestment: BigNumberish;
    maxInvestment: BigNumberish;
    investmentFee: BigNumberish;
    withdrawalFee: BigNumberish;
    performanceFee: BigNumberish;
  };

  export type FinanceParamsStructOutput = [
    minInvestment: bigint,
    maxInvestment: bigint,
    investmentFee: bigint,
    withdrawalFee: bigint,
    performanceFee: bigint
  ] & {
    minInvestment: bigint;
    maxInvestment: bigint;
    investmentFee: bigint;
    withdrawalFee: bigint;
    performanceFee: bigint;
  };

  export type StakingParamsStruct = {
    minStakeAmount: BigNumberish;
    maxStakeAmount: BigNumberish;
    lockPeriod: BigNumberish;
    rewardRate: BigNumberish;
    tierThresholds: BigNumberish[];
    tierMultipliers: BigNumberish[];
  };

  export type StakingParamsStructOutput = [
    minStakeAmount: bigint,
    maxStakeAmount: bigint,
    lockPeriod: bigint,
    rewardRate: bigint,
    tierThresholds: bigint[],
    tierMultipliers: bigint[]
  ] & {
    minStakeAmount: bigint;
    maxStakeAmount: bigint;
    lockPeriod: bigint;
    rewardRate: bigint;
    tierThresholds: bigint[];
    tierMultipliers: bigint[];
  };

  export type VotingParamsStruct = {
    minVotingPeriod: BigNumberish;
    maxVotingPeriod: BigNumberish;
    quorumPercentage: BigNumberish;
    minProposalThreshold: BigNumberish;
    votingDelay: BigNumberish;
  };

  export type VotingParamsStructOutput = [
    minVotingPeriod: bigint,
    maxVotingPeriod: bigint,
    quorumPercentage: bigint,
    minProposalThreshold: bigint,
    votingDelay: bigint
  ] & {
    minVotingPeriod: bigint;
    maxVotingPeriod: bigint;
    quorumPercentage: bigint;
    minProposalThreshold: bigint;
    votingDelay: bigint;
  };
}

export interface ContractParametersInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "acceptOwnership"
      | "daoParams"
      | "financeParams"
      | "getDAOParams"
      | "getFinanceParams"
      | "getStakingParams"
      | "getVotingParams"
      | "owner"
      | "pendingOwner"
      | "renounceOwnership"
      | "stakingParams"
      | "transferOwnership"
      | "updateDAOParams"
      | "updateFinanceParams"
      | "updateStakingParams"
      | "updateVotingParams"
      | "votingParams"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "DAOParamsUpdated"
      | "FinanceParamsUpdated"
      | "OwnershipTransferStarted"
      | "OwnershipTransferred"
      | "StakingParamsUpdated"
      | "VotingParamsUpdated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "daoParams", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "financeParams",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDAOParams",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFinanceParams",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getStakingParams",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVotingParams",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stakingParams",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateDAOParams",
    values: [ContractParameters.DAOParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "updateFinanceParams",
    values: [ContractParameters.FinanceParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "updateStakingParams",
    values: [ContractParameters.StakingParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "updateVotingParams",
    values: [ContractParameters.VotingParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "votingParams",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "daoParams", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "financeParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDAOParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFinanceParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakingParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVotingParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakingParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateDAOParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateFinanceParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateStakingParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateVotingParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "votingParams",
    data: BytesLike
  ): Result;
}

export namespace DAOParamsUpdatedEvent {
  export type InputTuple = [params: ContractParameters.DAOParamsStruct];
  export type OutputTuple = [params: ContractParameters.DAOParamsStructOutput];
  export interface OutputObject {
    params: ContractParameters.DAOParamsStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FinanceParamsUpdatedEvent {
  export type InputTuple = [params: ContractParameters.FinanceParamsStruct];
  export type OutputTuple = [
    params: ContractParameters.FinanceParamsStructOutput
  ];
  export interface OutputObject {
    params: ContractParameters.FinanceParamsStructOutput;
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

export namespace StakingParamsUpdatedEvent {
  export type InputTuple = [params: ContractParameters.StakingParamsStruct];
  export type OutputTuple = [
    params: ContractParameters.StakingParamsStructOutput
  ];
  export interface OutputObject {
    params: ContractParameters.StakingParamsStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VotingParamsUpdatedEvent {
  export type InputTuple = [params: ContractParameters.VotingParamsStruct];
  export type OutputTuple = [
    params: ContractParameters.VotingParamsStructOutput
  ];
  export interface OutputObject {
    params: ContractParameters.VotingParamsStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ContractParameters extends BaseContract {
  connect(runner?: ContractRunner | null): ContractParameters;
  waitForDeployment(): Promise<this>;

  interface: ContractParametersInterface;

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

  acceptOwnership: TypedContractMethod<[], [void], "nonpayable">;

  daoParams: TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint, bigint] & {
        executionDelay: bigint;
        guardianDelay: bigint;
        minMemberCount: bigint;
        maxMemberCount: bigint;
        proposalThreshold: bigint;
      }
    ],
    "view"
  >;

  financeParams: TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint, bigint] & {
        minInvestment: bigint;
        maxInvestment: bigint;
        investmentFee: bigint;
        withdrawalFee: bigint;
        performanceFee: bigint;
      }
    ],
    "view"
  >;

  getDAOParams: TypedContractMethod<
    [],
    [ContractParameters.DAOParamsStructOutput],
    "view"
  >;

  getFinanceParams: TypedContractMethod<
    [],
    [ContractParameters.FinanceParamsStructOutput],
    "view"
  >;

  getStakingParams: TypedContractMethod<
    [],
    [ContractParameters.StakingParamsStructOutput],
    "view"
  >;

  getVotingParams: TypedContractMethod<
    [],
    [ContractParameters.VotingParamsStructOutput],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  pendingOwner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  stakingParams: TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint] & {
        minStakeAmount: bigint;
        maxStakeAmount: bigint;
        lockPeriod: bigint;
        rewardRate: bigint;
      }
    ],
    "view"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  updateDAOParams: TypedContractMethod<
    [_params: ContractParameters.DAOParamsStruct],
    [void],
    "nonpayable"
  >;

  updateFinanceParams: TypedContractMethod<
    [_params: ContractParameters.FinanceParamsStruct],
    [void],
    "nonpayable"
  >;

  updateStakingParams: TypedContractMethod<
    [_params: ContractParameters.StakingParamsStruct],
    [void],
    "nonpayable"
  >;

  updateVotingParams: TypedContractMethod<
    [_params: ContractParameters.VotingParamsStruct],
    [void],
    "nonpayable"
  >;

  votingParams: TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint, bigint] & {
        minVotingPeriod: bigint;
        maxVotingPeriod: bigint;
        quorumPercentage: bigint;
        minProposalThreshold: bigint;
        votingDelay: bigint;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "acceptOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "daoParams"
  ): TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint, bigint] & {
        executionDelay: bigint;
        guardianDelay: bigint;
        minMemberCount: bigint;
        maxMemberCount: bigint;
        proposalThreshold: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "financeParams"
  ): TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint, bigint] & {
        minInvestment: bigint;
        maxInvestment: bigint;
        investmentFee: bigint;
        withdrawalFee: bigint;
        performanceFee: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getDAOParams"
  ): TypedContractMethod<
    [],
    [ContractParameters.DAOParamsStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getFinanceParams"
  ): TypedContractMethod<
    [],
    [ContractParameters.FinanceParamsStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getStakingParams"
  ): TypedContractMethod<
    [],
    [ContractParameters.StakingParamsStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getVotingParams"
  ): TypedContractMethod<
    [],
    [ContractParameters.VotingParamsStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pendingOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "stakingParams"
  ): TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint] & {
        minStakeAmount: bigint;
        maxStakeAmount: bigint;
        lockPeriod: bigint;
        rewardRate: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateDAOParams"
  ): TypedContractMethod<
    [_params: ContractParameters.DAOParamsStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateFinanceParams"
  ): TypedContractMethod<
    [_params: ContractParameters.FinanceParamsStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateStakingParams"
  ): TypedContractMethod<
    [_params: ContractParameters.StakingParamsStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateVotingParams"
  ): TypedContractMethod<
    [_params: ContractParameters.VotingParamsStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "votingParams"
  ): TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint, bigint] & {
        minVotingPeriod: bigint;
        maxVotingPeriod: bigint;
        quorumPercentage: bigint;
        minProposalThreshold: bigint;
        votingDelay: bigint;
      }
    ],
    "view"
  >;

  getEvent(
    key: "DAOParamsUpdated"
  ): TypedContractEvent<
    DAOParamsUpdatedEvent.InputTuple,
    DAOParamsUpdatedEvent.OutputTuple,
    DAOParamsUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "FinanceParamsUpdated"
  ): TypedContractEvent<
    FinanceParamsUpdatedEvent.InputTuple,
    FinanceParamsUpdatedEvent.OutputTuple,
    FinanceParamsUpdatedEvent.OutputObject
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
    key: "StakingParamsUpdated"
  ): TypedContractEvent<
    StakingParamsUpdatedEvent.InputTuple,
    StakingParamsUpdatedEvent.OutputTuple,
    StakingParamsUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "VotingParamsUpdated"
  ): TypedContractEvent<
    VotingParamsUpdatedEvent.InputTuple,
    VotingParamsUpdatedEvent.OutputTuple,
    VotingParamsUpdatedEvent.OutputObject
  >;

  filters: {
    "DAOParamsUpdated(tuple)": TypedContractEvent<
      DAOParamsUpdatedEvent.InputTuple,
      DAOParamsUpdatedEvent.OutputTuple,
      DAOParamsUpdatedEvent.OutputObject
    >;
    DAOParamsUpdated: TypedContractEvent<
      DAOParamsUpdatedEvent.InputTuple,
      DAOParamsUpdatedEvent.OutputTuple,
      DAOParamsUpdatedEvent.OutputObject
    >;

    "FinanceParamsUpdated(tuple)": TypedContractEvent<
      FinanceParamsUpdatedEvent.InputTuple,
      FinanceParamsUpdatedEvent.OutputTuple,
      FinanceParamsUpdatedEvent.OutputObject
    >;
    FinanceParamsUpdated: TypedContractEvent<
      FinanceParamsUpdatedEvent.InputTuple,
      FinanceParamsUpdatedEvent.OutputTuple,
      FinanceParamsUpdatedEvent.OutputObject
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

    "StakingParamsUpdated(tuple)": TypedContractEvent<
      StakingParamsUpdatedEvent.InputTuple,
      StakingParamsUpdatedEvent.OutputTuple,
      StakingParamsUpdatedEvent.OutputObject
    >;
    StakingParamsUpdated: TypedContractEvent<
      StakingParamsUpdatedEvent.InputTuple,
      StakingParamsUpdatedEvent.OutputTuple,
      StakingParamsUpdatedEvent.OutputObject
    >;

    "VotingParamsUpdated(tuple)": TypedContractEvent<
      VotingParamsUpdatedEvent.InputTuple,
      VotingParamsUpdatedEvent.OutputTuple,
      VotingParamsUpdatedEvent.OutputObject
    >;
    VotingParamsUpdated: TypedContractEvent<
      VotingParamsUpdatedEvent.InputTuple,
      VotingParamsUpdatedEvent.OutputTuple,
      VotingParamsUpdatedEvent.OutputObject
    >;
  };
}
