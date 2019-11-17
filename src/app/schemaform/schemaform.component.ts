import { Component, OnInit, Input, Output, ViewChild, QueryList, EventEmitter } from '@angular/core';
import { Schema, SchemaType } from '../model/Schema';
import { Property } from '../model/Property';

@Component({
  selector: 'schemaform',
  templateUrl: './schemaform.component.html',
  styleUrls: ['./schemaform.component.css']
})
export class SchemaformComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public schemaTypes: SchemaType[] = ["string", "array", "object", "number", "boolean"];

  @Input() 
  public schema: Schema;

  typeChanged() {
    switch(this.schema.type) {
      case "string":
      case "number":
        this.removeNestedSchemas();
        break;
      case "boolean":
        this.removeNestedSchemas();
        break;
      case "object":
        this.removeItems();
        this.schema.properties = [new Property()];
        break;
      case "array":
        this.removeProperties();
        this.schema.items = new Schema();
        break;
    }
  }

  removeNestedSchemas() {
    this.removeItems();
    this.removeProperties();
  }

  removeProperties() {
    this.schema.properties = undefined;
  }

  removeItems() {
    this.schema.items = undefined;
  }

  addProperty() {
    this.schema.properties.push(new Property());
  }

  removeProperty(property: Property) {
    this.schema.properties.splice(this.schema.properties.indexOf(property), 1);
  }

  
}
