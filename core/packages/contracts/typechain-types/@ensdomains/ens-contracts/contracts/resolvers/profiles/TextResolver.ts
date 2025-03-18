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
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";

export interface TextResolverInterface extends Interface {
  getFunction(
    nameOrSignature: "setText" | "supportsInterface" | "text"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "TextChanged"): EventFragment;

  encodeFunctionData(
    functionFragment: "setText",
    values: [BytesLike, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "text",
    values: [BytesLike, string]
  ): string;

  decodeFunctionResult(functionFragment: "setText", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "text", data: BytesLike): Result;
}

export namespace TextChangedEvent {
  export type InputTuple = [node: BytesLike, indexedKey: string, key: string];
  export type OutputTuple = [node: string, indexedKey: string, key: string];
  export interface OutputObject {
    node: string;
    indexedKey: string;
    key: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface TextResolver extends BaseContract {
  connect(runner?: ContractRunner | null): TextResolver;
  waitForDeployment(): Promise<this>;

  interface: TextResolverInterface;

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

  setText: TypedContractMethod<
    [node: BytesLike, key: string, value: string],
    [void],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceID: BytesLike],
    [boolean],
    "view"
  >;

  text: TypedContractMethod<[node: BytesLike, key: string], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "setText"
  ): TypedContractMethod<
    [node: BytesLike, key: string, value: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "text"
  ): TypedContractMethod<[node: BytesLike, key: string], [string], "view">;

  getEvent(
    key: "TextChanged"
  ): TypedContractEvent<
    TextChangedEvent.InputTuple,
    TextChangedEvent.OutputTuple,
    TextChangedEvent.OutputObject
  >;

  filters: {
    "TextChanged(bytes32,string,string)": TypedContractEvent<
      TextChangedEvent.InputTuple,
      TextChangedEvent.OutputTuple,
      TextChangedEvent.OutputObject
    >;
    TextChanged: TypedContractEvent<
      TextChangedEvent.InputTuple,
      TextChangedEvent.OutputTuple,
      TextChangedEvent.OutputObject
    >;
  };
}
