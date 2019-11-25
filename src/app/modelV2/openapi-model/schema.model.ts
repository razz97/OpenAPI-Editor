import { ExternalDocs } from './misc.model';

export class Schema {
    public title: string;
    public multipleOf: number;
    public maximum: number;
    public exclusiveMaximum: number;
    public minimum: number;
    public exclusiveMinimum: number;
    public maxLength: number;
    public minLength: number;
    public pattern: RegExp;
    public maxItems: number;
    public minItems: number;
    public uniqueItems: boolean;
    public maxProperties: number;
    public minProperties: number;
    public required: boolean;
    public enum: string[] = [];
    public type: string;
    public allOf: Schema;
    public oneOf: Schema;
    public anyOf: Schema;
    public not: Schema;
    public items: Schema;
    public properties: Schema[] = [];
    public additionalProperties: boolean | Schema;
    public description: string;
    public format: string;
    public default: any;
    public nullable: boolean;
    public discriminator: Discriminator;
    public readOnly: boolean;
    public writeOnly: boolean;
    public xml: Xml;
    public externalDocs: ExternalDocs;
    public example: any;
    public deprecated: boolean;
}

export class Schemas {
    [key: string]: Schema;
}

export class Discriminator {
    public propertyName: string;
    public mapping: Mapping;
}

export class Mapping {
    [key: string]: string;
}

export class Xml {
    public name: string;
    public namespace: string;
    public prefix: string;
    public attribute: boolean;
    public wrapped: boolean;
}