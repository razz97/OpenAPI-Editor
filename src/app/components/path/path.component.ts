import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Path } from '../../model/Path';
import { Operation, Method } from '../../model/Operation';
import { DocumentService } from '../../services/document.service';
import { Remote } from 'electron';

declare const Redoc: any;

@Component({
  selector: 'app-editor',
  templateUrl: './path.component.html'
})
export class PathComponent implements OnInit {

  remote: Remote;

  constructor(
    private documentService: DocumentService,
  ) {
    this.remote = (<any>window).require('electron').remote;
  }

  ngOnInit() {
  }

  @ViewChild('redoc', { static: true }) redoc: ElementRef;

  public methods: Method[] = ["GET", "POST", "PUT", "DELETE"];

  public methodSelected: Method = this.methods[0];

  public path: Path = new Path();

  public removeOperation(operation: Operation) {
    this.methods.push(operation.method);
    if (!this.methodSelected) {
      this.methodSelected = operation.method;
    }
    this.path.operations.splice(this.path.operations.indexOf(operation), 1);
  }

  public addOperation() {
    const tmp = this.methodSelected;
    this.methods.splice(this.methods.indexOf(this.methodSelected), 1);
    this.methodSelected = this.methods[0];
    this.path.operations.push(new Operation(tmp));
  }

  public refresh() {
    Redoc.init(
      this.documentService.buildDocument(this.path).toJSON(),
      {
        pathInMiddlePanel: true,
        hideDownloadButton: true
      },
      this.redoc.nativeElement);
  }


  save() {
    const folder = this.remote.dialog.showSaveDialogSync({});
    if (folder) {
      this.remote.require('fs').appendFileSync(folder, this.documentService.buildDocument(this.path).toString());
    }
  }


}
