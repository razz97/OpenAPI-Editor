import { Content, MediaType } from './content.model';
import { Links } from './misc.model';
import { Headers } from './parameter.model';

export class Responses {
    public default: Response;
    [key: string]: Response;
}
export class Response {
    public status: string;
    public appContent: MediaType[] = [];

    public description: string;
    public headers: Headers;
    public content: Content;
    public links: Links;
}