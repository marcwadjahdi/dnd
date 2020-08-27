import {Routes} from '@angular/router';
import {NavbarComponent} from './navbar.component';

export const navbarRoutes: Routes = [{
    path: '',
    component: NavbarComponent,
    outlet: 'navbar',
}];
