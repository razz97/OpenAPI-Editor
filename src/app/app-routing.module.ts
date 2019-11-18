import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathComponent } from './path/path.component';
import { ExporterComponent } from './exporter/exporter.component';
import { ParamComponent } from './param/param.component';


const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full' },
  { path: 'editor', component: PathComponent },
  { path: 'exporter', component: ExporterComponent },
  { path: 'param', component: ParamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
