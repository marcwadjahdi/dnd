import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {PlayerFeature} from './dnd/character/player/player-character.state';
import {PlayerCharacterReducer} from './dnd/character/player/player-character.reducer';
import {PlayerCharacterEffects} from './dnd/character/player/player-character.effects';
import {LocalStorageSyncEffect} from './util/sync/store-sync.effects';
import {metaReducers} from './util/sync/store-sync.reducer';

const reducers = {
  ...{[PlayerFeature]: PlayerCharacterReducer},
};

const effects = [
  LocalStorageSyncEffect,
  PlayerCharacterEffects,
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 30
    }),
  ],
})
export class DndStoreModule {
}
