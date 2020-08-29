import { Component } from '@angular/core';
import { DialogBtnConfig } from './dialog.models';
import { Store } from '@ngrx/store';
import { ClikState } from 'app/shared/store/clik.state';
import { DialogActions } from 'app/shared/store/dialog/dialog.actions';

@Component({
    selector: 'jhi-dialog',
    template: `
        <form>
            <header class="modal-header">
                <h4 class="modal-title"><span jhiTranslate="{{title}}"></span></h4>
                <button (click)="doCancel()" aria-hidden="true" class="close" data-dismiss="modal" type="button">&times;
                </button>
            </header>
            <section class="modal-body">
                <article [innerHTML]="content">
                </article>
            </section>
            <footer class="modal-footer">
                <button (click)="doConfirm()" class="btn {{confirm.cls}}" type="submit">
                    <fa-icon [icon]="confirm.icon"></fa-icon>
                    <span jhiTranslate="{{confirm.text}}">Valider</span>
                </button>
                <button (click)="doCancel()" class="btn {{cancel.cls}}" data-dismiss="modal" type="button">
                    <fa-icon [icon]="cancel.icon"></fa-icon>
                    <span jhiTranslate="{{cancel.text}}"></span>
                </button>
            </footer>
        </form>
    `
})
export class DialogComponent {
    title: string;
    content: string;
    cancel: DialogBtnConfig;
    confirm: DialogBtnConfig;

    constructor(private store: Store<ClikState>) {}

    doCancel() {
        if (this.cancel.callback) {
            this.cancel.callback();
        }
        if (!this.cancel.preventClose) {
            this.store.dispatch(DialogActions.Close());
        }
    }

    doConfirm() {
        if (this.confirm.callback) {
            this.confirm.callback();
        }
        if (!this.confirm.preventClose) {
            this.store.dispatch(DialogActions.Close());
        }
    }
}
