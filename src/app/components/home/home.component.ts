import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Root } from 'src/app/model/root.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private router: Router, private dataService: DataService) { }

  roots: Root[] = [];

  onImport(root: Root) {
    this.roots.push(root);
  }  

  addRoot() {
    this.roots.push(new Root());
  }

  editRoot(root: Root) {
    this.dataService.sendRoot(root);
    this.router.navigateByUrl('root');
  }

  removeRoot(root: Root) {
    this.roots.splice(this.roots.indexOf(root), 1);
  }

}
