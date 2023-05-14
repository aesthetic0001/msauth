export type MCAuthResponse = {
    "user": {
        "username": string;
        "properties": [
            {
                "name": string;
                "value": string;
            },
            {
                "name": string;
                "value": string;
            }
        ];
        "id": string;
    };
    "clientToken": string;
    "accessToken": string;
    "availableProfiles": [
        {
            "name": string;
            "id": string;
        }
    ];
    "selectedProfile": {
        "name": string;
        "id": string;
    };
    "error": string;
    "errorMessage": string;
    "cause": string;
};
export type MCErrorResponse = {
    "error": string;
    "errorMessage": string;
    "cause": string;
};
