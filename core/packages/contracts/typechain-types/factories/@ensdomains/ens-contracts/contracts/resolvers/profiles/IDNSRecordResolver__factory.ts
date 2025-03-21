/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IDNSRecordResolver,
  IDNSRecordResolverInterface,
} from "../../../../../../@ensdomains/ens-contracts/contracts/resolvers/profiles/IDNSRecordResolver";
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
        name: "name",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "resource",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "record",
        type: "bytes",
      },
    ],
    name: "DNSRecordChanged",
    type: "event",
  },
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
        name: "name",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "resource",
        type: "uint16",
      },
    ],
    name: "DNSRecordDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "DNSZoneCleared",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "uint16",
        name: "resource",
        type: "uint16",
      },
    ],
    name: "dnsRecord",
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

export class IDNSRecordResolver__factory {
  static readonly abi = _abi;
  static createInterface(): IDNSRecordResolverInterface {
    return new Interface(_abi) as IDNSRecordResolverInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IDNSRecordResolver {
    return new Contract(address, _abi, runner) as unknown as IDNSRecordResolver;
  }
}
