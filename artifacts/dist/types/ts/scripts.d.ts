import { Address, ExecutableScript, HexString } from "@alephium/web3";
export declare const Register: ExecutableScript<{
    registrar: HexString;
    identity: Address;
}>;
export declare const RevokeAttribute: ExecutableScript<{
    registrar: HexString;
    identity: Address;
    name: bigint;
    value: HexString;
}>;
export declare const SetAttribute: ExecutableScript<{
    registrar: HexString;
    identity: Address;
    name: bigint;
    value: HexString;
    validity: bigint;
}>;
//# sourceMappingURL=scripts.d.ts.map