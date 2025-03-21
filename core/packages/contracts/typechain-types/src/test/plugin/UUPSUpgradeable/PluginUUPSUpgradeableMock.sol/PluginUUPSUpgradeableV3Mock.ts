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
} from "../../../../../common";
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

export declare namespace IPlugin {
  export type TargetConfigStruct = {
    target: AddressLike;
    operation: BigNumberish;
  };

  export type TargetConfigStructOutput = [target: string, operation: bigint] & {
    target: string;
    operation: bigint;
  };
}

export interface PluginUUPSUpgradeableV3MockInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "SET_TARGET_CONFIG_PERMISSION_ID"
      | "UPGRADE_PLUGIN_PERMISSION_ID"
      | "dao"
      | "getCurrentTargetConfig"
      | "getTargetConfig"
      | "implementation"
      | "initialize"
      | "initializeV1toV3"
      | "initializeV2toV3"
      | "pluginType"
      | "protocolVersion"
      | "proxiableUUID"
      | "setTargetConfig"
      | "state1"
      | "state2"
      | "state3"
      | "supportsInterface"
      | "upgradeTo"
      | "upgradeToAndCall"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AdminChanged"
      | "BeaconUpgraded"
      | "Initialized"
      | "TargetSet"
      | "Upgraded"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "SET_TARGET_CONFIG_PERMISSION_ID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "UPGRADE_PLUGIN_PERMISSION_ID",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "dao", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getCurrentTargetConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTargetConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "implementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initializeV1toV3",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initializeV2toV3",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pluginType",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "protocolVersion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setTargetConfig",
    values: [IPlugin.TargetConfigStruct]
  ): string;
  encodeFunctionData(functionFragment: "state1", values?: undefined): string;
  encodeFunctionData(functionFragment: "state2", values?: undefined): string;
  encodeFunctionData(functionFragment: "state3", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [AddressLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "SET_TARGET_CONFIG_PERMISSION_ID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "UPGRADE_PLUGIN_PERMISSION_ID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "dao", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentTargetConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTargetConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initializeV1toV3",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializeV2toV3",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pluginType", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "protocolVersion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTargetConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "state1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "state2", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "state3", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;
}

export namespace AdminChangedEvent {
  export type InputTuple = [previousAdmin: AddressLike, newAdmin: AddressLike];
  export type OutputTuple = [previousAdmin: string, newAdmin: string];
  export interface OutputObject {
    previousAdmin: string;
    newAdmin: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BeaconUpgradedEvent {
  export type InputTuple = [beacon: AddressLike];
  export type OutputTuple = [beacon: string];
  export interface OutputObject {
    beacon: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TargetSetEvent {
  export type InputTuple = [newTargetConfig: IPlugin.TargetConfigStruct];
  export type OutputTuple = [newTargetConfig: IPlugin.TargetConfigStructOutput];
  export interface OutputObject {
    newTargetConfig: IPlugin.TargetConfigStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UpgradedEvent {
  export type InputTuple = [implementation: AddressLike];
  export type OutputTuple = [implementation: string];
  export interface OutputObject {
    implementation: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface PluginUUPSUpgradeableV3Mock extends BaseContract {
  connect(runner?: ContractRunner | null): PluginUUPSUpgradeableV3Mock;
  waitForDeployment(): Promise<this>;

  interface: PluginUUPSUpgradeableV3MockInterface;

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

  SET_TARGET_CONFIG_PERMISSION_ID: TypedContractMethod<[], [string], "view">;

  UPGRADE_PLUGIN_PERMISSION_ID: TypedContractMethod<[], [string], "view">;

  dao: TypedContractMethod<[], [string], "view">;

  getCurrentTargetConfig: TypedContractMethod<
    [],
    [IPlugin.TargetConfigStructOutput],
    "view"
  >;

  getTargetConfig: TypedContractMethod<
    [],
    [IPlugin.TargetConfigStructOutput],
    "view"
  >;

  implementation: TypedContractMethod<[], [string], "view">;

  initialize: TypedContractMethod<[_dao: AddressLike], [void], "nonpayable">;

  initializeV1toV3: TypedContractMethod<[], [void], "nonpayable">;

  initializeV2toV3: TypedContractMethod<[], [void], "nonpayable">;

  pluginType: TypedContractMethod<[], [bigint], "view">;

  protocolVersion: TypedContractMethod<[], [[bigint, bigint, bigint]], "view">;

  proxiableUUID: TypedContractMethod<[], [string], "view">;

  setTargetConfig: TypedContractMethod<
    [_targetConfig: IPlugin.TargetConfigStruct],
    [void],
    "nonpayable"
  >;

  state1: TypedContractMethod<[], [bigint], "view">;

  state2: TypedContractMethod<[], [bigint], "view">;

  state3: TypedContractMethod<[], [bigint], "view">;

  supportsInterface: TypedContractMethod<
    [_interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  upgradeTo: TypedContractMethod<
    [newImplementation: AddressLike],
    [void],
    "nonpayable"
  >;

  upgradeToAndCall: TypedContractMethod<
    [newImplementation: AddressLike, data: BytesLike],
    [void],
    "payable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "SET_TARGET_CONFIG_PERMISSION_ID"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "UPGRADE_PLUGIN_PERMISSION_ID"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "dao"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getCurrentTargetConfig"
  ): TypedContractMethod<[], [IPlugin.TargetConfigStructOutput], "view">;
  getFunction(
    nameOrSignature: "getTargetConfig"
  ): TypedContractMethod<[], [IPlugin.TargetConfigStructOutput], "view">;
  getFunction(
    nameOrSignature: "implementation"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<[_dao: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "initializeV1toV3"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "initializeV2toV3"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "pluginType"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "protocolVersion"
  ): TypedContractMethod<[], [[bigint, bigint, bigint]], "view">;
  getFunction(
    nameOrSignature: "proxiableUUID"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "setTargetConfig"
  ): TypedContractMethod<
    [_targetConfig: IPlugin.TargetConfigStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "state1"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "state2"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "state3"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[_interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "upgradeTo"
  ): TypedContractMethod<
    [newImplementation: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "upgradeToAndCall"
  ): TypedContractMethod<
    [newImplementation: AddressLike, data: BytesLike],
    [void],
    "payable"
  >;

  getEvent(
    key: "AdminChanged"
  ): TypedContractEvent<
    AdminChangedEvent.InputTuple,
    AdminChangedEvent.OutputTuple,
    AdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "BeaconUpgraded"
  ): TypedContractEvent<
    BeaconUpgradedEvent.InputTuple,
    BeaconUpgradedEvent.OutputTuple,
    BeaconUpgradedEvent.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "TargetSet"
  ): TypedContractEvent<
    TargetSetEvent.InputTuple,
    TargetSetEvent.OutputTuple,
    TargetSetEvent.OutputObject
  >;
  getEvent(
    key: "Upgraded"
  ): TypedContractEvent<
    UpgradedEvent.InputTuple,
    UpgradedEvent.OutputTuple,
    UpgradedEvent.OutputObject
  >;

  filters: {
    "AdminChanged(address,address)": TypedContractEvent<
      AdminChangedEvent.InputTuple,
      AdminChangedEvent.OutputTuple,
      AdminChangedEvent.OutputObject
    >;
    AdminChanged: TypedContractEvent<
      AdminChangedEvent.InputTuple,
      AdminChangedEvent.OutputTuple,
      AdminChangedEvent.OutputObject
    >;

    "BeaconUpgraded(address)": TypedContractEvent<
      BeaconUpgradedEvent.InputTuple,
      BeaconUpgradedEvent.OutputTuple,
      BeaconUpgradedEvent.OutputObject
    >;
    BeaconUpgraded: TypedContractEvent<
      BeaconUpgradedEvent.InputTuple,
      BeaconUpgradedEvent.OutputTuple,
      BeaconUpgradedEvent.OutputObject
    >;

    "Initialized(uint8)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "TargetSet(tuple)": TypedContractEvent<
      TargetSetEvent.InputTuple,
      TargetSetEvent.OutputTuple,
      TargetSetEvent.OutputObject
    >;
    TargetSet: TypedContractEvent<
      TargetSetEvent.InputTuple,
      TargetSetEvent.OutputTuple,
      TargetSetEvent.OutputObject
    >;

    "Upgraded(address)": TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;
    Upgraded: TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;
  };
}
