import { Schemas } from './schema.model';
import { Responses } from './responses.model';
import { Parameters } from './parameter.model';
import { Examples, Headers, Links } from './misc.model';
import { RequestBodies } from './requestbody.model';
import { SecuritySchemes } from './security.model';

export class Components {
    public schemas: Schemas;
    public responses: Responses;
    public parameters: Parameters;
    public examples: Examples;
    public requestBodies: RequestBodies;
    public headers: Headers;
    public securitySchemes: SecuritySchemes;
    public links: Links;
}