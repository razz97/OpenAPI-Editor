import { Component, OnInit, Input } from '@angular/core';
import { ContentType, Response } from '../../model/Response';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

declare let $ : any;

@Component({
  selector: 'responses-form',
  templateUrl: './responses.component.html'
})
export class ResponsesComponent {

  constructor(
    private router: Router, 
    private dataService: DataService
  ) { }

  @Input() public responses: Response[];

  public collapsed: boolean = false;

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
    $('#list-responses').collapse('toggle');
  }

  public addResponse() {
    this.responses.push(new Response());
    $('#list-responses').collapse('show');
    this.collapsed = false;
  }

  public removeResponse(response: Response) {
    this.responses.splice(this.responses.indexOf(response), 1);
  }

  public editResponse(response: Response) {
    this.router.navigateByUrl('response');
    this.dataService.sendResponse(response);
  }

}
