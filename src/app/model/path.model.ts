import { Operation } from './operation.model';
import { Server } from './server.model';
import { Parameter } from './parameter.model';

export class Path {
    public name: string;
    public operations: Operation[] = [];

    public summary: string;
    public description: string;
    public get: Operation;
    public post: Operation;
    public put: Operation;
    public delete: Operation;
    public options: Operation;
    public head: Operation;
    public patch: Operation;
    public trace: Operation;
    public servers: Server[]; //
    public parameters: Parameter[]; //
}

export class Paths {
    [key: string]: Path;
}