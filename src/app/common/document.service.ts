import { Injectable } from '@angular/core';
import { Path } from '../model/Path';
import { createNode, Document } from 'yaml';
import { Operation } from '../model/Operation';
import { Response } from '../model/Response';
import { Schema } from '../model/Schema';
import { Property } from '../model/Property';

@Injectable()
export class DocumentService {

    public buildDocument(path: Path) {
        const document = new Document();
        const root = this.buildRootNode();
        const operations = createNode({});
        const paths = createNode({});

        for (let op of path.operations) {
            const nodeOperation = this.buildOperationNode(op);
            operations.set(op.method.toLowerCase(), nodeOperation);
        }
        
        paths.set(path.path.trim(), operations);
        root.set('paths', paths);
        document.contents = root;
        return document;
    }

    private buildRootNode() {
        return createNode({
            'openapi': '3.0.1',
            'info': {
                'x-logo': {
                    'url': 'http://onebox-api-docs.s3.amazonaws.com/assets/img/logoob.svg'
                }
            },
            'components': {
                'securitySchemes': {
                    'OAuth2': {
                        'type': 'oauth2'
                    }
                }
            }
        });
    }

    private buildOperationNode(op: Operation) {
        const result = createNode({});
        result.set('summary', op.summary);
        result.set('description', op.description);
        result.set('parameters', op.params);
        if (op.tags) {
            result.set('tags', op.tags);
        }
        const responses = createNode({});
        for (const resp of op.responses) {
            responses.set(resp.status + '', this.buildResponseNode(resp))
        }
        result.set('responses', responses);
        return result;
    }

    private buildResponseNode(resp: Response) {
        const result = createNode({});
        result.set('description', resp.description);
        const content = createNode({});
        content.set(resp.content, this.buildSchemaNode(resp.schema));
        result.set('content', content);
        return result;
    }

    private buildSchemaNode(schema: Schema) {
        const result = createNode({});
        const schemaNode = createNode({});
        schemaNode.set('type', schema.type);
        if (schema.format) {
            schemaNode.set('format', schema.format);
        }
        if (schema.description) {
            schemaNode.set('description', schema.description);
        }
        if (schema.nullable) {
            schemaNode.set('nullable', schema.nullable);
        }
        if (schema.enum) {
            schemaNode.set('enum', schema.enum);
        }
        if (schema.properties) {
            schemaNode.set('properties', this.buildPropertiesNode(schema.properties));
        }
        if (schema.items) {
            schemaNode.set('items', this.buildSchemaNode(schema.items))
        }
        result.set('schema', schemaNode);
        return result;
    }

    private buildPropertiesNode(properties: Property[]) {
        const result = createNode({});
        for (const prop of properties) {
            result.set(prop.name, this.buildSchemaNode(prop.schema));
        }
        return result;
    }

}