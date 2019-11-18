import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathComponent } from './components/path/path.component';
import { ParamComponent } from './components/param/param.component';
import { ResponseComponent } from './components/response/response.component';


const routes: Routes = [
  { path: '', redirectTo: 'path', pathMatch: 'full' },
  { path: 'path', component: PathComponent },
  { path: 'param', component: ParamComponent },
  { path: 'response', component: ResponseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
