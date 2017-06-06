import {
  Injectable, ViewContainerRef, ComponentRef, Type, Injector, SystemJsNgModuleLoader, Compiler, NgModuleFactory,
  ModuleWithComponentFactories, NgModuleRef
} from '@angular/core';
import {LoadChildren} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class DynamicLoaderService {
  constructor(private loader: SystemJsNgModuleLoader, private compiler: Compiler, private injector: Injector) {
  }

  /**
   * Lazy load a module, takes the same argument as the router loadChildren parameter
   * @param loadChildren
   * @returns {Observable<ModuleWithComponentFactories<T>>}
   */
  lazyLoadModule<T>(loadChildren: LoadChildren): Observable<ModuleWithComponentFactories<T>> {
    if(typeof loadChildren === 'string') {
      return Observable.fromPromise(
        this.loader.load(loadChildren)
          .then((module: NgModuleFactory<T>) => this.compiler.compileModuleAndAllComponentsAsync(module.moduleType))
      );
    } else {
      const offlineMode = this.compiler instanceof Compiler;
      return this.wrapIntoObservable(loadChildren())
        .mergeMap((moduleType: Type<T>) => {
          if(offlineMode) {
            return Observable.of(<any>moduleType);
          } else {
            return Observable.fromPromise(this.compiler.compileModuleAndAllComponentsAsync(moduleType))
          }
        });
    }
  }

  private wrapIntoObservable<T>(value: T | NgModuleFactory<any> | Promise<T>| Observable<T>): Observable<T> {
    if(value instanceof Observable) {
      return value;
    } else if(value instanceof Promise) {
      return Observable.fromPromise(value);
    } else {
      return Observable.of(value);
    }
  }

  /**
   * Instantiate a component inside a DOM element
   * @param componentName
   * @param moduleWithFactories
   * @param template
   * @returns {ComponentRef<T>}
   */
  appendLazyComponent<T>(componentName: string, moduleWithFactories: ModuleWithComponentFactories<T>, template: ViewContainerRef) {
    const moduleInjector: NgModuleRef<T> = moduleWithFactories.ngModuleFactory.create(this.injector);
    const compFactory = moduleWithFactories.componentFactories.find(x => {
      const componentType = <any> x.componentType;
      return componentType.name === componentName;
    });
    return template.createComponent(compFactory, 0, moduleInjector.injector, []);
  }
}
