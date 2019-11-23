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
    public flows: OAuthFlows = new OAuthFlows();
    public openIdConnectUrl: string;
}
export class OAuthFlows {
    public implicit: OAuthFlow = new OAuthFlow();
    public password: OAuthFlow = new OAuthFlow();
    public clientCredentials: OAuthFlow = new OAuthFlow();
    public authorizationCode: OAuthFlow = new OAuthFlow();
}
export class OAuthFlow {
    public authorizationUrl: string;
    public tokenUrl: string;
    public refreshUrl: string;
    public scopes: Scopes = new Scopes();
}
export class Scopes {
    [key: string]: string;
}
