import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Response } from 'src/app/model/responses.model';
import { MediaType } from 'src/app/model/content.model';

@Component({
  selector: 'response',
  templateUrl: './response.component.html'
})
export class ResponseComponent {

  constructor(dataService: DataService, private router: Router) {
    dataService.observeResponse(resp => {
      this.response = resp;
      this.contentTypes = this.allContentTypes
        .filter(name => 
          !resp.appContent
          .map(mediaType => mediaType.name)
          .includes(name)
        );
    });
  }
  private allContentTypes = ["application/json", "text/plain", "text/html", "application/xml"];

  contentTypes: string[];
  selectedContentType: string;

  response: Response = new Response();

  removeMediaType(mediaType: MediaType) {
    this.response.appContent.splice(this.response.appContent.indexOf(mediaType), 1);
    this.contentTypes.push(mediaType.name);
  }

  addMediaType() {
    const contentType = this.selectedContentType;
    this.contentTypes.splice(this.contentTypes.indexOf(contentType), 1);
    this.selectedContentType = this.contentTypes[0];
    this.response.appContent.push(new MediaType(contentType));
  }

  back() {
    this.router.navigateByUrl('path');
  }

}
