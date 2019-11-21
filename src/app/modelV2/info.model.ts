export class Info {
    public title: string;
    public description: string;
    public termsOfService: string; 
    public contact: Contact;
    public license: License;
    public version: string;
}
export class Contact {
    public name: string;
    public url: string;
    public email: string;
}
export class License {
    public name: string;
    public url: string;
}