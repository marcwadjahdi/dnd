import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// Routing
import {RouterModule} from '@angular/router';
// Components
import {PlayersListComponent} from './players-list.component';
import {PlayerDetailComponent} from './player-detail/player-detail.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {LayoutsModule} from '../../shared/layouts/layouts.module';

@NgModule({
  declarations: [
    PlayersListComponent,
    PlayerDetailComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'players',
        component: PlayersListComponent,
      },
    ]),
    LayoutsModule,
  ]
})
export class PlayerModule {
}
