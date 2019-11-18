import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathComponent } from './components/path/path.component';
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
import { SchemaComponent } from './components/schema/schema.component';
import { ParamsComponent } from './components/params/params.component';
import { ResponsesComponent } from './components/responses/responses.component';
import { ParamComponent } from './components/param/param.component';
import { DataService } from './services/data.service';
import { RouteReuseStrategy } from '@angular/router';
import { ReuseStrategy } from './ReuseStrategy';
import { ResponseComponent } from './components/response/response.component';

@NgModule({
  declarations: [
    AppComponent,
    PathComponent,
    SchemaComponent,
    ParamsComponent,
    ResponsesComponent,
    ParamComponent,
    ResponseComponent
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
  providers: [DocumentService, DataService, { provide: RouteReuseStrategy, useClass: ReuseStrategy }],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
