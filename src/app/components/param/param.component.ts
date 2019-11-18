import { Component } from '@angular/core';
import { Param, ParamLocation } from '../../model/Param';
import {  Router } from '@angular/router';
import { DataService } from '../../services/data.service';

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

  public paramLocations: ParamLocation[] = ["Path", "Query", "Header", "Cookie"];

  public param: Param = new Param();


  back() {
    this.router.navigateByUrl('path');
  }

}
