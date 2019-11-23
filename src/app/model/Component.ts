
export class Component {

    public securitySchemes: SecuritySchemes;


}

export class SecuritySchemes {

    [key: string]: SecurityScheme;

}

export class SecurityScheme {

    public type: string;
    public description: string;
    public flows: string;

}