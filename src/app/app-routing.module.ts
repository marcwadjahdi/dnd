import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {navbarRoutes} from './shared/layouts/navbar/navbar.route.';
import {errorRoutes} from './shared/layouts/error/error.route';
import {HomeComponent} from './components/home/home.component';
import {MapComponent} from './components/map/map.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot([
      ...routes,
      ...navbarRoutes,
      ...errorRoutes
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
