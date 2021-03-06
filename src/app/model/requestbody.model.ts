import { Content } from './content.model';

export class RequestBody {
    public description: string;
    public content: Content = new Content();
    public required: boolean;
}
export class RequestBodies {
    [key: string]: RequestBody;
}