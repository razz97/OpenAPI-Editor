import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PahtComponent } from './path/path.component';
import { ExporterComponent } from './exporter/exporter.component';


const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full' },
  { path: 'editor', component: PahtComponent },
  { path: 'exporter', component: ExporterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
