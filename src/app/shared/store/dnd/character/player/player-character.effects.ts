import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PlayerCharacterService} from './player-character.service';
import {PlayerCharacterActions} from './player-character.actions';
import {PlayerDetailComponent} from 'src/app/components/player/player-detail/player-detail.component';
import {tap} from 'rxjs/operators';
import {DialogService} from 'src/app/shared/layouts/dialog/dialog.service';
import {dontDispatch} from 'src/app/shared/store/util/effects';

@Injectable()
export class PlayerCharacterEffects {

  onOpenEditPlayerCharacter = createEffect(() => this.actions$.pipe(
    ofType(PlayerCharacterActions.OpenEditPlayer),
    tap(action => this.dialogs.open(PlayerDetailComponent))
  ), dontDispatch);

  onEditPlayerCharacter = createEffect(() => this.actions$.pipe(
    ofType(PlayerCharacterActions.EditPlayer, PlayerCharacterActions.CloseEditPlayer),
    tap(action => this.dialogs.close())
  ), dontDispatch);

  constructor(private actions$: Actions, private service: PlayerCharacterService, private dialogs: DialogService) {
  }
}
