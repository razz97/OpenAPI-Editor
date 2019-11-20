import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Param } from '../model/Param';
import { Response } from '../model/Response';
import { Server } from '../model/Server';
import { TagGroup } from '../model/TagGroup';
import { Path } from '../model/Path';


@Injectable()
export class DataService {

    private paramObservable = new BehaviorSubject(new Param());
    private responseObservable = new BehaviorSubject(new Response());
    private serverObservable = new BehaviorSubject(new Server());
    private tagGroupObservable = new BehaviorSubject(new TagGroup());
    private pathObservable = new BehaviorSubject(new Path());
  
    observeParam(change: (param: Param) => void) {
        this.paramObservable.subscribe(change);
    }

    sendParam(param: Param) {
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

    observeTagGroup(change: (tagGroup: TagGroup) => void) {
      this.tagGroupObservable.subscribe(change);
    }

    sendTagGroup(tagGroup: TagGroup) {
      this.tagGroupObservable.next(tagGroup);
    }

    observePath(change: (path: Path) => void) {
      this.pathObservable.subscribe(change);
    }

    sendPath(path: Path) {
      this.pathObservable.next(path);
    }

}