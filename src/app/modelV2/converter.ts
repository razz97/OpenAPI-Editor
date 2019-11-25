import { Root } from './openapi-model/root.model';
import { AppRoot } from './app-model/AppRoot.model';
import { AppPath } from './app-model/AppPath.model';
import { Paths, Path } from './openapi-model/path.model';
import { Operation } from './openapi-model/operation.model';
import { Responses, Response } from './openapi-model/responses.model';
import { AppResponse } from './app-model/AppResponse.model';
import { AppMediaType } from './app-model/AppMediaType.model';
import { Content, MediaType } from './openapi-model/content.model';
import { app } from 'electron';
import { AppOperation } from './app-model/AppOperation.model';


export class Converter {

    public static fromAppRoot(appRoot: AppRoot): Root {
        const root = new Root();
        if (appRoot.info)
            root.info = appRoot.info;
        if (appRoot.openapi)
            root.openapi = appRoot.openapi;
        if (appRoot.components)
            root.components = appRoot.components;
        if (appRoot.security)
            root.security = appRoot.security;
        if (appRoot.servers)
            root.servers = appRoot.servers;
        if (appRoot.externalDocs)
            root.externalDocs = appRoot.externalDocs;
        if (appRoot.tags)
            root.tags = appRoot.tags;
        if (appRoot.paths)
            root.paths = Converter.fromAppPaths(appRoot.paths);
        return root;
    }

    public static fromAppPaths(appPaths: AppPath[]): Paths {
        const paths: Paths = new Paths;
        appPaths.forEach(appPath => {
            const path = new Path();
            if (appPath.parameters)
                path.parameters = appPath.parameters;
            if (appPath.summary)
                path.summary = appPath.summary;
            if (appPath.description)
                path.description = appPath.description;
            if (appPath.servers)
                path.servers = appPath.servers;
            if (appPath.operations)
                Converter.fillPathOperations(appPath, path);
            paths[appPath.name] = path;
        });
        return paths;
    }

    public static fillPathOperations(appPath: AppPath, path: Path): void {
        appPath.operations.forEach(appOperation => {
            const operation = new Operation();
            if (appOperation.deprecated !== null && appOperation.deprecated !== undefined)
                operation.deprecated = appOperation.deprecated;
            if (appOperation.description)
                operation.description = appOperation.description;
            if (appOperation.externalDocs)
                operation.externalDocs = appOperation.externalDocs;
            if (appOperation.operationId)
                operation.operationId = appOperation.operationId;
            if (appOperation.parameters)
                operation.parameters = appOperation.parameters;
            if (appOperation.requestBody)
                operation.requestBody = appOperation.requestBody;
            if (appOperation.security)
                operation.security = appOperation.security;
            if (appOperation.servers)
                operation.servers = appOperation.servers;
            if (appOperation.summary)
                operation.summary = appOperation.summary;
            if (appOperation.tags)
                operation.tags = appOperation.tags;
            if (appOperation.responses)
                operation.responses = Converter.fromAppResponses(appOperation.responses);
            path[appOperation.method] = operation;
        });
    }

    public static fromAppResponses(appResponses: AppResponse[]): Responses {
        const responses = new Responses;
        appResponses.forEach(appResponse => {
            const response: Response = new Response();
            if (appResponse.content)
                response.content = Converter.fromAppContent(appResponse.content);
            if (appResponse.description)
                response.description = appResponse.description;
            if (appResponse.headers)
                response.headers = appResponse.headers;
            if (appResponse.links)
                response.links = appResponse.links;
            if (appResponse.status)
                responses[appResponse.status] = response;
        });
        return responses;
    }

    public static fromAppContent(appContent: AppMediaType[]): Content {
        const content: Content = new Content();
        appContent.forEach(appMediaType => {
            const mediaType = new MediaType();
            if (appMediaType.encoding)
                mediaType.encoding = appMediaType.encoding;
            if (appMediaType.example)
                mediaType.example = appMediaType.example;
            if (appMediaType.examples)
                mediaType.examples = appMediaType.examples;
            if (appMediaType.schema)
                mediaType.schema = appMediaType.schema;
            if (appMediaType.name)
                content[appMediaType.name] = mediaType;
        });
        return content;
    }


    public static fromOpenApiRoot(root: Root): AppRoot {
        const appRoot = new AppRoot();
        if (root.info)
            appRoot.info = root.info;
        if (root.openapi)
            appRoot.openapi = root.openapi;
        if (root.components)
            appRoot.components = root.components;
        if (root.security)
            appRoot.security = root.security;
        if (root.servers)
            appRoot.servers = root.servers;
        if (root.externalDocs)
            appRoot.externalDocs = root.externalDocs;
        if (root.tags)
            appRoot.tags = root.tags;
        if (root.paths)
            appRoot.paths = Converter.fromApiPaths(root.paths);
        return appRoot;
    }

    public static fromApiPaths(paths: Paths): AppPath[] {
        const appPaths: AppPath[] = [];
        Object.keys(paths).forEach(key => {
            const appPath = new AppPath();
            appPath.name = key;
            if (paths[key].parameters)
                appPath.parameters = paths[key].parameters;
            if (paths[key].summary)
                appPath.summary = paths[key].summary;
            if (paths[key].description)
                appPath.description = paths[key].description;
            if (paths[key].servers)
                appPath.servers = paths[key].servers;
            if (paths[key].get)
                appPath.operations.push(Converter.fromApiOperation('get', paths[key].get));
            if (paths[key].post)
                appPath.operations.push(Converter.fromApiOperation('post', paths[key].get));
            if (paths[key].put)
                appPath.operations.push(Converter.fromApiOperation('put', paths[key].get));
            if (paths[key].delete)
                appPath.operations.push(Converter.fromApiOperation('delete', paths[key].get));
            if (paths[key].options)
                appPath.operations.push(Converter.fromApiOperation('options', paths[key].get));
            if (paths[key].head)
                appPath.operations.push(Converter.fromApiOperation('head', paths[key].get));
            if (paths[key].patch)
                appPath.operations.push(Converter.fromApiOperation('patch', paths[key].get));
            if (paths[key].trace)
                appPath.operations.push(Converter.fromApiOperation('trace', paths[key].get));
            appPaths.push(appPath);
        });
        return appPaths;
    }

    public static fromApiOperation(method: string, operation: Operation): AppOperation {
        const appOperation = new AppOperation(method);
        if (operation.deprecated !== null && operation.deprecated !== undefined)
            appOperation.deprecated = operation.deprecated;
        if (operation.description)
            appOperation.description = operation.description;
        if (operation.externalDocs)
            appOperation.externalDocs = operation.externalDocs;
        if (operation.operationId)
            appOperation.operationId = operation.operationId;
        if (operation.parameters)
            appOperation.parameters = operation.parameters;
        if (operation.requestBody)
            appOperation.requestBody = operation.requestBody;
        if (operation.security)
            appOperation.security = operation.security;
        if (operation.servers)
            appOperation.servers = operation.servers;
        if (operation.summary)
            appOperation.summary = operation.summary;
        if (operation.tags)
            appOperation.tags = operation.tags;
        if (operation.responses)
            appOperation.responses = Converter.fromApiResponses(operation.responses);
        return appOperation;
    }

    public static fromApiResponses(responses: Responses): AppResponse[] {
        const appResponses: AppResponse[] = [];
        Object.keys(responses).forEach(key => {
            const appResponse: AppResponse = new AppResponse();
            if (responses[key].content)
                appResponse.content = Converter.fromApiContent(responses[key].content);
            if (responses[key].description)
                appResponse.description = appResponse.description;
            if (responses[key].headers)
                appResponse.headers = appResponse.headers;
            if (responses[key].links)
                appResponse.links = appResponse.links;
            appResponse.status = key;
            appResponses.push(appResponse);
        });
        return appResponses;
    }


    public static fromApiContent(content: Content): AppMediaType[] {
        const appContent: AppMediaType[] = [];
        Object.keys(content).forEach(key => {
            const appMediaType = new AppMediaType(key);
            if (content[key].encoding)
                appMediaType.encoding = content[key].encoding;
            if (content[key].example)
                appMediaType.example = content[key].example;
            if (content[key].examples)
                appMediaType.examples = content[key].examples;
            if (content[key].schema)
                appMediaType.schema = content[key].schema;
            appContent.push(appMediaType);
        });
        return appContent;
    }

}