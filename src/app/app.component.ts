import {Component, ModuleWithComponentFactories, ViewChild, ViewContainerRef} from '@angular/core';
import {DynamicLoaderService} from "./dynamic-loader.service";

interface SystemJS {
  'import': (path?: string) => Promise<any>;
}
declare let System: SystemJS;

@Component({
  selector: 'app',
  template: `
    <div #ref></div>
  `
})
export class AppComponent {
  @ViewChild('ref', {read: ViewContainerRef}) ref;

  constructor(private loader: DynamicLoaderService) {
    console.log(this.ref);
    loader.lazyLoadModule(() => System.import('./lazy/lazy.module')
      .then(mod => mod.LazyModule)).subscribe((moduleWithComponentFactories: ModuleWithComponentFactories<any>) => {
        this.loader.appendLazyComponent('LazyComponent', moduleWithComponentFactories, this.ref);
      }
    );
  }
}
