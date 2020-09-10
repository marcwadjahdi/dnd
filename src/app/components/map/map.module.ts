import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MapComponent} from './map.component';
import {MapGuard} from './map.guard';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MapCharacterEditorComponent} from './map-character-editor/map-character-editor.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'map',
        component: MapComponent,
        canActivate: [MapGuard]
      },
    ]),
  ],
  declarations: [
    MapComponent,
    MapCharacterEditorComponent,
  ],
})
export class MapModule {
}
