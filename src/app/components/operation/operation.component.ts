import { Component, OnInit, Input } from '@angular/core';
import { Parameter } from 'src/app/modelV2/parameter.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Response } from 'src/app/modelV2/responses.model';
import { Operation } from 'src/app/modelV2/operation.model';

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
  operation: { key: string, value: Operation };

  addParam() {
    this.operation.value.parameters.push(new Parameter());
  }

  removeParam(param: Parameter) {
    this.operation.value.parameters.splice(this.operation.value.parameters.indexOf(param), 1);
  }

  editParam(param: Parameter) {
    this.router.navigateByUrl('param');
    this.dataService.sendParam(param);
  }

  addResponse() {
    this.operation.value.responses['200'] = new Response();
  }

  removeResponse(response: Response) {
    this.operation.value.responses['200'] = undefined;
  }

  editResponse(response: Response) {
    this.router.navigateByUrl('response');
    this.dataService.sendResponse({key: '200', value: response});
  }
  

}
