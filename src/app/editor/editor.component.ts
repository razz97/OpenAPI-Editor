import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public methods = ["GET", "POST", "PUT", "DELETE"]
  public paramLocations = ["Path", "Query", "Header", "Cookie"]

  public path = "";
  public method = "";
  public description = "";
  public summary = "";

  tags = [];
  params = {
    name: "",
    in: "",
    description: "",
    required: ""
  }
  operation = {

  };

}
