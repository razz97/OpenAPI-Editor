import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Info } from 'src/app/model/info.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html'
})
export class InfoComponent {

  @Input()
  info: Info = new Info();
  @Output()
  outputChange = new EventEmitter<Info>(); 

}
