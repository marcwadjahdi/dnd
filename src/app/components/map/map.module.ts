import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MapComponent} from './map.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MapToolsComponent} from './map-tools/map-tools.component';
import {MapLayerSwitcherComponent} from './map-layer-switcher/map-layer-switcher.component';
import {SharedModule} from 'src/app/shared/shared.module';

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
  ],
})
export class MapModule {
}
