"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.checkOwnership = exports.resetSkin = exports.changeSkin = exports.nameAvailability = exports.nameChangeInfo = exports.getBlockedServers = exports.getProfileByUUID = exports.usernameToUUID = void 0;
const http_client_methods_1 = require("http-client-methods");
const bearer_requests_1 = require("../bearer_requests");
async function usernameToUUID(username) {
    let url = `https://api.mojang.com/users/profiles/minecraft/${username}`;
    let response = await (0, http_client_methods_1.HttpGet)(url);
    let jsonResponse = JSON.parse(response);
    return jsonResponse;
}
exports.usernameToUUID = usernameToUUID;
async function getProfileByUUID(uuid) {
    let url = `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`;
    let response = await (0, http_client_methods_1.HttpGet)(url);
    let jsonResponseEncoded = JSON.parse(response);
    let decodedValue = JSON.parse(atob(jsonResponseEncoded.properties[0].value));
    let jsonResponse = {
        ...jsonResponseEncoded,
        properties: [{ name: jsonResponseEncoded.properties[0].name, value: decodedValue }]
    };
    return jsonResponse;
}
exports.getProfileByUUID = getProfileByUUID;
async function getBlockedServers() {
    let url = "https://sessionserver.mojang.com/blockedservers";
    let response = await (0, http_client_methods_1.HttpGet)(url);
    return response.split('\n');
}
exports.getBlockedServers = getBlockedServers;
async function nameChangeInfo(token) {
    let url = "https://api.minecraftservices.com/minecraft/profile/namechange";
    let response = await (0, bearer_requests_1.HttpGet_BEARER)(url, token);
    let jsonResponse = JSON.parse(response);
    return jsonResponse;
}
exports.nameChangeInfo = nameChangeInfo;
async function nameAvailability(name, token) {
    let url = `https://api.minecraftservices.com/minecraft/profile/name/${name}/available`;
    let response = await (0, bearer_requests_1.HttpGet_BEARER)(url, token);
    let jsonResponse = JSON.parse(response);
    return jsonResponse.status == "AVAILABLE";
}
exports.nameAvailability = nameAvailability;
async function changeSkin(url, variant, token) {
    let body = {
        "variant": variant,
        "url": url
    };
    let Rurl = "https://api.minecraftservices.com/minecraft/profile/skins";
    let response = await (0, bearer_requests_1.HttpPost_BEARER)(Rurl, JSON.stringify(body), token, { "Content-Type": "application/json" });
    if (response.length > 0)
        throw response;
}
exports.changeSkin = changeSkin;
async function resetSkin(uuid, token) {
    let url = `https://api.mojang.com/user/profile/${uuid}/skin`;
    let response = await (0, bearer_requests_1.HttpCustom_BEARER)("delete", url, token);
    if (response.length > 0)
        throw response;
}
exports.resetSkin = resetSkin;
async function checkOwnership(token, profileResp) {
    if (!profileResp) {
        profileResp = await getProfile(token);
    }
    return !!profileResp.id;
}
exports.checkOwnership = checkOwnership;
async function getProfile(token) {
    let response = await (0, bearer_requests_1.HttpGet_BEARER)("https://api.minecraftservices.com/minecraft/profile", token);
    let jsonResponse = JSON.parse(response);
    return jsonResponse;
}
exports.getProfile = getProfile;
//# sourceMappingURL=MojangAPI.js.map