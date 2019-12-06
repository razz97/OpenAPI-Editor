import { Injectable } from '@angular/core';
import { Path } from '../model/path.model';
import { Operation } from '../model/operation.model';
import { Parameter } from '../model/parameter.model';
import { Response } from '../model/responses.model';
import { Root } from '../model/root.model';

@Injectable()
export class WrapService {

  public wrapPath(path: Path): Root {
    const root: Root = new Root();
    root.appPaths.push(path);
    return root;
  }

  public wrapOperation(operation: Operation): Root {
    const path = new Path();
    path.operations.push(operation);
    return this.wrapPath(path);
  }

  public wrapParameter(parameter: Parameter): Root {
    const operation = new Operation('GET');
    operation.parameters.push(parameter);
    return this.wrapOperation(operation);
  }

  public wrapResponse(response: Response): Root {
    const operation = new Operation('GET');
    operation.appResponses.push(response);
    return this.wrapOperation(operation);
  }

}
