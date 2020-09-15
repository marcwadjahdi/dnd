import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {HeroFeature} from '../dnd/character/hero/hero.state';
import {HeroReducer} from '../dnd/character/hero/hero.reducer';
import {HeroEffects} from '../dnd/character/hero/hero.effects';
import {LocalStorageSyncEffect} from './sync/store-sync.effects';
import {metaReducers} from './sync/store-sync.reducer';

const reducers = {
  ...{[HeroFeature]: HeroReducer},
};

const effects = [
  HeroEffects,
  LocalStorageSyncEffect,
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
