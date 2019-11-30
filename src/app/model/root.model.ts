import { Info } from './info.model';
import { Server } from './server.model';
import { Paths, Path } from './path.model';
import { Components } from './components.model';
import { Security, Tag, ExternalDocs } from './misc.model';

export class Root {
    public appPaths: Path[] = [];

    public openapi: string = "3.0.1";
    public info: Info = new Info();     
    public servers: Server[] = [];
    public paths: Paths = new Paths();
    public components: Components; //
    public security: Security; //
    public tags: Tag[]; //
    public externalDocs: ExternalDocs; //
}











