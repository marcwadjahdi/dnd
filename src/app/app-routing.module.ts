import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {navbarRoutes} from 'src/app/shared/layouts/navbar/navbar.route.';
import {errorRoutes} from 'src/app/shared/layouts/error/error.route';
import {HomeComponent} from 'src/app/components/home/home.component';

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
