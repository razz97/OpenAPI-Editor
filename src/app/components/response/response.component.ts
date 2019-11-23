import { Component, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Response } from 'src/app/modelV2/responses.model';
import { ContentType } from 'src/app/model/Response';
import { MediaType } from 'src/app/modelV2/content.model';

@Component({
  selector: 'response',
  templateUrl: './response.component.html'
})
export class ResponseComponent {

  constructor(
    dataService: DataService,
    private router: Router
  ) {
    dataService.observeResponse(resp => {
      this.response = resp.value;
      this.status = resp.key;
    });
  }

  contentType: ContentType;

  public contentTypes: ContentType[] = ["application/json", "text/plain", "text/html", "application/xml"];

  public response: Response = new Response();
  public status: string;

  typeChanged(event) {
    console.log(event.value);
    this.contentType = event.value;
    this.response.content[event.value] = new MediaType();
  }

  back() {
    this.router.navigateByUrl('path');
  }

}
