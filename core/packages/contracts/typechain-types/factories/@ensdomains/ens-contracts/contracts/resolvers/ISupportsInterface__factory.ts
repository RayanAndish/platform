/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  ISupportsInterface,
  ISupportsInterfaceInterface,
} from "../../../../../@ensdomains/ens-contracts/contracts/resolvers/ISupportsInterface";
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

export class ISupportsInterface__factory {
  static readonly abi = _abi;
  static createInterface(): ISupportsInterfaceInterface {
    return new Interface(_abi) as ISupportsInterfaceInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ISupportsInterface {
    return new Contract(address, _abi, runner) as unknown as ISupportsInterface;
  }
}
