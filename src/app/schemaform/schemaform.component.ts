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
    this.updateHeight();
  }

  public schemaTypes: SchemaType[] = ["string", "array", "object", "number", "boolean"];

  @Input() 
  public schema: Schema;

  @ViewChild(SchemaformComponent, { static: false }) 
  private childs: QueryList<SchemaformComponent>;

  @Output()
  private heightChanged: EventEmitter<number> = new EventEmitter();

  public myHeight: number = 200;
  public propertiesHeight = 0;

  updateHeight() {
    this.propertiesHeight = this.schema.type === 'object' ? this.aggregatedPropertiesChildsHeight() : 0;
    if (this.schema.type === "array") {
      this.myHeight = 200 + this.aggregatedChildsHeight() + this.propertiesHeight;
    } else if (this.schema.type === "object") {
      this.myHeight = 200 + this.aggregatedChildsHeight();
    } else {
      this.myHeight = 200;
    }
    this.heightChanged.emit(this.myHeight);
  }

  aggregatedChildsHeight() {
    if (this.childsInjected()) {
      return 0;
    }
    return this.childs
      .map(child => child.myHeight - child.propertiesHeight)
      .reduce((acc,current) => acc + current);
  }

  aggregatedPropertiesChildsHeight() {
    if (this.childsInjected()) {
      return 0;
    }
    return this.childs
      .map(child => child.propertiesHeight)
      .reduce((acc,current) => acc + current);
  }

  childsInjected = () => !this.childs || !this.childs.length;

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
    this.updateHeight();
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
