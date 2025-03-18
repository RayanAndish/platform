/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { NonPayableOverrides } from "../../../../../../common";
import type {
  PluginUUPSUpgradeableV2Mock,
  PluginUUPSUpgradeableV2MockInterface,
} from "../../../../../../src/test/plugin/UUPSUpgradeable/PluginUUPSUpgradeableMock.sol/PluginUUPSUpgradeableV2Mock";
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";

const _abi = [
  {
    inputs: [],
    name: "AlreadyInitialized",
    type: "error",
  },
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
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
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
    name: "UPGRADE_PLUGIN_PERMISSION_ID",
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
        internalType: "contract IDAO",
        name: "_dao",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initializeV1toV2",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "proxiableUUID",
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
    inputs: [],
    name: "state1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "state2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a080604052346100dc57306080526000549060ff8260081c1661008a575060ff8082160361004f575b60405161170590816100e2823960805181818161032f0152818161055f0152610b780152f35b60ff90811916176000557f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498602060405160ff8152a138610029565b62461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b6064820152608490fd5b600080fdfe6080604052600436101561001257600080fd5b60003560e01c806301ffc9a7146101275780632ae9c600146101225780633659cfe61461011d5780634162169f1461011857806341de6830146101135780634f1ef2861461010e57806352d1902d146101095780635c60da1b146101045780636accab8c146100ff5780638cb75059146100fa578063bb225da2146100f5578063c4d66de8146100f0578063c98425ee146100eb578063c9c4bfca146100e6578063dd63c06f146100e1578063e27e9a4e146100dc5763efe51cca146100d757600080fd5b610a69565b6109e2565b610972565b610937565b610912565b6107fb565b6106ba565b61067f565b610660565b61061a565b610544565b6104c8565b610422565b6103cc565b610302565b61025e565b34610259576020600319360112610259576004357fffffffff000000000000000000000000000000000000000000000000000000008116808203610259576101bd917f41de683000000000000000000000000000000000000000000000000000000000821491821561022f575b821561021e575b82156101f4575b5081156101c1575b5060405190151581529081906020820190565b0390f35b6301ffc9a760e01b91507fffffffff000000000000000000000000000000000000000000000000000000001614386101aa565b7fafc5b82300000000000000000000000000000000000000000000000000000000149150386101a2565b6352d1902d60e01b8114925061019b565b7f2ae9c6000000000000000000000000000000000000000000000000000000000081149250610194565b600080fd5b346102595760006003193601126102595760608060405161027f8282610489565b36903760405181810181811067ffffffffffffffff8211176102ec578290604052600182526004602083015260006040830152604051918291820190826000905b600382106102cf575050500390f35b825160ff16815285945060209283019260019290920191016102c0565b61043e565b6001600160a01b0381160361025957565b34610259576020600319360112610259576103ca600435610322816102f1565b61038c6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001661035b81301415610a88565b6001600160a01b037f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc541614610af9565b6103a66001600160a01b0360c95416369033903090610f7a565b6040519060206103b68184610489565b60008352601f198101903690840137610e3c565b005b346102595760006003193601126102595760206001600160a01b0360c95416604051908152f35b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b3461025957600060031936011261025957602060405160008152f35b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040810190811067ffffffffffffffff8211176102ec57604052565b90601f601f19910116810190811067ffffffffffffffff8211176102ec57604052565b67ffffffffffffffff81116102ec57601f01601f191660200190565b6040600319360112610259576004356104e0816102f1565b6024359067ffffffffffffffff821161025957366023830112156102595781600401359061050d826104ac565b9161051b6040519384610489565b80835236602482860101116102595760208160009260246103ca97018387013784010152610b6a565b34610259576000600319360112610259576001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036105b0576040517f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8152602090f35b608460405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152fd5b346102595760006003193601126102595760206001600160a01b037f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5416604051908152f35b3461025957600060031936011261025957602061012d54604051908152f35b346102595760006003193601126102595760206040517f568cc693d84eb1901f8bcecba154cbdef23ca3cf67efc0a0b698528a06c660f78152f35b34610259576040600319360112610259576106e56001600160a01b0360c954163690339030906110e4565b6040516106f18161046d565b6004356106fd816102f1565b80825260243590600282101561025957602083019182526001600160a01b031690610727826114fe565b91826107e9575b826107d7575b50816107b9575b5061077f5761077a8161076e7f88e879ae0d71faf3aa708f2978daccb99b95243615dc104835b8c5a21c884ae693611239565b604051918291826108ea565b0390a1005b6107b5906040519182917f266d0fb9000000000000000000000000000000000000000000000000000000008352600483016108ea565b0390fd5b60019150516107c7816108db565b6107d0816108db565b143861073b565b6107e29192506115a8565b9038610734565b91506107f48261155d565b159161072e565b34610259576020600319360112610259576001600160a01b03600435610820816102f1565b61010261ffff1960005460ff8160081c1615806108ce575b61084190610cf4565b161760005561086060ff60005460081c1661085b816112b7565b6112b7565b1673ffffffffffffffffffffffffffffffffffffffff1960c954161760c955600161012d55600261012e5561089b61ff001960005416600055565b604051600281527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249890806020810161077a565b50600260ff821610610838565b600211156108e557565b6103f3565b81516001600160a01b0316815260209091015160408201929160028210156108e55760200152565b346102595760006003193601126102595761092b610d65565b506101bd61076e610d7e565b346102595760006003193601126102595760206040517f821b6e3a557148015a918c89e5d092e878a69854a2d1a410635f771bd5a8a3f58152f35b346102595760006003193601126102595761098b610d65565b50610994610d7e565b6001600160a01b03815116156109b5575b6101bd90604051918291826108ea565b506101bd6001600160a01b0360c95416604051906109d28261046d565b81526000602082015290506109a5565b346102595760006003193601126102595761010261ffff1960005460ff8160081c161580610a5c575b610a1490610cf4565b1617600055600261012e5561ff0019600054166000557f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024986040518060208101600282520390a1005b50600260ff821610610a0b565b3461025957600060031936011261025957602061012e54604051908152f35b15610a8f57565b608460405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c00000000000000000000000000000000000000006064820152fd5b15610b0057565b608460405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f787900000000000000000000000000000000000000006064820152fd5b90610ba46001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001661035b81301415610a88565b610bbe6001600160a01b0360c95416369033903090610f7a565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610bf45750610bf290611426565b565b604051906352d1902d60e01b82526020826004816001600160a01b0387165afa60009281610cc3575b50610c8d5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f7420555550530000000000000000000000000000000000006064820152608490fd5b610bf292610cbe7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60019414610dcb565b611328565b610ce691935060203d602011610ced575b610cde8183610489565b810190610db0565b9138610c1d565b503d610cd4565b15610cfb57565b608460405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152fd5b60405190610d728261046d565b60006020838281520152565b60405190610d8b8261046d565b60fb546001600160a01b038116835260a01c60ff168260028210156108e55760200152565b90816020910312610259575190565b6040513d6000823e3d90fd5b15610dd257565b608460405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c655555494400000000000000000000000000000000000000000000006064820152fd5b90610e687f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1690565b15610e775750610bf290611426565b604051906352d1902d60e01b82526020826004816001600160a01b0387165afa60009281610f41575b50610f105760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f7420555550530000000000000000000000000000000000006064820152608490fd5b610bf292610cbe7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60009414610dcb565b610f5b91935060203d602011610ced57610cde8183610489565b9138610ea0565b90816020910312610259575180151581036102595790565b6020601f60a46001600160a01b03601f199497969597169560405194859384927ffdef91060000000000000000000000000000000000000000000000000000000084526001600160a01b038b1660048501526001600160a01b03891660248501527f821b6e3a557148015a918c89e5d092e878a69854a2d1a410635f771bd5a8a3f560448501526080606485015280608485015280600086860137600085828601015201168101030181865afa9081156110df576000916110b0575b501561104157505050565b6040517f32dbe3b40000000000000000000000000000000000000000000000000000000081526001600160a01b03928316600482015292821660248401521660448201527f821b6e3a557148015a918c89e5d092e878a69854a2d1a410635f771bd5a8a3f56064820152608490fd5b6110d2915060203d6020116110d8575b6110ca8183610489565b810190610f62565b38611036565b503d6110c0565b610dbf565b6020601f60a46001600160a01b03601f199497969597169560405194859384927ffdef91060000000000000000000000000000000000000000000000000000000084526001600160a01b038b1660048501526001600160a01b03891660248501527f568cc693d84eb1901f8bcecba154cbdef23ca3cf67efc0a0b698528a06c660f760448501526080606485015280608485015280600086860137600085828601015201168101030181865afa9081156110df5760009161121a575b50156111ab57505050565b6040517f32dbe3b40000000000000000000000000000000000000000000000000000000081526001600160a01b03928316600482015292821660248401521660448201527f568cc693d84eb1901f8bcecba154cbdef23ca3cf67efc0a0b698528a06c660f76064820152608490fd5b611233915060203d6020116110d8576110ca8183610489565b386111a0565b6020906001600160a01b0381511673ffffffffffffffffffffffffffffffffffffffff1960fb54161760fb55015160028110156108e5577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff74ff000000000000000000000000000000000000000060fb549260a01b1691161760fb55565b156112be57565b608460405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152fd5b9161133283611426565b6001600160a01b0383167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b600080a28151159081159161141e575b50611376575050565b611413916000806040519361138c606086610489565b602785527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c60208601527f206661696c6564000000000000000000000000000000000000000000000000006040860152602081519101845af43d15611416573d916113f6836104ac565b926114046040519485610489565b83523d6000602085013e61163e565b50565b60609161163e565b90503861136d565b803b15611494576001600160a01b031673ffffffffffffffffffffffffffffffffffffffff197f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5416177f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b608460405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e7472616374000000000000000000000000000000000000006064820152fd5b6000602091604051838101906301ffc9a760e01b82526301ffc9a760e01b602482015260248152611530604482610489565b5191617530fa6000513d82611551575b508161154a575090565b9050151590565b60201115915038611540565b6000602091604051838101906301ffc9a760e01b82527fffffffff00000000000000000000000000000000000000000000000000000000602482015260248152611530604482610489565b6000602091604051838101906301ffc9a760e01b82527f549ea75a00000000000000000000000000000000000000000000000000000000602482015260248152611530604482610489565b156115fa57565b606460405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152fd5b919290156116615750815115611652575090565b61165e903b15156115f3565b90565b8251909150156116745750805190602001fd5b6040519062461bcd60e51b8252602060048301528181519182602483015260005b8381106116b7575050601f19601f836000604480968601015201168101030190fd5b6020828201810151604487840101528593500161169556fea2646970667358221220944a88db905d43aac12ba1403d54e6251b93b4d20ba85f7fd9a91a4e05f3b43964736f6c634300081c0033";

type PluginUUPSUpgradeableV2MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PluginUUPSUpgradeableV2MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PluginUUPSUpgradeableV2Mock__factory extends ContractFactory {
  constructor(...args: PluginUUPSUpgradeableV2MockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      PluginUUPSUpgradeableV2Mock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): PluginUUPSUpgradeableV2Mock__factory {
    return super.connect(runner) as PluginUUPSUpgradeableV2Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PluginUUPSUpgradeableV2MockInterface {
    return new Interface(_abi) as PluginUUPSUpgradeableV2MockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PluginUUPSUpgradeableV2Mock {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as PluginUUPSUpgradeableV2Mock;
  }
}
