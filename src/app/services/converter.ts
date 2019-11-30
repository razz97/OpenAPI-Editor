import { Root } from '../model/root.model';
import { Paths, Path } from '../model/path.model';
import { Operation } from '../model/operation.model';
import { Responses, Response } from '../model/responses.model';
import { Content, MediaType } from '../model/content.model';
import { Schema, Schemas } from '../model/schema.model';

export class Converter {

    private static methods: string[] = ['get', 'post', 'put', 'delete', 'options', 'head', 'patch', 'trace'];

    public static serialize(original: Root): Root {
        const root: Root = Converter.deepCopy(original);
        if (root.appPaths)
            root.paths = Converter.getPathsFromList(root.appPaths);
        delete root.appPaths;
        return root;
    }

    private static deepCopy<T>(oldObj: T): T {
        var newObj: any = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    }

    private static getPathsFromList(appPaths: Path[]): Paths {
        const paths = new Paths();
        appPaths
            .filter(appPath => appPath.name)
            .forEach(appPath => {
                if (appPath.operations)
                    Converter.fillPathOperations(appPath);
                paths[appPath.name] = appPath;
                delete appPath.name;
            });
        return paths;
    }

    private static fillPathOperations(appPath: Path): void {
        appPath.operations
            .filter(appOperation => appOperation.method)
            .forEach(appOperation => {
                appOperation.parameters
                    .forEach(param => {
                        if (param.appSchema) {
                            param.schema = Converter.fromAppSchema(param.appSchema);
                            delete param.appSchema;
                        }
                    });
                if (appOperation.appResponses) {
                    appOperation.responses = Converter.fromAppResponses(appOperation.appResponses);
                    delete appOperation.appResponses;
                }
                const method = appOperation.method;
                delete appOperation.method;
                appPath[method] = appOperation;
            });
        delete appPath.operations;
    }

    private static fromAppResponses(appResponses: Response[]): Responses {
        const responses = new Responses;
        appResponses
            .filter(appResponse => appResponse.status)
            .forEach(appResponse => {
                if (appResponse.appContent) {
                    appResponse.content = this.fromAppContent(appResponse.appContent);
                    delete appResponse.appContent;
                }
                responses[appResponse.status] = appResponse;
            });
        return responses;
    }

    private static fromAppContent(appContent: MediaType[]): Content {
        const content: Content = new Content();
        appContent
            .filter(appMediaType => appMediaType.name)
            .forEach(appMediaType => {
                if (appMediaType.appSchema) {
                    appMediaType.schema = Converter.fromAppSchema(appMediaType.appSchema);
                    delete appMediaType.appSchema;
                }
                content[appMediaType.name] = appMediaType;
                delete appMediaType.name;
            });
        return content;
    }

    private static fromAppSchema(appSchema: Schema): Schema {
        if (appSchema.appItems)
            appSchema.items = Converter.fromAppSchema(appSchema.appItems);
        if (appSchema.appProperties)
            appSchema.properties = Converter.fromAppProperties(appSchema.appProperties);
        delete appSchema.appItems;
        delete appSchema.appProperties;
        return appSchema;
    }

    private static fromAppProperties(appProperties: Schema[]): Schemas {
        const properties: Schemas = new Schemas();
        appProperties.forEach(prop => {
            if (prop.appProperties) {
                prop.properties = this.fromAppProperties(prop.appProperties);
                delete prop.appProperties;
            }
            if (prop.appItems) {
                prop.items = this.fromAppSchema(prop.appItems);
                delete prop.appItems;
            }
            properties[prop.name] = prop;
            delete prop.name;
        });
        return properties;
    }

    // public static fromOpenApiRoot(root: Root): AppRoot {
    //     const appRoot: any = root;
    //     appRoot.appPaths = Converter.fromApiPaths(root.paths);
    //     return appRoot;
    // }

    // public static fromApiPaths(paths: Paths): AppPath[] {
    //     const appPaths: AppPath[] = [];
    //     Object.keys(paths).forEach(key => {
    //         const appPath: any = paths[key];
    //         appPath.name = key;
    //         appPath.operations = [];
    //         Converter.methods
    //             .filter(method => paths[key][method])
    //             .forEach(method => {
    //                 appPath.operations.push(Converter.fromApiOperation('get', paths[key][method]));
    //             });
    //         appPaths.push(appPath);
    //     });
    //     return appPaths;
    // }

    // public static fromApiOperation(method: string, operation: Operation): AppOperation {
    //     const appOperation: any = operation
    //     appOperation.method = method;
    //     if (operation.responses)
    //         appOperation.appResponses = Converter.fromApiResponses(operation.responses);
    //     return appOperation;
    // }

    // public static fromApiResponses(responses: Responses): AppResponse[] {
    //     const appResponses: AppResponse[] = [];
    //     Object.keys(responses).forEach(key => {
    //         const appResponse: any = responses[key];
    //         if (appResponse.content)
    //             appResponse.appContent = Converter.fromApiContent(appResponse.content);
    //         appResponse.status = key;
    //         appResponses.push(appResponse);
    //     });
    //     return appResponses;
    // }

    // public static fromApiContent(content: Content): AppMediaType[] {
    //     const appContent: AppMediaType[] = [];
    //     Object.keys(content).forEach(key => {
    //         const appMediaType: any = content[key];
    //         appMediaType.name = key;
    //         appContent.push(appMediaType);
    //     });
    //     return appContent;
    // }

}