import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { Parameter } from 'src/app/modelV2/openapi-model/parameter.model';
import { AppOperation } from 'src/app/modelV2/app-model/AppOperation.model';
import { AppResponse } from 'src/app/modelV2/app-model/AppResponse.model';

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
  operation: AppOperation;

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
    this.operation.responses.push(new AppResponse());
  }

  removeResponse(response: AppResponse) {
    this.operation.responses.splice(this.operation.responses.indexOf(response), 1);
  }

  editResponse(response: AppResponse) {
    this.router.navigateByUrl('response');
    this.dataService.sendResponse(response);
  }
  

}
