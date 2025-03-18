/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { NonPayableOverrides } from "../../../../../../common";
import type {
  PluginCloneableV1MockBad,
  PluginCloneableV1MockBadInterface,
} from "../../../../../../src/test/plugin/Cloneable/PluginCloneableMock.sol/PluginCloneableV1MockBad";
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IDAO",
        name: "_dao",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "state1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523460135760ba908160198239f35b600080fdfe6080806040526004361015601257600080fd5b60003560e01c9081636accab8c14606b575063c4d66de814603257600080fd5b34606657602060031936011260665760043573ffffffffffffffffffffffffffffffffffffffff8116036066576001600055005b600080fd5b3460665760006003193601126066576020906000548152f3fea2646970667358221220d3565cbdd32835ba5e1102445db61d10bdba0b1fc791d321ba79ec25dbb29c0264736f6c634300081c0033";

type PluginCloneableV1MockBadConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PluginCloneableV1MockBadConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PluginCloneableV1MockBad__factory extends ContractFactory {
  constructor(...args: PluginCloneableV1MockBadConstructorParams) {
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
      PluginCloneableV1MockBad & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): PluginCloneableV1MockBad__factory {
    return super.connect(runner) as PluginCloneableV1MockBad__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PluginCloneableV1MockBadInterface {
    return new Interface(_abi) as PluginCloneableV1MockBadInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PluginCloneableV1MockBad {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as PluginCloneableV1MockBad;
  }
}
