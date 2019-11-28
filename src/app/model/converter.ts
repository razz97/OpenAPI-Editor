import { Root } from './openapi-model/root.model';
import { Paths } from './openapi-model/path.model';
import { Operation } from './openapi-model/operation.model';
import { Responses } from './openapi-model/responses.model';
import { Content } from './openapi-model/content.model';
import { Schema, Schemas } from './openapi-model/schema.model';
import { AppSchema, AppOperation, AppMediaType, AppResponse, AppPath, AppRoot } from './app.model';

export class Converter {

    private static methods: string[] = ['get', 'post', 'put', 'delete', 'options', 'head', 'patch', 'trace'];

    public static fromAppRoot(original: AppRoot): Root {
        const appRoot: AppRoot = Converter.deepCopy(original);
        if (appRoot.appPaths)
            appRoot.paths = Converter.fromAppPaths(appRoot.appPaths);
        delete appRoot.appPaths;
        return appRoot;
    }

    public static deepCopy<T>(oldObj: T): T {
        var newObj: any = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    }

    public static fromAppPaths(appPaths: AppPath[]): Paths {
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

    public static fillPathOperations(appPath: AppPath): void {
        appPath.operations
            .filter(appOperation => appOperation.method)
            .forEach(appOperation => {
                if (appOperation.responses)
                    appOperation.responses = Converter.fromAppResponses(appOperation.appResponses);
                appPath[appOperation.method] = appOperation;
                delete appOperation.method;
            });
    }

    public static fromAppResponses(appResponses: AppResponse[]): Responses {
        const responses = new Responses;
        appResponses
            .filter(appResponse => appResponse.status)
            .forEach(appResponse => {
                if (appResponse.content)
                    appResponse.content = this.fromAppContent(appResponse.appContent);
                responses[appResponse.status] = appResponse;
            });
        return responses;
    }

    public static fromAppContent(appContent: AppMediaType[]): Content {
        const content: Content = new Content();
        appContent
            .filter(appMediaType => appMediaType.name)
            .forEach(appMediaType => {
                if (appMediaType.appSchema)
                    appMediaType.schema = Converter.fromAppSchema(appMediaType.appSchema);
                content[appMediaType.name] = appMediaType;
                delete appMediaType.name;
            });
        return content;
    }

    public static fromAppSchema(appSchema: AppSchema): Schema {
        if (appSchema.appItems) {
            appSchema.items = Converter.fromAppSchema(appSchema.appItems);
            delete appSchema.appItems;
        }
        if (appSchema.appProperties) {
            appSchema.properties = this.fromAppProperties(appSchema.appProperties);
            delete appSchema.appProperties;
        }
        return appSchema;
    }

    public static fromAppProperties(appProperties: AppSchema[]) {
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
            properties[name] = prop;
            delete prop.name;
        });
        return properties;
    }

    public static fromOpenApiRoot(root: Root): AppRoot {
        const appRoot: any = root;
        appRoot.appPaths = Converter.fromApiPaths(root.paths);
        return appRoot;
    }

    public static fromApiPaths(paths: Paths): AppPath[] {
        const appPaths: AppPath[] = [];
        Object.keys(paths).forEach(key => {
            const appPath: any = paths[key];
            appPath.name = key;
            appPath.operations = [];
            Converter.methods
                .filter(method => paths[key][method])
                .forEach(method => {
                    appPath.operations.push(Converter.fromApiOperation('get', paths[key][method]));
                });
            appPaths.push(appPath);
        });
        return appPaths;
    }

    public static fromApiOperation(method: string, operation: Operation): AppOperation {
        const appOperation: any = operation
        appOperation.method = method;
        if (operation.responses)
            appOperation.appResponses = Converter.fromApiResponses(operation.responses);
        return appOperation;
    }

    public static fromApiResponses(responses: Responses): AppResponse[] {
        const appResponses: AppResponse[] = [];
        Object.keys(responses).forEach(key => {
            const appResponse: any = responses[key];
            if (appResponse.content)
                appResponse.appContent = Converter.fromApiContent(appResponse.content);
            appResponse.status = key;
            appResponses.push(appResponse);
        });
        return appResponses;
    }

    public static fromApiContent(content: Content): AppMediaType[] {
        const appContent: AppMediaType[] = [];
        Object.keys(content).forEach(key => {
            const appMediaType: any = content[key];
            appMediaType.name = key;
            appContent.push(appMediaType);
        });
        return appContent;
    }

}