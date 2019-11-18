import { Component, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Response, ContentType } from '../../model/Response';

@Component({
  selector: 'response',
  templateUrl: './response.component.html'
})
export class ResponseComponent {

  constructor(
    dataService: DataService,
    private element: ElementRef,
    private router: Router
  ) {
    dataService.observeResponse(resp => this.response = resp);
  }

  public contentTypes: ContentType[] = ["application/json", "text/plain", "text/html", "application/xml"];

  public response: Response = new Response();

  back() {
    this.router.navigateByUrl('path');
  }

}
