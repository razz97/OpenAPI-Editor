import { Component, OnInit, ViewChild, ElementRef, QueryList, } from '@angular/core';
import { Path } from '../model/Path'
import { Operation, Method } from '../model/Operation';
import { Param, ParamLocation } from '../model/Param';
import { DocumentService } from '../common/document.service';
import { ContentType, Response } from '../model/Response';
import { SchemaformComponent } from '../schemaform/schemaform.component';

declare const Redoc: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
  }

  @ViewChild('redoc', { static: true }) redoc: ElementRef;
  @ViewChild(SchemaformComponent, { static: false }) childs: QueryList<SchemaformComponent>;

  public methods: Method[] = ["GET", "POST", "PUT", "DELETE"];
  public paramLocations: ParamLocation[] = ["Path", "Query", "Header", "Cookie"];
  public contentTypes: ContentType[] = ["application/json", "text/plain", "text/html", "application/xml"];

  public collapsed = {
    params: false,
    responses: false
  }

  public methodSelected: Method = this.methods[0];

  public path: Path = new Path();

  public addParam(params: Param[]) {
    this.collapsed.params = false;
    params.push(new Param());
  }

  public toggleCollapse(key: string) {
    this.collapsed[key] = !this.collapsed[key];
  }

  public removeParam(params: Param[], param: Param) {
    params.splice(params.indexOf(param), 1);
  }

  public removeOperation(operation: Operation) {
    this.methods.push(operation.method);
    if (!this.methodSelected) {
      this.methodSelected = operation.method;
    }
    this.path.operations.splice(this.path.operations.indexOf(operation), 1);
  }

  public addOperation() {
    const tmp = this.methodSelected;
    this.methods.splice(this.methods.indexOf(this.methodSelected), 1);
    this.methodSelected = this.methods[0];
    this.path.operations.push(new Operation(tmp));
  }

  public addResponse(responses: Response[]) {
    responses.push(new Response());
  }

  public removeResponse(responses: Response[], response: Response) {
    responses.splice(responses.indexOf(response), 1);
  }

  public refresh() {
    Redoc.init(this.documentService.buildDocument(this.path).toJSON(), {pathInMiddlePanel: true}, this.redoc.nativeElement);
  }



}
