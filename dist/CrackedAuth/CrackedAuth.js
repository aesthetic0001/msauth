"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = void 0;
const crypto_1 = __importDefault(require("crypto"));
function uuid(username) {
    let md5Bytes = crypto_1.default.createHash('md5').update(username).digest();
    md5Bytes[6] &= 0x0f;
    md5Bytes[6] |= 0x30;
    md5Bytes[8] &= 0x3f;
    md5Bytes[8] |= 0x80;
    return md5Bytes.toString('hex');
}
exports.uuid = uuid;
//# sourceMappingURL=CrackedAuth.js.map