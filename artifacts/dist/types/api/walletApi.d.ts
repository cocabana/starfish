import { PrivateKeyWallet } from "@alephium/web3-wallet";
declare class WalletApi {
    private signers;
    prepareAccounts(keys?: string[]): Promise<void>;
    syncAccountsToWebsiteProject(): Promise<void>;
    getSignerByAddress(address: string): PrivateKeyWallet;
}
export declare const walletApi: WalletApi;
export {};
//# sourceMappingURL=walletApi.d.ts.map