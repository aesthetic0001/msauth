import { Account } from "../Account";
export declare class MojangAccount extends Account {
    clientToken?: string;
    login_username?: string;
    login_password?: string;
    constructor();
    Login(username?: string, password?: string, saveCredentials?: boolean): Promise<string>;
    refresh(): Promise<string>;
    use(): Promise<string | undefined>;
}
