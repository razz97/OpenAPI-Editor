import { ExternalDocs, Security } from './misc.model';
import { Parameter } from './parameter.model';
import { RequestBody } from './requestbody.model';
import { Responses } from './responses.model';
import { Server } from './server.model';

export class Operation {
    public tags: string[];
    public summary: string;
    public description: string;
    public externalDocs: ExternalDocs;
    public operationId: string;
    public parameters: Parameter[];
    public requestBody: RequestBody;
    public responses: Responses;
    public deprecated: boolean;
    public security: Security;
    public servers: Server[];
}