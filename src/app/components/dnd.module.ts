import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HomeModule} from './home/home.module';
import {MapModule} from './map/map.module';
import {PcModule} from './pc/pc.module';
import {NpcModule} from './npc/npc.module';
import {BattleModule} from './battle/battle.module';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    HomeModule,
    MapModule,
    BattleModule,
    PcModule,
    NpcModule,
  ],
  declarations: [],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DndModule {
}
