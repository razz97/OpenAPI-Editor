import { Component, OnInit, Input } from '@angular/core';
import { Param, ParamLocation } from '../model/Param';

declare let $ : any;

@Component({
  selector: 'paramsform',
  templateUrl: './paramsform.component.html',
  styleUrls: ['./paramsform.component.css']
})
export class ParamsformComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() public params: Param[]; 

  public paramLocations: ParamLocation[] = ["Path", "Query", "Header", "Cookie"];

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

}
