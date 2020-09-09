import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {HeroFeature} from '../dnd/character/hero/hero.state';
import {HeroReducer} from '../dnd/character/hero/hero.reducer';
import {HeroEffects} from '../dnd/character/hero/hero.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    // Hero
    StoreModule.forFeature(HeroFeature, HeroReducer),
    EffectsModule.forFeature([HeroEffects]),
    StoreDevtoolsModule.instrument(),
  ],
})
export class DndStoreModule {
}
