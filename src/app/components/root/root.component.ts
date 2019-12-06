import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { Server } from 'src/app/model/server.model';
import { SerializeService } from 'src/app/services/serialize.service';
import { Root } from 'src/app/model/root.model';
import { Path } from 'src/app/model/path.model';
import { IOService, ReadResult } from 'src/app/services/io.service';
import { Components } from 'src/app/model/components.model';
import { ExternalDocs } from 'src/app/model/misc.model';
import { Info } from 'src/app/model/info.model';

declare const Redoc: any;

@Component({
  selector: 'rootform',
  templateUrl: './root.component.html'
})
export class RootComponent {

  constructor(
    private router: Router,
    private dataService: DataService,
    private serializeService: SerializeService
  ) { }

  @ViewChild('redoc', { static: true })
  redoc: ElementRef;

  root: Root = new Root();

  addServer() {
    this.root.servers.push(new Server());
  }

  editServer(server: Server) {
    this.dataService.sendServer(server);
    this.router.navigateByUrl('server');
  }

  removeServer(server: Server) {
    this.root.servers.splice(this.root.servers.indexOf(server), 1);
  }

  addPath() {
    this.root.appPaths.push(new Path());
  }

  editPath(path: Path) {
    this.dataService.sendPath(path);
    this.router.navigateByUrl('path');
  }

  removePath(path: Path) {
    this.root.appPaths.splice(this.root.appPaths.indexOf(path), 1);
  }

  // addGroup() {
  //   this.root.tagGroups.push(new TagGroup());
  // }

  // editGroup(tagGroup: TagGroup) {
  //   this.dataService.sendTagGroup(tagGroup);
  //   this.router.navigateByUrl('tag-group');
  // }

  // removeGroup(tagGroup: TagGroup) {
  //   this.root.tagGroups.splice(this.root.tagGroups.indexOf(tagGroup), 1);
  // }

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
