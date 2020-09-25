import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// Routing
import {RouterModule} from '@angular/router';
// Components
import {PcListComponent} from './pc-list/pc-list.component';
import {PcDetailComponent} from './pc-detail/pc-detail.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {LayoutsModule} from 'src/app/shared/layouts/layouts.module';

@NgModule({
  declarations: [
    PcListComponent,
    PcDetailComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'players',
        component: PcListComponent,
      },
    ]),
    LayoutsModule,
  ]
})
export class PcModule {
}
