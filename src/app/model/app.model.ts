import { Root } from './openapi-model/root.model';
import { Path } from './openapi-model/path.model';
import { Operation } from './openapi-model/operation.model';
import { Response } from './openapi-model/responses.model';
import { MediaType } from './openapi-model/content.model';
import { Schema } from './openapi-model/schema.model';

export class AppRoot extends Root {
    public appPaths: AppPath[] = [];
}

export class AppPath extends Path {
    public name: string;
    public operations: AppOperation[] = [];
}

export class AppOperation extends Operation {
    constructor(public method: string) { super() }
    public appResponses: AppResponse[] = [];
}

export class AppResponse extends Response {
    public status: string;
    public appContent: AppMediaType[] = [];
}

export class AppMediaType extends MediaType   {
    constructor(public name: string) { super() }
    public appSchema: AppSchema = new AppSchema();
}

export class AppSchema extends Schema {
    public name: string;
    public appProperties: AppSchema[];
    public appItems: AppSchema;
}