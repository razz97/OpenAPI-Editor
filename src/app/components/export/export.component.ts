import { Component, OnInit, Input } from '@angular/core';
import { IOService } from 'src/app/services/io.service';
import { SerializeService, Format } from 'src/app/services/serialize.service';
import { Root } from 'src/app/model/root.model';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
})
export class ExportComponent {

  constructor(
    private ioService: IOService,
    private serializeService: SerializeService
  ) { }

  @Input()
  root: Root;
  @Input()
  modalId: number;

  exportFormat: Format;

  export() {
    if (!this.exportFormat)
      return;
    const content = this.exportFormat === 'JSON'
      ? this.serializeService.toJSONString(this.root)
      : this.serializeService.toYAMLString(this.root);
    this.ioService.save(content);
  }

}
