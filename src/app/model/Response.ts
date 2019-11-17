import { Schema } from './Schema';

export class Response {

    public status: number = 200;
    public description: string = "";
    public content: "application/json" | "text/plain" | "text-html" | "application/xml" = "application/json";
    public schema: Schema = new Schema();
    

}
