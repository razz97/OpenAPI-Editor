import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Remote } from 'electron';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Path } from 'src/app/model/path.model';
import { Operation } from 'src/app/model/operation.model';


@Component({
  selector: 'app-editor',
  templateUrl: './path.component.html'
})
export class PathComponent {

  constructor(private router: Router, dataService: DataService) {
    this.remote = (<any>window).require('electron').remote;
    dataService.observePath(path => {
      this.path = path;
      this.methods = this.allMethods
        .filter(name =>
          !path.operations
            .map(op => op.method)
            .includes(name)
        );
    });
  }

  @ViewChild('redoc', { static: true })
  redoc: ElementRef;

  remote: Remote;

  allMethods: string[] = ["GET", "POST", "PUT", "DELETE"];
  methods: string[];

  methodSelected: string;

  path: Path;

  removeOperation(operation: Operation) {
    this.path.operations.splice(this.path.operations.indexOf(operation), 1);
    this.methods.push(operation.method);
  }

  addOperation() {
    const method = this.methodSelected.toLowerCase();
    this.methods.splice(this.methods.indexOf(this.methodSelected), 1);
    this.methodSelected = this.methods[0];
    this.path.operations.push(new Operation(method));
  }

  back() {
    this.router.navigateByUrl('root');
  }

}
