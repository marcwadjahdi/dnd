import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HomeModule} from './home/home.module';
import {MapModule} from './map/map.module';
import {PlayerModule} from './player/player.module';
import {NpcModule} from './npc/npc.module';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    HomeModule,
    MapModule,
    PlayerModule,
    NpcModule,
  ],
  declarations: [],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DndModule {
}
