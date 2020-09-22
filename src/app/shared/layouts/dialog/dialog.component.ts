import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild
} from '@angular/core';
import {DialogDirective} from './dialog.directive';
import {Subject} from 'rxjs';

@Component({
  selector: 'dnd-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  private readonly ON_CLOSE = new Subject<any>();

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public onClose = this.ON_CLOSE.asObservable();

  @ViewChild(DialogDirective)
  dialogContent: DialogDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    this.createContent(this.childComponentType);
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private createContent(componentType: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef = this.dialogContent.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  contentCliked($event: MouseEvent) {
    $event.stopPropagation();
  }

  close($event: MouseEvent) {
    if (this.componentRef.instance.close) {
      this.componentRef.instance.close();
    }
  }

  submit() {

  }
}
