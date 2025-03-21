/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { NonPayableOverrides } from "../../../../common";
import type {
  ActionExecute,
  ActionExecuteInterface,
} from "../../../../src/test/dao/ActionExecute";
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";

const _abi = [
  {
    inputs: [],
    name: "fail",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newNum",
        type: "uint256",
      },
    ],
    name: "setTest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60808060405234601957600a60005560f7908161001f8239f35b600080fdfe6080806040526004361015601257600080fd5b60003560e01c9081636ca1f9331460a4575063a9cc471814603257600080fd5b34609f576000600319360112609f5760646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f416374696f6e457865637574653a5265766572740000000000000000000000006044820152fd5b600080fd5b34609f576020600319360112609f57602090600435806000558152f3fea2646970667358221220a4d53dd6c91eadc1051f44a9fe15c3df3230e3f9c7437e7d67317ea121e6a92864736f6c634300081c0033";

type ActionExecuteConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ActionExecuteConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ActionExecute__factory extends ContractFactory {
  constructor(...args: ActionExecuteConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      ActionExecute & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ActionExecute__factory {
    return super.connect(runner) as ActionExecute__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ActionExecuteInterface {
    return new Interface(_abi) as ActionExecuteInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ActionExecute {
    return new Contract(address, _abi, runner) as unknown as ActionExecute;
  }
}
