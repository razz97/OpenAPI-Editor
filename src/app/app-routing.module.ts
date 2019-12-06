import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathComponent } from './components/path/path.component';
import { ParamComponent } from './components/param/param.component';
import { ResponseComponent } from './components/response/response.component';
import { ServerComponent } from './components/server/server.component';
import { RootComponent } from './components/root/root.component';
import { TagGroupComponent } from './components/tag-group/tag-group.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'root', component: RootComponent },
  { path: 'server', component: ServerComponent },
  { path: 'tag-group', component: TagGroupComponent },
  { path: 'path', component: PathComponent },
  { path: 'param', component: ParamComponent },
  { path: 'response', component: ResponseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
