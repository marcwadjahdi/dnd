import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PcActions} from './pc.actions';
import {PcDetailComponent} from 'src/app/components/pc/pc-detail/pc-detail.component';
import {tap} from 'rxjs/operators';
import {DialogService} from 'src/app/shared/layouts/dialog/dialog.service';
import {dontDispatch} from 'src/app/shared/store/util/effects';

@Injectable()
export class PcEffects {

  onOpenEditCharacter = createEffect(() => this.actions$.pipe(
    ofType(PcActions.OpenEditPlayer),
    tap(action => this.dialogs.open(PcDetailComponent))
  ), dontDispatch);

  onEditCharacter = createEffect(() => this.actions$.pipe(
    ofType(PcActions.EditPlayer, PcActions.CloseEditPlayer),
    tap(action => this.dialogs.close())
  ), dontDispatch);

  constructor(private actions$: Actions, private dialogs: DialogService) {
  }
}
