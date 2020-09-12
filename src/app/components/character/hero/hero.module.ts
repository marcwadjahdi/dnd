import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// Routing
import {RouterModule} from '@angular/router';
// Components
import {HeroesComponent} from './list/heroes.component';
import {HeroComponent} from './detail/hero.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'heroes',
        component: HeroesComponent,
      },
    ]),
    FormsModule,
  ]
})
export class HeroModule {
}
