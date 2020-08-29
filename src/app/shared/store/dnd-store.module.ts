import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {Hero, HeroEffects, HeroReducer} from '../dnd/character/hero';
import {StoreModule} from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    // Hero
    StoreModule.forFeature(Hero.FeatureName, HeroReducer),
    EffectsModule.forFeature([HeroEffects]),
    StoreDevtoolsModule.instrument(),
  ],
})
export class DndStoreModule {
}
