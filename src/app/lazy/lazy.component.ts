import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lazy-loaded',
  template: `Hey I'm lazy loaded !!`
})
export class LazyComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Lazy Component');
  }

}
