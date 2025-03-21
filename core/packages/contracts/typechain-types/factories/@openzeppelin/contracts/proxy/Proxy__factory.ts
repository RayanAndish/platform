/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  Proxy,
  ProxyInterface,
} from "../../../../@openzeppelin/contracts/proxy/Proxy";
import { Contract, Interface, type ContractRunner } from "ethers";

const _abi = [
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

export class Proxy__factory {
  static readonly abi = _abi;
  static createInterface(): ProxyInterface {
    return new Interface(_abi) as ProxyInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Proxy {
    return new Contract(address, _abi, runner) as unknown as Proxy;
  }
}
