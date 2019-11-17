import { Component, OnInit, Input } from '@angular/core';
import { ContentType, Response } from '../model/Response';

declare let $ : any;

@Component({
  selector: 'responses-form',
  templateUrl: './responsesform.component.html'
})
export class ResponsesformComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() public responses: Response[];
  
  public contentTypes: ContentType[] = ["application/json", "text/plain", "text/html", "application/xml"];

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

}
