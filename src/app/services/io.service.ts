import { Injectable } from '@angular/core';
import { Remote } from 'electron';

@Injectable()
export class IOService {

    constructor() {
        this.remote = (<any>window).require('electron').remote;
        this.fs = this.remote.require('fs');
    }

    private remote: Remote;
    private fs: any;
    private readProperties = {
        openFile: true,
        filters: [
            { name: 'OpenApiDocument', extensions: ['json', 'yml', 'yaml'] }
        ]
    }

    save(content: string): void {
        const folder = this.remote.dialog.showSaveDialogSync({});
        if (folder) {
            this.fs.appendFileSync(folder, content);
        }
    }

    read(): string {
        const file = this.remote.dialog.showOpenDialogSync(this.readProperties);
        if (file && file[0])
            return this.fs.readFileSync(file[0], { encoding: 'UTF-8' });
        return null;
    }

}