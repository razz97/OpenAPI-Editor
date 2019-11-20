import { Info } from './Info';
import { Server } from './Server';
import { TagGroup } from './TagGroup';
import { Path } from './Path';

export class Root {

    public openapi: string = "3.0.1";
    public info: Info = new Info();
    public servers: Server[] = [];
    public tagGroups: TagGroup[] = [];
    public paths: Path[] = [];

}