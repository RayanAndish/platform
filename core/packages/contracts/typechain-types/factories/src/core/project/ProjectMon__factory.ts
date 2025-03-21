/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { NonPayableOverrides } from "../../../../common";
import type {
  ProjectMon,
  ProjectMonInterface,
} from "../../../../src/core/project/ProjectMon";
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
        name: "_accControl",
        type: "address",
      },
      {
        internalType: "address",
        name: "_hasher",
        type: "address",
      },
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
    ],
    name: "ProjectCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "budget",
        type: "uint256",
      },
    ],
    name: "ProjectCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "ProjectRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "budget",
        type: "uint256",
      },
    ],
    name: "ProjectUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "accControl",
    outputs: [
      {
        internalType: "contract AccControl",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "hasher",
    outputs: [
      {
        internalType: "contract CustomHash",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "pendingOwner",
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
    inputs: [],
    name: "projectCount",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "projectHashes",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "projects",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "budget",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "hash",
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
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "budget",
        type: "uint256",
      },
    ],
    name: "registerProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
    ],
    name: "updateProjectStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080346101a057601f61118d38819003918201601f19168301916001600160401b038311848410176101a5578084926060946040528339810103126101a057610047816101bb565b906100606040610059602084016101bb565b92016101bb565b9161006a336101cf565b6001600160a01b031690811561015b576001600160a01b0316918215610116576001600160a01b038116156100d1576100a2906101cf565b60018060a01b0319600254161760025560018060a01b03196003541617600355604051610f6890816102258239f35b60405162461bcd60e51b815260206004820152601560248201527f496e76616c6964206f776e6572206164647265737300000000000000000000006044820152606490fd5b60405162461bcd60e51b815260206004820152601a60248201527f496e76616c696420437573746f6d4861736820616464726573730000000000006044820152606490fd5b60405162461bcd60e51b815260206004820152601a60248201527f496e76616c696420416363436f6e74726f6c20616464726573730000000000006044820152606490fd5b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b03821682036101a057565b600180546001600160a01b0319908116909155600080546001600160a01b03938416928116831782559192909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a356fe608080604052600436101561001357600080fd5b60003560e01c9081630e8f705414610cf157508063107046bd14610c33578063345c353714610c0c57806336fbad2614610bee578063715018a614610b6b57806379ba509714610a6f5780638da5cb5b14610a48578063c7c7717e146104be578063e30c397814610497578063ed33639f14610470578063f2fde38b146103f15763fa09cdfe146100a357600080fd5b346103ec5760406003193601126103ec57600435602435801515908181036103ec578260005260056020526001600160a01b036007604060002001541633036103a8576020610190926001600160a01b036003541660405191868484015260f81b60408301524260418301526041825261011e606183610d58565b604051838101907f7570646174650000000000000000000000000000000000000000000000000000825260068152610157602682610d58565b519020916040518096819482937f423a969f00000000000000000000000000000000000000000000000000000000845260048401610ebe565b03915afa91821561039c57600092610365575b5081600052600660205260ff60406000205416610321576101e19083600052600560205260046040600020019060ff60ff1983541691151516179055565b60005260066020526040600020600160ff19825416179055806000526005602052600160406000200181600052600560205260036040600020015490604051916040835260009180549061023482610d1e565b918260408701526001811690816000146102dc5750600114610281575b857f2fc51eab37d48def9d8af982f76cb7dd95c39990cbda0942903fc31591da69228680878760208301520390a2005b600090815260208120929350915b8183106102c5575050820160600190807f2fc51eab37d48def9d8af982f76cb7dd95c39990cbda0942903fc31591da6922610251565b80546060848701015260209092019160010161028f565b60ff191660608088019190915292151560051b860190920193508291507f2fc51eab37d48def9d8af982f76cb7dd95c39990cbda0942903fc31591da69229050610251565b606460405162461bcd60e51b815260206004820152601960248201527f4475706c696361746520757064617465206465746563746564000000000000006044820152fd5b90916020823d602011610394575b8161038060209383610d58565b8101031261039157505190386101a3565b80fd5b3d9150610373565b6040513d6000823e3d90fd5b606460405162461bcd60e51b815260206004820152601d60248201527f4f6e6c792070726f6a656374206f776e65722063616e207570646174650000006044820152fd5b600080fd5b346103ec5760206003193601126103ec576004356001600160a01b0381168091036103ec5761041e610eda565b8073ffffffffffffffffffffffffffffffffffffffff1960015416176001556001600160a01b03600054167f38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e22700600080a3005b346103ec5760006003193601126103ec5760206001600160a01b0360035416604051908152f35b346103ec5760006003193601126103ec5760206001600160a01b0360015416604051908152f35b346103ec5760606003193601126103ec5760043567ffffffffffffffff81116103ec576104ef903690600401610e67565b60243567ffffffffffffffff81116103ec5761050f903690600401610e67565b600454909160443560001983146109ba5760016105fe93018060045560206001600160a01b03600354166040519061058c605483858b8a51610557818d858088019101610e1f565b830161056b82518093858085019101610e1f565b01018881523360601b87820152426034820152036034810185520183610d58565b604051838101907f72656769737465720000000000000000000000000000000000000000000000008252600881526105c5602882610d58565b519020916040518098819482937f423a969f00000000000000000000000000000000000000000000000000000000845260048401610ebe565b03915afa93841561039c57600094610a14575b5083600052600660205260ff604060002054166109d0576301e133804201918242116109ba5760405192610120840184811067ffffffffffffffff8211176108e35760405282845260208401918583526040850197885260608501908152608085016001815260a086019142835260c0870193845260e08701943386526101008801968a8852600052600560205260406000209751885560018801905180519067ffffffffffffffff82116108e35781906106cc8454610d1e565b601f8111610967575b50602090601f8311600114610904576000926108f9575b50506000198260011b9260031b1c19161790555b600287019951998a5167ffffffffffffffff81116108e3576107228254610d1e565b601f811161089b575b506020601f821160011461082a5790806107839594939260089b9c9d9e60009261081f575b50506000198260011b9260031b1c19161790555b516003890155511515600488019060ff60ff1983541691151516179055565b5160058601555160068501556001600160a01b036007850191511673ffffffffffffffffffffffffffffffffffffffff19825416179055519101558160005260066020526040600020600160ff198254161790557faa321c87263d65650d266df901ca7eda3d4ee28f7e9e1965354c660c923dd8526004549161081160405191604083526040830190610e42565b9360208201528033940390a3005b015190508e80610750565b601f1982169083600052806000209160005b818110610883575091839160089c9d9e9f610783989796956001951061086a575b505050811b019055610764565b015160001960f88460031b161c191690558e808061085d565b8f83015184556001909301926020928301920161083c565b826000526020600020601f830160051c810191602084106108d9575b601f0160051c01905b8181106108cd575061072b565b600081556001016108c0565b90915081906108b7565b634e487b7160e01b600052604160045260246000fd5b015190508d806106ec565b600085815282812093601f1916905b81811061094f5750908460019594939210610936575b505050811b019055610700565b015160001960f88460031b161c191690558d8080610929565b92936020600181928786015181550195019301610913565b909150836000526020600020601f840160051c810191602085106109b0575b90601f859493920160051c01905b8181106109a157506106d5565b60008155849350600101610994565b9091508190610986565b634e487b7160e01b600052601160045260246000fd5b606460405162461bcd60e51b815260206004820152601a60248201527f4475706c69636174652070726f6a6563742064657465637465640000000000006044820152fd5b90936020823d602011610a40575b81610a2f60209383610d58565b810103126103915750519285610611565b3d9150610a22565b346103ec5760006003193601126103ec5760206001600160a01b0360005416604051908152f35b346103ec5760006003193601126103ec57336001600160a01b036001541603610b015773ffffffffffffffffffffffffffffffffffffffff19600154166001556000543373ffffffffffffffffffffffffffffffffffffffff198216176000556001600160a01b033391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3005b608460405162461bcd60e51b815260206004820152602960248201527f4f776e61626c6532537465703a2063616c6c6572206973206e6f74207468652060448201527f6e6577206f776e657200000000000000000000000000000000000000000000006064820152fd5b346103ec5760006003193601126103ec57610b84610eda565b73ffffffffffffffffffffffffffffffffffffffff196001541660015560006001600160a01b03815473ffffffffffffffffffffffffffffffffffffffff1981168355167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b346103ec5760006003193601126103ec576020600454604051908152f35b346103ec5760006003193601126103ec5760206001600160a01b0360025416604051908152f35b346103ec5760206003193601126103ec57600435600052600560205260406000208054610c6260018301610d7b565b91610c6f60028201610d7b565b60038201549160ff6004820154166005820154600683015491610ccb60086001600160a01b0360078701541695015495610cbd6040519a8b9a8b5261012060208c01526101208b0190610e42565b9089820360408b0152610e42565b9560608801521515608087015260a086015260c085015260e08401526101008301520390f35b346103ec5760206003193601126103ec576020906004356000526006825260ff6040600020541615158152f35b90600182811c92168015610d4e575b6020831014610d3857565b634e487b7160e01b600052602260045260246000fd5b91607f1691610d2d565b90601f601f19910116810190811067ffffffffffffffff8211176108e357604052565b9060405191826000825492610d8f84610d1e565b8084529360018116908115610dfd5750600114610db6575b50610db492500383610d58565b565b90506000929192526020600020906000915b818310610de1575050906020610db49282010138610da7565b6020919350806001915483858901015201910190918492610dc8565b60209350610db495925060ff1991501682840152151560051b82010138610da7565b60005b838110610e325750506000910152565b8181015183820152602001610e22565b90601f19601f602093610e6081518092818752878088019101610e1f565b0116010190565b81601f820112156103ec5780359067ffffffffffffffff82116108e35760405192610e9c6020601f19601f8601160185610d58565b828452602083830101116103ec57816000926020809301838601378301015290565b929190610ed5602091604086526040860190610e42565b930152565b6001600160a01b03600054163303610eee57565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fdfea2646970667358221220d9d0467e6ffd0c2df36a33ffd32ccae37ba671f5f124b7a4e669f89442fb43d064736f6c634300081c0033";

type ProjectMonConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProjectMonConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ProjectMon__factory extends ContractFactory {
  constructor(...args: ProjectMonConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _accControl: AddressLike,
    _hasher: AddressLike,
    initialOwner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _accControl,
      _hasher,
      initialOwner,
      overrides || {}
    );
  }
  override deploy(
    _accControl: AddressLike,
    _hasher: AddressLike,
    initialOwner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _accControl,
      _hasher,
      initialOwner,
      overrides || {}
    ) as Promise<
      ProjectMon & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ProjectMon__factory {
    return super.connect(runner) as ProjectMon__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProjectMonInterface {
    return new Interface(_abi) as ProjectMonInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ProjectMon {
    return new Contract(address, _abi, runner) as unknown as ProjectMon;
  }
}
