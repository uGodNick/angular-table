import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {LoadPageComponent} from './load-page/load-page.component';
import {TablePageComponent} from './table-page/table-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { UnloadPageComponent } from './unload-page/unload-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadPageComponent,
    TablePageComponent,
    EditPageComponent,
    UnloadPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
