/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  INameResolver,
  INameResolverInterface,
} from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/INameResolver";
import { Contract, Interface, type ContractRunner } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "NameChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class INameResolver__factory {
  static readonly abi = _abi;
  static createInterface(): INameResolverInterface {
    return new Interface(_abi) as INameResolverInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): INameResolver {
    return new Contract(address, _abi, runner) as unknown as INameResolver;
  }
}
