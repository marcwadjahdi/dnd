import {INIT, Store} from '@ngrx/store';
import {DndState} from '../../dnd.state';
import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {map, take, tap} from 'rxjs/operators';
import {PcActions} from '../../dnd/character/pc/pc.actions';
import {fromEvent} from 'rxjs';
import {StoreSyncUpdateAction} from './store-sync.actions';
import {StoreState} from './store-sync.service';
import {NpcActions} from '../../dnd/character/npc/npc.actions';
import {BattleActions} from '../../dnd/battle/battle.actions';
import {dontDispatch} from '../effects';

@Injectable()
export class LocalStorageSyncEffect {

  private readonly STORAGE_EVENT = 'storage';

  private readonly toSToreActionTypes = ofType(
    NpcActions.EditNPC, NpcActions.RemoveNPC,
    PcActions.EditPC, PcActions.RemovePC,
    BattleActions.BattleStarted, BattleActions.BattleEnded, BattleActions.NextTurnReady, BattleActions.PreviousTurn, BattleActions.EditCharacter, BattleActions.RemoveCharacter, BattleActions.AddCharacter,
  );

  onToStoreAction = createEffect(() => this.actions$.pipe(
    this.toSToreActionTypes,
    tap(action => {
      this.store.select(state => state)
        .pipe(take(1))
        .subscribe(state => StoreState(state));
    }),
  ), dontDispatch);

  @Effect()
  onChange = fromEvent<StorageEvent>(window, this.STORAGE_EVENT).pipe(
    map(evt => StoreSyncUpdateAction()),
    tap(action => {
      this.store.dispatch(BattleActions.SyncMap());
    }),
  );

  constructor(private actions$: Actions, private store: Store<DndState>) {
  }
}
