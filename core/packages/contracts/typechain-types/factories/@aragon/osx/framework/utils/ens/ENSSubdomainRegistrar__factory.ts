/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  ENSSubdomainRegistrar,
  ENSSubdomainRegistrarInterface,
} from "../../../../../../@aragon/osx/framework/utils/ens/ENSSubdomainRegistrar";
import type { NonPayableOverrides } from "../../../../../../common";
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
        internalType: "bytes32",
        name: "subnode",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "nodeOwner",
        type: "address",
      },
    ],
    name: "AlreadyRegistered",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "InvalidResolver",
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
    name: "REGISTER_ENS_SUBDOMAIN_PERMISSION_ID",
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
    name: "UPGRADE_REGISTRAR_PERMISSION_ID",
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
    name: "ens",
    outputs: [
      {
        internalType: "contract ENS",
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
        name: "_managingDao",
        type: "address",
      },
      {
        internalType: "contract ENS",
        name: "_ens",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_node",
        type: "bytes32",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "node",
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
        internalType: "bytes32",
        name: "_label",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_targetAddress",
        type: "address",
      },
    ],
    name: "registerSubnode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "resolver",
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
        internalType: "address",
        name: "_resolver",
        type: "address",
      },
    ],
    name: "setDefaultResolver",
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
  "0x60a080604052346100dc57306080526000549060ff8260081c1661008a575060ff8082160361004f575b6040516116d190816100e2823960805181818161080a015281816109430152610cd50152f35b60ff90811916176000557f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498602060405160ff8152a138610029565b62461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b6064820152608490fd5b600080fdfe608080604052600436101561001357600080fd5b600090813560e01c90816304f3bcec14611089575080632ae9c60014610fde5780633659cfe614610cae5780633f15457f14610c875780634162169f14610c605780634f1ef286146108c457806352d1902d146107ef5780636133f985146104c157806389bb4145146101d45780639848ba5114610199578063af7b2fed1461015e578063c66485b2146100d05763d70754ec146100b057600080fd5b346100cd57806003193601126100cd57602060ca54604051908152f35b80fd5b50346100cd5760206003193601126100cd576001600160a01b036100f26110ae565b610105826097541636903390309061139c565b16801561012d5773ffffffffffffffffffffffffffffffffffffffff1960cb54161760cb5580f35b60ca547f1ae12f8a000000000000000000000000000000000000000000000000000000008352600452602452604490fd5b50346100cd57806003193601126100cd5760206040517fa1fcba4efb1e94b7648f5e0504bfd39734aead5f17965d12705915d771c859ff8152f35b50346100cd57806003193601126100cd5760206040517fbbdfd23f099d7ed9f535e0f97d2123efb1332b16e023b8359b3b879eaecd3c148152f35b50346100cd5760406003193601126100cd57600435906024356001600160a01b03811681036104bd576102176001600160a01b036097541636903390309061139c565b60ca5460405160208101908282528560408201526040815261023a6060826110c9565b519020906001600160a01b0360c95416906040517f02571be3000000000000000000000000000000000000000000000000000000008152836004820152602081602481865afa9081156104b257906001600160a01b03918791610483575b5016806104535750849560646020928760405195869485937f06ab5923000000000000000000000000000000000000000000000000000000008552600485015260248401523060448401525af1801561044857610419575b506001600160a01b0360c954166001600160a01b0360cb5416813b15610415576040517f1896f70a000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b0391909116602482015294849186916044918391905af1801561040a576103f5575b8293506001600160a01b0360cb541691823b156103f0576040517fd5fa2b0000000000000000000000000000000000000000000000000000000000815260048101929092526001600160a01b031660248201529082908290604490829084905af180156103e5576103d45750f35b816103de916110c9565b6100cd5780f35b6040513d84823e3d90fd5b505050fd5b91909281610402916110c9565b908290610366565b6040513d85823e3d90fd5b8480fd5b6020813d602011610440575b81610432602093836110c9565b810103126103f057516102f0565b3d9150610425565b6040513d86823e3d90fd5b85604491857f01f95aba000000000000000000000000000000000000000000000000000000008352600452602452fd5b6104a5915060203d6020116104ab575b61049d81836110c9565b810190611219565b38610298565b503d610493565b6040513d88823e3d90fd5b5080fd5b50346100cd5760606003193601126100cd576004356001600160a01b0381168091036104bd576024356001600160a01b0381168091036107eb5760443583549160ff8360081c1615928380946107de575b80156107c7575b1561075d578360017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00831617875561072f575b5084549360ff8560081c16156106c55760249160209173ffffffffffffffffffffffffffffffffffffffff1960975416176097558073ffffffffffffffffffffffffffffffffffffffff1960c954161760c9558360ca55604051928380927f0178b8bf0000000000000000000000000000000000000000000000000000000082528660048301525afa80156106ba576001600160a01b0391869161069b575b501690811561066d575073ffffffffffffffffffffffffffffffffffffffff1960cb54161760cb5561061b575080f35b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1681557f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498602060405160018152a180f35b7f1ae12f8a000000000000000000000000000000000000000000000000000000008552600452602452604483fd5b6106b4915060203d6020116104ab5761049d81836110c9565b386105eb565b6040513d87823e3d90fd5b608460405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152fd5b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000166101011785553861054c565b608460405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152fd5b50303b1580156105195750600160ff821614610519565b50600160ff821610610512565b8280fd5b50346100cd57806003193601126100cd576001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016300361085a5760206040517f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8152f35b608460405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152fd5b5060406003193601126100cd576108d96110ae565b6024359067ffffffffffffffff82116107eb57366023830112156107eb57816004013591836109078461111b565b9161091560405193846110c9565b848352602083019436602482840101116107eb57806024602093018737830101526109a06001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001661096f81301415611137565b6001600160a01b037f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5416146111a8565b6109ba6001600160a01b0360975416369033903090611238565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156109f257506109ef91506114f4565b80f35b906001600160a01b0381166040517f52d1902d000000000000000000000000000000000000000000000000000000008152602081600481855afa869181610c28575b50610aa357608460405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f7420555550530000000000000000000000000000000000006064820152fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc03610bbe57610ad2826114f4565b7fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b8580a283825115801590610bb6575b610b0e575b5050505080f35b80610ba49460405194610b226060876110c9565b602786527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c60208701527f206661696c65640000000000000000000000000000000000000000000000000060408701525190845af43d15610bae573d91610b888361111b565b92610b9660405194856110c9565b83523d86602085013e6115cc565b5038808083610b07565b6060916115cc565b506001610b02565b608460405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c655555494400000000000000000000000000000000000000000000006064820152fd5b9091506020813d602011610c58575b81610c44602093836110c9565b81010312610c5457519038610a34565b8680fd5b3d9150610c37565b50346100cd57806003193601126100cd5760206001600160a01b0360975416604051908152f35b50346100cd57806003193601126100cd5760206001600160a01b0360c95416604051908152f35b50346100cd5760206003193601126100cd57610cc86110ae565b610d016001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001661096f81301415611137565b610d1b6001600160a01b0360975416369033903090611238565b602090604051610d2b83826110c9565b83815282810190601f1984013683377f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610d705750506109ef91506114f4565b90916001600160a01b0381166040517f52d1902d0000000000000000000000000000000000000000000000000000000081528581600481855afa879181610fab575b50610e21576084866040519062461bcd60e51b82526004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f7420555550530000000000000000000000000000000000006064820152fd5b939492937fc9f76b5ec45e5cdef99837d7b6d2467235c1df8933c8ca56df5c35afa2c7d44401610f4157610e54826114f4565b7fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b8680a284835115801590610f3a575b610e91575b505050505080f35b80610f269560405195610ea56060886110c9565b602787527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c868801527f206661696c65640000000000000000000000000000000000000000000000000060408801525190845af4903d15610f31573d610f0a8161111b565b90610f1860405192836110c9565b81528681943d92013e6115cc565b503880808084610e89565b606092506115cc565b5080610e84565b6084836040519062461bcd60e51b82526004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c655555494400000000000000000000000000000000000000000000006064820152fd5b9091508681813d8311610fd7575b610fc381836110c9565b81010312610fd357519038610db2565b8780fd5b503d610fb9565b50346100cd57806003193601126100cd576060908160405161100082826110c9565b36903760405182810181811067ffffffffffffffff82111761105c57604090815260018252600460208301528181018390525191825b6003821061104357505050f35b60208060019260ff865116815201930191019091611036565b6024837f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b9050346104bd57816003193601126104bd576020906001600160a01b0360cb54168152f35b600435906001600160a01b03821682036110c457565b600080fd5b90601f601f19910116810190811067ffffffffffffffff8211176110ec57604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b67ffffffffffffffff81116110ec57601f01601f191660200190565b1561113e57565b608460405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c00000000000000000000000000000000000000006064820152fd5b156111af57565b608460405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f787900000000000000000000000000000000000000006064820152fd5b908160209103126110c457516001600160a01b03811681036110c45790565b60206001600160a01b0360a4818094979695971696601f19601f60405196879586947ffdef9106000000000000000000000000000000000000000000000000000000008652169889600486015216988960248501527fa1fcba4efb1e94b7648f5e0504bfd39734aead5f17965d12705915d771c859ff60448501526080606485015280608485015280600086860137600085828601015201168101030181875afa90811561139057600091611355575b50156112f357505050565b60849350604051927f32dbe3b40000000000000000000000000000000000000000000000000000000084526004840152602483015260448201527fa1fcba4efb1e94b7648f5e0504bfd39734aead5f17965d12705915d771c859ff6064820152fd5b6020813d602011611388575b8161136e602093836110c9565b810103126104bd57519081151582036100cd5750386112e8565b3d9150611361565b6040513d6000823e3d90fd5b60206001600160a01b0360a4818094979695971696601f19601f60405196879586947ffdef9106000000000000000000000000000000000000000000000000000000008652169889600486015216988960248501527fbbdfd23f099d7ed9f535e0f97d2123efb1332b16e023b8359b3b879eaecd3c1460448501526080606485015280608485015280600086860137600085828601015201168101030181875afa908115611390576000916114b9575b501561145757505050565b60849350604051927f32dbe3b40000000000000000000000000000000000000000000000000000000084526004840152602483015260448201527fbbdfd23f099d7ed9f535e0f97d2123efb1332b16e023b8359b3b879eaecd3c146064820152fd5b6020813d6020116114ec575b816114d2602093836110c9565b810103126104bd57519081151582036100cd57503861144c565b3d91506114c5565b803b15611562576001600160a01b031673ffffffffffffffffffffffffffffffffffffffff197f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5416177f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b608460405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e7472616374000000000000000000000000000000000000006064820152fd5b9192901561162d57508151156115e0575090565b3b156115e95790565b606460405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152fd5b8251909150156116405750805190602001fd5b6040519062461bcd60e51b8252602060048301528181519182602483015260005b838110611683575050601f19601f836000604480968601015201168101030190fd5b6020828201810151604487840101528593500161166156fea2646970667358221220e2bf0fd610ac10e0157cad23cfa132cab791ef61adb8008243adbdb1d991e9b664736f6c634300081c0033";

type ENSSubdomainRegistrarConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ENSSubdomainRegistrarConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ENSSubdomainRegistrar__factory extends ContractFactory {
  constructor(...args: ENSSubdomainRegistrarConstructorParams) {
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
      ENSSubdomainRegistrar & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): ENSSubdomainRegistrar__factory {
    return super.connect(runner) as ENSSubdomainRegistrar__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ENSSubdomainRegistrarInterface {
    return new Interface(_abi) as ENSSubdomainRegistrarInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ENSSubdomainRegistrar {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ENSSubdomainRegistrar;
  }
}
