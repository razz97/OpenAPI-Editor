import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Root } from 'src/app/modelV2/root.model';
import { Server } from 'src/app/modelV2/server.model';
import { Path } from 'src/app/modelV2/path.model';
import { Remote } from 'electron';
import { createNode, Document } from 'yaml';

declare const Redoc: any;

@Component({
  selector: 'lala-root',
  templateUrl: './root.component.html'
})
export class RootComponent {

  constructor(private router: Router, private dataService: DataService) {
    this.remote = (<any>window).require('electron').remote;
    dataService.observePath(path => {
      if (path && path.lastKey && !this.root.paths.has(path.key)) {
        console.log('updated')
        this.root.paths.set(path.key, path.value);
        this.root.paths.delete(path.lastKey);
      }
    })
  }

  @ViewChild('redoc', { static: true }) 
  redoc: ElementRef;

  private remote: Remote;

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
    this.root.paths.set('Path ' + (this.root.paths.size + 1), new Path());
  }

  editPath(path: { key: string, value: Path, lastKey: string }) {
    this.dataService.sendPath(path);
    this.router.navigateByUrl('path');
  }

  removePath(path: { key: string, value: Path }) {
    this.root.paths.delete(path.key);
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
      this.remote.require('fs').appendFileSync(folder, createNode(this.root).toString());
    }
    const document = new Document();
    document.contents = createNode(this.root);
    console.log(document.toString());
  }

  refresh() {
    const document = new Document();
    document.contents = createNode(this.root);
    Redoc.init(
      document.toJSON(),
      {
        pathInMiddlePanel: true,
        hideDownloadButton: true
      },
      this.redoc.nativeElement);
  }

}
