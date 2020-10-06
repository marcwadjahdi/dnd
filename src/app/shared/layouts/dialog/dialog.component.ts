import {AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, Type, ViewChild} from '@angular/core';
import {DialogDirective} from './dialog.directive';

@Component({
  selector: 'dnd-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public doClose: () => void;

  @ViewChild(DialogDirective)
  dialogContent: DialogDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
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

  contentCliked($event: MouseEvent) {
    $event.stopPropagation();
  }

  close($event: MouseEvent) {
    if (this.componentRef.instance.close) {
      this.componentRef.instance.close();
    } else if (this.doClose) {
      this.doClose();
    }
  }

  private createContent(componentType: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef = this.dialogContent.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
