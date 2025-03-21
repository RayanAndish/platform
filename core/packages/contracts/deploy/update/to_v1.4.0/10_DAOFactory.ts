import daoFactoryArtifact from '../../../artifacts/src/framework/dao/DAOFactory.sol/DAOFactory.json';
import {DAO__factory} from '../../../typechain';
import {getLatestContractAddress} from '../../helpers';
import {Operation} from '@aragon/osx-commons-sdk';
import {DeployFunction} from 'hardhat-deploy/types';
import {HardhatRuntimeEnvironment} from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log('\nUpdating DAOFactory');
  const {deployments, ethers} = hre;
  const {deploy} = deployments;
  const [deployer] = await ethers.getSigners();

  const managementDAOAddress = getLatestContractAddress(
    'ManagementDAOProxy',
    hre
  );
  const pluginSetupProcessorAddress = getLatestContractAddress(
    'PluginSetupProcessor',
    hre
  );

  const daoRegistryAddress = getLatestContractAddress('DAORegistryProxy', hre);
  console.log(`Using managementDAO ${managementDAOAddress}`);
  console.log(`Using PluginSetupProcessor ${pluginSetupProcessorAddress}`);
  console.log(`Using DAORegistry ${daoRegistryAddress}`);

  const deployResult = await deploy('DAOFactory', {
    contract: daoFactoryArtifact,
    from: deployer.address,
    args: [daoRegistryAddress, pluginSetupProcessorAddress],
    log: true,
  });

  const daoInterface = DAO__factory.createInterface();
  const calldata = daoInterface.encodeFunctionData(
    'applyMultiTargetPermissions',
    [
      [
        {
          who: deployResult.address,
          where: daoRegistryAddress,
          operation: Operation.Grant,
          permissionId: ethers.utils.id('REGISTER_DAO_PERMISSION'),
          condition: ethers.constants.AddressZero,
        },
      ],
    ]
  );
  // update permissions actions
  hre.managementDAOActions.push({
    to: managementDAOAddress,
    value: 0,
    data: calldata,
    description: `Grant the <strong>REGISTER_DAO_PERMISSION_ID</strong> permission on the <strong>DAORegistry</strong> (<code>${daoRegistryAddress}</code>) to the new <strong>DAOFactory</strong> (<code>${deployResult.address}</code>).`,
  });
};
export default func;
func.tags = ['DAOFactory', 'v1.4.0'];
func.dependencies = ['Env'];
