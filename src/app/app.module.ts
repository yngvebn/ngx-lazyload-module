import {NgModule, SystemJsNgModuleLoader} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {DynamicLoaderService} from "./dynamic-loader.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    DynamicLoaderService,
    SystemJsNgModuleLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
