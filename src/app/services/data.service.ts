import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Parameter } from '../model/parameter.model';
import { Server } from '../model/server.model';
import { Response } from '../model/responses.model';
import { Path } from '../model/path.model';
import { Root } from '../model/root.model';


@Injectable()
export class DataService {

  private rootObservable = new BehaviorSubject<Root>(null);
  private paramObservable = new BehaviorSubject<Parameter>(null);
  private responseObservable = new BehaviorSubject<Response>(null);
  private serverObservable = new BehaviorSubject<Server>(null);
  private pathObservable = new BehaviorSubject<Path>(null);

  observeParam(change: (param: Parameter) => void) {
    this.paramObservable.subscribe(change);
  }

  sendParam(param: Parameter) {
    this.paramObservable.next(param);
  }

  observeResponse(change: (response: Response) => void) {
    this.responseObservable.subscribe(change);
  }

  sendResponse(response: Response) {
    this.responseObservable.next(response);
  }

  observeServer(change: (server: Server) => void) {
    this.serverObservable.subscribe(change);
  }

  sendServer(server: Server) {
    this.serverObservable.next(server);
  }

  observePath(change: (path: Path) => void) {
    this.pathObservable.subscribe(change);
  }

  sendPath(path: Path) {
    this.pathObservable.next(path);
  }

  observeRoot(change: (root: Root) => void) {
    this.rootObservable.subscribe(change);
  }

  sendRoot(root: Root) {
    this.rootObservable.next(root);
  }

  // private tagGroupObservable = new BehaviorSubject(new TagGroup());
  // observeTagGroup(change: (tagGroup: TagGroup) => void) {
  //   this.tagGroupObservable.subscribe(change);
  // }

  // sendTagGroup(tagGroup: TagGroup) {
  //   this.tagGroupObservable.next(tagGroup);
  // }
}