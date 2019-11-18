import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathComponent } from './path/path.component';
import { ExporterComponent } from './exporter/exporter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DocumentService } from './services/document.service';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatCardModule
} from '@angular/material';
import { SchemaComponent } from './schema/schema.component';
import { ParamsComponent } from './params/params.component';
import { ResponsesComponent } from './responses/responses.component';
import { ParamComponent } from './param/param.component';
import { DataService } from './services/data.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './path/reuse';

@NgModule({
  declarations: [
    AppComponent,
    PathComponent,
    ExporterComponent,
    SchemaComponent,
    ParamsComponent,
    ResponsesComponent,
    ParamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    FormsModule,
    MatExpansionModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatCardModule
  ],
  providers: [DocumentService, DataService, {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
