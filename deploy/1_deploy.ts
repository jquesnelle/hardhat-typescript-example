import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy, log } = deployments;

    const { deployer } = await getNamedAccounts();

    const contractName = 'Sample';

    log("1) Deploy contract");
    const deployResult: any = await deploy(contractName, {
        from: deployer,
        contract: contractName,
        skipIfAlreadyDeployed: true,
        log: true
    });

    if (deployResult.newlyDeployed) {
        // do any extra init here
    }
    else
        log(`- Deployment skipped, using previous deployment at: ${deployResult.address}`);
};

export default func;
func.tags = ['1', 'Deploy']
