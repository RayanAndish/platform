/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  ERC1155,
  ERC1155Interface,
} from "../../../../../@openzeppelin/contracts/token/ERC1155/ERC1155";
import type { NonPayableOverrides } from "../../../../../common";
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
        type: "string",
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
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523461021f5761136d8038038061001981610224565b92833981019060208183031261021f578051906001600160401b03821161021f570181601f8201121561021f578051906001600160401b0382116101f45761006a601f8301601f1916602001610224565b928284526020838301011161021f5760005b82811061020a57600083850160200152835184906001600160401b0381116101f457600254600181811c911680156101ea575b60208210146101d457601f811161016f575b50602091601f821160011461010b57918192600092610100575b50508160011b916000199060031b1c1916176002555b604051611123908161024a8239f35b0151905082806100db565b601f198216926002600052806000209160005b8581106101575750836001951061013e575b505050811b016002556100f1565b015160001960f88460031b161c19169055828080610130565b9192602060018192868501518155019401920161011e565b60026000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace601f830160051c810191602084106101ca575b601f0160051c01905b8181106101be57506100c1565b600081556001016101b1565b90915081906101a8565b634e487b7160e01b600052602260045260246000fd5b90607f16906100af565b634e487b7160e01b600052604160045260246000fd5b8060208092840101518282870101520161007c565b600080fd5b6040519190601f01601f191682016001600160401b038111838210176101f45760405256fe6080604052600436101561001257600080fd5b60003560e01c8062fdd58e14610bdf57806301ffc9a714610b0d5780630e89341c14610a015780632eb2c2d6146106d65780634e1273f414610522578063a22cb4651461042b578063e985e9c5146103ce5763f242432a1461007357600080fd5b346103c95760a06003193601126103c95761008c610c0e565b610094610c24565b604435906064359060843567ffffffffffffffff81116103c9576100c46001600160a01b03913690600401610d29565b94169233841480156103a6575b6100da90610e54565b6001600160a01b038216916100f0831515610eef565b6100f9826110c2565b50610103846110c2565b5081600052600060205260406000208560005260205260406000205461012b85821015610f60565b6000838152602081815260408083208984529091528082209287900390925584815220805461015b908690610fd1565b905582856040518481528660208201527fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6260403392a43b61019857005b60006020946101f3604051978896879586947ff23a6e6100000000000000000000000000000000000000000000000000000000865233600487015260248601526044850152606484015260a0608484015260a4830190610c3a565b03925af160009181610375575b506102bf5761020d61102c565b6308c379a014610288575b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e2d4552433131353560448201527f526563656976657220696d706c656d656e746572000000000000000000000000606482015280608481015b0390fd5b61029061104a565b8061029b5750610218565b6102849060405191829162461bcd60e51b8352602060048401526024830190610c3a565b7fffffffff000000000000000000000000000000000000000000000000000000007ff23a6e610000000000000000000000000000000000000000000000000000000091160361030a57005b60405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a6563746560448201527f6420746f6b656e730000000000000000000000000000000000000000000000006064820152608490fd5b61039891925060203d60201161039f575b6103908183610c7b565b810190610ff4565b9038610200565b503d610386565b50600084815260016020908152604080832033845290915290205460ff166100d1565b600080fd5b346103c95760406003193601126103c9576103e7610c0e565b6001600160a01b036103f7610c24565b911660005260016020526001600160a01b0360406000209116600052602052602060ff604060002054166040519015158152f35b346103c95760406003193601126103c957610444610c0e565b602435908115158092036103c9576001600160a01b0316908133146104b857336000526001602052604060002082600052602052604060002060ff1981541660ff83161790556040519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a3005b608460405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c2073746174757360448201527f20666f722073656c6600000000000000000000000000000000000000000000006064820152fd5b346103c95760406003193601126103c95760043567ffffffffffffffff81116103c957366023820112156103c957806004013561055e81610cb4565b9161056c6040519384610c7b565b8183526024602084019260051b820101903682116103c957602401915b8183106106b6578360243567ffffffffffffffff81116103c9576105b1903690600401610ccc565b90805182510361064c57805191601f196105e36105cd85610cb4565b946105db6040519687610c7b565b808652610cb4565b0136602085013760005b825181101561063257806106216001600160a01b0361060e60019487610ec5565b511661061a8386610ec5565b5190610db4565b61062b8287610ec5565b52016105ed565b6040516020808252819061064890820187610d80565b0390f35b608460405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e67746860448201527f206d69736d6174636800000000000000000000000000000000000000000000006064820152fd5b82356001600160a01b03811681036103c957815260209283019201610589565b346103c95760a06003193601126103c9576106ef610c0e565b6106f7610c24565b60443567ffffffffffffffff81116103c957610717903690600401610ccc565b60643567ffffffffffffffff81116103c957610737903690600401610ccc565b9260843567ffffffffffffffff81116103c9576107606001600160a01b03913690600401610d29565b91169133831480156109de575b61077690610e54565b8051855103610974576001600160a01b03841691610795831515610eef565b60005b825181101561081a57806107ae60019285610ec5565b516107b9828a610ec5565b51908060005260006020526040806000206000908a825260205220546107e183821015610f60565b6000918252602082815260408084208b85529091528083209184900390915587825290208054909161081291610fd1565b905501610798565b50938284604051604081527f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb6108536040830187610d80565b9180830360208201528061086833948d610d80565b0390a43b61087257005b60006108ca936108ee6020966108dc604051998a98899788967fbc197c81000000000000000000000000000000000000000000000000000000008852336004890152602488015260a0604488015260a4870190610d80565b90600319868303016064870152610d80565b90600319848303016084850152610c3a565b03925af160009181610953575b506109085761020d61102c565b7fffffffff000000000000000000000000000000000000000000000000000000007fbc197c810000000000000000000000000000000000000000000000000000000091160361030a57005b61096d91925060203d60201161039f576103908183610c7b565b90826108fb565b608460405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060448201527f6d69736d617463680000000000000000000000000000000000000000000000006064820152fd5b50600083815260016020908152604080832033845290915290205460ff1661076d565b346103c95760206003193601126103c95760405160006002548060011c90600181168015610b03575b602083108114610aef57828552908115610acb5750600114610a6b575b61064883610a5781850382610c7b565b604051918291602083526020830190610c3a565b91905060026000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace916000905b808210610ab157509091508101602001610a57610a47565b919260018160209254838588010152019101909291610a99565b60ff191660208086019190915291151560051b84019091019150610a579050610a47565b602484634e487b7160e01b81526022600452fd5b91607f1691610a2a565b346103c95760206003193601126103c9576004357fffffffff0000000000000000000000000000000000000000000000000000000081168091036103c957807fd9b67a260000000000000000000000000000000000000000000000000000000060209214908115610bb5575b8115610b8b575b506040519015158152f35b7f01ffc9a70000000000000000000000000000000000000000000000000000000091501482610b80565b7f0e89341c0000000000000000000000000000000000000000000000000000000081149150610b79565b346103c95760406003193601126103c9576020610c06610bfd610c0e565b60243590610db4565b604051908152f35b600435906001600160a01b03821682036103c957565b602435906001600160a01b03821682036103c957565b919082519283825260005b848110610c66575050601f19601f8460006020809697860101520116010190565b80602080928401015182828601015201610c45565b90601f601f19910116810190811067ffffffffffffffff821117610c9e57604052565b634e487b7160e01b600052604160045260246000fd5b67ffffffffffffffff8111610c9e5760051b60200190565b9080601f830112156103c9578135610ce381610cb4565b92610cf16040519485610c7b565b81845260208085019260051b8201019283116103c957602001905b828210610d195750505090565b8135815260209182019101610d0c565b81601f820112156103c95780359067ffffffffffffffff8211610c9e5760405192610d5e6020601f19601f8601160185610c7b565b828452602083830101116103c957816000926020809301838601378301015290565b906020808351928381520192019060005b818110610d9e5750505090565b8251845260209384019390920191600101610d91565b906001600160a01b03821615610dea5760005260006020526001600160a01b036040600020911660005260205260406000205490565b608460405162461bcd60e51b815260206004820152602a60248201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660448201527f616c6964206f776e6572000000000000000000000000000000000000000000006064820152fd5b15610e5b57565b608460405162461bcd60e51b815260206004820152602e60248201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60448201527f6572206f7220617070726f7665640000000000000000000000000000000000006064820152fd5b8051821015610ed95760209160051b010190565b634e487b7160e01b600052603260045260246000fd5b15610ef657565b608460405162461bcd60e51b815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152fd5b15610f6757565b608460405162461bcd60e51b815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201527f72207472616e73666572000000000000000000000000000000000000000000006064820152fd5b91908201809211610fde57565b634e487b7160e01b600052601160045260246000fd5b908160209103126103c957517fffffffff00000000000000000000000000000000000000000000000000000000811681036103c95790565b60009060033d1161103957565b905060046000803e60005160e01c90565b600060443d106110b1576040516003193d016004823e8051913d602484011167ffffffffffffffff8411176110bc578282019283519167ffffffffffffffff83116110b4576003193d850101602084870101116110b457506110b192910160200190610c7b565b90565b949350505050565b92915050565b6040908151916110d28184610c7b565b60018352601f19602084019101368237825115610ed957529056fea2646970667358221220ba35afc0f911bb4d7efcc58d0f08520f67826858a588ffbdf0ea74003c3eb15764736f6c634300081c0033";

type ERC1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155__factory extends ContractFactory {
  constructor(...args: ERC1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    uri_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(uri_, overrides || {});
  }
  override deploy(
    uri_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(uri_, overrides || {}) as Promise<
      ERC1155 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC1155__factory {
    return super.connect(runner) as ERC1155__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155Interface {
    return new Interface(_abi) as ERC1155Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERC1155 {
    return new Contract(address, _abi, runner) as unknown as ERC1155;
  }
}
