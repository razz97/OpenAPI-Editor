import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Parameter } from '../modelV2/parameter.model';
import { Server } from '../modelV2/server.model';
import { Path } from '../modelV2/path.model';
import { Response } from '../modelV2/responses.model';


@Injectable()
export class DataService {

    private paramObservable = new BehaviorSubject<Parameter>(null);
    private responseObservable = new BehaviorSubject<{ key: string, value: Response}>(null);
    private serverObservable = new BehaviorSubject<Server>(null);
    // private tagGroupObservable = new BehaviorSubject(new TagGroup());
    private pathObservable = new BehaviorSubject<{ key: string, value: Path, lastKey: string}>(null);
  
    observeParam(change: (param: Parameter) => void) {
        this.paramObservable.subscribe(change);
    }

    sendParam(param: Parameter) {
      this.paramObservable.next(param);
    }

    observeResponse(change: (response: { key: string, value: Response}) => void) {
        this.responseObservable.subscribe(change);
    }

    sendResponse(response: { key: string, value: Response}) {
      this.responseObservable.next(response);
    }

    observeServer(change: (server: Server) => void) {
      this.serverObservable.subscribe(change);
    }

    sendServer(server: Server) {
      this.serverObservable.next(server);
    }

    // observeTagGroup(change: (tagGroup: TagGroup) => void) {
    //   this.tagGroupObservable.subscribe(change);
    // }

    // sendTagGroup(tagGroup: TagGroup) {
    //   this.tagGroupObservable.next(tagGroup);
    // }

    observePath(change: (path: { key: string, value: Path, lastKey: string}) => void) {
      this.pathObservable.subscribe(change);
    }

    sendPath(path: { key: string, value: Path, lastKey: string}) {
      this.pathObservable.next(path);
    }

    sendKeyPathChange() {

    }
}