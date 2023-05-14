import { MCTokenResponse, MSConfigType, Proxy, ServerConfigType, TokenResponse, XBLResponse, XSTSResponse } from "./MicrosoftAuth.types";
import { ListeningHttpServer } from "../types";
export declare function setup(_config: Partial<MSConfigType>): void;
export declare function createServer(serverConfig: ServerConfigType): Promise<ListeningHttpServer>;
export declare function _listenForCode(server: ListeningHttpServer, serverConfig: ServerConfigType): Promise<string>;
export declare function listenForCode(_serverConfig?: Partial<ServerConfigType>): Promise<string>;
export declare function createUrl(): string;
export declare function getToken(authCode: string): Promise<TokenResponse>;
export declare function getTokenRefresh(refreshToken: string): Promise<TokenResponse>;
export declare function authXBL(accessToken: string): Promise<XBLResponse>;
export declare function authXSTS(xblToken: string): Promise<XSTSResponse>;
export declare function getMinecraftToken(xstsToken: string, uhs: string): Promise<MCTokenResponse>;
export declare function authFlow(authCode: string): Promise<{
    access_token: string;
    refresh_token: string;
}>;
export declare function authFlowRefresh(refresh_token: string): Promise<{
    access_token: string;
    refresh_token: string;
}>;
export declare function authFlowXBL(token: string, refresh_token: string): Promise<{
    access_token: string;
    refresh_token: string;
}>;
export declare function getMinecraftTokenWithProxy(xstsToken: string, uhs: string, proxy: Proxy): Promise<MCTokenResponse>;
export declare function authFlowXBLWithProxy(token: string, refresh_token: string, proxy: Proxy): Promise<{
    access_token: string;
    refresh_token: string;
}>;
