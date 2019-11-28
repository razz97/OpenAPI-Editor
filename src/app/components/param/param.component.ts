import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Parameter } from 'src/app/model/openapi-model/parameter.model';

@Component({
  selector: 'param',
  templateUrl: './param.component.html'
})
export class ParamComponent {

  constructor(
    dataService: DataService,
    private router: Router
  ) {
    dataService.observeParam(param => this.param = param);
  }

  public paramLocations: string[] = ["Path", "Query", "Header", "Cookie"];

  public param: Parameter = new Parameter();


  back() {
    this.router.navigateByUrl('path');
  }

}
