import { Schemas } from './schema.model';
import { Responses } from './responses.model';
import { Parameters, Headers } from './parameter.model';
import { Examples, Links } from './misc.model';
import { RequestBodies } from './requestbody.model';
import { SecuritySchemes } from './security.model';

export class Components {
    public schemas: Schemas = new Schemas();
    public responses: Responses = new Responses();
    public parameters: Parameters = new Parameters();
    public examples: Examples = new Examples();
    public requestBodies: RequestBodies = new RequestBodies();
    public headers: Headers = new Headers();
    public securitySchemes: SecuritySchemes = new SecuritySchemes();
    public links: Links = new Links();
}