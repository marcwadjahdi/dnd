import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ClikState } from 'app/shared/store/clik.state';
import { map, withLatestFrom } from 'rxjs/operators';
import { DialogService } from 'app/shared/store/dialog/dialog.service';
import { DialogActions } from 'app/shared/store/dialog/dialog.actions';
import { DialogSelectors } from 'app/shared/store/dialog/dialog.selectors';

@Injectable()
export class DialogEffects {
    modals: any = {};

    open = createEffect(() =>
        this.actions$.pipe(
            ofType(DialogActions.Open),
            withLatestFrom(this.store.select(DialogSelectors.Current)),
            map(([action, current]) => {
                const modal = this.service.open(action);
                this.modals[current] = modal;
                return DialogActions.DialogOpened();
            })
        )
    );

    openDialog = createEffect(() =>
        this.actions$.pipe(
            ofType(DialogActions.OpenDialog),
            withLatestFrom(this.store.select(DialogSelectors.Current)),
            map(([action, current]) => {
                const modal = this.service.openDialog(action.config);
                this.modals[current] = modal;
                return DialogActions.DialogOpened();
            })
        )
    );

    close = createEffect(() =>
        this.actions$.pipe(
            ofType(DialogActions.Close),
            withLatestFrom(this.store.select(DialogSelectors.Current)),
            map(([action, current]) => {
                const currentModal = this.modals[current];
                if (currentModal) {
                    this.service.close(currentModal);
                    delete this.modals[current];
                }
                return DialogActions.Closed();
            })
        )
    );

    constructor(private store: Store<ClikState>, private actions$: Actions, private service: DialogService) {}
}
