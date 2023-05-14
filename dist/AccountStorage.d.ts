import { Account } from "./Account";
export declare class AccountsStorage {
    accountList: Account[];
    constructor();
    getAccount(index: number): Account;
    getAccountByUUID(uuid: string): Account | undefined;
    getAccountByName(name: string): Account | undefined;
    addAccount(account: Account): void;
    deleteAccount(account: Account): void;
    serialize(): string;
    static deserialize(data: string): AccountsStorage;
}
