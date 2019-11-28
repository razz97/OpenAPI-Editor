import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { createNode, Document } from 'yaml';
import { Remote } from 'electron';

import { DataService } from 'src/app/services/data.service';
import { Server } from 'src/app/model/openapi-model/server.model';
import { Converter } from 'src/app/model/converter';
import { Root } from 'src/app/model/openapi-model/root.model';
import { AppRoot, AppPath } from 'src/app/model/app.model';

declare const Redoc: any;

@Component({
  selector: 'rootform',
  templateUrl: './root.component.html'
})
export class RootComponent {

  constructor(private router: Router, private dataService: DataService) {
    this.remote = (<any>window).require('electron').remote;
  }

  @ViewChild('redoc', { static: true }) 
  redoc: ElementRef;

  private remote: Remote;

  root: AppRoot = new AppRoot();
  
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
    this.root.appPaths.push(new AppPath());
  }

  editPath(path: AppPath) {
    this.dataService.sendPath(path);
    this.router.navigateByUrl('path');
  }

  removePath(path: AppPath) {
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

  save() {
    const folder = this.remote.dialog.showSaveDialogSync({});
    if (folder) {
      this.remote.require('fs').appendFileSync(folder, createNode(Converter.fromAppRoot(this.root)).toString());
    }
    const document = new Document();
    document.contents = createNode(Converter.fromAppRoot(this.root));
    console.log(document.toString());
  }

  refresh() {
    const document = new Document();
    const root: Root = Converter.fromAppRoot(this.root);
    document.contents = createNode(root);
    Redoc.init(
      document.toJSON(),
      {
        pathInMiddlePanel: true,
        hideDownloadButton: true
      },
      this.redoc.nativeElement);
  }

}
