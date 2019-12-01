import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { Root } from '../model/root.model';
import { IOService, ReadResult } from '../services/io.service';
import { SerializeService, Format } from '../services/serialize.service';

@Component({
  selector: 'app-export-import',
  templateUrl: './exportImport.component.html'
})
export class ExportImportComponent {

  constructor(
    private ioService: IOService,
    private serializeService: SerializeService
  ) { }

  @Input()
  root: Root;
  @Output()
  rootChange = new EventEmitter<Root>();

  exportFormat: Format;

  export() {
    if (!this.exportFormat)
      return;
    const content = this.exportFormat === 'JSON'
      ? this.serializeService.toJSONString(this.root)
      : this.serializeService.toYAMLString(this.root);
    this.ioService.save(content);
  }

  import() {
    const result: ReadResult = this.ioService.read();
    if (!result.canceled)
      this.rootChange.emit(this.serializeService.parse(result));
  }

}
