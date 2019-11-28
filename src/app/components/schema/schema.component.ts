import { Component, OnInit, Input, Output, ViewChild, QueryList, EventEmitter } from '@angular/core';
import { AppSchema } from 'src/app/model/app.model';

@Component({
  selector: 'schemaform',
  templateUrl: './schema.component.html'
})
export class SchemaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (this.isParam) {
      this.schemaTypes = this.schemaTypesParam;
    }
  }
  private schemaTypesParam: string[] = ["string", "number", "boolean"];
  public schemaTypes: string[] = ["string", "array", "object", "number", "boolean"];

  @Input()
  public schema: AppSchema;
  @Input()
  public isParam: boolean;

  typeChanged() {
    switch (this.schema.type) {
      case "string":
      case "number":
        this.removeNestedSchemas();
        break;
      case "boolean":
        this.removeNestedSchemas();
        break;
      case "object":
        this.removeItems();
        this.schema.appProperties = [new AppSchema()];
        break;
      case "array":
        this.removeProperties();
        this.schema.items = new AppSchema();
        break;
    }
  }

  removeNestedSchemas() {
    this.removeItems();
    this.removeProperties();
  }

  removeProperties() {
    this.schema.appProperties = undefined;
  }

  removeItems() {
    this.schema.items = undefined;
  }

  addProperty() {
    this.schema.appProperties.push(new AppSchema());
  }

  removeProperty(property: AppSchema) {
    this.schema.appProperties.splice(this.schema.appProperties.indexOf(property));
  }


}
