import { Schema } from './Schema';

export type ParamLocation = "Path" | "Query" | "Header" | "Cookie";

export class Param {

    public in: ParamLocation = "Path";
    public name: string = "";
    public description?: string = "";
    public required?: boolean = false;
    public schema: Schema = new Schema();

}