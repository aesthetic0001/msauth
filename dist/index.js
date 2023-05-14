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
exports.Account = exports.AccountsStorage = exports.MojangAccount = exports.CrackedAccount = exports.MicrosoftAccount = exports.MojangAPI = exports.CrackedAuth = exports.MojangAuth = exports.MicrosoftAuth = void 0;
exports.MicrosoftAuth = __importStar(require("./MicrosoftAuth/MicrosoftAuth"));
exports.MojangAuth = __importStar(require("./MojangAuth/MojangAuth"));
exports.CrackedAuth = __importStar(require("./CrackedAuth/CrackedAuth"));
exports.MojangAPI = __importStar(require("./MojangAPI/MojangAPI"));
var MicrosoftAccount_1 = require("./MicrosoftAuth/MicrosoftAccount");
Object.defineProperty(exports, "MicrosoftAccount", { enumerable: true, get: function () { return MicrosoftAccount_1.MicrosoftAccount; } });
var CrackedAccount_1 = require("./CrackedAuth/CrackedAccount");
Object.defineProperty(exports, "CrackedAccount", { enumerable: true, get: function () { return CrackedAccount_1.CrackedAccount; } });
var MojangAccount_1 = require("./MojangAuth/MojangAccount");
Object.defineProperty(exports, "MojangAccount", { enumerable: true, get: function () { return MojangAccount_1.MojangAccount; } });
var AccountStorage_1 = require("./AccountStorage");
Object.defineProperty(exports, "AccountsStorage", { enumerable: true, get: function () { return AccountStorage_1.AccountsStorage; } });
var Account_1 = require("./Account");
Object.defineProperty(exports, "Account", { enumerable: true, get: function () { return Account_1.Account; } });
//# sourceMappingURL=index.js.map