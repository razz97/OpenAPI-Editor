import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Root } from '../../model/root.model';
import { IOService, ReadResult } from '../../services/io.service';
import { SerializeService, Format } from '../../services/serialize.service';
import { Components } from '../../model/components.model';
import { ExternalDocs } from '../../model/misc.model';
import { Info, Contact, License } from '../../model/info.model';

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
    if (!result.canceled) {
      const root = this.serializeService.parse(result);
      this.removeNulls(root);
      this.rootChange.emit(root);
    }

  }

  public removeNulls(root: Root) {
    if (!root.appPaths)
      root.appPaths = [];
    if (!root.components)
      root.components = new Components();
    if (!root.externalDocs)
      root.externalDocs = new ExternalDocs();
    if (!root.info)
      root.info = new Info();
    if (!root.servers)
      root.servers = [];
    if (!root.tags)
      root.tags = [];
    if (!root.openapi)
      root.openapi = "3.0.1";
    if (!root.info.contact)
      root.info.contact = new Contact();
    if (!root.info.license)
      root.info.license = new License();
  }

}
