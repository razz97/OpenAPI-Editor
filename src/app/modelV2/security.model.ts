export class SecuritySchemes {
    [key: string]: SecurityScheme;
}
export class SecurityScheme {
    public type: string;
    public description: string;
    public name: string;
    public in: string;
    public scheme: string;
    public bearerFormat: string;
    public flows: OAuthFlows;
    public openIdConnectUrl: string;
}
export class OAuthFlows {
    public implicit: OAuthFlow;
    public password: OAuthFlow;
    public clientCredentials: OAuthFlow;
    public authorizationCode: OAuthFlow;
}
export class OAuthFlow {
    public authorizationUrl: string;
    public tokenUrl: string;
    public refreshUrl: string;
    public scopes: Scopes;
}
export class Scopes {
    [key: string]: string;
}
