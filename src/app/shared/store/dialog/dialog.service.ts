import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from './dialog.component';
import { DefaultConfig, DialogBtnConfig, DialogConfig, OpenConfig } from './dialog.models';
import { Store } from '@ngrx/store';
import { ClikState } from 'app/shared/store/clik.state';

@Injectable({ providedIn: 'root' })
export class DialogService {
    constructor(private store: Store<ClikState>, private modals: NgbModal) {}

    open(config: OpenConfig): NgbModalRef {
        const modalRef = this.modals.open(config.component, config.options);
        const compInstances = config.componentInstances;
        if (compInstances) {
            Object.keys(compInstances).forEach(it => (modalRef.componentInstance[it] = compInstances[it]));
        }
        return modalRef;
    }

    openDialog(dialogConfig: DialogConfig): NgbModalRef {
        const config: DialogConfig = {
            ...DefaultConfig,
            ...dialogConfig,
            ...{
                cancel: this.mergeBtnConfigs(dialogConfig.cancel, DefaultConfig.cancel),
                confirm: this.mergeBtnConfigs(dialogConfig.confirm, DefaultConfig.confirm)
            }
        };

        const modal = this.modals.open(DialogComponent, config.options);
        const instance = modal.componentInstance;
        Object.assign(instance, config);
        return modal;
    }

    close(modal: NgbModalRef): boolean {
        if (modal) {
            modal.dismiss('close');
            return true;
        }
        return false;
    }

    private mergeBtnConfigs(config: DialogBtnConfig = {}, defaultConfig: DialogBtnConfig) {
        return {
            text: config.text || defaultConfig.text,
            icon: config.icon || defaultConfig.icon,
            cls: config.cls || defaultConfig.cls,
            callback: config.callback || defaultConfig.callback,
            preventClose: config.preventClose === true ? true : defaultConfig.preventClose
        };
    }
}
