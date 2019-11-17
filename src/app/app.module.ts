import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { ExporterComponent } from './exporter/exporter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DocumentService } from './common/document.service';
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
import { SchemaformComponent } from './schemaform/schemaform.component';
import { ParamsformComponent } from './paramsform/paramsform.component';
import { ResponsesformComponent } from './responsesform/responsesform.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ExporterComponent,
    SchemaformComponent,
    ParamsformComponent,
    ResponsesformComponent
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
  providers: [DocumentService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
