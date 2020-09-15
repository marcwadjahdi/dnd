import {Store} from '@ngrx/store';
import {DndState} from '../dnd.state';
import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {map, take, tap} from 'rxjs/operators';
import {HeroActions} from '../../dnd/character/hero/hero.actions';
import {fromEvent} from 'rxjs';
import {StoreSyncUpdateAction} from './store-sync.actions';
import {StoreState} from './localstorage.service';

@Injectable()
export class LocalStorageSyncEffect {

  private readonly STORAGE_EVENT = 'storage';

  private readonly toSToreActionTypes = ofType(HeroActions.EditHero, HeroActions.RemoveHero);

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
