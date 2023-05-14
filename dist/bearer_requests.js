"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpPost_BEARER = exports.HttpCustom_BEARER = exports.HttpGet_BEARER = void 0;
const http_client_methods_1 = require("http-client-methods");
async function HttpGet_BEARER(url, token, headers, objectResponse = false) {
    return await HttpCustom_BEARER("get", url, token, undefined, headers, objectResponse);
}
exports.HttpGet_BEARER = HttpGet_BEARER;
async function HttpCustom_BEARER(method, url, token, body, headers, objectResponse = false) {
    if (!headers)
        headers = {};
    headers["Authorization"] = `Bearer ${token}`;
    return (0, http_client_methods_1.HttpCustom)(method, url, body, headers, objectResponse);
}
exports.HttpCustom_BEARER = HttpCustom_BEARER;
async function HttpPost_BEARER(url, data, token, headers, objectResponse = false) {
    return await HttpCustom_BEARER("post", url, token, data, headers, objectResponse);
}
exports.HttpPost_BEARER = HttpPost_BEARER;
//# sourceMappingURL=bearer_requests.js.map