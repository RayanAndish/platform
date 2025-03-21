/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IContentHashResolver,
  IContentHashResolverInterface,
} from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IContentHashResolver";
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
        internalType: "bytes",
        name: "hash",
        type: "bytes",
      },
    ],
    name: "ContenthashChanged",
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
    name: "contenthash",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IContentHashResolver__factory {
  static readonly abi = _abi;
  static createInterface(): IContentHashResolverInterface {
    return new Interface(_abi) as IContentHashResolverInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IContentHashResolver {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IContentHashResolver;
  }
}
