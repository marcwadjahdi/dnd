import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[dndDialog]',
})
export class DialogDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
