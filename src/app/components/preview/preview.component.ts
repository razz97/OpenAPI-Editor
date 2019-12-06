import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Root } from 'src/app/model/root.model';
import { SerializeService } from 'src/app/services/serialize.service';

declare const Redoc: any;

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html'
})
export class PreviewComponent {

  constructor(
    private serializeService: SerializeService
  ) { }

  @Input()
  root: Root

  @ViewChild('redoc', { static: true })
  redoc: ElementRef;

  refresh() {
    Redoc.init(
      this.serializeService.toJSONObject(this.root),
      {
        pathInMiddlePanel: true,
        hideDownloadButton: true
      },
      this.redoc.nativeElement);
  }


}
