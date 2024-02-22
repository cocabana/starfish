"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetAttribute = exports.RevokeAttribute = exports.Register = void 0;
const web3_1 = require("@alephium/web3");
const Register_ral_json_1 = __importDefault(require("../Register.ral.json"));
const RevokeAttribute_ral_json_1 = __importDefault(require("../RevokeAttribute.ral.json"));
const SetAttribute_ral_json_1 = __importDefault(require("../SetAttribute.ral.json"));
exports.Register = new web3_1.ExecutableScript(web3_1.Script.fromJson(Register_ral_json_1.default));
exports.RevokeAttribute = new web3_1.ExecutableScript(web3_1.Script.fromJson(RevokeAttribute_ral_json_1.default));
exports.SetAttribute = new web3_1.ExecutableScript(web3_1.Script.fromJson(SetAttribute_ral_json_1.default));
//# sourceMappingURL=scripts.js.map