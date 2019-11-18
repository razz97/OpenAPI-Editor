import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Param } from '../model/Param';
import { Response } from '../model/Response';


@Injectable()
export class DataService {

    private paramObservable = new BehaviorSubject(new Param());
    private responseObservable = new BehaviorSubject(new Response());
  
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

}