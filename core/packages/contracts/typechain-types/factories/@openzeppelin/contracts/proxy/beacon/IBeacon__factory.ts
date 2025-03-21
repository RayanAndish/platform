/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IBeacon,
  IBeaconInterface,
} from "../../../../../@openzeppelin/contracts/proxy/beacon/IBeacon";
import { Contract, Interface, type ContractRunner } from "ethers";

const _abi = [
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IBeacon__factory {
  static readonly abi = _abi;
  static createInterface(): IBeaconInterface {
    return new Interface(_abi) as IBeaconInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IBeacon {
    return new Contract(address, _abi, runner) as unknown as IBeacon;
  }
}
