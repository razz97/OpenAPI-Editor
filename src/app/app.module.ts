// Angular core
import { NgModule } from '@angular/core';
// Router related
import { AppRoutingModule } from './app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { ReuseStrategy } from './ReuseStrategy';
// External dependencies
import { ExternalModule } from './external.module';
// Services
import { DataService } from './services/data.service';
import { SerializeService } from './services/serialize.service';
import { IOService } from './services/io.service';
import { WrapService } from './services/wrap.service';
// Components
import { PathComponent } from './components/path/path.component';
import { SchemaComponent } from './components/schema/schema.component';
import { ParamComponent } from './components/param/param.component';
import { AppComponent } from './app.component';
import { ResponseComponent } from './components/response/response.component';
import { RootComponent } from './components/root/root.component';
import { ServerComponent } from './components/server/server.component';
import { TagGroupComponent } from './components/tag-group/tag-group.component';
import { OperationComponent } from './components/operation/operation.component';
import { InfoComponent } from './components/info/info.component';
import { PreviewComponent } from './components/preview/preview.component';
import { HomeComponent } from './components/home/home.component';
import { ExportComponent } from './components/export/export.component';
import { ImportComponent } from './components/import/import.component';

@NgModule({
  declarations: [
    AppComponent,
    PathComponent,
    SchemaComponent,
    ParamComponent,
    ResponseComponent,
    RootComponent,
    ServerComponent,
    TagGroupComponent,
    OperationComponent,
    InfoComponent,
    PreviewComponent,
    HomeComponent,
    ExportComponent,
    ImportComponent
  ],
  imports: [
    AppRoutingModule,
    ExternalModule
  ],
  providers: [
    DataService,
    SerializeService,
    IOService,
    WrapService,
    {
      provide: RouteReuseStrategy,
      useClass: ReuseStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
