import { Param } from './Param';
import { Response } from './Response';

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export class Operation {
    
    constructor(method: Method) {
        this.method = method;
    }

    public method: Method;
    public description?: string = "";
    public summary?: string = "";
    public tags?: string[];
    public params?: Param[] = [new Param()];
    public responses: Response[] = [new Response()];

}
