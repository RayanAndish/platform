/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
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
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";

export interface ActionExecuteInterface extends Interface {
  getFunction(nameOrSignature: "fail" | "setTest"): FunctionFragment;

  encodeFunctionData(functionFragment: "fail", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setTest",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "fail", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setTest", data: BytesLike): Result;
}

export interface ActionExecute extends BaseContract {
  connect(runner?: ContractRunner | null): ActionExecute;
  waitForDeployment(): Promise<this>;

  interface: ActionExecuteInterface;

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

  fail: TypedContractMethod<[], [void], "view">;

  setTest: TypedContractMethod<[newNum: BigNumberish], [bigint], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(nameOrSignature: "fail"): TypedContractMethod<[], [void], "view">;
  getFunction(
    nameOrSignature: "setTest"
  ): TypedContractMethod<[newNum: BigNumberish], [bigint], "nonpayable">;

  filters: {};
}
