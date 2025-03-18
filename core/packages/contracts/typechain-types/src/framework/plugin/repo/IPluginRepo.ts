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
} from "../../../../common";
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

export interface IPluginRepoInterface extends Interface {
  getFunction(
    nameOrSignature: "createVersion" | "updateReleaseMetadata"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "ReleaseMetadataUpdated" | "VersionCreated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "createVersion",
    values: [BigNumberish, AddressLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateReleaseMetadata",
    values: [BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "createVersion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateReleaseMetadata",
    data: BytesLike
  ): Result;
}

export namespace ReleaseMetadataUpdatedEvent {
  export type InputTuple = [release: BigNumberish, releaseMetadata: BytesLike];
  export type OutputTuple = [release: bigint, releaseMetadata: string];
  export interface OutputObject {
    release: bigint;
    releaseMetadata: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VersionCreatedEvent {
  export type InputTuple = [
    release: BigNumberish,
    build: BigNumberish,
    pluginSetup: AddressLike,
    buildMetadata: BytesLike
  ];
  export type OutputTuple = [
    release: bigint,
    build: bigint,
    pluginSetup: string,
    buildMetadata: string
  ];
  export interface OutputObject {
    release: bigint;
    build: bigint;
    pluginSetup: string;
    buildMetadata: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IPluginRepo extends BaseContract {
  connect(runner?: ContractRunner | null): IPluginRepo;
  waitForDeployment(): Promise<this>;

  interface: IPluginRepoInterface;

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

  createVersion: TypedContractMethod<
    [
      _release: BigNumberish,
      _pluginSetupAddress: AddressLike,
      _buildMetadata: BytesLike,
      _releaseMetadata: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  updateReleaseMetadata: TypedContractMethod<
    [_release: BigNumberish, _releaseMetadata: BytesLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createVersion"
  ): TypedContractMethod<
    [
      _release: BigNumberish,
      _pluginSetupAddress: AddressLike,
      _buildMetadata: BytesLike,
      _releaseMetadata: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateReleaseMetadata"
  ): TypedContractMethod<
    [_release: BigNumberish, _releaseMetadata: BytesLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "ReleaseMetadataUpdated"
  ): TypedContractEvent<
    ReleaseMetadataUpdatedEvent.InputTuple,
    ReleaseMetadataUpdatedEvent.OutputTuple,
    ReleaseMetadataUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "VersionCreated"
  ): TypedContractEvent<
    VersionCreatedEvent.InputTuple,
    VersionCreatedEvent.OutputTuple,
    VersionCreatedEvent.OutputObject
  >;

  filters: {
    "ReleaseMetadataUpdated(uint8,bytes)": TypedContractEvent<
      ReleaseMetadataUpdatedEvent.InputTuple,
      ReleaseMetadataUpdatedEvent.OutputTuple,
      ReleaseMetadataUpdatedEvent.OutputObject
    >;
    ReleaseMetadataUpdated: TypedContractEvent<
      ReleaseMetadataUpdatedEvent.InputTuple,
      ReleaseMetadataUpdatedEvent.OutputTuple,
      ReleaseMetadataUpdatedEvent.OutputObject
    >;

    "VersionCreated(uint8,uint16,address,bytes)": TypedContractEvent<
      VersionCreatedEvent.InputTuple,
      VersionCreatedEvent.OutputTuple,
      VersionCreatedEvent.OutputObject
    >;
    VersionCreated: TypedContractEvent<
      VersionCreatedEvent.InputTuple,
      VersionCreatedEvent.OutputTuple,
      VersionCreatedEvent.OutputObject
    >;
  };
}
