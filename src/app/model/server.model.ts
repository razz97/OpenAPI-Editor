export class Server {
    public url: string;
    public description: string;
    public variables: Variables; //
}
export class Variables {
    [key: string]: Variable;
}
export class Variable {
    public enum: string[] = [];
    public default: string;
    public description: string;
}