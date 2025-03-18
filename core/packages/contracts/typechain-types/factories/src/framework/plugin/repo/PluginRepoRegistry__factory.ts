/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { NonPayableOverrides } from "../../../../../common";
import type {
  PluginRepoRegistry,
  PluginRepoRegistryInterface,
} from "../../../../../src/framework/plugin/repo/PluginRepoRegistry";
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
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "registrant",
        type: "address",
      },
    ],
    name: "ContractAlreadyRegistered",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "registrant",
        type: "address",
      },
    ],
    name: "ContractERC165SupportInvalid",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "registrant",
        type: "address",
      },
    ],
    name: "ContractInterfaceInvalid",
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
    name: "ENSNotSupported",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "subdomain",
        type: "string",
      },
    ],
    name: "InvalidPluginSubdomain",
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
        indexed: false,
        internalType: "string",
        name: "subdomain",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pluginRepo",
        type: "address",
      },
    ],
    name: "PluginRepoRegistered",
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
    name: "REGISTER_PLUGIN_REPO_PERMISSION_ID",
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
    name: "UPGRADE_REGISTRY_PERMISSION_ID",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "entries",
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
        internalType: "contract IDAO",
        name: "_dao",
        type: "address",
      },
      {
        internalType: "contract ENSSubdomainRegistrar",
        name: "_subdomainRegistrar",
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
        internalType: "string",
        name: "subdomain",
        type: "string",
      },
      {
        internalType: "address",
        name: "pluginRepo",
        type: "address",
      },
    ],
    name: "registerPluginRepo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subdomainRegistrar",
    outputs: [
      {
        internalType: "contract ENSSubdomainRegistrar",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetInterfaceId",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
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
  "0x60a080604052346100dc57306080526000549060ff8260081c1661008a575060ff8082160361004f575b60405161175090816100e282396080518181816101e3015281816104ed01526105530152f35b60ff90811916176000557f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498602060405160ff8152a138610029565b62461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b6064820152608490fd5b600080fdfe6080604052600436101561001257600080fd5b60003560e01c8062077393146100d65780632ae9c600146100d15780633659cfe6146100cc5780634162169f146100c757806344162ef8146100c2578063485cc955146100bd5780634f1ef286146100b857806352d1902d146100b357806374574eb7146100ae578063ce091c86146100a9578063f29ee125146100a45763fdb9df551461009f57600080fd5b6106c7565b610684565b610649565b61060e565b610538565b610492565b6102ea565b6102a7565b610280565b6101b6565b610112565b6100eb565b60009103126100e657565b600080fd5b346100e65760006003193601126100e65760206001600160a01b0360fb5416604051908152f35b346100e65760006003193601126100e657606080604051610133828261041c565b36903760405181810181811067ffffffffffffffff8211176101a0578290604052600182526004602083015260006040830152604051918291820190826000905b60038210610183575050500390f35b825160ff1681528594506020928301926001929092019101610174565b6103ed565b6001600160a01b038116036100e657565b346100e65760206003193601126100e65761027e6004356101d6816101a5565b6102406001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001661020f8130141561072e565b6001600160a01b037f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc54161461079f565b61025a6001600160a01b0360975416369033903090610ee0565b60405190602061026a818461041c565b60008352601f198101903690840137610bc2565b005b346100e65760006003193601126100e65760206001600160a01b0360975416604051908152f35b346100e65760006003193601126100e657602060c95460e01b7fffffffff0000000000000000000000000000000000000000000000000000000060405191168152f35b346100e65760406003193601126100e657600435610307816101a5565b610361602435610316816101a5565b6000549261034560ff600886901c161561032f565b1590565b809581966103df575b81156103bf575b50610810565b83610358600160ff196000541617600055565b6103a657610881565b61036757005b61037761ff001960005416600055565b604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249890602090a1005b6103ba61010061ff00196000541617600055565b610881565b303b159150816103d1575b503861033f565b60ff166001149050386103ca565b600160ff8216109150610338565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b90601f601f19910116810190811067ffffffffffffffff8211176101a057604052565b67ffffffffffffffff81116101a057601f01601f191660200190565b9291926104678261043f565b91610475604051938461041c565b8294818452818301116100e6578281602093846000960137010152565b60406003193601126100e6576004356104aa816101a5565b6024359067ffffffffffffffff82116100e657366023830112156100e6576104df61027e92369060248160040135910161045b565b906105196001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001661020f8130141561072e565b6105336001600160a01b0360975416369033903090610ee0565b610d18565b346100e65760006003193601126100e6576001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036105a4576040517f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8152602090f35b608460405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152fd5b346100e65760006003193601126100e65760206040517f60b96ff9fb5f29153c29c1747515b8be4ee523d686cc6f453ec294b0afa729328152f35b346100e65760006003193601126100e65760206040517f055973dfb6d3b3cd890dde3a801f5427fa973864752b6d2a1ae61cbd5ae5dc098152f35b346100e65760206003193601126100e6576001600160a01b036004356106a9816101a5565b1660005260ca602052602060ff604060002054166040519015158152f35b346100e65760406003193601126100e65760043567ffffffffffffffff81116100e657366023820112156100e65780600401359067ffffffffffffffff82116100e65736602483830101116100e65761027e916024803592610728846101a5565b01610914565b1561073557565b608460405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c00000000000000000000000000000000000000006064820152fd5b156107a657565b608460405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f787900000000000000000000000000000000000000006064820152fd5b1561081757565b608460405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152fd5b906001600160a01b0380926108a660ff60005460081c166108a181610e57565b610e57565b1673ffffffffffffffffffffffffffffffffffffffff19609754161760975563d4321b407fffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000060c954161760c9551673ffffffffffffffffffffffffffffffffffffffff1960fb54161760fb55565b61092e6001600160a01b0360975416369033903090611032565b81610973575b61096e836109627f8cc06643d6cbee78b006d2df2db4d2487b69dd64bb2c96088280fb29dd93a0b295611259565b60405193849384610b1a565b0390a1565b61099461098860fb546001600160a01b031690565b6001600160a01b031690565b926001600160a01b03841615610aaf576109b161032b84846111af565b610a75576109c036848461045b565b6020815191012093803b156100e6576040517f89bb414500000000000000000000000000000000000000000000000000000000815260048101959095526001600160a01b03821660248601526000908590604490829084905af1908115610a70577f8cc06643d6cbee78b006d2df2db4d2487b69dd64bb2c96088280fb29dd93a0b29461096e92610a55575b50935050610934565b80610a646000610a6a9361041c565b806100db565b38610a4c565b610b0e565b50610aab6040519283927f5b7dee8300000000000000000000000000000000000000000000000000000000845260048401610afa565b0390fd5b7ff72f946a0000000000000000000000000000000000000000000000000000000060005260046000fd5b601f8260209493601f19938186528686013760008582860101520116010190565b916020610b0b938181520191610ad9565b90565b6040513d6000823e3d90fd5b91610b3b6020926001600160a01b0392969596604086526040860191610ad9565b9416910152565b908160209103126100e6575190565b15610b5857565b608460405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c655555494400000000000000000000000000000000000000000000006064820152fd5b90610bee7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1690565b15610bff5750610bfd906114a4565b565b604051907f52d1902d0000000000000000000000000000000000000000000000000000000082526020826004816001600160a01b0387165afa60009281610ce7575b50610cb15760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f7420555550530000000000000000000000000000000000006064820152608490fd5b610bfd92610ce27f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60009414610b51565b6113a6565b610d0a91935060203d602011610d11575b610d02818361041c565b810190610b42565b9138610c41565b503d610cf8565b90610d447f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1690565b15610d535750610bfd906114a4565b604051907f52d1902d0000000000000000000000000000000000000000000000000000000082526020826004816001600160a01b0387165afa60009281610e36575b50610e055760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f7420555550530000000000000000000000000000000000006064820152608490fd5b610bfd92610ce27f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60019414610b51565b610e5091935060203d602011610d1157610d02818361041c565b9138610d95565b15610e5e57565b608460405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152fd5b908160209103126100e6575180151581036100e65790565b60206001600160a01b03610f7592959493951693604051809381927ffdef91060000000000000000000000000000000000000000000000000000000083526001600160a01b03891660048401526001600160a01b03871660248401527f60b96ff9fb5f29153c29c1747515b8be4ee523d686cc6f453ec294b0afa7293260448401526080606484015260848301906000610ad9565b0381865afa908115610a7057600091611003575b5015610f9457505050565b6040517f32dbe3b40000000000000000000000000000000000000000000000000000000081526001600160a01b03928316600482015292821660248401521660448201527f60b96ff9fb5f29153c29c1747515b8be4ee523d686cc6f453ec294b0afa729326064820152608490fd5b611025915060203d60201161102b575b61101d818361041c565b810190610ec8565b38610f89565b503d611013565b60206001600160a01b036110c792959493951693604051809381927ffdef91060000000000000000000000000000000000000000000000000000000083526001600160a01b03891660048401526001600160a01b03871660248401527f055973dfb6d3b3cd890dde3a801f5427fa973864752b6d2a1ae61cbd5ae5dc0960448401526080606484015260848301906000610ad9565b0381865afa908115610a7057600091611155575b50156110e657505050565b6040517f32dbe3b40000000000000000000000000000000000000000000000000000000081526001600160a01b03928316600482015292821660248401521660448201527f055973dfb6d3b3cd890dde3a801f5427fa973864752b6d2a1ae61cbd5ae5dc096064820152608490fd5b61116e915060203d60201161102b5761101d818361041c565b386110db565b90821015611180570190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60005b8281106111c157505050600190565b6112076112016111fb6111d5848787611174565b357fff000000000000000000000000000000000000000000000000000000000000001690565b60f81c90565b60ff1690565b606081118061124f575b61123c57602f811180611245575b61123c57602d1461123257505050600090565b6001905b016111b2565b50600190611236565b50603a811061121f565b50607b8110611211565b6001600160a01b0381168060005260ca60205260ff6040600020541661137957506112df60c95460e01b60206000604051828101906301ffc9a760e01b82526301ffc9a760e01b6024820152602481526112b460448261041c565b519086617530fa903d600051908361136d575b5082611363575b5081611351575b8161134657501590565b61131057611303610bfd916001600160a01b031660005260ca602052604060002090565b600160ff19825416179055565b7f71023c8a000000000000000000000000000000000000000000000000000000006000526001600160a01b031660045260246000fd5b61032b9150836115f4565b905061135c8361157c565b15906112d5565b15159150386112ce565b602011159250386112c7565b7ffdcce17f0000000000000000000000000000000000000000000000000000000060005260045260246000fd5b916113b0836114a4565b6001600160a01b0383167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b600080a28151159081159161149c575b506113f4575050565b611491916000806040519361140a60608661041c565b602785527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c60208601527f206661696c6564000000000000000000000000000000000000000000000000006040860152602081519101845af43d15611494573d916114748361043f565b92611482604051948561041c565b83523d6000602085013e61168c565b50565b60609161168c565b9050386113eb565b803b15611512576001600160a01b031673ffffffffffffffffffffffffffffffffffffffff197f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5416177f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b608460405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e7472616374000000000000000000000000000000000000006064820152fd5b6000602091604051838101906301ffc9a760e01b82527fffffffff000000000000000000000000000000000000000000000000000000006024820152602481526115c760448261041c565b5191617530fa6000513d826115e8575b50816115e1575090565b9050151590565b602011159150386115d7565b6000906020926040517fffffffff00000000000000000000000000000000000000000000000000000000858201926301ffc9a760e01b8452166024820152602481526115c760448261041c565b1561164857565b606460405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152fd5b919290156116ac57508151156116a0575090565b610b0b903b1515611641565b8251909150156116bf5750805190602001fd5b6040519062461bcd60e51b8252602060048301528181519182602483015260005b838110611702575050601f19601f836000604480968601015201168101030190fd5b602082820181015160448784010152859350016116e056fea264697066735822122098d60541c6d788e5a4912f66482c6585cd02b7bdcc89a29af873f3f7b4a39e6964736f6c634300081c0033";

type PluginRepoRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PluginRepoRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PluginRepoRegistry__factory extends ContractFactory {
  constructor(...args: PluginRepoRegistryConstructorParams) {
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
      PluginRepoRegistry & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): PluginRepoRegistry__factory {
    return super.connect(runner) as PluginRepoRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PluginRepoRegistryInterface {
    return new Interface(_abi) as PluginRepoRegistryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PluginRepoRegistry {
    return new Contract(address, _abi, runner) as unknown as PluginRepoRegistry;
  }
}
