"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFlowXBLWithProxy = exports.getMinecraftTokenWithProxy = exports.authFlowXBL = exports.authFlowRefresh = exports.authFlow = exports.getMinecraftToken = exports.authXSTS = exports.authXBL = exports.getTokenRefresh = exports.getToken = exports.createUrl = exports.listenForCode = exports._listenForCode = exports.createServer = exports.setup = void 0;
const http_1 = __importDefault(require("http"));
const http_client_methods_1 = require("http-client-methods");
const node_fetch_1 = __importDefault(require("node-fetch"));
const https_proxy_agent_1 = require("https-proxy-agent");
const types_1 = require("../types");
let config = {
    scope: "XboxLive.signin offline_access",
    redirectURL: "http://localhost:8080/token"
};
function setup(_config) {
    config = { ...config, ..._config };
}
exports.setup = setup;
async function createServer(serverConfig) {
    // @ts-ignore
    const server = http_1.default.createServer();
    await server.listen(serverConfig.port, serverConfig.host, () => {
        console.log(`MS Token Server is running on http://${serverConfig.host}:${serverConfig.port}`);
    });
    server.fullClose = async function () {
        await server.close();
    };
    return server;
}
exports.createServer = createServer;
async function _listenForCode(server, serverConfig) {
    return await new Promise((r, j) => {
        let _timeout = setTimeout(async () => {
            await server.fullClose();
            j(undefined);
        }, serverConfig.timeout);
        server.fullClose = async function () {
            await server.close();
            clearTimeout(_timeout);
        };
        async function requestListener(req, res) {
            if (!req.url)
                return;
            switch (req.url.split('?')[0]) {
                case '/token':
                    if (serverConfig.redirectAfterAuth) {
                        await res.writeHead(301, {
                            Location: serverConfig.redirectAfterAuth,
                        });
                    }
                    await res.end();
                    await server.fullClose();
                    if (req.url.includes('?code'))
                        r(req.url.split('?code=')[1]);
                    if (req.url.includes('?error')) {
                        const error = req.url.split('?error=')[1].split('&')[0];
                        const error_description = decodeURIComponent(req.url.split('&error_description=')[1]);
                        j(new types_1.AuthenticationError(error, error_description, ''));
                    }
                    break;
                case '/url':
                    await res.writeHead(200);
                    await res.end(createUrl());
                    break;
                case '/close':
                    await server.fullClose();
                    j(undefined);
                    break;
                case '/auth':
                    res.writeHead(302, {
                        Location: createUrl(),
                    });
                    res.end();
                    break;
                default:
                    res.writeHead(302, {
                        Location: createUrl(),
                    });
                    res.end();
                    break;
            }
            await res.writeHead(404);
            await res.end();
        }
        server.on('request', requestListener);
    });
}
exports._listenForCode = _listenForCode;
async function listenForCode(_serverConfig = {}) {
    const serverConfig = { port: 8080, host: "localhost", timeout: 30 * 1000, ..._serverConfig };
    const server = await createServer(serverConfig);
    return _listenForCode(server, serverConfig);
}
exports.listenForCode = listenForCode;
function createUrl() {
    let encodedID = encodeURIComponent(config.appID ?? "");
    let encodedUrl = encodeURIComponent(config.redirectURL);
    let encodedScope = encodeURIComponent(config.scope);
    return `https://login.live.com/oauth20_authorize.srf?client_id=${encodedID}&response_type=code&redirect_uri=${encodedUrl}&scope=${encodedScope}`;
}
exports.createUrl = createUrl;
async function getToken(authCode) {
    let encodedID = encodeURIComponent(config.appID ?? "");
    let encodedUrl = encodeURIComponent(config.redirectURL);
    const url = 'https://login.live.com/oauth20_token.srf';
    const body = `client_id=${encodedID}&code=${authCode}&grant_type=authorization_code&redirect_uri=${encodedUrl}`;
    const response = await (0, http_client_methods_1.HttpPost)(url, body, {
        'Content-Type': 'application/x-www-form-urlencoded',
    });
    const jsonResponse = JSON.parse(response);
    if (jsonResponse.error) {
        throw new types_1.AuthenticationError(jsonResponse.error, jsonResponse.error_description, jsonResponse.correlation_id);
    }
    return jsonResponse;
}
exports.getToken = getToken;
async function getTokenRefresh(refreshToken) {
    let encodedID = encodeURIComponent(config.appID ?? "");
    let encodedUrl = encodeURIComponent(config.redirectURL);
    const url = 'https://login.live.com/oauth20_token.srf';
    const body = `client_id=${encodedID}&refresh_token=${refreshToken}&grant_type=refresh_token&redirect_uri=${encodedUrl}`;
    const response = await (0, http_client_methods_1.HttpPost)(url, body, {
        'Content-Type': 'application/x-www-form-urlencoded',
    });
    const jsonResponse = JSON.parse(response);
    if (jsonResponse.error) {
        throw new types_1.AuthenticationError(jsonResponse.error, jsonResponse.error_description, jsonResponse.correlation_id);
    }
    return jsonResponse;
}
exports.getTokenRefresh = getTokenRefresh;
async function authXBL(accessToken) {
    const body = {
        Properties: {
            AuthMethod: 'RPS',
            SiteName: 'user.auth.xboxlive.com',
            RpsTicket: `d=${accessToken}`, // your access token from step 2 here
        },
        RelyingParty: 'http://auth.xboxlive.com',
        TokenType: 'JWT',
    };
    const response = await (0, http_client_methods_1.HttpPost)('https://user.auth.xboxlive.com/user/authenticate', JSON.stringify(body), {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    });
    const jsonResponse = JSON.parse(response);
    return jsonResponse;
}
exports.authXBL = authXBL;
async function authXSTS(xblToken) {
    const body = {
        Properties: {
            SandboxId: 'RETAIL',
            UserTokens: [`${xblToken}`],
        },
        RelyingParty: 'rp://api.minecraftservices.com/',
        TokenType: 'JWT',
    };
    const response = await (0, http_client_methods_1.HttpPost)('https://xsts.auth.xboxlive.com/xsts/authorize', JSON.stringify(body), {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    });
    const jsonResponse = JSON.parse(response);
    if (jsonResponse.XErr) {
        throw new types_1.AuthenticationError(String(jsonResponse.XErr), jsonResponse.Message, jsonResponse.Redirect);
    }
    return jsonResponse;
}
exports.authXSTS = authXSTS;
async function getMinecraftToken(xstsToken, uhs) {
    const body = {
        identityToken: `XBL3.0 x=${uhs};${xstsToken}`,
    };
    const response = await (0, http_client_methods_1.HttpPost)('https://api.minecraftservices.com/authentication/login_with_xbox', JSON.stringify(body), {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    });
    const jsonResponse = JSON.parse(response);
    return jsonResponse;
}
exports.getMinecraftToken = getMinecraftToken;
async function authFlow(authCode) {
    const tokenRes = await getToken(authCode);
    return await authFlowXBL(tokenRes.access_token, tokenRes.refresh_token);
}
exports.authFlow = authFlow;
async function authFlowRefresh(refresh_token) {
    const tokenRes = await getTokenRefresh(refresh_token);
    return await authFlowXBL(tokenRes.access_token, tokenRes.refresh_token);
}
exports.authFlowRefresh = authFlowRefresh;
async function authFlowXBL(token, refresh_token) {
    const xblRes = await authXBL(token);
    const xstsRes = await authXSTS(xblRes.Token);
    const mcToken = await getMinecraftToken(xstsRes.Token, xblRes.DisplayClaims.xui[0].uhs);
    return { access_token: mcToken.access_token, refresh_token };
}
exports.authFlowXBL = authFlowXBL;
async function getMinecraftTokenWithProxy(xstsToken, uhs, proxy) {
    const response = await (0, node_fetch_1.default)("https://api.minecraftservices.com/authentication/login_with_xbox", {
        agent: new https_proxy_agent_1.HttpsProxyAgent(`https://${proxy.host}:${proxy.port}`),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            identityToken: `XBL3.0 x=${uhs};${xstsToken}`,
        }),
        method: "POST"
    });
    const text = await response.text();
    const jsonResponse = JSON.parse(text);
    return jsonResponse;
}
exports.getMinecraftTokenWithProxy = getMinecraftTokenWithProxy;
async function authFlowXBLWithProxy(token, refresh_token, proxy) {
    const xblRes = await authXBL(token);
    const xstsRes = await authXSTS(xblRes.Token);
    const mcToken = await getMinecraftTokenWithProxy(xstsRes.Token, xblRes.DisplayClaims.xui[0].uhs, proxy);
    return { access_token: mcToken.access_token, refresh_token };
}
exports.authFlowXBLWithProxy = authFlowXBLWithProxy;
//# sourceMappingURL=MicrosoftAuth.js.map