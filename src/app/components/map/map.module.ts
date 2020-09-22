import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MapComponent} from './map.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MapCharacterEditorComponent} from './map-character-editor/map-character-editor.component';
import {MapToolsComponent} from './map-tools/map-tools.component';
import {MapLayerSwitcherComponent} from './map-layer-switcher/map-layer-switcher.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'map',
        component: MapComponent
      },
    ]),
  ],
  declarations: [
    MapComponent,
    MapToolsComponent,
    MapLayerSwitcherComponent,
    MapCharacterEditorComponent,
  ],
})
export class MapModule {
}
