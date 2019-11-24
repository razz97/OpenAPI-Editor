import { Schema } from './schema.model';
import { Examples } from './misc.model';
import { Content } from './content.model';

export class Parameter {
    public name: string;
    public in: string;
    public description: string;
    public required: boolean;
    public deprecated: boolean;
    public allowEmptyValue: boolean;
    public style: string;
    public explode: boolean;
    public allowReserved: boolean;
    public schema: Schema = new Schema();
    public example: any;
    public examples: Examples = undefined;
    public content: Content = undefined;
}
export class Parameters {
    [key: string]: Parameter;
}

export class Headers {
    [key: string]: Header;
}
export class Header extends Parameter {}