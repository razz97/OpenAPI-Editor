import { ExternalDocs, Security } from '../openapi-model/misc.model';
import { Parameter } from '../openapi-model/parameter.model';
import { RequestBody } from '../openapi-model/requestbody.model';
import { Server } from '../openapi-model/server.model';
import { AppResponse } from './AppResponse.model';


export class AppOperation {

    constructor(public method: string) {}

    public tags: string[] = undefined; //
    public summary: string;
    public description: string;
    public externalDocs: ExternalDocs = undefined; //
    public operationId: string; //
    public parameters: Parameter[] = [];
    public requestBody: RequestBody = undefined; //
    public responses: AppResponse[] = [];
    public deprecated: boolean;
    public security: Security = undefined; //
    public servers: Server[] = undefined; //

    getKey(): string {
        return this.method;
    }

}