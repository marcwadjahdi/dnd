import {Store} from '@ngrx/store';
import {DndState} from '../../dnd.state';
import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {map, take, tap} from 'rxjs/operators';
import {PlayerCharacterActions} from '../../dnd/character/player/player-character.actions';
import {fromEvent} from 'rxjs';
import {StoreSyncUpdateAction} from './store-sync.actions';
import {StoreState} from './store-sync.service';

@Injectable()
export class LocalStorageSyncEffect {

  private readonly STORAGE_EVENT = 'storage';

  private readonly toSToreActionTypes = ofType(PlayerCharacterActions.EditPlayer, PlayerCharacterActions.RemovePlayer);

  onToStoreAction = createEffect(() => this.actions$.pipe(
    this.toSToreActionTypes,
    tap(action => {
      this.store.select(state => state)
        .pipe(take(1))
        .subscribe(state => StoreState(state));
    }),
  ), {dispatch: false});

  @Effect()
  onChange = fromEvent<StorageEvent>(window, this.STORAGE_EVENT).pipe(
    map(evt => StoreSyncUpdateAction()),
  );

  constructor(private actions$: Actions, private store: Store<DndState>) {
  }
}