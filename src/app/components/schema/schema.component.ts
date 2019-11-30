import { Component, OnInit, Input, Output, ViewChild, QueryList, EventEmitter } from '@angular/core';
import { Schema } from 'src/app/model/schema.model';

@Component({
  selector: 'schemaform',
  templateUrl: './schema.component.html'
})
export class SchemaComponent {

  constructor() { }

  public schemaTypes: string[] = ["string", "array", "object", "number", "boolean"];

  @Input()
  public schema: Schema;
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
        this.schema.appProperties = [new Schema()];
        break;
      case "array":
        this.removeProperties();
        this.schema.appItems = new Schema();
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
    this.schema.appItems = undefined;
  }

  addProperty() {
    this.schema.appProperties.push(new Schema());
  }

  removeProperty(property: Schema) {
    this.schema.appProperties.splice(this.schema.appProperties.indexOf(property));
  }


}
