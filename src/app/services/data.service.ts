import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Parameter } from '../modelV2/openapi-model/parameter.model';
import { Server } from '../modelV2/openapi-model/server.model';
import { Path } from '../modelV2/openapi-model/path.model';
import { Response } from '../modelV2/openapi-model/responses.model';
import { AppResponse } from '../modelV2/app-model/AppResponse.model';
import { AppPath } from '../modelV2/app-model/AppPath.model';


@Injectable()
export class DataService {

    private paramObservable = new BehaviorSubject<Parameter>(null);
    private responseObservable = new BehaviorSubject<AppResponse>(null);
    private serverObservable = new BehaviorSubject<Server>(null);
    // private tagGroupObservable = new BehaviorSubject(new TagGroup());
    private pathObservable = new BehaviorSubject<AppPath>(null);
  
    observeParam(change: (param: Parameter) => void) {
        this.paramObservable.subscribe(change);
    }

    sendParam(param: Parameter) {
      this.paramObservable.next(param);
    }

    observeResponse(change: (response: AppResponse) => void) {
        this.responseObservable.subscribe(change);
    }

    sendResponse(response: AppResponse) {
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

    observePath(change: (path: AppPath) => void) {
      this.pathObservable.subscribe(change);
    }

    sendPath(path: AppPath) {
      this.pathObservable.next(path);
    }

    sendKeyPathChange() {

    }
}