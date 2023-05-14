"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsStorage = void 0;
const Account_1 = require("./Account");
const CrackedAccount_1 = require("./CrackedAuth/CrackedAccount");
const MojangAccount_1 = require("./MojangAuth/MojangAccount");
const MicrosoftAccount_1 = require("./MicrosoftAuth/MicrosoftAccount");
class AccountsStorage {
    constructor() {
        this.accountList = [];
    }
    getAccount(index) {
        return this.accountList[index];
    }
    getAccountByUUID(uuid) {
        let acc = undefined;
        this.accountList.forEach((el) => {
            if (el.uuid === uuid) {
                acc = el;
            }
        });
        return acc;
    }
    getAccountByName(name) {
        let acc = undefined;
        this.accountList.forEach((el) => {
            if (el.username === name) {
                acc = el;
            }
        });
        return acc;
    }
    addAccount(account) {
        this.accountList.push(account);
    }
    deleteAccount(account) {
        for (let i = 0; i < this.accountList.length; i++) {
            if (this.accountList[i] === account) {
                this.accountList.splice(i, 1);
                i--;
            }
        }
    }
    serialize() {
        return JSON.stringify(this.accountList);
    }
    static deserialize(data) {
        let accounts = JSON.parse(data);
        let accStorage = new AccountsStorage();
        accounts.forEach((account) => {
            if (account.type == "microsoft") {
                accStorage.addAccount(Object.setPrototypeOf(account, MicrosoftAccount_1.MicrosoftAccount.prototype));
            }
            else if (account.type == "mojang") {
                accStorage.addAccount(Object.setPrototypeOf(account, MojangAccount_1.MojangAccount.prototype));
            }
            else if (account.type == "cracked") {
                accStorage.addAccount(Object.setPrototypeOf(account, CrackedAccount_1.CrackedAccount.prototype));
            }
            else {
                accStorage.addAccount(Object.setPrototypeOf(account, Account_1.Account.prototype));
            }
        });
        return accStorage;
    }
}
exports.AccountsStorage = AccountsStorage;
//# sourceMappingURL=AccountStorage.js.map