/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IExecutor,
  IExecutorInterface,
} from "../../../../../@aragon/osx-commons-contracts/src/executors/IExecutor";
import { Contract, Interface, type ContractRunner } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "actor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "callId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        indexed: false,
        internalType: "struct Action[]",
        name: "actions",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "allowFailureMap",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "failureMap",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes[]",
        name: "execResults",
        type: "bytes[]",
      },
    ],
    name: "Executed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_callId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Action[]",
        name: "_actions",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "_allowFailureMap",
        type: "uint256",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bytes[]",
        name: "",
        type: "bytes[]",
      },
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

export class IExecutor__factory {
  static readonly abi = _abi;
  static createInterface(): IExecutorInterface {
    return new Interface(_abi) as IExecutorInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IExecutor {
    return new Contract(address, _abi, runner) as unknown as IExecutor;
  }
}
