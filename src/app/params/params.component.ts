import { Component, OnInit, Input } from '@angular/core';
import { Param, ParamLocation } from '../model/Param';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

declare let $ : any;

@Component({
  selector: 'paramsform',
  templateUrl: './params.component.html'
})
export class ParamsComponent implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  @Input() public params: Param[]; 



  public collapsed: boolean = false

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
    $('#list-params').collapse('toggle');
  }

  public addParam() {
    this.params.push(new Param());
    $('#list-params').collapse('show');
    this.collapsed = false;
  }

  public removeParam(param: Param) {
    this.params.splice(this.params.indexOf(param), 1);
  }

  public editParam(param: Param) {
    this.router.navigateByUrl('param');
    this.dataService.sendParam(param);
  }

}
