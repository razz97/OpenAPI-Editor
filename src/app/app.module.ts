// Angular core
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// Router related
import { AppRoutingModule } from './app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { ReuseStrategy } from './ReuseStrategy';
// External dependencies
import { ExternalModule } from './external.module';
// Services
import { DataService } from './services/data.service';
import { DocumentService } from './services/document.service';
// Components
import { PathComponent } from './components/path/path.component';
import { SchemaComponent } from './components/schema/schema.component';
import { ParamComponent } from './components/param/param.component';
import { AppComponent } from './app.component';
import { ResponseComponent } from './components/response/response.component';
import { RootComponent } from './components/root/root.component';
import { ServerComponent } from './components/server/server.component';
import { TagGroupComponent } from './components/tag-group/tag-group.component';

@NgModule({
  declarations: [
    AppComponent,
    PathComponent,
    SchemaComponent,
    ParamComponent,
    ResponseComponent,
    RootComponent,
    ServerComponent,
    TagGroupComponent
  ],
  imports: [
    AppRoutingModule,
    ExternalModule
  ],
  providers: [
    DocumentService,
    DataService,
    {
      provide: RouteReuseStrategy,
      useClass: ReuseStrategy
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
