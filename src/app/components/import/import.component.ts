import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Root } from 'src/app/model/root.model';
import { ReadResult, IOService } from 'src/app/services/io.service';
import { SerializeService } from 'src/app/services/serialize.service';
import { Components } from 'src/app/model/components.model';
import { ExternalDocs } from 'src/app/model/misc.model';
import { Info, Contact, License } from 'src/app/model/info.model';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html'
})
export class ImportComponent {

  constructor(
    private ioService: IOService,
    private serializeService: SerializeService
  ) { }

  @Output()
  onImport = new EventEmitter<Root>();


  import() {
    const result: ReadResult = this.ioService.read();
    if (!result.canceled) {
      const root = this.serializeService.parse(result);
      this.removeNulls(root);
      this.onImport.emit(root);
    }
  }


  private removeNulls(root: Root) {
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
