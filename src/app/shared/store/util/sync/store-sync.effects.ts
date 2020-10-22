import {Store} from '@ngrx/store';
import {DndState} from '../../dnd.state';
import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
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

  @Effect()
  onStoreEvent = fromEvent<StorageEvent>(window, this.STORAGE_EVENT).pipe(
    map(evt => StoreSyncUpdateAction()),
  );

  @Effect()
  afterStoreSync = createEffect(() => this.actions$.pipe(
    ofType(StoreSyncUpdateAction),
    map(action => BattleActions.SyncMap()),
  ));

  onToStoreAction = createEffect(() => this.actions$.pipe(
    ofType(
      NpcActions.EditNPC, NpcActions.RemoveNPC,
      PcActions.EditPC, PcActions.RemovePC,
      BattleActions.BattleStarted, BattleActions.BattleEnded,
      BattleActions.NextTurnReady, BattleActions.PreviousTurnReady,
      BattleActions.CharactersAdded, BattleActions.CharacterEdited, BattleActions.CharacterRemoved,
    ),
    tap(action => {
      this.store.select(state => state)
        .pipe(take(1))
        .subscribe(state => StoreState(state));
    }),
  ), dontDispatch);

  constructor(private actions$: Actions, private store: Store<DndState>) {
  }
}
