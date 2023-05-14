import { AccountType } from "./types";
import { MCProfileResponse } from "./MojangAPI/MojangAPI.types";
export declare class Account {
    accessToken?: string;
    ownership: boolean;
    uuid?: string;
    username?: string;
    type: AccountType;
    profile?: MCProfileResponse;
    properties: any;
    alternativeValidation: boolean;
    constructor(token: string | undefined, type: AccountType);
    checkValidToken(): Promise<boolean | undefined>;
    checkOwnership(): Promise<boolean>;
    getProfile(): Promise<MCProfileResponse | undefined>;
    changeSkin(url: string, variant: "slim" | "classic"): Promise<true | undefined>;
    checkNameAvailability(name: string): Promise<boolean>;
    canChangeName(): Promise<boolean>;
}
