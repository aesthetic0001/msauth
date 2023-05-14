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
exports.Account = void 0;
const types_1 = require("./types");
const MojangAuth = __importStar(require("./MojangAuth/MojangAuth"));
const MojangAPI = __importStar(require("./MojangAPI/MojangAPI"));
class Account {
    constructor(token, type) {
        this.ownership = false;
        this.properties = {};
        this.alternativeValidation = false;
        this.accessToken = token;
        this.type = type;
    }
    async checkValidToken() {
        if (!this.accessToken)
            return false;
        return await MojangAuth.validateToken(this.accessToken, this.alternativeValidation);
    }
    async checkOwnership() {
        if (!this.accessToken)
            return false;
        this.ownership = await MojangAPI.checkOwnership(this.accessToken);
        return this.ownership;
    }
    async getProfile() {
        if (!this.accessToken)
            return undefined;
        if (!this.ownership) {
            await this.checkOwnership();
            if (!this.ownership)
                throw new types_1.OwnershipError("User don't have minecraft on his account!");
            return this.getProfile();
        }
        let profile = await MojangAPI.getProfile(this.accessToken);
        this.username = profile.name;
        this.uuid = profile.id;
        this.profile = profile;
        return profile;
    }
    async changeSkin(url, variant) {
        if (!this.accessToken)
            return;
        await MojangAPI.changeSkin(url, variant, this.accessToken);
        return true;
    }
    async checkNameAvailability(name) {
        if (!this.accessToken)
            return false;
        return await MojangAPI.nameAvailability(name, this.accessToken);
    }
    async canChangeName() {
        if (!this.accessToken)
            return false;
        return (await MojangAPI.nameChangeInfo(this.accessToken)).nameChangeAllowed;
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.js.map