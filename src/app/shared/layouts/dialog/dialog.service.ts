import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type,} from '@angular/core';
import {DialogComponent} from './dialog.component';

@Injectable({providedIn: 'root'})
export class DialogService {

  private dialogs: ComponentRef<DialogComponent>[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
  }

  public open(componentType: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const dialogRef = componentFactory.create(this.injector);
    dialogRef.instance.childComponentType = componentType;

    const hostView = dialogRef.hostView;
    this.appRef.attachView(hostView);
    document.body.appendChild((hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);

    this.dialogs = [dialogRef, ...this.dialogs];
  }

  public close() {
    if (this.dialogs.length !== 0) {
      const dialogRef = this.dialogs.shift();
      this.appRef.detachView(dialogRef.hostView);
      dialogRef.destroy();
    }
  }
}
