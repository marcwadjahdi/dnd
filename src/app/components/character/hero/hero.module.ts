import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// Routing
import {RouterModule} from '@angular/router';
// Components
import {HeroesComponent} from './list/heroes.component';
import {HeroComponent} from './detail/hero.component';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'heroes',
        component: HeroesComponent,
      },
      {
        path: 'heroes/:id',
        component: HeroComponent,
      },
    ]),
  ]
})
export class HeroModule {
}
