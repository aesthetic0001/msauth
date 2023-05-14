"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MojangAccount = void 0;
const types_1 = require("../types");
const MojangAuth = __importStar(require("./MojangAuth"));
const Account_1 = require("../Account");
class MojangAccount extends Account_1.Account {
    constructor() {
        super(undefined, "mojang");
    }
    async Login(username, password, saveCredentials) {
        if (!username)
            username = this.login_username;
        if (!password)
            password = this.login_password;
        if (!username || !password)
            throw new types_1.AuthenticationError("Username or password not provided", "Username or password not provided", "");
        let resp = await MojangAuth.authenticate(username, password);
        this.clientToken = resp.clientToken;
        this.accessToken = resp.accessToken;
        this.login_username = undefined;
        this.login_password = undefined;
        if (saveCredentials) {
            this.login_username = username;
            this.login_password = password;
        }
        return this.accessToken;
    }
    async refresh() {
        if (!this.accessToken)
            throw new types_1.AuthenticationError("Access token not provided", "Access token not provided for refreshing");
        if (!this.clientToken)
            throw new types_1.AuthenticationError("Client token not provided", "Client token not provided for refreshing");
        let resp = await MojangAuth.refresh(this.accessToken, this.clientToken);
        this.clientToken = resp.clientToken;
        this.accessToken = resp.accessToken;
        return this.accessToken;
    }
    async use() {
        if (await this.checkValidToken()) {
            return this.accessToken;
        }
        else {
            if (this.login_username && this.login_password) {
                try {
                    await this.refresh();
                    return this.accessToken;
                }
                catch (e) {
                    await this.Login();
                    return this.accessToken;
                }
            }
            else {
                await this.refresh();
                return this.accessToken;
            }
        }
    }
}
exports.MojangAccount = MojangAccount;
//# sourceMappingURL=MojangAccount.js.map