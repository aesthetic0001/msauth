import { Account } from "../Account";
export declare class MicrosoftAccount extends Account {
    refreshToken?: string;
    authCode?: string;
    constructor();
    refresh(): Promise<string>;
    authFlow(authCode: string): Promise<string>;
    use(): Promise<string | undefined>;
}
