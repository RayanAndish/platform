/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { NonPayableOverrides } from "../../../../../../common";
import type {
  PluginV1Mock,
  PluginV1MockInterface,
} from "../../../../../../src/test/plugin/Constructable/PluginMock.sol/PluginV1Mock";
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
        internalType: "contract IDAO",
        name: "_dao",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
  "0x60a034607857601f610a6738819003918201601f19168301916001600160401b03831184841017607d57808492602094604052833981010312607857516001600160a01b0381168103607857608052600180556040516109d39081610094823960805181818161027d0152818161036f01526105dc0152f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe6080604052600436101561001257600080fd5b60003560e01c806301ffc9a7146100a75780632ae9c600146100a25780634162169f1461009d57806341de6830146100985780636accab8c146100935780638cb750591461008e578063bb225da214610089578063c98425ee146100845763dd63c06f1461007f57600080fd5b610565565b610530565b610345565b61030a565b6102ec565b6102d0565b610250565b6101bd565b346101b85760206003193601126101b8576004357fffffffff0000000000000000000000000000000000000000000000000000000081168091036101b85761014e817f41de6830000000000000000000000000000000000000000000000000000000007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80931490811561018e575b8115610164575b8115610153575b50151560805260a090565b016080f35b6301ffc9a760e01b91501483610143565b7fafc5b823000000000000000000000000000000000000000000000000000000008114915061013c565b7f2ae9c6000000000000000000000000000000000000000000000000000000000081149150610135565b600080fd5b346101b85760006003193601126101b8576060806040516101de8282610657565b36903760405181810181811067ffffffffffffffff82111761024b578290604052600182526004602083015260006040830152604051918291820190826000905b6003821061022e575050500390f35b825160ff168152859450602092830192600192909201910161021f565b61060c565b346101b85760006003193601126101b857602060405173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b346101b85760006003193601126101b857602060405160028152f35b346101b85760006003193601126101b8576020600154604051908152f35b346101b85760006003193601126101b85760206040517f568cc693d84eb1901f8bcecba154cbdef23ca3cf67efc0a0b698528a06c660f78152f35b346101b85760406003193601126101b857600073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000166040517ffdef91060000000000000000000000000000000000000000000000000000000081523060048201523360248201527f568cc693d84eb1901f8bcecba154cbdef23ca3cf67efc0a0b698528a06c660f7604482015260806064820152366084820152368360a48301378260a4368301015260208160a481601f19601f3601168101030181855afa9081156104e75783916104b8575b5015610439575061043661067a565b80f35b6040517f32dbe3b400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911660048201523060248201523360448201527f568cc693d84eb1901f8bcecba154cbdef23ca3cf67efc0a0b698528a06c660f7606482015280608481015b0390fd5b6104da915060203d6020116104e0575b6104d28183610657565b8101906107ee565b38610427565b503d6104c8565b610806565b600211156104f657565b6102a1565b815173ffffffffffffffffffffffffffffffffffffffff16815260209091015160408201929160028210156104f65760200152565b346101b85760006003193601126101b857610549610796565b506105616105556107af565b604051918291826104fb565b0390f35b346101b85760006003193601126101b85761057e610796565b506105876107af565b73ffffffffffffffffffffffffffffffffffffffff815116156105b5575b61056190604051918291826104fb565b506105616040516105c58161063b565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001681526000602082015290506105a5565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040810190811067ffffffffffffffff82111761024b57604052565b90601f601f19910116810190811067ffffffffffffffff82111761024b57604052565b60406003193601126101b8576040516106928161063b565b60043573ffffffffffffffffffffffffffffffffffffffff8116908181036101b857825260243560028110156101b857602083019081526106d2826108a8565b9182610784575b82610772575b5081610754575b5061071e57610719816105557f88e879ae0d71faf3aa708f2978daccb99b95243615dc104835b8c5a21c884ae693610812565b0390a1565b6104b4906040519182917f266d0fb9000000000000000000000000000000000000000000000000000000008352600483016104fb565b6001915051610762816104ec565b61076b816104ec565b14386106e6565b61077d919250610952565b90386106df565b915061078f82610907565b15916106d9565b604051906107a38261063b565b60006020838281520152565b604051906107bc8261063b565b60005473ffffffffffffffffffffffffffffffffffffffff8116835260a01c60ff168260028210156104f65760200152565b908160209103126101b8575180151581036101b85790565b6040513d6000823e3d90fd5b73ffffffffffffffffffffffffffffffffffffffff815116602060005492827fffffffffffffffffffffffff0000000000000000000000000000000000000000851617600055015160028110156104f65774ff00000000000000000000000000000000000000007fffffffffffffffffffffff0000000000000000000000000000000000000000009160a01b1692161717600055565b6000602091604051838101906301ffc9a760e01b82526301ffc9a760e01b6024820152602481526108da604482610657565b5191617530fa6000513d826108fb575b50816108f4575090565b9050151590565b602011159150386108ea565b6000602091604051838101906301ffc9a760e01b82527fffffffff000000000000000000000000000000000000000000000000000000006024820152602481526108da604482610657565b6000602091604051838101906301ffc9a760e01b82527f549ea75a000000000000000000000000000000000000000000000000000000006024820152602481526108da60448261065756fea26469706673582212206e31ba8461cc15501c7570975dfc84908beb81d27ebcf48fcfc78cec9f03187c64736f6c634300081c0033";

type PluginV1MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PluginV1MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PluginV1Mock__factory extends ContractFactory {
  constructor(...args: PluginV1MockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _dao: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_dao, overrides || {});
  }
  override deploy(
    _dao: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_dao, overrides || {}) as Promise<
      PluginV1Mock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): PluginV1Mock__factory {
    return super.connect(runner) as PluginV1Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PluginV1MockInterface {
    return new Interface(_abi) as PluginV1MockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PluginV1Mock {
    return new Contract(address, _abi, runner) as unknown as PluginV1Mock;
  }
}
