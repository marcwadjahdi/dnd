import {AfterViewInit, Directive, HostListener, OnDestroy, Self} from '@angular/core';
import {NgControl, NgModel} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {HpFormatterPipe} from './hp-formatter.pipe';

@Directive({selector: '[dndHpFormatter]'})
export class HpFormatterDirective implements AfterViewInit {

  constructor(@Self() private ngModel: NgModel, private hpPipe: HpFormatterPipe) {
  }

  ngAfterViewInit() {
    this.setValue(this.hpPipe.transform(this.ngModel.model));
  }


  @HostListener('input', ['$event'])
  onInputChange() {
    this.setValue(this.ngModel.value);
  }

  setValue(value) {
    this.ngModel.control.setValue(value, {emitEvent: false});
  }
}

