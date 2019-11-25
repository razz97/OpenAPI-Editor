import { Info } from '../openapi-model/info.model';
import { Server } from '../openapi-model/server.model';
import { Components } from '../openapi-model/components.model';
import { Security, Tag, ExternalDocs } from '../openapi-model/misc.model';
import { AppPath } from './AppPath.model';

export class AppRoot {
    public openapi: string = "3.0.1";
    public info: Info = new Info();     
    public servers: Server[] = [];
    public paths: AppPath[] = [];
    public components: Components; //
    public security: Security; //
    public tags: Tag[]; //
    public externalDocs: ExternalDocs; //
}
