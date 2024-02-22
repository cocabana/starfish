"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDeployments = void 0;
const _1 = require(".");
const _deployments_mainnet_json_1 = __importDefault(require("../.deployments.mainnet.json"));
const _deployments_devnet_json_1 = __importDefault(require("../.deployments.devnet.json"));
function toDeployments(json) {
    const contracts = {
        DIDRecord: {
            ...json.contracts["DIDRecord"],
            contractInstance: _1.DIDRecord.at(json.contracts["DIDRecord"].contractInstance.address),
        },
        DIDRegistrar: {
            ...json.contracts["DIDRegistrar"],
            contractInstance: _1.DIDRegistrar.at(json.contracts["DIDRegistrar"].contractInstance.address),
        },
    };
    return {
        ...json,
        contracts: contracts,
    };
}
function loadDeployments(networkId, deployerAddress) {
    const deployments = networkId === "mainnet"
        ? _deployments_mainnet_json_1.default
        : networkId === "devnet"
            ? _deployments_devnet_json_1.default
            : undefined;
    if (deployments === undefined) {
        throw Error("The contract has not been deployed to the " + networkId);
    }
    const allDeployments = Array.isArray(deployments)
        ? deployments
        : [deployments];
    if (deployerAddress === undefined) {
        if (allDeployments.length > 1) {
            throw Error("The contract has been deployed multiple times on " +
                networkId +
                ", please specify the deployer address");
        }
        else {
            return toDeployments(allDeployments[0]);
        }
    }
    const result = allDeployments.find((d) => d.deployerAddress === deployerAddress);
    if (result === undefined) {
        throw Error("The contract deployment result does not exist");
    }
    return toDeployments(result);
}
exports.loadDeployments = loadDeployments;
//# sourceMappingURL=deployments.js.map