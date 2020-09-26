import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// Routing
import {RouterModule} from '@angular/router';
// Components
import {NpcListComponent} from './npc-list/npc-list.component';
import {NpcDetailComponent} from './npc-detail/npc-detail.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    NpcListComponent,
    NpcDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'npc',
        component: NpcListComponent,
      },
    ]),
  ]
})
export class NpcModule {
}
