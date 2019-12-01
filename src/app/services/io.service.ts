import { Injectable } from '@angular/core';
import { Remote } from 'electron';
import { Format } from './serialize.service';

export type ReadResult = { content: string, format: Format, canceled: boolean };

@Injectable()
export class IOService {

    constructor() {
        this.remote = (<any>window).require('electron').remote;
        this.fs = this.remote.require('fs');
        this.path = this.remote.require('path');
    }

    private remote: Remote;
    private fs: any;
    private path: any;

    private readProperties = {
        openFile: true,
        filters: [
            { name: 'OpenApi Document', extensions: ['json', 'yml', 'yaml'] }
        ]
    }

    save(content: string): void {
        const folder = this.remote.dialog.showSaveDialogSync({});
        if (folder) {
            this.fs.appendFileSync(folder, content);
        }
    }

    read(): ReadResult {
        const file = this.remote.dialog.showOpenDialogSync(this.readProperties);
        if (file && file[0])
            return {
                content: this.fs.readFileSync(file[0], { encoding: 'UTF-8' }),
                format: this.path.extname(file[0]) === 'json' ? 'JSON' : 'YAML',
                canceled: false,
            }
        return { content: null, format: null, canceled: true };
    }

}