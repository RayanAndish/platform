/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { NonPayableOverrides } from "../../../../../../common";
import type {
  PluginUUPSUpgradeableSetupV2Mock,
  PluginUUPSUpgradeableSetupV2MockInterface,
} from "../../../../../../src/test/plugin/UUPSUpgradeable/PluginUUPSUpgradeableSetupMock.sol/PluginUUPSUpgradeableSetupV2Mock";
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "k",
        type: "uint256",
      },
    ],
    name: "amazing",
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
        name: "_currentBuild",
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
        name: "initData",
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
        name: "preparedSetupData",
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
  "0x60a034606d57601f61144d38819003918201601f19168301916001600160401b03831184841017607257808492602094604052833981010312606d57516001600160a01b0381168103606d576080526040516113c49081610089823960805181818161013701526109580152f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe608080604052600436101561001357600080fd5b60003560e01c90816301ffc9a714610a32575080632ae9c600146109c157806346c200241461097c5780635c60da1b146109385780639cb0a1241461072e578063a8a9c29e14610460578063bc93bb2e146103e8578063d826f88f1461037b5763f10832f11461008257600080fd5b346103765760406003193601126103765761009b610b01565b60243567ffffffffffffffff8111610376576100bb903690600401610cce565b906100c4610e08565b906040517fc4d66de80000000000000000000000000000000000000000000000000000000060208201526001600160a01b03821660248201526024815261010c604482610cab565b6040519061040c8083019183831067ffffffffffffffff84111761036057839261015c92610f8385397f000000000000000000000000000000000000000000000000000000000000000090610f02565b03906000f091821561035457610170610e6f565b81526001546000906001600160a01b0316801561034d57905b6002546001600160a01b0316801561034457945b6001600160a01b03861695866001600160a01b0385161161031c576101ca846001600160a01b0392610f22565b1693601f196101f16101db87610d25565b966101e96040519889610cab565b808852610d25565b01835b8181106102e75750506001600160a01b0397845b89811689811015610288578a916102806001926040519061022882610c8f565b89825280602083015260408201528860608201527fa280eec51ab8e1bc4b6b0c1b7f1bde785761b787a49db404e3e9338ed9b016ef60808201528461026d8b85610f22565b1690610279828d610f58565b528a610f58565b500116610208565b8a856102e3867f788f140d37f3ca802bffe7ec3134153ce98a1c58d10bbb00a4b6d449beca9ac8878e8e60208501526102c660405192839283610f02565b0390a1604051938493168352604060208401526040830190610c46565b0390f35b6020906040516102f681610c8f565b868152868382015286604082015286606082015286608082015282828a010152016101f4565b6004837fe9004f34000000000000000000000000000000000000000000000000000000008152fd5b5060029461019d565b5080610189565b6040513d6000823e3d90fd5b634e487b7160e01b600052604160045260246000fd5b600080fd5b346103765760006003193601126103765773ffffffffffffffffffffffffffffffffffffffff196001541660015573ffffffffffffffffffffffffffffffffffffffff196002541660025573ffffffffffffffffffffffffffffffffffffffff1960005416600055600080f35b3461037657604060031936011261037657610401610b01565b602435906001600160a01b038216809203610376576001600160a01b031673ffffffffffffffffffffffffffffffffffffffff19600154161760015573ffffffffffffffffffffffffffffffffffffffff196002541617600255600080f35b3461037657606060031936011261037657610479610b01565b60243561ffff81168091036103765760443567ffffffffffffffff81116103765760606003198236030112610376576060916104b3610e08565b9160018214610545575b6001600160a01b03610537956105206102e395946105007fa7c20c270816878ef6c3ea21c83d577618b234443168362c35e7023422f6d04b953690600401610d3d565b906040519485941684526020840152606060408401526060830190610e32565b0390a1604051938493604085526040850190610bc8565b908382036020850152610c46565b93925090610551610e6f565b81526040517fe27e9a4e0000000000000000000000000000000000000000000000000000000060208201526004815261058b602482610cab565b600154600091906001600160a01b0316801561072557925b6002546001600160a01b0316801561071c57955b6001600160a01b03871696876001600160a01b038716116106f4576105e4866001600160a01b0392610f22565b1695601f1961060b6105f589610d25565b986106036040519a8b610cab565b808a52610d25565b01855b8181106106bf575050855b6001600160a01b038116898110156106a7576001600160a01b039161069f8a600193610698866106908e8e6040519561065187610c8f565b818752806020880152604087015260608601527fa280eec51ab8e1bc4b6b0c1b7f1bde785761b787a49db404e3e9338ed9b016ef608086015287610f22565b168093610f58565b528b610f58565b500116610619565b505060208301969096529691955093925090506104bd565b6020906040516106ce81610c8f565b888152888382015288604082015288606082015288608082015282828c0101520161060e565b6004857fe9004f34000000000000000000000000000000000000000000000000000000008152fd5b506002956105b7565b506001926105a3565b3461037657604060031936011261037657610747610b01565b6024359067ffffffffffffffff82116103765760606003198336030112610376576001546000906001600160a01b0316801561093157905b6002546001600160a01b0316801561092857915b6001600160a01b03831692836001600160a01b0383161161031c576107c0826001600160a01b0392610f22565b1691601f196107e76107d185610d25565b946107df6040519687610cab565b808652610d25565b01815b8181106108f3575050815b6001600160a01b03811685811015610883576001600160a01b039161087b6001926040519061082382610c8f565b84825280602083015260408201528560608201527fa280eec51ab8e1bc4b6b0c1b7f1bde785761b787a49db404e3e9338ed9b016ef6080820152846108688885610f22565b1690610874828a610f58565b5287610f58565b5001166107f5565b6102e3857ffcfdc3b542b4ad36e57b00e7f79a3d4121a844f1b7fa32829e4914320236f4746001600160a01b038a6108dc6108c28e3690600401610d3d565b604051938493168352604060208401526040830190610e32565b0390a1604051918291602083526020830190610b2b565b60209060405161090281610c8f565b8481528483820152846040820152846060820152846080820152828288010152016107ea565b50600191610793565b508061077f565b346103765760006003193601126103765760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b34610376576020600319360112610376576001600160a01b0361099d610b01565b1673ffffffffffffffffffffffffffffffffffffffff196000541617600055600080f35b34610376576000600319360112610376576060806040516109e28282610cab565b3690376040516109f181610c73565b60018152600460208201526000604082015260405190816000905b60038210610a1957505050f35b60208060019260ff865116815201930191019091610a0c565b3461037657602060031936011261037657600435907fffffffff00000000000000000000000000000000000000000000000000000000821680920361037657817f99718b500000000000000000000000000000000000000000000000000000000060209314908115610ad7575b8115610aad575b5015158152f35b7f01ffc9a70000000000000000000000000000000000000000000000000000000091501483610aa6565b7f2ae9c6000000000000000000000000000000000000000000000000000000000081149150610a9f565b600435906001600160a01b038216820361037657565b35906001600160a01b038216820361037657565b90602080835192838152019201906000905b808210610b4a5750505090565b909192835160008151906003821015610bb4575082608060209360a093600196526001600160a01b038582015116858401526001600160a01b0360408201511660408401526001600160a01b03606082015116606084015201516080820152019401920190610b3d565b80634e487b7160e01b602492526021600452fd5b919082519283825260005b848110610bf4575050601f19601f8460006020809697860101520116010190565b80602080928401015182828601015201610bd3565b906020808351928381520192019060005b818110610c275750505090565b82516001600160a01b0316845260209384019390920191600101610c1a565b610c70916020610c5f8351604084526040840190610c09565b920151906020818403910152610b2b565b90565b6060810190811067ffffffffffffffff82111761036057604052565b60a0810190811067ffffffffffffffff82111761036057604052565b90601f601f19910116810190811067ffffffffffffffff82111761036057604052565b81601f820112156103765780359067ffffffffffffffff82116103605760405192610d036020601f19601f8601160185610cab565b8284526020838301011161037657816000926020809301838601378301015290565b67ffffffffffffffff81116103605760051b60200190565b91906060838203126103765760405190610d5682610c73565b8193610d6181610b17565b8352602081013567ffffffffffffffff811161037657810182601f8201121561037657803590610d9082610d25565b91610d9e6040519384610cab565b80835260208084019160051b8301019185831161037657602001905b828210610df057505050602084015260408101359167ffffffffffffffff831161037657604092610deb9201610cce565b910152565b60208091610dfd84610b17565b815201910190610dba565b604051906040820182811067ffffffffffffffff8211176103605760405260606020838281520152565b610c70916001600160a01b0382511681526040610e5e6020840151606060208501526060840190610c09565b920151906040818403910152610bc8565b6000546001600160a01b03168015610ef2576001600160a01b03905b16610e9581610d25565b610ea26040519182610cab565b818152601f19610eb183610d25565b0136602083013760005b6001600160a01b03811683811015610eeb576001600160a01b039181610ee360019386610f58565b520116610ebb565b5050905090565b506001600160a01b036002610e8b565b6040906001600160a01b03610c7094931681528160208201520190610bc8565b906001600160a01b03809116911603906001600160a01b038211610f4257565b634e487b7160e01b600052601160045260246000fd5b8051821015610f6c5760209160051b010190565b634e487b7160e01b600052603260045260246000fdfe608060405261040c80380380610014816101f7565b9283398101906040818303126101f25780516001600160a01b038116918282036101f2576020810151906001600160401b0382116101f257019183601f840112156101f25782519261006d61006885610232565b6101f7565b938085526020850195602082840101116101f25785602061008e930161024d565b813b15610197577f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b031916821790557fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b600080a281511580159061018f575b610109575b60405160e890816103248239f35b60008061017e9461011a60606101f7565b94602786527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c6020870152660819985a5b195960ca1b60408701525190845af43d15610187573d9161016e61006884610232565b9283523d6000602085013e610270565b503880806100fb565b606091610270565b5060006100f6565b60405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608490fd5b600080fd5b6040519190601f01601f191682016001600160401b0381118382101761021c57604052565b634e487b7160e01b600052604160045260246000fd5b6001600160401b03811161021c57601f01601f191660200190565b60005b8381106102605750506000910152565b8181015183820152602001610250565b919290156102d25750815115610284575090565b3b1561028d5790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b8251909150156102e55750805190602001fd5b6044604051809262461bcd60e51b825260206004830152610315815180928160248601526020868601910161024d565b601f01601f19168101030190fdfe6080604052361560605760008073ffffffffffffffffffffffffffffffffffffffff7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5416368280378136915af43d6000803e15605b573d6000f35b3d6000fd5b60008073ffffffffffffffffffffffffffffffffffffffff7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5416368280378136915af43d6000803e15605b573d6000f3fea2646970667358221220993eafbdeb8055a2fd7aeeab86fbd1bea6d5b1c93c2dfb12168532a2a9e84caa64736f6c634300081c0033a2646970667358221220c7d1a6d744eb7608cc1da583d1ad8deaf55718c63a7c501f001d279e215afe7864736f6c634300081c0033";

type PluginUUPSUpgradeableSetupV2MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PluginUUPSUpgradeableSetupV2MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PluginUUPSUpgradeableSetupV2Mock__factory extends ContractFactory {
  constructor(...args: PluginUUPSUpgradeableSetupV2MockConstructorParams) {
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
      PluginUUPSUpgradeableSetupV2Mock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): PluginUUPSUpgradeableSetupV2Mock__factory {
    return super.connect(runner) as PluginUUPSUpgradeableSetupV2Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PluginUUPSUpgradeableSetupV2MockInterface {
    return new Interface(_abi) as PluginUUPSUpgradeableSetupV2MockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PluginUUPSUpgradeableSetupV2Mock {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as PluginUUPSUpgradeableSetupV2Mock;
  }
}
