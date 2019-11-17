import { Schema } from './Schema';

export type ContentType = "application/json" | "text/plain" | "text/html" | "application/xml" 

export class Response {

    public status: number = 200;
    public description: string = "";
    public content: ContentType = "application/json";
    public schema: Schema = new Schema();

}
