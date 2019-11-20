import { Component, OnInit, Input } from '@angular/core';
import { Server } from 'src/app/model/Server';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'server',
  templateUrl: './server.component.html'
})
export class ServerComponent {

  constructor(
    private router: Router,
    dataService: DataService
  ) {
    dataService.observeServer(server => this.server = server);
  }

  public server: Server = new Server();

  back() {
    this.router.navigateByUrl('root');
  }


}
