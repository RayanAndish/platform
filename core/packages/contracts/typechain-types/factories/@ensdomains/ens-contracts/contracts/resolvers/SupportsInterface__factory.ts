/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  SupportsInterface,
  SupportsInterfaceInterface,
} from "../../../../../@ensdomains/ens-contracts/contracts/resolvers/SupportsInterface";
import { Contract, Interface, type ContractRunner } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceID",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

export class SupportsInterface__factory {
  static readonly abi = _abi;
  static createInterface(): SupportsInterfaceInterface {
    return new Interface(_abi) as SupportsInterfaceInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): SupportsInterface {
    return new Contract(address, _abi, runner) as unknown as SupportsInterface;
  }
}
