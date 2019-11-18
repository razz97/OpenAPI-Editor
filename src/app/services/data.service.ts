import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Param } from '../model/Param';


@Injectable()
export class DataService {

    private paramObservable = new BehaviorSubject(new Param());
  
    observeParam(change: (param: Param) => void) {
        this.paramObservable.subscribe(change);
    }

    sendParam(param: Param) {
      this.paramObservable.next(param);
    }

}