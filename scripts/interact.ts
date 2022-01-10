import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ethers, deployments, getNamedAccounts } from "hardhat";

async function main() {
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);

    const contractName = 'Sample';
    const deployment = await deployments.get(contractName);
    const contract = new ethers.Contract(deployment.address, deployment.abi, signer);

    const x = Math.floor(Math.random() * 100000), y = Math.floor(Math.random() * 100000);
    let tx: TransactionResponse = await contract.math(x, y);
    await tx.wait(1);

    // there is obviously a race condition here :)
    const result = await contract.lastMathResult();
    console.log(`${x} + ${y} = ${result}`);
};

main()
    .then(() => process.exit(0))
    .catch((error: Error) => {
        console.error(error);
        process.exit(1);
    });
