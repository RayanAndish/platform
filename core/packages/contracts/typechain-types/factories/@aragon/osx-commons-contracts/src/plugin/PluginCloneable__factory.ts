/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  PluginCloneable,
  PluginCloneableInterface,
} from "../../../../../@aragon/osx-commons-contracts/src/plugin/PluginCloneable";
import { Contract, Interface, type ContractRunner } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "dao",
        type: "address",
      },
      {
        internalType: "address",
        name: "where",
        type: "address",
      },
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "permissionId",
        type: "bytes32",
      },
    ],
    name: "DaoUnauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "DelegateCallFailed",
    type: "error",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "enum IPlugin.Operation",
            name: "operation",
            type: "uint8",
          },
        ],
        internalType: "struct IPlugin.TargetConfig",
        name: "targetConfig",
        type: "tuple",
      },
    ],
    name: "InvalidTargetConfig",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "enum IPlugin.Operation",
            name: "operation",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct IPlugin.TargetConfig",
        name: "newTargetConfig",
        type: "tuple",
      },
    ],
    name: "TargetSet",
    type: "event",
  },
  {
    inputs: [],
    name: "SET_TARGET_CONFIG_PERMISSION_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dao",
    outputs: [
      {
        internalType: "contract IDAO",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentTargetConfig",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "enum IPlugin.Operation",
            name: "operation",
            type: "uint8",
          },
        ],
        internalType: "struct IPlugin.TargetConfig",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTargetConfig",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "enum IPlugin.Operation",
            name: "operation",
            type: "uint8",
          },
        ],
        internalType: "struct IPlugin.TargetConfig",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pluginType",
    outputs: [
      {
        internalType: "enum IPlugin.PluginType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "protocolVersion",
    outputs: [
      {
        internalType: "uint8[3]",
        name: "",
        type: "uint8[3]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "enum IPlugin.Operation",
            name: "operation",
            type: "uint8",
          },
        ],
        internalType: "struct IPlugin.TargetConfig",
        name: "_targetConfig",
        type: "tuple",
      },
    ],
    name: "setTargetConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_interfaceId",
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
    stateMutability: "view",
    type: "function",
  },
] as const;

export class PluginCloneable__factory {
  static readonly abi = _abi;
  static createInterface(): PluginCloneableInterface {
    return new Interface(_abi) as PluginCloneableInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PluginCloneable {
    return new Contract(address, _abi, runner) as unknown as PluginCloneable;
  }
}
