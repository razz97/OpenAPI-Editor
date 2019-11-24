import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { AppResponse } from 'src/app/modelV2/app-model/AppResponse.model';
import { AppMediaType } from 'src/app/modelV2/app-model/AppMediaType.model';

@Component({
  selector: 'response',
  templateUrl: './response.component.html'
})
export class ResponseComponent {

  constructor(dataService: DataService, private router: Router) {
    dataService.observeResponse(resp => this.response = resp);
  }

  contentTypes: string[] = ["application/json", "text/plain", "text/html", "application/xml"];
  selectedContentType: string = this.contentTypes[0];

  response: AppResponse = new AppResponse();

  removeMediaType(mediaType: AppMediaType) {
    this.response.content.splice(this.response.content.indexOf(mediaType), 1);
    this.contentTypes.push(mediaType.name);
  }

  addMediaType() {
    const contentType = this.selectedContentType;
    this.contentTypes.splice(this.contentTypes.indexOf(contentType), 1);
    this.selectedContentType = this.contentTypes[0];
    this.response.content.push(new AppMediaType(contentType));
  }

  back() {
    this.router.navigateByUrl('path');
  }

}
