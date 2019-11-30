import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { Parameter } from 'src/app/model/parameter.model';
import { Operation } from 'src/app/model/operation.model';
import { Response } from 'src/app/model/responses.model';

@Component({
  selector: 'operation',
  templateUrl: './operation.component.html'
})
export class OperationComponent {

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  @Input()
  operation: Operation;

  addParam() {
    this.operation.parameters.push(new Parameter());
  }

  removeParam(param: Parameter) {
    this.operation.parameters.splice(this.operation.parameters.indexOf(param), 1);
  }

  editParam(param: Parameter) {
    this.router.navigateByUrl('param');
    this.dataService.sendParam(param);
  }

  addResponse() {
    this.operation.appResponses.push(new Response());
  }

  removeResponse(response: Response) {
    this.operation.appResponses.splice(this.operation.appResponses.indexOf(response), 1);
  }

  editResponse(response: Response) {
    this.router.navigateByUrl('response');
    this.dataService.sendResponse(response);
  }
  

}
