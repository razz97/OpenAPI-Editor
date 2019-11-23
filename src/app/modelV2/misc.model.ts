import { Server } from './server.model';


export class Tag {
    public name: string;
    public description: string;
    public externalDocs: ExternalDocs = new ExternalDocs();
}


export class ExternalDocs {
    public description: string;
    public url: string;
}


export class Examples {
    [key: string]: Example;
}
export class Example {
    public summary: string;
    public description: string;
    public value: any;
    public externalValue: string;
}
export class Links {
    [key: string]: Link;
}
export class Link {
    public operationId: string;
    public description: string;
    public server: Server = new Server();
}
export class Security {
    [key: string]: string[]
}