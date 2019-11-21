import { Content } from './content.model';
import { Links } from './misc.model';

export class Responses {
    public default: Response;
    [key: string]: Response;
}
export class Response {
    public description: string;
    public headers: Headers;
    public content: Content;
    public links: Links;
}