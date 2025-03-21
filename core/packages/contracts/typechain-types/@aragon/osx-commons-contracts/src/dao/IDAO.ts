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

export interface IDAOInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "deposit"
      | "getTrustedForwarder"
      | "hasPermission"
      | "isValidSignature"
      | "registerStandardCallback"
      | "setMetadata"
      | "setSignatureValidator"
      | "setTrustedForwarder"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Deposited"
      | "MetadataSet"
      | "NativeTokenDeposited"
      | "StandardCallbackRegistered"
      | "TrustedForwarderSet"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "deposit",
    values: [AddressLike, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getTrustedForwarder",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "hasPermission",
    values: [AddressLike, AddressLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidSignature",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerStandardCallback",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setMetadata",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setSignatureValidator",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setTrustedForwarder",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasPermission",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerStandardCallback",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMetadata",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSignatureValidator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTrustedForwarder",
    data: BytesLike
  ): Result;
}

export namespace DepositedEvent {
  export type InputTuple = [
    sender: AddressLike,
    token: AddressLike,
    amount: BigNumberish,
    _reference: string
  ];
  export type OutputTuple = [
    sender: string,
    token: string,
    amount: bigint,
    _reference: string
  ];
  export interface OutputObject {
    sender: string;
    token: string;
    amount: bigint;
    _reference: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MetadataSetEvent {
  export type InputTuple = [metadata: BytesLike];
  export type OutputTuple = [metadata: string];
  export interface OutputObject {
    metadata: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NativeTokenDepositedEvent {
  export type InputTuple = [sender: AddressLike, amount: BigNumberish];
  export type OutputTuple = [sender: string, amount: bigint];
  export interface OutputObject {
    sender: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace StandardCallbackRegisteredEvent {
  export type InputTuple = [
    interfaceId: BytesLike,
    callbackSelector: BytesLike,
    magicNumber: BytesLike
  ];
  export type OutputTuple = [
    interfaceId: string,
    callbackSelector: string,
    magicNumber: string
  ];
  export interface OutputObject {
    interfaceId: string;
    callbackSelector: string;
    magicNumber: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TrustedForwarderSetEvent {
  export type InputTuple = [forwarder: AddressLike];
  export type OutputTuple = [forwarder: string];
  export interface OutputObject {
    forwarder: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IDAO extends BaseContract {
  connect(runner?: ContractRunner | null): IDAO;
  waitForDeployment(): Promise<this>;

  interface: IDAOInterface;

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

  deposit: TypedContractMethod<
    [_token: AddressLike, _amount: BigNumberish, _reference: string],
    [void],
    "payable"
  >;

  getTrustedForwarder: TypedContractMethod<[], [string], "view">;

  hasPermission: TypedContractMethod<
    [
      _where: AddressLike,
      _who: AddressLike,
      _permissionId: BytesLike,
      _data: BytesLike
    ],
    [boolean],
    "view"
  >;

  isValidSignature: TypedContractMethod<
    [_hash: BytesLike, _signature: BytesLike],
    [string],
    "nonpayable"
  >;

  registerStandardCallback: TypedContractMethod<
    [
      _interfaceId: BytesLike,
      _callbackSelector: BytesLike,
      _magicNumber: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  setMetadata: TypedContractMethod<
    [_metadata: BytesLike],
    [void],
    "nonpayable"
  >;

  setSignatureValidator: TypedContractMethod<
    [arg0: AddressLike],
    [void],
    "nonpayable"
  >;

  setTrustedForwarder: TypedContractMethod<
    [_trustedForwarder: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "deposit"
  ): TypedContractMethod<
    [_token: AddressLike, _amount: BigNumberish, _reference: string],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "getTrustedForwarder"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "hasPermission"
  ): TypedContractMethod<
    [
      _where: AddressLike,
      _who: AddressLike,
      _permissionId: BytesLike,
      _data: BytesLike
    ],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "isValidSignature"
  ): TypedContractMethod<
    [_hash: BytesLike, _signature: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "registerStandardCallback"
  ): TypedContractMethod<
    [
      _interfaceId: BytesLike,
      _callbackSelector: BytesLike,
      _magicNumber: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setMetadata"
  ): TypedContractMethod<[_metadata: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setSignatureValidator"
  ): TypedContractMethod<[arg0: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setTrustedForwarder"
  ): TypedContractMethod<
    [_trustedForwarder: AddressLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "Deposited"
  ): TypedContractEvent<
    DepositedEvent.InputTuple,
    DepositedEvent.OutputTuple,
    DepositedEvent.OutputObject
  >;
  getEvent(
    key: "MetadataSet"
  ): TypedContractEvent<
    MetadataSetEvent.InputTuple,
    MetadataSetEvent.OutputTuple,
    MetadataSetEvent.OutputObject
  >;
  getEvent(
    key: "NativeTokenDeposited"
  ): TypedContractEvent<
    NativeTokenDepositedEvent.InputTuple,
    NativeTokenDepositedEvent.OutputTuple,
    NativeTokenDepositedEvent.OutputObject
  >;
  getEvent(
    key: "StandardCallbackRegistered"
  ): TypedContractEvent<
    StandardCallbackRegisteredEvent.InputTuple,
    StandardCallbackRegisteredEvent.OutputTuple,
    StandardCallbackRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "TrustedForwarderSet"
  ): TypedContractEvent<
    TrustedForwarderSetEvent.InputTuple,
    TrustedForwarderSetEvent.OutputTuple,
    TrustedForwarderSetEvent.OutputObject
  >;

  filters: {
    "Deposited(address,address,uint256,string)": TypedContractEvent<
      DepositedEvent.InputTuple,
      DepositedEvent.OutputTuple,
      DepositedEvent.OutputObject
    >;
    Deposited: TypedContractEvent<
      DepositedEvent.InputTuple,
      DepositedEvent.OutputTuple,
      DepositedEvent.OutputObject
    >;

    "MetadataSet(bytes)": TypedContractEvent<
      MetadataSetEvent.InputTuple,
      MetadataSetEvent.OutputTuple,
      MetadataSetEvent.OutputObject
    >;
    MetadataSet: TypedContractEvent<
      MetadataSetEvent.InputTuple,
      MetadataSetEvent.OutputTuple,
      MetadataSetEvent.OutputObject
    >;

    "NativeTokenDeposited(address,uint256)": TypedContractEvent<
      NativeTokenDepositedEvent.InputTuple,
      NativeTokenDepositedEvent.OutputTuple,
      NativeTokenDepositedEvent.OutputObject
    >;
    NativeTokenDeposited: TypedContractEvent<
      NativeTokenDepositedEvent.InputTuple,
      NativeTokenDepositedEvent.OutputTuple,
      NativeTokenDepositedEvent.OutputObject
    >;

    "StandardCallbackRegistered(bytes4,bytes4,bytes4)": TypedContractEvent<
      StandardCallbackRegisteredEvent.InputTuple,
      StandardCallbackRegisteredEvent.OutputTuple,
      StandardCallbackRegisteredEvent.OutputObject
    >;
    StandardCallbackRegistered: TypedContractEvent<
      StandardCallbackRegisteredEvent.InputTuple,
      StandardCallbackRegisteredEvent.OutputTuple,
      StandardCallbackRegisteredEvent.OutputObject
    >;

    "TrustedForwarderSet(address)": TypedContractEvent<
      TrustedForwarderSetEvent.InputTuple,
      TrustedForwarderSetEvent.OutputTuple,
      TrustedForwarderSetEvent.OutputObject
    >;
    TrustedForwarderSet: TypedContractEvent<
      TrustedForwarderSetEvent.InputTuple,
      TrustedForwarderSetEvent.OutputTuple,
      TrustedForwarderSetEvent.OutputObject
    >;
  };
}
