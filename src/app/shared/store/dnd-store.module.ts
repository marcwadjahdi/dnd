import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {PcFeature} from './dnd/character/pc/pc.state';
import {PcReducer} from './dnd/character/pc/pc.reducer';
import {PcEffects} from './dnd/character/pc/pc.effects';
import {LocalStorageSyncEffect} from './util/sync/store-sync.effects';
import {metaReducers} from './util/sync/store-sync.reducer';
import {NpcFeature} from './dnd/character/npc/npc.state';
import {NpcReducer} from './dnd/character/npc/npc.reducer';
import {NpcEffects} from './dnd/character/npc/npc.effects';
import {BattleFeature} from './dnd/battle/battle.state';
import {BattleReducer} from './dnd/battle/battle.reducer';
import {BattleEffects} from './dnd/battle/battle.effects';

const reducers = {
  ...{[NpcFeature]: NpcReducer},
  ...{[PcFeature]: PcReducer},
  ...{[BattleFeature]: BattleReducer},
};

const effects = [
  LocalStorageSyncEffect,
  PcEffects,
  NpcEffects,
  BattleEffects,
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
