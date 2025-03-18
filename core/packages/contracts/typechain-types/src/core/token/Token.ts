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

export interface TokenInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "MAX_LOCK_PERIOD"
      | "MIN_LOCK_PERIOD"
      | "PRICE_PRECISION"
      | "accControl"
      | "acceptOwnership"
      | "allowance"
      | "approve"
      | "assetShares"
      | "assets"
      | "balanceOf"
      | "decimals"
      | "decreaseAllowance"
      | "getAssetDetails"
      | "hasher"
      | "increaseAllowance"
      | "lockAsset"
      | "minCollateralRatio"
      | "name"
      | "ownedAssets"
      | "owner"
      | "pause"
      | "paused"
      | "pendingOwner"
      | "priceOracles"
      | "registerAsset"
      | "renounceOwnership"
      | "symbol"
      | "totalSupply"
      | "transactionHashes"
      | "transfer"
      | "transferFrom"
      | "transferOwnership"
      | "unlockAsset"
      | "unpause"
      | "updateAssetPrice"
      | "updateCollateralRatio"
      | "updatePriceOracle"
      | "validateAsset"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "AssetLiquidated"
      | "AssetLocked"
      | "AssetPriceUpdated"
      | "AssetRegistered"
      | "AssetUnlocked"
      | "AssetValidated"
      | "CollateralRatioUpdated"
      | "NFTMinted"
      | "OwnershipTransferStarted"
      | "OwnershipTransferred"
      | "Paused"
      | "PriceOracleUpdated"
      | "Transfer"
      | "Unpaused"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "MAX_LOCK_PERIOD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MIN_LOCK_PERIOD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PRICE_PRECISION",
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
    functionFragment: "allowance",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "assetShares",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "assets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAssetDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "hasher", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lockAsset",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "minCollateralRatio",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownedAssets",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "priceOracles",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "registerAsset",
    values: [BigNumberish, string, BigNumberish, boolean, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transactionHashes",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "unlockAsset",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updateAssetPrice",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateCollateralRatio",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updatePriceOracle",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "validateAsset",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "MAX_LOCK_PERIOD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MIN_LOCK_PERIOD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PRICE_PRECISION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "accControl", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "assetShares",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "assets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAssetDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hasher", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lockAsset", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "minCollateralRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ownedAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "priceOracles",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactionHashes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unlockAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateAssetPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateCollateralRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updatePriceOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validateAsset",
    data: BytesLike
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    spender: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [owner: string, spender: string, value: bigint];
  export interface OutputObject {
    owner: string;
    spender: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AssetLiquidatedEvent {
  export type InputTuple = [assetId: BigNumberish, liquidator: AddressLike];
  export type OutputTuple = [assetId: bigint, liquidator: string];
  export interface OutputObject {
    assetId: bigint;
    liquidator: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AssetLockedEvent {
  export type InputTuple = [
    assetId: BigNumberish,
    lockPeriod: BigNumberish,
    lockEndTime: BigNumberish
  ];
  export type OutputTuple = [
    assetId: bigint,
    lockPeriod: bigint,
    lockEndTime: bigint
  ];
  export interface OutputObject {
    assetId: bigint;
    lockPeriod: bigint;
    lockEndTime: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AssetPriceUpdatedEvent {
  export type InputTuple = [
    assetId: BigNumberish,
    oldValue: BigNumberish,
    newValue: BigNumberish
  ];
  export type OutputTuple = [
    assetId: bigint,
    oldValue: bigint,
    newValue: bigint
  ];
  export interface OutputObject {
    assetId: bigint;
    oldValue: bigint;
    newValue: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AssetRegisteredEvent {
  export type InputTuple = [
    assetId: BigNumberish,
    assetType: BigNumberish,
    valueInTokens: BigNumberish,
    owner: AddressLike,
    hash: BytesLike
  ];
  export type OutputTuple = [
    assetId: bigint,
    assetType: bigint,
    valueInTokens: bigint,
    owner: string,
    hash: string
  ];
  export interface OutputObject {
    assetId: bigint;
    assetType: bigint;
    valueInTokens: bigint;
    owner: string;
    hash: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AssetUnlockedEvent {
  export type InputTuple = [assetId: BigNumberish];
  export type OutputTuple = [assetId: bigint];
  export interface OutputObject {
    assetId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AssetValidatedEvent {
  export type InputTuple = [assetId: BigNumberish, validator: AddressLike];
  export type OutputTuple = [assetId: bigint, validator: string];
  export interface OutputObject {
    assetId: bigint;
    validator: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CollateralRatioUpdatedEvent {
  export type InputTuple = [assetType: BigNumberish, newRatio: BigNumberish];
  export type OutputTuple = [assetType: bigint, newRatio: bigint];
  export interface OutputObject {
    assetType: bigint;
    newRatio: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NFTMintedEvent {
  export type InputTuple = [assetId: BigNumberish, owner: AddressLike];
  export type OutputTuple = [assetId: bigint, owner: string];
  export interface OutputObject {
    assetId: bigint;
    owner: string;
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

export namespace PriceOracleUpdatedEvent {
  export type InputTuple = [
    assetType: BigNumberish,
    price: BigNumberish,
    volatility: BigNumberish
  ];
  export type OutputTuple = [
    assetType: bigint,
    price: bigint,
    volatility: bigint
  ];
  export interface OutputObject {
    assetType: bigint;
    price: bigint;
    volatility: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [from: string, to: string, value: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    value: bigint;
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

export interface Token extends BaseContract {
  connect(runner?: ContractRunner | null): Token;
  waitForDeployment(): Promise<this>;

  interface: TokenInterface;

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

  MAX_LOCK_PERIOD: TypedContractMethod<[], [bigint], "view">;

  MIN_LOCK_PERIOD: TypedContractMethod<[], [bigint], "view">;

  PRICE_PRECISION: TypedContractMethod<[], [bigint], "view">;

  accControl: TypedContractMethod<[], [string], "view">;

  acceptOwnership: TypedContractMethod<[], [void], "nonpayable">;

  allowance: TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;

  approve: TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  assetShares: TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [bigint],
    "view"
  >;

  assets: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        bigint,
        string,
        bigint,
        bigint,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        boolean
      ] & {
        id: bigint;
        assetType: bigint;
        metadata: string;
        valueInTokens: bigint;
        lastValuation: bigint;
        owner: string;
        hash: string;
        status: bigint;
        lockPeriod: bigint;
        lockEndTime: bigint;
        collateralRatio: bigint;
        isNFT: boolean;
      }
    ],
    "view"
  >;

  balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  decimals: TypedContractMethod<[], [bigint], "view">;

  decreaseAllowance: TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  getAssetDetails: TypedContractMethod<
    [assetId: BigNumberish],
    [
      [bigint, bigint, string, bigint, bigint, bigint, boolean] & {
        assetType: bigint;
        valueInTokens: bigint;
        owner: string;
        status: bigint;
        lockEndTime: bigint;
        collateralRatio: bigint;
        isNFT: boolean;
      }
    ],
    "view"
  >;

  hasher: TypedContractMethod<[], [string], "view">;

  increaseAllowance: TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  lockAsset: TypedContractMethod<
    [assetId: BigNumberish, lockPeriod: BigNumberish],
    [void],
    "nonpayable"
  >;

  minCollateralRatio: TypedContractMethod<
    [arg0: BigNumberish],
    [bigint],
    "view"
  >;

  name: TypedContractMethod<[], [string], "view">;

  ownedAssets: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [bigint],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  paused: TypedContractMethod<[], [boolean], "view">;

  pendingOwner: TypedContractMethod<[], [string], "view">;

  priceOracles: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, bigint, bigint, boolean] & {
        lastPrice: bigint;
        lastUpdate: bigint;
        volatility: bigint;
        isActive: boolean;
      }
    ],
    "view"
  >;

  registerAsset: TypedContractMethod<
    [
      assetType: BigNumberish,
      metadata: string,
      valueInTokens: BigNumberish,
      isNFT: boolean,
      lockPeriod: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  symbol: TypedContractMethod<[], [string], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  transactionHashes: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;

  transfer: TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  transferFrom: TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  unlockAsset: TypedContractMethod<
    [assetId: BigNumberish],
    [void],
    "nonpayable"
  >;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  updateAssetPrice: TypedContractMethod<
    [assetId: BigNumberish, newValue: BigNumberish],
    [void],
    "nonpayable"
  >;

  updateCollateralRatio: TypedContractMethod<
    [assetType: BigNumberish, newRatio: BigNumberish],
    [void],
    "nonpayable"
  >;

  updatePriceOracle: TypedContractMethod<
    [assetType: BigNumberish, price: BigNumberish, volatility: BigNumberish],
    [void],
    "nonpayable"
  >;

  validateAsset: TypedContractMethod<
    [assetId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "MAX_LOCK_PERIOD"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MIN_LOCK_PERIOD"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "PRICE_PRECISION"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "accControl"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "acceptOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "allowance"
  ): TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "assetShares"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "assets"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        bigint,
        string,
        bigint,
        bigint,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        boolean
      ] & {
        id: bigint;
        assetType: bigint;
        metadata: string;
        valueInTokens: bigint;
        lastValuation: bigint;
        owner: string;
        hash: string;
        status: bigint;
        lockPeriod: bigint;
        lockEndTime: bigint;
        collateralRatio: bigint;
        isNFT: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "decimals"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "decreaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getAssetDetails"
  ): TypedContractMethod<
    [assetId: BigNumberish],
    [
      [bigint, bigint, string, bigint, bigint, bigint, boolean] & {
        assetType: bigint;
        valueInTokens: bigint;
        owner: string;
        status: bigint;
        lockEndTime: bigint;
        collateralRatio: bigint;
        isNFT: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "hasher"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "increaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "lockAsset"
  ): TypedContractMethod<
    [assetId: BigNumberish, lockPeriod: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "minCollateralRatio"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "ownedAssets"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [bigint],
    "view"
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
    nameOrSignature: "priceOracles"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, bigint, bigint, boolean] & {
        lastPrice: bigint;
        lastUpdate: bigint;
        volatility: bigint;
        isActive: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "registerAsset"
  ): TypedContractMethod<
    [
      assetType: BigNumberish,
      metadata: string,
      valueInTokens: BigNumberish,
      isNFT: boolean,
      lockPeriod: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "symbol"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transactionHashes"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unlockAsset"
  ): TypedContractMethod<[assetId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unpause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateAssetPrice"
  ): TypedContractMethod<
    [assetId: BigNumberish, newValue: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateCollateralRatio"
  ): TypedContractMethod<
    [assetType: BigNumberish, newRatio: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updatePriceOracle"
  ): TypedContractMethod<
    [assetType: BigNumberish, price: BigNumberish, volatility: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "validateAsset"
  ): TypedContractMethod<[assetId: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "AssetLiquidated"
  ): TypedContractEvent<
    AssetLiquidatedEvent.InputTuple,
    AssetLiquidatedEvent.OutputTuple,
    AssetLiquidatedEvent.OutputObject
  >;
  getEvent(
    key: "AssetLocked"
  ): TypedContractEvent<
    AssetLockedEvent.InputTuple,
    AssetLockedEvent.OutputTuple,
    AssetLockedEvent.OutputObject
  >;
  getEvent(
    key: "AssetPriceUpdated"
  ): TypedContractEvent<
    AssetPriceUpdatedEvent.InputTuple,
    AssetPriceUpdatedEvent.OutputTuple,
    AssetPriceUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "AssetRegistered"
  ): TypedContractEvent<
    AssetRegisteredEvent.InputTuple,
    AssetRegisteredEvent.OutputTuple,
    AssetRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "AssetUnlocked"
  ): TypedContractEvent<
    AssetUnlockedEvent.InputTuple,
    AssetUnlockedEvent.OutputTuple,
    AssetUnlockedEvent.OutputObject
  >;
  getEvent(
    key: "AssetValidated"
  ): TypedContractEvent<
    AssetValidatedEvent.InputTuple,
    AssetValidatedEvent.OutputTuple,
    AssetValidatedEvent.OutputObject
  >;
  getEvent(
    key: "CollateralRatioUpdated"
  ): TypedContractEvent<
    CollateralRatioUpdatedEvent.InputTuple,
    CollateralRatioUpdatedEvent.OutputTuple,
    CollateralRatioUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "NFTMinted"
  ): TypedContractEvent<
    NFTMintedEvent.InputTuple,
    NFTMintedEvent.OutputTuple,
    NFTMintedEvent.OutputObject
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
    key: "PriceOracleUpdated"
  ): TypedContractEvent<
    PriceOracleUpdatedEvent.InputTuple,
    PriceOracleUpdatedEvent.OutputTuple,
    PriceOracleUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused"
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "AssetLiquidated(uint256,address)": TypedContractEvent<
      AssetLiquidatedEvent.InputTuple,
      AssetLiquidatedEvent.OutputTuple,
      AssetLiquidatedEvent.OutputObject
    >;
    AssetLiquidated: TypedContractEvent<
      AssetLiquidatedEvent.InputTuple,
      AssetLiquidatedEvent.OutputTuple,
      AssetLiquidatedEvent.OutputObject
    >;

    "AssetLocked(uint256,uint256,uint256)": TypedContractEvent<
      AssetLockedEvent.InputTuple,
      AssetLockedEvent.OutputTuple,
      AssetLockedEvent.OutputObject
    >;
    AssetLocked: TypedContractEvent<
      AssetLockedEvent.InputTuple,
      AssetLockedEvent.OutputTuple,
      AssetLockedEvent.OutputObject
    >;

    "AssetPriceUpdated(uint256,uint256,uint256)": TypedContractEvent<
      AssetPriceUpdatedEvent.InputTuple,
      AssetPriceUpdatedEvent.OutputTuple,
      AssetPriceUpdatedEvent.OutputObject
    >;
    AssetPriceUpdated: TypedContractEvent<
      AssetPriceUpdatedEvent.InputTuple,
      AssetPriceUpdatedEvent.OutputTuple,
      AssetPriceUpdatedEvent.OutputObject
    >;

    "AssetRegistered(uint256,uint8,uint256,address,bytes32)": TypedContractEvent<
      AssetRegisteredEvent.InputTuple,
      AssetRegisteredEvent.OutputTuple,
      AssetRegisteredEvent.OutputObject
    >;
    AssetRegistered: TypedContractEvent<
      AssetRegisteredEvent.InputTuple,
      AssetRegisteredEvent.OutputTuple,
      AssetRegisteredEvent.OutputObject
    >;

    "AssetUnlocked(uint256)": TypedContractEvent<
      AssetUnlockedEvent.InputTuple,
      AssetUnlockedEvent.OutputTuple,
      AssetUnlockedEvent.OutputObject
    >;
    AssetUnlocked: TypedContractEvent<
      AssetUnlockedEvent.InputTuple,
      AssetUnlockedEvent.OutputTuple,
      AssetUnlockedEvent.OutputObject
    >;

    "AssetValidated(uint256,address)": TypedContractEvent<
      AssetValidatedEvent.InputTuple,
      AssetValidatedEvent.OutputTuple,
      AssetValidatedEvent.OutputObject
    >;
    AssetValidated: TypedContractEvent<
      AssetValidatedEvent.InputTuple,
      AssetValidatedEvent.OutputTuple,
      AssetValidatedEvent.OutputObject
    >;

    "CollateralRatioUpdated(uint8,uint256)": TypedContractEvent<
      CollateralRatioUpdatedEvent.InputTuple,
      CollateralRatioUpdatedEvent.OutputTuple,
      CollateralRatioUpdatedEvent.OutputObject
    >;
    CollateralRatioUpdated: TypedContractEvent<
      CollateralRatioUpdatedEvent.InputTuple,
      CollateralRatioUpdatedEvent.OutputTuple,
      CollateralRatioUpdatedEvent.OutputObject
    >;

    "NFTMinted(uint256,address)": TypedContractEvent<
      NFTMintedEvent.InputTuple,
      NFTMintedEvent.OutputTuple,
      NFTMintedEvent.OutputObject
    >;
    NFTMinted: TypedContractEvent<
      NFTMintedEvent.InputTuple,
      NFTMintedEvent.OutputTuple,
      NFTMintedEvent.OutputObject
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

    "PriceOracleUpdated(uint8,uint256,uint256)": TypedContractEvent<
      PriceOracleUpdatedEvent.InputTuple,
      PriceOracleUpdatedEvent.OutputTuple,
      PriceOracleUpdatedEvent.OutputObject
    >;
    PriceOracleUpdated: TypedContractEvent<
      PriceOracleUpdatedEvent.InputTuple,
      PriceOracleUpdatedEvent.OutputTuple,
      PriceOracleUpdatedEvent.OutputObject
    >;

    "Transfer(address,address,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
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
