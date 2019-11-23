import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Remote } from 'electron';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Path } from 'src/app/modelV2/path.model';
import { Method } from 'src/app/model/Operation';
import { Operation } from 'src/app/modelV2/operation.model';


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
    dataService.observePath(path => {
      this.path = path.value;
      this.originalKey = path.key;
      this.pathName = path.key;
    })
  }

  @ViewChild('redoc', { static: true }) redoc: ElementRef;

  remote: Remote;

  methods: Method[] = ["GET", "POST", "PUT", "DELETE"];

  methodSelected: Method = this.methods[0];

  path: Path;

  originalKey: string;

  pathName: string;

  operations: {key: string, value: Operation}[] = [];


  removeOperation(operation: { key: Method, value: Operation }) {
    this.methods.push(operation.key);
    this.path[operation.key] = undefined;
    this.operations.splice(this.operations.indexOf(operation), 1);
  }

  addOperation() {
    const tmp = this.methodSelected.toLowerCase();
    this.methods.splice(this.methods.indexOf(this.methodSelected), 1);
    this.methodSelected = this.methods[0];
    this.path[tmp] = new Operation();
    this.operations.push({key: '', value: this.path[tmp]});
  }

  back() {
    this.router.navigateByUrl('root');
  }

  keyChanged(event) {
    this.dataService.sendPath({key: event, value: this.path, lastKey: this.originalKey});
    this.originalKey = event;
  }

}
