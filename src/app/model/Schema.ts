
import { Property } from './Property';

export class Schema {

    public type: "string" | "array" | "object" | "number" | "boolean" = "string";

    public description?: string = "desc";
    public format?: string = "";
    public nullable?: boolean = true;

    // To use enums, set type to string and fill values here
    public enum?: [string];

    // Required for type object
    public properties?: [Property];

    // Required for type array
    public items?: Schema;

}