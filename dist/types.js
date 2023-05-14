"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnershipError = exports.AuthenticationError = void 0;
class AuthenticationError extends Error {
    constructor(_error, _message, _additionalInfo) {
        super(_message);
        this.name = _error;
        this.additionalInfo = _additionalInfo;
    }
}
exports.AuthenticationError = AuthenticationError;
class OwnershipError extends Error {
    constructor(_error) {
        super(_error);
    }
}
exports.OwnershipError = OwnershipError;
//# sourceMappingURL=types.js.map