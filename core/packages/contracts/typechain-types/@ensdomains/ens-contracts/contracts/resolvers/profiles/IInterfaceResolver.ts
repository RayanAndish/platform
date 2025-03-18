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

export interface IInterfaceResolverInterface extends Interface {
  getFunction(nameOrSignature: "interfaceImplementer"): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "InterfaceChanged"): EventFragment;

  encodeFunctionData(
    functionFragment: "interfaceImplementer",
    values: [BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "interfaceImplementer",
    data: BytesLike
  ): Result;
}

export namespace InterfaceChangedEvent {
  export type InputTuple = [
    node: BytesLike,
    interfaceID: BytesLike,
    implementer: AddressLike
  ];
  export type OutputTuple = [
    node: string,
    interfaceID: string,
    implementer: string
  ];
  export interface OutputObject {
    node: string;
    interfaceID: string;
    implementer: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IInterfaceResolver extends BaseContract {
  connect(runner?: ContractRunner | null): IInterfaceResolver;
  waitForDeployment(): Promise<this>;

  interface: IInterfaceResolverInterface;

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

  interfaceImplementer: TypedContractMethod<
    [node: BytesLike, interfaceID: BytesLike],
    [string],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "interfaceImplementer"
  ): TypedContractMethod<
    [node: BytesLike, interfaceID: BytesLike],
    [string],
    "view"
  >;

  getEvent(
    key: "InterfaceChanged"
  ): TypedContractEvent<
    InterfaceChangedEvent.InputTuple,
    InterfaceChangedEvent.OutputTuple,
    InterfaceChangedEvent.OutputObject
  >;

  filters: {
    "InterfaceChanged(bytes32,bytes4,address)": TypedContractEvent<
      InterfaceChangedEvent.InputTuple,
      InterfaceChangedEvent.OutputTuple,
      InterfaceChangedEvent.OutputObject
    >;
    InterfaceChanged: TypedContractEvent<
      InterfaceChangedEvent.InputTuple,
      InterfaceChangedEvent.OutputTuple,
      InterfaceChangedEvent.OutputObject
    >;
  };
}
