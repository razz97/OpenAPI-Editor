import { Info } from './info.model';
import { Server } from './server.model';
import { Path } from './path.model';
import { Components } from './components.model';
import { Security, Tag, ExternalDocs } from './misc.model';

export class Root {
    public openapi: string = "3.0.1";
    public info: Info = new Info();     
    public servers: Server[] = [];
    public paths: Map<String, Path> = new Map<string, Path>();
    public components: Components; //
    public security: Security; //
    public tags: Tag[]; //
    public externalDocs: ExternalDocs; //
}











