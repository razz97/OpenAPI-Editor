import { Links } from '../openapi-model/misc.model';
import { Headers } from '../openapi-model/parameter.model';
import { AppMediaType } from './AppMediaType.model';

export class AppResponse {
    
    public status: string;

    public description: string;
    public headers: Headers = undefined;
    public content: AppMediaType[] = [];
    public links: Links = undefined;
    
}