import { Root } from '../model/root.model';
import { Paths, Path } from '../model/path.model';
import { Responses, Response } from '../model/responses.model';
import { Content, MediaType } from '../model/content.model';
import { Schema, Schemas } from '../model/schema.model';
import { createNode, Document, parse } from 'yaml';
import { Injectable } from '@angular/core';
import { Operation } from '../model/operation.model';
import OpenAPISchemaValidator from 'openapi-schema-validator';
import { ReadResult } from './io.service';

export type Format = 'JSON' | 'YAML';

@Injectable()
export class SerializeService {

    public methods: string[] = ['get', 'post', 'put', 'delete', 'options', 'head', 'patch', 'trace'];

    public toJSONObject(root: Root) {
        return this.buildDocument(root).toJSON();
    }

    public toJSONString(root: Root): string {
        return JSON.stringify(this.buildDocument(root).toJSON());
    }

    public toYAMLString(root: Root): string {
        return this.buildDocument(root).toString();
    }


    private buildDocument(root: Root): Document {
        const document = new Document();
        document.contents = createNode(this.serialize(root));
        return document;
    }

    private serialize(original: Root): Root {
        const root: Root = this.deepCopy(original);
        if (root.appPaths)
            root.paths = this.getPathsFromList(root.appPaths);
        delete root.appPaths;
        return root;
    }

    private deepCopy<T>(oldObj: T): T {
        var newObj: any = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    }

    private getPathsFromList(appPaths: Path[]): Paths {
        const paths = new Paths();
        appPaths
            .filter(appPath => appPath.name)
            .forEach(appPath => {
                if (appPath.operations)
                    this.fillPathOperations(appPath);
                const name = appPath.name;
                delete appPath.name;
                paths[name] = appPath;
            });
        return paths;
    }

    private fillPathOperations(appPath: Path): void {
        appPath.operations
            .filter(appOperation => appOperation.method)
            .forEach(appOperation => {
                appOperation.parameters
                    .forEach(param => {
                        if (param.appSchema) {
                            param.schema = this.fromAppSchema(param.appSchema);
                            delete param.appSchema;
                        }
                    });
                if (appOperation.appResponses) {
                    appOperation.responses = this.fromAppResponses(appOperation.appResponses);
                    delete appOperation.appResponses;
                }
                const method = appOperation.method;
                delete appOperation.method;
                appPath[method] = appOperation;
            });
        delete appPath.operations;
    }

    private fromAppResponses(appResponses: Response[]): Responses {
        const responses = new Responses;
        appResponses
            .filter(appResponse => appResponse.status)
            .forEach(appResponse => {
                if (appResponse.appContent) {
                    appResponse.content = this.fromAppContent(appResponse.appContent);
                    delete appResponse.appContent;
                }
                const status = appResponse.status;
                delete appResponse.status;
                responses[status] = appResponse;
            });
        return responses;
    }

    private fromAppContent(appContent: MediaType[]): Content {
        const content: Content = new Content();
        appContent
            .filter(appMediaType => appMediaType.name)
            .forEach(appMediaType => {
                if (appMediaType.appSchema) {
                    appMediaType.schema = this.fromAppSchema(appMediaType.appSchema);
                    delete appMediaType.appSchema;
                }
                content[appMediaType.name] = appMediaType;
                delete appMediaType.name;
            });
        return content;
    }

    private fromAppSchema(appSchema: Schema): Schema {
        if (appSchema.appItems)
            appSchema.items = this.fromAppSchema(appSchema.appItems);
        if (appSchema.appProperties)
            appSchema.properties = this.fromAppProperties(appSchema.appProperties);
        delete appSchema.appItems;
        delete appSchema.appProperties;
        return appSchema;
    }

    private fromAppProperties(appProperties: Schema[]): Schemas {
        const properties: Schemas = new Schemas();
        appProperties.forEach(prop => {
            if (prop.appProperties)
                prop.properties = this.fromAppProperties(prop.appProperties);

            if (prop.appItems)
                prop.items = this.fromAppSchema(prop.appItems);
            delete prop.appProperties;
            delete prop.appItems;
            properties[prop.name] = prop;
            delete prop.name;
        });
        return properties;
    }

    public parse(result: ReadResult): Root {
        let appRoot;
        if (result.format === 'YAML') {
            appRoot = parse(result.content);
        } else {
            appRoot = JSON.parse(result.content);
        }
        console.dir(appRoot);
        const validationErros = new OpenAPISchemaValidator({ version: 3 }).validate(appRoot);
        if (validationErros.errors.length) {
            // TODO Show errors to the user, probably throw exception and 
            console.error('The openapi doc is invalid because: ');
            console.dir(validationErros.errors);
            return new Root();
        }
        appRoot.appPaths = this.fromApiPaths(appRoot.paths);
        delete appRoot.paths;
        return appRoot;
    }

    private fromApiPaths(paths: Paths): Path[] {
        const appPaths: Path[] = [];
        Object.keys(paths).forEach(key => {
            const appPath: any = paths[key];
            appPath.name = key;
            appPath.operations = [];
            this.methods
                .filter(method => appPath[method])
                .forEach(method => {
                    appPath.operations.push(this.fromApiOperation(method, appPath[method]));
                    delete appPath[method];
                });
            appPaths.push(appPath);
        });
        return appPaths;
    }

    private fromApiOperation(method: string, operation: Operation): Operation {
        const appOperation: any = operation
        appOperation.method = method;
        if (operation.responses)
            appOperation.appResponses = this.fromApiResponses(operation.responses);
        delete appOperation.responses;
        return appOperation;
    }

    private fromApiResponses(responses: Responses): Response[] {
        const appResponses: Response[] = [];
        Object.keys(responses).forEach(key => {
            const appResponse: any = responses[key];
            if (appResponse.content)
                appResponse.appContent = this.fromApiContent(appResponse.content);
            delete appResponse.content;
            appResponse.status = key;
            appResponses.push(appResponse);
        });
        return appResponses;
    }

    private fromApiContent(content: Content): MediaType[] {
        const appContent: MediaType[] = [];
        Object.keys(content).forEach(key => {
            const appMediaType: any = content[key];
            appMediaType.name = key;
            if (appMediaType.schema)
                appMediaType.appSchema = this.fromApiSchema(appMediaType.schema);
            delete appMediaType.schema;
            appContent.push(appMediaType);
        });
        return appContent;
    }

    private fromApiSchema(schema: Schema): Schema {
        if (schema.items)
            schema.appItems = this.fromApiSchema(schema.items);
        if (schema.properties)
            schema.appProperties = this.fromApiProperties(schema.properties);
        delete schema.items;
        delete schema.properties;
        return schema;
    }

    private fromApiProperties(properties: Schemas): Schema[] {
        const appProperties: Schema[] = [];
        Object.keys(properties).forEach(key => {
            if (properties[key].properties)
                properties[key].appProperties = this.fromApiProperties(properties[key].properties);
            if (properties[key].items)
                properties[key].appItems = this.fromAppSchema(properties[key].items);
            delete properties[key].items;
            delete properties[key].properties
            properties[key].name = key;
            appProperties.push(properties[key]);
        });
        return appProperties;
    }

}