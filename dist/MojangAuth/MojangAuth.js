"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._validateTokenAlternative = exports._validateToken = exports.validateToken = exports.refresh = exports.authenticate = void 0;
const http_client_methods_1 = require("http-client-methods");
const types_1 = require("../types");
const bearer_requests_1 = require("../bearer_requests");
let authUrl = "https://authserver.mojang.com";
async function authenticate(username, password, clientToken) {
    let url = authUrl + "/authenticate";
    let body = {
        "agent": {
            "name": "Minecraft",
            "version": 1
        },
        "username": `${username}`,
        "password": `${password}`,
        "requestUser": true
    };
    if (clientToken) {
        body.clientToken = clientToken;
    }
    let response = await (0, http_client_methods_1.HttpPost)(url, JSON.stringify(body), { "Content-Type": "application/json" });
    let jsonResponse = JSON.parse(response);
    if (jsonResponse.error) {
        throw new types_1.AuthenticationError(jsonResponse.error, jsonResponse.errorMessage, jsonResponse.cause);
    }
    return jsonResponse;
}
exports.authenticate = authenticate;
async function refresh(accessToken, clientToken) {
    let url = authUrl + "/refresh";
    let body = {
        "accessToken": `${accessToken}`,
        "clientToken": `${clientToken}`,
        "requestUser": true
    };
    let response = await (0, http_client_methods_1.HttpPost)(url, JSON.stringify(body), { "Content-Type": "application/json" });
    let jsonResponse = JSON.parse(response);
    if (jsonResponse.error) {
        throw new types_1.AuthenticationError(jsonResponse.error, jsonResponse.errorMessage, jsonResponse.cause);
    }
    return jsonResponse;
}
exports.refresh = refresh;
async function validateToken(token, alternativeValidation) {
    if (!alternativeValidation)
        return await _validateToken(token);
    else
        return await _validateTokenAlternative(token);
}
exports.validateToken = validateToken;
async function _validateToken(token) {
    let url = authUrl + "/validate";
    let body = {
        "accessToken": `${token}`,
    };
    let response = await (0, http_client_methods_1.HttpPost)(url, JSON.stringify(body), { "Content-Type": "application/json" });
    if (response.length < 1)
        return true;
    let jsonResponse = JSON.parse(response);
    if (jsonResponse.error) {
        return false;
    }
}
exports._validateToken = _validateToken;
async function _validateTokenAlternative(token) {
    let res = await (0, bearer_requests_1.HttpGet_BEARER)("https://api.minecraftservices.com/minecraft/profile", token, {}, true);
    return res.status != 401 && res.status != 403;
}
exports._validateTokenAlternative = _validateTokenAlternative;
//# sourceMappingURL=MojangAuth.js.map