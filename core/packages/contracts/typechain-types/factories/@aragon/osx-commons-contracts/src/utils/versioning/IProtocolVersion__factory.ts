/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IProtocolVersion,
  IProtocolVersionInterface,
} from "../../../../../../@aragon/osx-commons-contracts/src/utils/versioning/IProtocolVersion";
import { Contract, Interface, type ContractRunner } from "ethers";

const _abi = [
  {
    inputs: [],
    name: "protocolVersion",
    outputs: [
      {
        internalType: "uint8[3]",
        name: "_version",
        type: "uint8[3]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IProtocolVersion__factory {
  static readonly abi = _abi;
  static createInterface(): IProtocolVersionInterface {
    return new Interface(_abi) as IProtocolVersionInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IProtocolVersion {
    return new Contract(address, _abi, runner) as unknown as IProtocolVersion;
  }
}
