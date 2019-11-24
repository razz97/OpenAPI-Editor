import { Server } from '../openapi-model/server.model';
import { Parameter } from '../openapi-model/parameter.model';
import { AppOperation } from './AppOperation.model';


export class AppPath {

    public name: string;

    public summary: string;
    public description: string;
    public servers: Server[] = undefined; //
    public parameters: Parameter[] = undefined; //
    public operations: AppOperation[] = [];

}