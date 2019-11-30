import { Schema } from './schema.model';
import { Examples } from './misc.model';
import { Content } from './content.model';

export class Parameter {
    public appSchema: Schema = new Schema();

    public name: string;
    public in: string;
    public description: string;
    public required: boolean;
    public deprecated: boolean;
    public allowEmptyValue: boolean;
    public style: string;
    public explode: boolean;
    public allowReserved: boolean;
    public schema: Schema;
    public example: any;
    public examples: Examples;
    public content: Content;
}
export class Parameters {
    [key: string]: Parameter;
}

export class Headers {
    [key: string]: Header;
}
export class Header extends Parameter {}