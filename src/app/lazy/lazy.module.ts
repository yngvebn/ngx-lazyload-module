import {NgModule} from "@angular/core";
import {LazyComponent} from "./lazy.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LazyComponent
  ],
  entryComponents: [
    LazyComponent
  ],
  providers: [
  ],
  exports: [
  ]
})
export class LazyModule {
  constructor() {
    console.log('lazy module');
  }
}
