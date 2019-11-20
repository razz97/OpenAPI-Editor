import { Component, OnInit } from '@angular/core';
import { Root } from 'src/app/model/Root';
import { DataService } from 'src/app/services/data.service';
import { Server } from 'src/app/model/Server';
import { Router } from '@angular/router';
import { TagGroup } from 'src/app/model/TagGroup';
import { Path } from 'src/app/model/Path';

@Component({
  selector: 'lala-root',
  templateUrl: './root.component.html'
})
export class RootComponent {

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  public root: Root = new Root();

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

  addGroup() {
    this.root.tagGroups.push(new TagGroup());
  }

  editGroup(tagGroup: TagGroup) {
    this.dataService.sendTagGroup(tagGroup);
    this.router.navigateByUrl('tag-group');
  }

  removeGroup(tagGroup: TagGroup) {
    this.root.tagGroups.splice(this.root.tagGroups.indexOf(tagGroup), 1);
  }

  addPath() {
    this.root.paths.push(new Path());
  }

  editPath(path: Path) {
    this.dataService.sendPath(path);
    this.router.navigateByUrl('path');
  }

  removePath(path: Path) {
    this.root.paths.splice(this.root.paths.indexOf(path), 1);
  }

}
