import { Root } from './openapi-model/root.model';
import { AppRoot } from './app-model/AppRoot.model';
import { AppPath } from './app-model/AppPath.model';
import { Paths, Path } from './openapi-model/path.model';
import { Operation } from './openapi-model/operation.model';
import { Responses, Response } from './openapi-model/responses.model';
import { AppResponse } from './app-model/AppResponse.model';
import { AppMediaType } from './app-model/AppMediaType.model';
import { Content, MediaType } from './openapi-model/content.model';


export class Converter {

    public static fromAppRoot(appRoot: AppRoot): Root {
        const root = new Root();
        root.info = appRoot.info;
        root.openapi = appRoot.openapi;
        root.components = appRoot.components;
        root.security = appRoot.security;
        root.servers = appRoot.servers;
        root.externalDocs = appRoot.externalDocs;
        root.tags = appRoot.tags;
        root.paths = Converter.fromAppPaths(appRoot.paths);
        return root;
    }

    public static fromAppPaths(appPaths: AppPath[]): Paths {
        const paths: Paths = new Paths;
        appPaths.forEach(appPath => {
            const path = new Path();
            path.parameters = appPath.parameters;
            path.summary = appPath.summary;
            path.description = appPath.description;
            path.servers = appPath.servers;
            Converter.fillPathOperations(appPath, path);
            paths[appPath.name] = path;
        });
        return paths;
    }

    public static fillPathOperations(appPath: AppPath, path: Path): void {
        appPath.operations.forEach(appOperation => {
            const operation = new Operation();
            operation.deprecated = appOperation.deprecated;
            operation.description = appOperation.description;
            operation.externalDocs = appOperation.externalDocs;
            operation.operationId = appOperation.operationId;
            operation.parameters = appOperation.parameters;
            operation.requestBody = appOperation.requestBody;
            operation.security = appOperation.security;
            operation.servers = appOperation.servers;
            operation.summary = appOperation.summary;
            operation.tags = appOperation.tags;
            operation.responses = Converter.fromAppResponses(appOperation.responses);
            path[appOperation.method] = operation;
        });
    }

    public static fromAppResponses(appResponses: AppResponse[]): Responses {
        const responses = new Responses;
        appResponses.forEach(appResponse => {
            const response: Response = new Response();
            response.content = Converter.fromAppContent(appResponse.content);
            response.description = appResponse.description;
            response.headers = appResponse.headers;
            response.links = appResponse.links;
            responses[appResponse.status] = response;
        });
        return responses;
    }

    public static fromAppContent(appContent: AppMediaType[]): Content {
        const content: Content = new Content();
        appContent.forEach(appMediaType => {
            const mediaType = new MediaType();
            mediaType.encoding = appMediaType.encoding;
            mediaType.example = appMediaType.example;
            mediaType.examples = appMediaType.examples;
            mediaType.schema = appMediaType.schema;
            content[appMediaType.name] = mediaType;
        });
        return content;
    }


    public static fromOpenApiRoot(root: Root): AppRoot {
        const appRoot = new AppRoot();

        return appRoot;
    }



}