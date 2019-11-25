import { Schema } from './schema.model';
import { Examples } from './misc.model';

export class Content {
    [key: string]: MediaType;
}
export class MediaType {
    public schema: Schema = new Schema();
    public example: any; //
    public examples: Examples; //
    public encoding: Encodings; //
}
export class Encodings {
    [key: string]: Encoding;
}
export class Encoding {
    public contentType: string;
    public headers: Headers = new Headers();
    public style: string;
    public explode: boolean;
    public allowReserved: boolean;
}