import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Path } from '../../model/Path';
import { Operation, Method } from '../../model/Operation';
import { DocumentService } from '../../services/document.service';
import { Remote } from 'electron';
import { Param } from 'src/app/model/Param';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Response } from 'src/app/model/Response';

declare const Redoc: any;

@Component({
  selector: 'app-editor',
  templateUrl: './path.component.html'
})
export class PathComponent {
  
  constructor(
    private documentService: DocumentService,
    private router: Router,
    private dataService: DataService
  ) {
    this.remote = (<any>window).require('electron').remote;
  }

  @ViewChild('redoc', { static: true }) redoc: ElementRef;

  remote: Remote;

  methods: Method[] = ["GET", "POST", "PUT", "DELETE"];

  methodSelected: Method = this.methods[0];

  path: Path = new Path();

  removeOperation(operation: Operation) {
    this.methods.push(operation.method);
    if (!this.methodSelected) {
      this.methodSelected = operation.method;
    }
    this.path.operations.splice(this.path.operations.indexOf(operation), 1);
  }

  save() {
    const folder = this.remote.dialog.showSaveDialogSync({});
    if (folder) {
      this.remote.require('fs').appendFileSync(folder, this.documentService.buildDocument(this.path).toString());
    }
  }

  addParam(params: Param[]) {
    params.push(new Param());
  }

  removeParam(params: Param[], param: Param) {
    params.splice(params.indexOf(param), 1);
  }

  editParam(param: Param) {
    this.router.navigateByUrl('param');
    this.dataService.sendParam(param);
  }

  addResponse(responses: Response[]) {
    responses.push(new Response());
  }

  removeResponse(responses: Response[],response: Response) {
    responses.splice(responses.indexOf(response), 1);
  }

  editResponse(response: Response) {
    this.router.navigateByUrl('response');
    this.dataService.sendResponse(response);
  }

  addOperation() {
    const tmp = this.methodSelected;
    this.methods.splice(this.methods.indexOf(this.methodSelected), 1);
    this.methodSelected = this.methods[0];
    this.path.operations.push(new Operation(tmp));
  }

  refresh() {
    Redoc.init(
      this.documentService.buildDocument(this.path).toJSON(),
      {
        pathInMiddlePanel: true,
        hideDownloadButton: true
      },
      this.redoc.nativeElement);
  }

}
