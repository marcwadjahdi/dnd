import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap, withLatestFrom} from 'rxjs/operators';
import {DialogService} from 'src/app/shared/layouts/dialog/dialog.service';
import {dontDispatch} from 'src/app/shared/store/util/effects';
import {BattleActions} from './battle.actions';
import {AddBattleCharacterComponent} from 'src/app/components/battle/add-battle-character/add-battle-character.component';
import {NewBattleComponent} from 'src/app/components/battle/new-battle/new-battle.component';
import {MapService} from '../../../map/map.service';
import {BattleTurn} from '../../../dnd/battle/battle';
import {BattleFacade} from './battle.facade';
import {deepCopy} from '../../../util/deep-copy';

@Injectable()
export class BattleEffects {

  onOpenNewBattle = createEffect(() => this.actions$.pipe(
    ofType(BattleActions.OpenNewBattle),
    tap(action => this.dialogs.open(NewBattleComponent))
  ), dontDispatch);

  onStartBattle = createEffect(() => this.actions$.pipe(
    ofType(BattleActions.StartBattle),
    tap(action => this.dialogs.close()),
    tap(action => this.mapService.showGrid()),
    tap(action => this.setTurn(action.turn)),
    map(action => BattleActions.BattleStarted()),
  ));

  onEndBattle = createEffect(() => this.actions$.pipe(
    ofType(BattleActions.EndBattle),
    tap(action => this.mapService.deleteAll()),
    tap(action => this.mapService.hideGrid()),
    map(action => BattleActions.BattleEnded()),
  ));

  onPreviousTurn = createEffect(() => this.actions$.pipe(
    ofType(BattleActions.PreviousTurn),
    withLatestFrom(this.battleFacade.turn$),
    tap(([action, turn]) => this.setTurn(turn)),
  ), dontDispatch);

  onNextTurn = createEffect(() => this.actions$.pipe(
    ofType(BattleActions.NextTurn),
    withLatestFrom(this.battleFacade.turn$),
    map(([action, currentTurn]) => {
      const turn: BattleTurn = deepCopy(currentTurn);
      turn.environment = this.mapService.environment();
      turn.initiative.forEach(it => {
        turn.characters[it].position = this.mapService.characterPosition(it);
      });
      return BattleActions.NextTurnReady({turn});
    }),
  ));

  openAddCharacter = createEffect(() => this.actions$.pipe(
    ofType(BattleActions.OpenAddCharacter),
    tap(action => this.dialogs.open(AddBattleCharacterComponent))
  ), dontDispatch);

  addCharacter = createEffect(() => this.actions$.pipe(
    ofType(BattleActions.AddCharacter),
    tap(action => this.mapService.addCharacter(action.character))
  ), dontDispatch);


  constructor(private actions$: Actions,
              private battleFacade: BattleFacade,
              private mapService: MapService,
              private dialogs: DialogService) {
  }

  private setTurn(turn: BattleTurn) {
    this.mapService.changeBasemap(turn.basemap);
    this.mapService.deleteAll();
    Object.values(turn.characters).forEach(this.mapService.addCharacter, this.mapService);
  }
}
