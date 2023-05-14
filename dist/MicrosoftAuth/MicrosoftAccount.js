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
exports.MicrosoftAccount = void 0;
const types_1 = require("../types");
const MicrosoftAuth = __importStar(require("./MicrosoftAuth"));
const Account_1 = require("../Account");
class MicrosoftAccount extends Account_1.Account {
    constructor() {
        super(undefined, "microsoft");
        this.alternativeValidation = true;
    }
    async refresh() {
        if (!this.refreshToken)
            throw new types_1.AuthenticationError("Refresh token not provided", "Refresh token not provided for refreshing");
        let resp = await MicrosoftAuth.authFlowRefresh(this.refreshToken);
        this.refreshToken = resp.refresh_token;
        this.accessToken = resp.access_token;
        return this.accessToken;
    }
    async authFlow(authCode) {
        this.authCode = authCode;
        let resp = await MicrosoftAuth.authFlow(this.authCode);
        this.refreshToken = resp.refresh_token;
        this.accessToken = resp.access_token;
        return this.accessToken;
    }
    async use() {
        if (await this.checkValidToken()) {
            return this.accessToken;
        }
        else {
            await this.refresh();
            return this.accessToken;
        }
    }
}
exports.MicrosoftAccount = MicrosoftAccount;
//# sourceMappingURL=MicrosoftAccount.js.map