import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CharacterModule} from './character/character.module';
import {HomeModule} from './home/home.module';
import {MapModule} from './map/map.module';



@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        HomeModule,
        MapModule,
        CharacterModule,
    ],
    declarations: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DndModule {
}
