import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import {DialogService} from 'src/app/shared/layouts/dialog/dialog.service';
import {dontDispatch} from 'src/app/shared/store/util/effects';
import {BattleActions} from './battle.actions';
import {AddBattleCharacterComponent} from 'src/app/components/battle/add-battle-character/add-battle-character.component';
import {NewBattleComponent} from 'src/app/components/battle/new-battle/new-battle.component';

@Injectable()
export class BattleEffects {

  onOpenNewBattle = createEffect(() => this.actions$.pipe(
    ofType(BattleActions.OpenNewBattle),
    tap(action => this.dialogs.open(NewBattleComponent))
  ), dontDispatch);

  openAddCharacter = createEffect(() => this.actions$.pipe(
    ofType(BattleActions.OpenAddCharacter),
    tap(action => this.dialogs.open(AddBattleCharacterComponent))
  ), dontDispatch);


  constructor(private actions$: Actions, private dialogs: DialogService) {
  }
}
