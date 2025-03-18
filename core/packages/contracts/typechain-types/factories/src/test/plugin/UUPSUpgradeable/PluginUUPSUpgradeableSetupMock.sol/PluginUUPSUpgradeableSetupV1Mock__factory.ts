/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { NonPayableOverrides } from "../../../../../../common";
import type {
  PluginUUPSUpgradeableSetupV1Mock,
  PluginUUPSUpgradeableSetupV1MockInterface,
} from "../../../../../../src/test/plugin/UUPSUpgradeable/PluginUUPSUpgradeableSetupMock.sol/PluginUUPSUpgradeableSetupV1Mock";
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ConflictingValues",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "fromBuild",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "thisBuild",
        type: "uint16",
      },
    ],
    name: "InvalidUpdatePath",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "dao",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "InstallationPrepared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "dao",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "plugin",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "currentHelpers",
            type: "address[]",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        indexed: false,
        internalType: "struct IPluginSetup.SetupPayload",
        name: "payload",
        type: "tuple",
      },
    ],
    name: "UninstallationPrepared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "dao",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "build",
        type: "uint16",
      },
      {
        components: [
          {
            internalType: "address",
            name: "plugin",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "currentHelpers",
            type: "address[]",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        indexed: false,
        internalType: "struct IPluginSetup.SetupPayload",
        name: "payload",
        type: "tuple",
      },
    ],
    name: "UpdatePrepared",
    type: "event",
  },
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
  {
    inputs: [
      {
        internalType: "uint160",
        name: "_helpersCount",
        type: "uint160",
      },
    ],
    name: "mockHelperCount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint160",
        name: "_lowerIndex",
        type: "uint160",
      },
      {
        internalType: "uint160",
        name: "_upperIndex",
        type: "uint160",
      },
    ],
    name: "mockPermissionIndexes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dao",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "prepareInstallation",
    outputs: [
      {
        internalType: "address",
        name: "plugin",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address[]",
            name: "helpers",
            type: "address[]",
          },
          {
            components: [
              {
                internalType: "enum PermissionLib.Operation",
                name: "operation",
                type: "uint8",
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
                internalType: "address",
                name: "condition",
                type: "address",
              },
              {
                internalType: "bytes32",
                name: "permissionId",
                type: "bytes32",
              },
            ],
            internalType: "struct PermissionLib.MultiTargetPermission[]",
            name: "permissions",
            type: "tuple[]",
          },
        ],
        internalType: "struct IPluginSetup.PreparedSetupData",
        name: "preparedSetupData",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dao",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "plugin",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "currentHelpers",
            type: "address[]",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct IPluginSetup.SetupPayload",
        name: "_payload",
        type: "tuple",
      },
    ],
    name: "prepareUninstallation",
    outputs: [
      {
        components: [
          {
            internalType: "enum PermissionLib.Operation",
            name: "operation",
            type: "uint8",
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
            internalType: "address",
            name: "condition",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "permissionId",
            type: "bytes32",
          },
        ],
        internalType: "struct PermissionLib.MultiTargetPermission[]",
        name: "permissions",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dao",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "_fromBuild",
        type: "uint16",
      },
      {
        components: [
          {
            internalType: "address",
            name: "plugin",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "currentHelpers",
            type: "address[]",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct IPluginSetup.SetupPayload",
        name: "_payload",
        type: "tuple",
      },
    ],
    name: "prepareUpdate",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "address[]",
            name: "helpers",
            type: "address[]",
          },
          {
            components: [
              {
                internalType: "enum PermissionLib.Operation",
                name: "operation",
                type: "uint8",
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
                internalType: "address",
                name: "condition",
                type: "address",
              },
              {
                internalType: "bytes32",
                name: "permissionId",
                type: "bytes32",
              },
            ],
            internalType: "struct PermissionLib.MultiTargetPermission[]",
            name: "permissions",
            type: "tuple[]",
          },
        ],
        internalType: "struct IPluginSetup.PreparedSetupData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "reset",
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

const _bytecode =
  "0x60a034606d57601f61124638819003918201601f19168301916001600160401b03831184841017607257808492602094604052833981010312606d57516001600160a01b0381168103606d576080526040516111bd9081610089823960805181818161013601526108e50152f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe608080604052600436101561001357600080fd5b60003560e01c90816301ffc9a7146109bf575080632ae9c6001461094e57806346c20024146109095780635c60da1b146108c55780639cb0a1241461057d578063a8a9c29e146104ea578063bc93bb2e14610472578063d826f88f146104055763f10832f11461008257600080fd5b346104005760406003193601126104005761009b610a8e565b60243567ffffffffffffffff8111610400576100bb903690600401610c62565b6100c3610cd1565b916040517fc4d66de80000000000000000000000000000000000000000000000000000000060208201526001600160a01b03821660248201526024815261010b604482610c3f565b6040519061040c8083019183831067ffffffffffffffff8411176103ea57839261015b92610d7c85397f000000000000000000000000000000000000000000000000000000000000000090610cfb565b03906000f09182156103de576000546001600160a01b031680156103ce576001600160a01b03905b169261018e84610cb9565b9261019c6040519485610c3f565b848452601f196101ab86610cb9565b0136602086013760005b6001600160a01b038116868110156101e5576001600160a01b0391816101dd60019389610d51565b5201166101b5565b505083865260015486906000906001600160a01b031680156103c757905b6002546001600160a01b031680156103be57945b6001600160a01b03861695866001600160a01b0385161161039657610244846001600160a01b0392610d1b565b1693601f1961026b61025587610cb9565b966102636040519889610c3f565b808852610cb9565b01835b8181106103615750506001600160a01b0397845b89811689811015610302578a916102fa600192604051906102a282610c23565b89825280602083015260408201528860608201527fa280eec51ab8e1bc4b6b0c1b7f1bde785761b787a49db404e3e9338ed9b016ef6080820152846102e78b85610d1b565b16906102f3828d610d51565b528a610d51565b500116610282565b8a8561035d867f788f140d37f3ca802bffe7ec3134153ce98a1c58d10bbb00a4b6d449beca9ac8878e8e602085015261034060405192839283610cfb565b0390a1604051938493168352604060208401526040830190610bda565b0390f35b60209060405161037081610c23565b868152868382015286604082015286606082015286608082015282828a0101520161026e565b6004837fe9004f34000000000000000000000000000000000000000000000000000000008152fd5b50600294610217565b5080610203565b506001600160a01b036002610183565b6040513d6000823e3d90fd5b634e487b7160e01b600052604160045260246000fd5b600080fd5b346104005760006003193601126104005773ffffffffffffffffffffffffffffffffffffffff196001541660015573ffffffffffffffffffffffffffffffffffffffff196002541660025573ffffffffffffffffffffffffffffffffffffffff1960005416600055600080f35b346104005760406003193601126104005761048b610a8e565b602435906001600160a01b038216809203610400576001600160a01b031673ffffffffffffffffffffffffffffffffffffffff19600154161760015573ffffffffffffffffffffffffffffffffffffffff196002541617600255600080f35b3461040057606060031936011261040057610503610a8e565b5060243561ffff8116036104005760443567ffffffffffffffff811161040057600319606091360301126104005761035d61053c610cd1565b604051918291604083526040601f19601f606051808488015261056481606089016080610b55565b0116840101906020848184019303016020850152610bda565b3461040057604060031936011261040057610596610a8e565b6024359067ffffffffffffffff8211610400576060600319833603011261040057600154600091906001600160a01b031680156108be575b6002546001600160a01b031680156108b557925b6001600160a01b03841693846001600160a01b0384161161088d5761060f836001600160a01b0392610d1b565b1692601f1961063661062086610cb9565b9561062e6040519788610c3f565b808752610cb9565b01825b818110610858575050825b6001600160a01b038116868110156106d2576001600160a01b03916106ca6001926040519061067282610c23565b84825280602083015260408201528660608201527fa280eec51ab8e1bc4b6b0c1b7f1bde785761b787a49db404e3e9338ed9b016ef6080820152846106b78985610d1b565b16906106c3828b610d51565b5288610d51565b500116610644565b8286896000604051916106e483610c07565b6106f081600401610aa4565b8352602481013567ffffffffffffffff811161085457810191366023840112156108355760048301359261072384610cb9565b936107316040519586610c3f565b808552602060048187019260051b840101019136831161085057602401905b828210610838575050506020840192835260448201359067ffffffffffffffff821161083557507ffcfdc3b542b4ad36e57b00e7f79a3d4121a844f1b7fa32829e4914320236f474936107ed6001600160a01b0394856107bd61035d9a96600461081e9736920101610c62565b936040810194855260405197889716875260406020880152511660408601525160608086015260a0850190610b9d565b90517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0848303016080850152610b78565b0390a1604051918291602083526020830190610ab8565b80fd5b6020809161084584610aa4565b815201910190610750565b8380fd5b8280fd5b60209060405161086781610c23565b858152858382015285604082015285606082015285608082015282828901015201610639565b6004827fe9004f34000000000000000000000000000000000000000000000000000000008152fd5b506001926105e2565b50816105ce565b346104005760006003193601126104005760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b34610400576020600319360112610400576001600160a01b0361092a610a8e565b1673ffffffffffffffffffffffffffffffffffffffff196000541617600055600080f35b346104005760006003193601126104005760608060405161096f8282610c3f565b36903760405161097e81610c07565b60018152600460208201526000604082015260405190816000905b600382106109a657505050f35b60208060019260ff865116815201930191019091610999565b3461040057602060031936011261040057600435907fffffffff00000000000000000000000000000000000000000000000000000000821680920361040057817f99718b500000000000000000000000000000000000000000000000000000000060209314908115610a64575b8115610a3a575b5015158152f35b7f01ffc9a70000000000000000000000000000000000000000000000000000000091501483610a33565b7f2ae9c6000000000000000000000000000000000000000000000000000000000081149150610a2c565b600435906001600160a01b038216820361040057565b35906001600160a01b038216820361040057565b90602080835192838152019201906000905b808210610ad75750505090565b909192835160008151906003821015610b41575082608060209360a093600196526001600160a01b038582015116858401526001600160a01b0360408201511660408401526001600160a01b03606082015116606084015201516080820152019401920190610aca565b80634e487b7160e01b602492526021600452fd5b60005b838110610b685750506000910152565b8181015183820152602001610b58565b90601f19601f602093610b9681518092818752878088019101610b55565b0116010190565b906020808351928381520192019060005b818110610bbb5750505090565b82516001600160a01b0316845260209384019390920191600101610bae565b610c04916020610bf38351604084526040840190610b9d565b920151906020818403910152610ab8565b90565b6060810190811067ffffffffffffffff8211176103ea57604052565b60a0810190811067ffffffffffffffff8211176103ea57604052565b90601f601f19910116810190811067ffffffffffffffff8211176103ea57604052565b81601f820112156104005780359067ffffffffffffffff82116103ea5760405192610c976020601f19601f8601160185610c3f565b8284526020838301011161040057816000926020809301838601378301015290565b67ffffffffffffffff81116103ea5760051b60200190565b604051906040820182811067ffffffffffffffff8211176103ea5760405260606020838281520152565b6040906001600160a01b03610c0494931681528160208201520190610b78565b906001600160a01b03809116911603906001600160a01b038211610d3b57565b634e487b7160e01b600052601160045260246000fd5b8051821015610d655760209160051b010190565b634e487b7160e01b600052603260045260246000fdfe608060405261040c80380380610014816101f7565b9283398101906040818303126101f25780516001600160a01b038116918282036101f2576020810151906001600160401b0382116101f257019183601f840112156101f25782519261006d61006885610232565b6101f7565b938085526020850195602082840101116101f25785602061008e930161024d565b813b15610197577f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b031916821790557fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b600080a281511580159061018f575b610109575b60405160e890816103248239f35b60008061017e9461011a60606101f7565b94602786527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c6020870152660819985a5b195960ca1b60408701525190845af43d15610187573d9161016e61006884610232565b9283523d6000602085013e610270565b503880806100fb565b606091610270565b5060006100f6565b60405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608490fd5b600080fd5b6040519190601f01601f191682016001600160401b0381118382101761021c57604052565b634e487b7160e01b600052604160045260246000fd5b6001600160401b03811161021c57601f01601f191660200190565b60005b8381106102605750506000910152565b8181015183820152602001610250565b919290156102d25750815115610284575090565b3b1561028d5790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b8251909150156102e55750805190602001fd5b6044604051809262461bcd60e51b825260206004830152610315815180928160248601526020868601910161024d565b601f01601f19168101030190fdfe6080604052361560605760008073ffffffffffffffffffffffffffffffffffffffff7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5416368280378136915af43d6000803e15605b573d6000f35b3d6000fd5b60008073ffffffffffffffffffffffffffffffffffffffff7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5416368280378136915af43d6000803e15605b573d6000f3fea2646970667358221220993eafbdeb8055a2fd7aeeab86fbd1bea6d5b1c93c2dfb12168532a2a9e84caa64736f6c634300081c0033a26469706673582212206111e7bebb851b76a176985006ac796c890c4040cff5a9a513bcf6e82ac9db9564736f6c634300081c0033";

type PluginUUPSUpgradeableSetupV1MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PluginUUPSUpgradeableSetupV1MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PluginUUPSUpgradeableSetupV1Mock__factory extends ContractFactory {
  constructor(...args: PluginUUPSUpgradeableSetupV1MockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    implementation: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(implementation, overrides || {});
  }
  override deploy(
    implementation: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(implementation, overrides || {}) as Promise<
      PluginUUPSUpgradeableSetupV1Mock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): PluginUUPSUpgradeableSetupV1Mock__factory {
    return super.connect(runner) as PluginUUPSUpgradeableSetupV1Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PluginUUPSUpgradeableSetupV1MockInterface {
    return new Interface(_abi) as PluginUUPSUpgradeableSetupV1MockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PluginUUPSUpgradeableSetupV1Mock {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as PluginUUPSUpgradeableSetupV1Mock;
  }
}
