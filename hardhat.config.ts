import { HardhatUserConfig, task } from "hardhat/config";
import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-abi-exporter";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";

dotenv.config();

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const DEPLOYER_ADDRESS = process.env.DEPLOYER_ADDRESS as string;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY as string;
const REPORT_GAS = process.env.REPORT_GAS;
const CMC_API_KEY = process.env.CMC_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const mainnetConfig = {
    url: "https://mainnet.infura.io/v3/" + INFURA_PROJECT_ID,
    chainId: 1,
    live: true,
    saveDeployments: true,
    accounts: [] as string[]
};

const ropstenConfig = {
    url: "https://ropsten.infura.io/v3/" + INFURA_PROJECT_ID,
    chainId: 3,
    live: true,
    saveDeployments: true,
    accounts: [] as string[]
};

const rinkebyConfig = {
    url: "https://rinkeby.infura.io/v3/" + INFURA_PROJECT_ID,
    chainId: 4,
    live: true,
    saveDeployments: true,
    accounts: [] as string[]
};

if (DEPLOYER_PRIVATE_KEY) {
    mainnetConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
    ropstenConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
    rinkebyConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
}

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.11",
        settings: {
            optimizer: {
                enabled: true,
                runs: 9999
            }
        }
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            live: false,
            saveDeployments: false,
        },
        mainnet: mainnetConfig,
        rinkeby: rinkebyConfig,
        ropsten: ropstenConfig,
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: DEPLOYER_ADDRESS,
        }
    },
    abiExporter: {
        path: './abis',
        clear: true,
        flat: true,
        only: [':Sample']
    },
    gasReporter: {
        enabled: REPORT_GAS && REPORT_GAS === "true" ? true : false,
        coinmarketcap: CMC_API_KEY,
        currency: 'USD',
        showTimeSpent: true
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    }
};

export default config;
