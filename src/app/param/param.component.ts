import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Param, ParamLocation } from '../model/Param';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'param',
  templateUrl: './param.component.html'
})
export class ParamComponent implements OnInit {

  constructor(
    dataService: DataService,
    private element: ElementRef,
    private router: Router
    ) {
    dataService.observeParam(param => this.param = param);
  }

  public paramLocations: ParamLocation[] = ["Path", "Query", "Header", "Cookie"];

  public param: Param = new Param();

  ngOnInit() {
    this.element.nativeElement.style.display = "inline";
  }

  back() {
    this.router.navigateByUrl('editor');
  }

}
