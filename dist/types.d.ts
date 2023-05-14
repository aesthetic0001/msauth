/// <reference types="node" />
import http from "http";
export type ListeningHttpServer = http.Server & {
    fullClose: () => any;
};
export type AccountType = "mojang" | "cracked" | "microsoft" | "token";
export declare class AuthenticationError extends Error {
    additionalInfo?: string;
    constructor(_error: string, _message: string, _additionalInfo?: string);
}
export declare class OwnershipError extends Error {
    constructor(_error: string);
}
