
import { Property } from './Property';

export type SchemaType = "string" | "array" | "object" | "number" | "boolean";

export class Schema {

    public type: SchemaType = "string";
    public description?: string = "";
    public format?: string = "";
    public nullable?: boolean = true;

    // To use enums, set type to string and fill values here
    public enum?: [string];

    // Required for type object
    public properties?: [Property];

    // Required for type array
    public items?: Schema;

}