import { MCAuthResponse } from "./MojangAuth.types";
export declare function authenticate(username: string, password: string, clientToken?: string): Promise<MCAuthResponse>;
export declare function refresh(accessToken: string, clientToken: string): Promise<MCAuthResponse>;
export declare function validateToken(token: string, alternativeValidation?: boolean): Promise<boolean | undefined>;
export declare function _validateToken(token: string): Promise<boolean | undefined>;
export declare function _validateTokenAlternative(token: string): Promise<boolean>;
