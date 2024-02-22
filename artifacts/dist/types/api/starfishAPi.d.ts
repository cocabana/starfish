import { Deployments } from "../ts/deployments";
declare class StarfishAPi {
    private deployments;
    private selectedDidAccount;
    constructor();
    get deploys(): Deployments;
    getDemoAccounts(): string[];
    getAccountBalance(address: string): Promise<string>;
    selectDidAccount(address: string): Promise<void>;
    getDIDAccount(): {
        did: string;
        address: string;
    };
    getDidRegistrarContractId(): string;
    hasContractAccount(address: string): Promise<boolean>;
    getContractState(address: string): Promise<any>;
    resolveSubContractAddress(identity: string): string;
    getDIDLinkedResource(identity: string): Promise<{
        name: string;
        value: string;
    }>;
}
export declare const starfishAPi: StarfishAPi;
export {};
//# sourceMappingURL=starfishAPi.d.ts.map